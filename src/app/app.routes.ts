import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.HomeComponent),
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
