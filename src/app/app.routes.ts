import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { authenticaedGuard } from './guards/authenticaed.guard';

export const routes: Routes = [
  // Cargar con Eager
  { path: 'landing', component: LandingComponent },
  // Cargar con Lazy
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'home/:type',
    canMatch: [authenticaedGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  { path: 'home', redirectTo: '/home/category', pathMatch: 'full' },
  {
    path: 'recipes/:type/:subtype',
    loadComponent: () =>
      import('./pages/list-recipes/list-recipes.component').then(
        (m) => m.ListRecipesComponent
      ),
  },
  {
    path: 'recipes/favorites',
    loadComponent: () =>
      import('./pages/list-recipes/list-recipes.component').then(
        (m) => m.ListRecipesComponent
      ),
  },
  {
    path: 'recipe/:id',
    loadComponent: () =>
      import('./pages/view-recipe/view-recipe.component').then(
        (m) => m.ViewRecipeComponent
      ),
  },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
];
