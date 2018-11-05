import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { InputPopupComponent } from './_common/input-popup/input-popup.component';
import { ConfirmComponent } from './_common/confirm-popup/confirm.component';

import { SafePipe } from './recipe/recipe.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomHttpInterceptor } from './_helpers/custom.http.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FilterPipe } from './_pipes/filter.pipe';
import { SortPipe } from './_pipes/sort.pipe';


library.add(fas, far);
library.add(faStar);
library.add(faTrash);
library.add(faEdit);

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
    InputPopupComponent,
    ConfirmComponent,
    FilterPipe,
    SortPipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'recipe/:id', component: RecipeComponent },
      { path: 'add/recipe', component: AddRecipeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: '/' }
    ]),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InputPopupComponent,
    ConfirmComponent
  ]
})
export class AppModule { }
