import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  signal,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

interface NavLink {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);

  readonly navLinks: NavLink[] = [
    { id: 'projects', label: 'Projetos' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'skills', label: 'Skills' },
    { id: 'gallery', label: 'Arte' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 80);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.menuOpen.set(false);
  }
}
