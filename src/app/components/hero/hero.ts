import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { animate, inView } from 'motion';
import { stagger } from 'motion-dom';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  readonly typedText = signal('');

  private readonly el = inject(ElementRef);
  private readonly phrases = [
    'UX/UI Designer.',
    'Pesquisadora de Interfaces.',
    'Frontend Developer.',
    'Criadora de Experiências.',
  ];

  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  ngAfterViewInit(): void {
    this.runEntrance();
    this.tick();
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private runEntrance(): void {
    const host = this.el.nativeElement as HTMLElement;

    const eyebrow = host.querySelector<HTMLElement>('.hero-eyebrow');
    if (eyebrow) {
      animate(eyebrow, { opacity: [0, 1], translateY: ['20px', '0px'] }, { duration: 0.6, delay: 0.1 });
    }

    const name = host.querySelector<HTMLElement>('.hero-name');
    if (name) {
      animate(name, { opacity: [0, 1], translateY: ['60px', '0px'] }, { duration: 0.8, delay: 0.25 });
    }

    const cascades = Array.from(host.querySelectorAll<HTMLElement>('.hero-cascade'));
    if (cascades.length) {
      animate(cascades, { opacity: [0, 1], translateY: ['30px', '0px'] }, {
        duration: 0.6,
        delay: stagger(0.12, { startDelay: 0.5 }),
      });
    }

    const stats = Array.from(host.querySelectorAll<HTMLElement>('.hero-stat'));
    if (stats.length) {
      animate(stats, { opacity: [0, 1], scale: [0.85, 1] }, {
        duration: 0.5,
        delay: stagger(0.1, { startDelay: 0.9 }),
      });
    }
  }

  private tick(): void {
    const current = this.phrases[this.phraseIndex];

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.typedText.set(current.substring(0, this.charIndex));

    let delay = this.isDeleting ? 50 : 100;
    if (!this.isDeleting && this.charIndex === current.length) {
      delay = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      delay = 400;
    }

    this.timer = setTimeout(() => this.tick(), delay);
  }

  scrollToProjects(): void {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToContact(): void {
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
  }
}
