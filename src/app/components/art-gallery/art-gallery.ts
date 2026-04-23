import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { animate, inView } from 'motion';
import { stagger } from 'motion-dom';
import { ART_PIECES, type ArtPiece } from '../../data/portfolio-data';

@Component({
  selector: 'app-art-gallery',
  standalone: true,
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './art-gallery.html',
})
export class ArtGalleryComponent implements AfterViewInit {
  private readonly el = inject(ElementRef);
  readonly pieces = signal<ArtPiece[]>(ART_PIECES);
  readonly lightboxItem = signal<ArtPiece | null>(null);

  ngAfterViewInit(): void {
    const host = this.el.nativeElement as HTMLElement;

    const header = host.querySelector<HTMLElement>('.section-header');
    if (header) {
      inView(header, (el) => {
        const children = Array.from(el.querySelectorAll<HTMLElement>('.reveal-child'));
        if (children.length) {
          animate(children, { opacity: [0, 1], translateY: ['40px', '0px'] }, {
            duration: 0.6, delay: stagger(0.1),
          });
        }
      }, { amount: 0.5 });
    }

    const grid = host.querySelector<HTMLElement>('.gallery-grid');
    if (grid) {
      inView(grid, (el) => {
        const items = Array.from(el.querySelectorAll<HTMLElement>('.gallery-item'));
        if (items.length) {
          animate(items, { opacity: [0, 1], scale: [0.92, 1] }, {
            duration: 0.5, delay: stagger(0.07),
          });
        }
      }, { amount: 0.05 });
    }
  }

  openLightbox(piece: ArtPiece): void {
    this.lightboxItem.set(piece);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const overlay = document.querySelector<HTMLElement>('.lightbox-overlay');
      const media   = document.querySelector<HTMLElement>('.lightbox-media');
      if (overlay) animate(overlay, { opacity: [0, 1] }, { duration: 0.25 });
      if (media)   animate(media,   { opacity: [0, 1], scale: [0.88, 1] }, { duration: 0.35 });
    }, 0);
  }

  closeLightbox(): void {
    const overlay = document.querySelector<HTMLElement>('.lightbox-overlay');
    if (overlay) {
      animate(overlay, { opacity: [1, 0] }, { duration: 0.2 }).then(() => {
        this.lightboxItem.set(null);
        document.body.style.overflow = '';
      });
    } else {
      this.lightboxItem.set(null);
      document.body.style.overflow = '';
    }
  }

  getGridClass(span: ArtPiece['span']): string {
    switch (span) {
      case 'wide': return 'col-span-2';
      case 'tall': return 'row-span-2';
      default:     return '';
    }
  }
}
