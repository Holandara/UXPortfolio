import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { SanityService, Article, Comment } from '../../services/sanity.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe, LucideAngularModule, SafeHtmlPipe, ReactiveFormsModule],
  templateUrl: './article-detail.html',
  styles: [`
    :host {
      display: block;
    }

    .article-body :global(p) {
      margin-bottom: 1.75rem;
      line-height: 1.85;
      color: rgba(255,255,255,0.85);
    }
    .article-body :global(h2) {
      font-family: var(--font-display);
      font-size: 1.75rem;
      font-weight: 700;
      color: #fff;
      margin-top: 3rem;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    .article-body :global(h3) {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 600;
      color: #fff;
      margin-top: 2.5rem;
      margin-bottom: 0.75rem;
    }
    .article-body :global(h4) {
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 600;
      color: rgba(255,255,255,0.9);
      margin-top: 2rem;
      margin-bottom: 0.5rem;
    }
    .article-body :global(blockquote) {
      border-left: 3px solid #F2619C;
      margin: 2rem 0;
      padding: 0.5rem 0 0.5rem 1.5rem;
      font-size: 1.15rem;
      font-style: italic;
      color: rgba(255,255,255,0.7);
    }
    .article-body :global(strong) {
      color: #fff;
      font-weight: 600;
    }
    .article-body :global(em) {
      color: rgba(255,255,255,0.8);
    }
    .article-body :global(code) {
      background: rgba(255,255,255,0.08);
      border-radius: 4px;
      padding: 0.15em 0.4em;
      font-size: 0.875em;
      color: #E7BEF8;
    }
    .article-body :global(a) {
      color: #F2619C;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .article-body :global(a:hover) {
      color: #E7BEF8;
    }
    .article-body :global(.article-figure) {
      margin: 2.5rem 0;
    }
    .article-body :global(.article-figure img) {
      width: 100%;
      border-radius: 8px;
      max-height: 520px;
      object-fit: cover;
    }
    .article-body :global(.article-figure figcaption) {
      text-align: center;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.4);
      margin-top: 0.75rem;
    }
  `],
})
export class ArticleDetailPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sanity = inject(SanityService);
  private readonly fb = inject(FormBuilder);
  private readonly subs = new Subscription();

  readonly article = signal<Article | null>(null);
  readonly comments = signal<Comment[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly bodyHtml = signal('');
  readonly readTime = signal(0);
  readonly scrollProgress = signal(0);
  readonly liked = signal(false);
  readonly likeCount = signal(0);
  readonly likeLoading = signal(false);
  readonly commentSubmitting = signal(false);
  readonly commentSent = signal(false);

  readonly commentForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  });

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    if (!slug) { this.router.navigate(['/artigos']); return; }

    window.scrollTo(0, 0);

    this.subs.add(
      this.sanity.getArticleBySlug(slug).subscribe({
        next: (data) => {
          if (!data) { this.router.navigate(['/artigos']); return; }
          this.article.set(data);
          this.likeCount.set(data.likes ?? 0);
          this.bodyHtml.set(this.sanity.portableTextToHtml(data.body ?? []));
          this.readTime.set(this.sanity.estimateReadTime(data.body ?? []));
          this.liked.set(!!localStorage.getItem(`liked_${data._id}`));
          this.loading.set(false);
        },
        error: () => {
          this.error.set(true);
          this.loading.set(false);
        },
      })
    );

    this.subs.add(
      this.sanity.getComments(slug).subscribe({
        next: (data) => this.comments.set(data),
      })
    );
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const doc = document.documentElement;
    const scrollTop = window.scrollY;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    this.scrollProgress.set(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
  }

  toggleLike(): void {
    const a = this.article();
    if (!a || this.likeLoading()) return;

    const isLiked = this.liked();
    this.liked.set(!isLiked);
    this.likeCount.update((c) => (isLiked ? Math.max(0, c - 1) : c + 1));

    if (isLiked) {
      localStorage.removeItem(`liked_${a._id}`);
      return;
    }

    localStorage.setItem(`liked_${a._id}`, '1');
    this.likeLoading.set(true);

    this.subs.add(
      this.sanity.likeArticle(a._id).subscribe({
        next: () => this.likeLoading.set(false),
        error: () => {
          // revert on error
          this.liked.set(false);
          this.likeCount.update((c) => Math.max(0, c - 1));
          localStorage.removeItem(`liked_${a._id}`);
          this.likeLoading.set(false);
        },
      })
    );
  }

  submitComment(): void {
    if (this.commentForm.invalid || this.commentSubmitting()) return;
    const a = this.article();
    if (!a) return;

    this.commentSubmitting.set(true);
    const { name, content } = this.commentForm.value;

    this.subs.add(
      this.sanity.submitComment(a.slug.current, name!, content!).subscribe({
        next: () => {
          this.commentSent.set(true);
          this.commentSubmitting.set(false);
          this.commentForm.reset();
        },
        error: () => {
          this.commentSubmitting.set(false);
        },
      })
    );
  }
}
