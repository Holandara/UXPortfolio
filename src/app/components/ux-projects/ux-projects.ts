import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { animate, inView } from 'motion';
import { stagger } from 'motion-dom';
import { UX_PROJECTS, type UxProject } from '../../data/portfolio-data';

@Component({
  selector: 'app-ux-projects',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ux-projects.html',
})
export class UxProjectsComponent implements AfterViewInit {
  private readonly el = inject(ElementRef);
  readonly projects = signal<UxProject[]>(UX_PROJECTS);
  readonly activeScreen = signal<Record<string, number>>({});

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

    host.querySelectorAll<HTMLElement>('.project-article').forEach((article) => {
      inView(article, (el) => {
        const media = el.querySelector<HTMLElement>('.project-media');
        const content = el.querySelector<HTMLElement>('.project-content');
        if (media)   animate(media,   { opacity: [0, 1], translateX: ['-60px', '0px'] }, { duration: 0.8 });
        if (content) animate(content, { opacity: [0, 1], translateX: ['60px',  '0px'] }, { duration: 0.8, delay: 0.15 });
      }, { amount: 0.2 });
    });
  }

  getActiveScreen(projectId: string): number {
    return this.activeScreen()[projectId] ?? 0;
  }

  setActiveScreen(projectId: string, index: number): void {
    this.activeScreen.update((map) => ({ ...map, [projectId]: index }));
  }

  nextScreen(project: UxProject): void {
    const cur = this.getActiveScreen(project.id);
    this.setActiveScreen(project.id, (cur + 1) % project.screens.length);
  }

  prevScreen(project: UxProject): void {
    const cur = this.getActiveScreen(project.id);
    this.setActiveScreen(project.id, cur === 0 ? project.screens.length - 1 : cur - 1);
  }
}
