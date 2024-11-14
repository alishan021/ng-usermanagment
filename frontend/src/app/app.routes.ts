import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { adminGuard } from './services/guards/admin.guard';
import { authGuard } from './services/guards/auth.guard';
import { preventAuthGuard } from './services/guards/prevent-auth.guard';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent, canActivate: [ preventAuthGuard ] },
    { path: "register", component: RegisterComponent, canActivate: [ preventAuthGuard ]},
    { path: "", component: LayoutComponent, children: [
        { path: "user-list", component: UserListComponent, canActivate: [ authGuard, adminGuard ] },
        { path: "createUser", component: CreateUserComponent, canActivate: [ authGuard, adminGuard ] },
        { path: "editUser", component: CreateUserComponent, canActivate: [ authGuard, adminGuard ] },
        { path: "home", component: HomeComponent, canActivate: [ authGuard ] },
        { path: "profile", component: ProfileComponent, canActivate: [ authGuard ] },
    ] },
    { path: "**", redirectTo: "login" }
];
