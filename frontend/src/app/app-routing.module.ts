import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/structure/pages/welcome/welcome.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { LoginComponent } from './components/structure/pages/login/login.component';
import { RegisterComponent } from './components/structure/pages/register/register.component';
import { ContactComponent } from './components/structure/pages/contact/contact.component';
import { MainComponent } from './components/structure/pages/main/main.component';
import { ProfileComponent } from './components/structure/pages/profile/profile.component';
import { MainDetailComponent } from './components/structure/pages/main-detail/main-detail.component';
import { MainManagementComponent } from './components/structure/pages/main-management/main-management.component';
import { CategoryManagementComponent } from './components/structure/pages/category-management/category-management.component';
import {ManagementComponent} from "./components/structure/pages/management/management.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [AuthGuard], },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'recipes', component: MainComponent, canActivate: [AuthGuard], },
  { path: 'recipe/:id', component: MainDetailComponent, canActivate: [AuthGuard], },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard], },
  { path: 'management/:id', component: MainManagementComponent, canActivate: [AuthGuard], },
  { path: 'categories/:id', component: CategoryManagementComponent, canActivate: [AuthGuard], },
  { path: 'my-panel', component: ManagementComponent, canActivate: [AuthGuard], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
