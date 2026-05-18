import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'artigos',
    loadComponent: () =>
      import('./pages/articles/articles').then((m) => m.ArticlesPageComponent),
  },
  {
    path: 'artigos/:slug',
    loadComponent: () =>
      import('./pages/article-detail/article-detail').then((m) => m.ArticleDetailPageComponent),
  },
  {
    path: 'aurora',
    loadComponent: () =>
      import('./pages/aurora/aurora').then((m) => m.AuroraPageComponent),
  },
  {
    path: 'coffee-app',
    loadComponent: () =>
      import('./pages/coffee-app/coffee-app').then((m) => m.CoffeeAppPageComponent),
  },
  { path: '**', redirectTo: '' },
];
