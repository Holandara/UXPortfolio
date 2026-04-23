import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { animate, inView } from 'motion';
import { stagger } from 'motion-dom';
import { SKILLS, type Skill } from '../../data/portfolio-data';

type Category = 'all' | 'design' | 'frontend' | 'backend' | 'soft';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.html',
})
export class SkillsComponent implements AfterViewInit {
  private readonly el = inject(ElementRef);

  readonly activeCategory = signal<Category>('all');

  readonly categories: { id: Category; label: string }[] = [
    { id: 'all',      label: 'Todos' },
    { id: 'design',   label: 'Design' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend',  label: 'Backend' },
    { id: 'soft',     label: 'Soft Skills' },
  ];

  readonly filteredSkills = computed<Skill[]>(() => {
    const cat = this.activeCategory();
    return cat === 'all' ? SKILLS : SKILLS.filter((s) => s.category === cat);
  });

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

    const grid = host.querySelector<HTMLElement>('.skills-grid');
    if (grid) {
      inView(grid, (el) => {
        const cards = Array.from(el.querySelectorAll<HTMLElement>('.skill-card'));
        if (cards.length) {
          animate(cards, { opacity: [0, 1], translateY: ['30px', '0px'], scale: [0.9, 1] }, {
            duration: 0.45, delay: stagger(0.06),
          });
        }
      }, { amount: 0.1 });
    }
  }

  setCategory(cat: Category): void {
    this.activeCategory.set(cat);
    setTimeout(() => {
      const cards = Array.from(
        (this.el.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.skill-card'),
      );
      if (cards.length) {
        animate(cards, { opacity: [0, 1], scale: [0.85, 1] }, {
          duration: 0.35, delay: stagger(0.05),
        });
      }
    }, 0);
  }
}
