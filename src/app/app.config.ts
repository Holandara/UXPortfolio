import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import {
  LUCIDE_ICONS,
  LucideIconProvider,
  Github,
  Linkedin,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  Award,
  Code,
  Globe,
  Users,
  Cpu,
  Layers,
  ArrowRight,
  Figma,
  Terminal,
  Palette,
  Star,
  Monitor,
  Zap,
  Trophy,
  Camera,
  Sparkles,
  Brush,
} from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng, components, utilities',
          },
        },
      },
    }),
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        Github,
        Linkedin,
        ExternalLink,
        Menu,
        X,
        ChevronDown,
        Award,
        Code,
        Globe,
        Users,
        Cpu,
        Layers,
        ArrowRight,
        Figma,
        Terminal,
        Palette,
        Star,
        Monitor,
        Zap,
        Trophy,
        Camera,
        Sparkles,
        Brush,
      }),
    },
  ],
};
