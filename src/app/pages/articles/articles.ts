import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { SanityService, ArticleSummary } from '../../services/sanity.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe, LucideAngularModule],
  templateUrl: './articles.html',
})
export class ArticlesPageComponent implements OnInit {
  private readonly sanity = inject(SanityService);

  readonly articles = signal<ArticleSummary[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);

  ngOnInit(): void {
    this.sanity.getArticles().subscribe({
      next: (data) => {
        this.articles.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  get featured(): ArticleSummary | null {
    return this.articles()[0] ?? null;
  }

  get rest(): ArticleSummary[] {
    return this.articles().slice(1);
  }
}
