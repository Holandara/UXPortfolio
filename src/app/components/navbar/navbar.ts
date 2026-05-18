import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

interface NavLink {
  id: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  private readonly router = inject(Router);

  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);

  readonly navLinks: NavLink[] = [
    { id: 'projects', label: 'Projetos' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'skills', label: 'Skills' },
    { id: 'gallery', label: 'Arte' },
    { id: 'artigos', label: 'Artigos', route: '/artigos' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 80);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  handleNavClick(link: NavLink): void {
    this.menuOpen.set(false);
    if (link.route) {
      this.router.navigate([link.route]);
    } else {
      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.menuOpen.set(false);
  }
}
