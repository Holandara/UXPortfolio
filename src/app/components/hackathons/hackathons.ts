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
import { HACKATHONS, type Hackathon } from '../../data/portfolio-data';

@Component({
  selector: 'app-hackathons',
  standalone: true,
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hackathons.html',
})
export class HackathonsComponent implements AfterViewInit {
  private readonly el = inject(ElementRef);
  readonly hackathons = signal<Hackathon[]>(HACKATHONS);

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

    const grid = host.querySelector<HTMLElement>('.hack-grid');
    if (grid) {
      inView(grid, (el) => {
        const cards = Array.from(el.querySelectorAll<HTMLElement>('.hack-card'));
        if (cards.length) {
          animate(cards, { opacity: [0, 1], translateY: ['50px', '0px'], scale: [0.95, 1] }, {
            duration: 0.55, delay: stagger(0.08),
          });
        }
      }, { amount: 0.1 });
    }
  }

  getBadgeClass(position: string): string {
    switch (position) {
      case '1st':  return 'bg-amber-flame text-dark';
      case '2nd':  return 'bg-dark/20 text-dark';
      default:     return 'bg-dark/10 text-dark/70';
    }
  }
}
