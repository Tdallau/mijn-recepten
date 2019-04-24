import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { AdminAuthGuard } from './_guards/admin-auth.guard';

import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewRecipesComponent } from './new-recipes/new-recipes.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'recipe/:id',
    component: RecipeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add/recipe',
    component: AddRecipeComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'new-recipes',
    component: NewRecipesComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
