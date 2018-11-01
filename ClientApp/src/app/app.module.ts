import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';

import { SafePipe } from './recipe/recipe.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomHttpInterceptor } from './_helpers/custom.http.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RecipeComponent,
    SafePipe,
    AddRecipeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'recipe/:id', component: RecipeComponent },
      { path: 'add/recipe', component: AddRecipeComponent},
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: '**', redirectTo: '/'}
    ]),
    NgxSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
