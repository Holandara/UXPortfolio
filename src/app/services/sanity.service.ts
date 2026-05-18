import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createClient, type SanityClient } from '@sanity/client';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ArticleSummary {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  author: string;
  excerpt: string;
  publishedAt: string;
  likes: number;
  coverImage?: { url: string; alt?: string };
}

export interface PortableTextSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
}

export interface PortableTextBlock {
  _type: string;
  _key: string;
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: { _key: string; _type: string; href?: string; blank?: boolean }[];
  imageUrl?: string;
  alt?: string;
  caption?: string;
}

export interface Article extends ArticleSummary {
  body: PortableTextBlock[];
  references?: { label: string; url: string }[];
  coverImage?: { url: string; alt?: string; caption?: string };
}

export interface Comment {
  _id: string;
  _createdAt: string;
  name: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class SanityService {
  private readonly http = inject(HttpClient);

  private readonly client: SanityClient = createClient({
    projectId: environment.sanity.projectId,
    dataset: environment.sanity.dataset,
    apiVersion: environment.sanity.apiVersion,
    useCdn: environment.sanity.useCdn,
  });

  getArticles(): Observable<ArticleSummary[]> {
    const query = `*[_type == "article"] | order(publishedAt desc) {
      _id, _createdAt, _updatedAt, title, slug, author, excerpt, publishedAt, likes,
      "coverImage": { "url": coverImage.asset->url, "alt": coverImage.alt }
    }`;
    return from(this.client.fetch<ArticleSummary[]>(query));
  }

  getArticleBySlug(slug: string): Observable<Article | null> {
    const query = `*[_type == "article" && slug.current == $slug][0] {
      _id, _createdAt, _updatedAt, title, slug, author, excerpt, publishedAt, likes, references,
      "coverImage": { "url": coverImage.asset->url, "alt": coverImage.alt, "caption": coverImage.caption },
      body[] {
        ...,
        _type == "image" => { ..., "imageUrl": asset->url }
      }
    }`;
    return from(this.client.fetch<Article | null>(query, { slug }));
  }

  getComments(slug: string): Observable<Comment[]> {
    const query = `*[_type == "comment" && articleSlug == $slug && approved == true] | order(_createdAt asc) {
      _id, _createdAt, name, content
    }`;
    return from(this.client.fetch<Comment[]>(query, { slug }));
  }

  likeArticle(articleId: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>('/.netlify/functions/like-article', { articleId });
  }

  submitComment(articleSlug: string, name: string, content: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>('/.netlify/functions/add-comment', {
      articleSlug,
      name,
      content,
    });
  }

  portableTextToHtml(blocks: PortableTextBlock[]): string {
    if (!blocks?.length) return '';
    return blocks
      .map((block) => {
        if (block._type === 'image') {
          const src = block.imageUrl ? `${block.imageUrl}?w=800&auto=format` : '';
          return `<figure class="article-figure">
            <img src="${src}" alt="${block.alt ?? ''}" loading="lazy" />
            ${block.caption ? `<figcaption>${block.caption}</figcaption>` : ''}
          </figure>`;
        }

        if (block._type !== 'block') return '';

        const markDefs = block.markDefs ?? [];
        const content = (block.children ?? [])
          .map((span) => {
            let text = this.escapeHtml(span.text ?? '');
            if (!text) return '';

            for (const mark of span.marks ?? []) {
              if (mark === 'strong') text = `<strong>${text}</strong>`;
              else if (mark === 'em') text = `<em>${text}</em>`;
              else if (mark === 'code') text = `<code>${text}</code>`;
              else {
                const def = markDefs.find((d) => d._key === mark);
                if (def?._type === 'link' && def.href) {
                  const rel = def.blank ? ' target="_blank" rel="noopener noreferrer"' : '';
                  text = `<a href="${def.href}"${rel}>${text}</a>`;
                }
              }
            }
            return text;
          })
          .join('');

        if (!content.trim()) return '';

        switch (block.style) {
          case 'h2': return `<h2>${content}</h2>`;
          case 'h3': return `<h3>${content}</h3>`;
          case 'h4': return `<h4>${content}</h4>`;
          case 'blockquote': return `<blockquote>${content}</blockquote>`;
          default: return `<p>${content}</p>`;
        }
      })
      .join('\n');
  }

  estimateReadTime(blocks: PortableTextBlock[]): number {
    const words = (blocks ?? [])
      .filter((b) => b._type === 'block')
      .flatMap((b) => b.children ?? [])
      .map((s) => s.text ?? '')
      .join(' ')
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
