import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AllRecipesComponent } from './component/all-recipes/all-recipes.component';
import { OneRecipesComponent } from './component/one-recipes/one-recipes.component';

export const routes: Routes = [{
    // path:' ',component:HomeComponent
    path:'', component:HomeComponent, pathMatch:'full'
},
{
    path:'login',
    component:LoginComponent
},
{ path: 'register', component: RegisterComponent },

{ path: 'allRecipes', component: AllRecipesComponent },

{ path: 'recipe/:id', component: OneRecipesComponent }

];
