import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export const routes: Routes = [
    // Cargar con Eager
    { path:'landing', component:LandingComponent },
    // Cargar con Lazy
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) }, 
    { path: 'home/:type', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { path: 'home', redirectTo: '/home/category', pathMatch: 'full' },
    { path: 'recipes/:type/:ingredient', loadComponent: () => import('./pages/list-recipes/list-recipes.component').then(m => m.ListRecipesComponent)},
    { path: 'recipe/:id', loadComponent: () => import('./pages/view-recipe/view-recipe.component').then(m => m.ViewRecipeComponent)},
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: '**', component:ErrorPageComponent }
];
