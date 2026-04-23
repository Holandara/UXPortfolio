import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { UxProjectsComponent } from '../../components/ux-projects/ux-projects';
import { HackathonsComponent } from '../../components/hackathons/hackathons';
import { SkillsComponent } from '../../components/skills/skills';
import { ArtGalleryComponent } from '../../components/art-gallery/art-gallery';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    UxProjectsComponent,
    HackathonsComponent,
    SkillsComponent,
    ArtGalleryComponent,
  ],
  template: `
    <app-hero />
    <app-ux-projects />
    <app-hackathons />
    <app-skills />
    <app-art-gallery />
  `,
})
export class HomeComponent {}
