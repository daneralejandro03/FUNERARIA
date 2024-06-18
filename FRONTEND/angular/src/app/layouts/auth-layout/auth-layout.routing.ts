import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { Login2faComponent } from 'src/app/pages/login2fa/login2fa.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'login2fa',       component: Login2faComponent },
    { path: 'forgot-password',component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent }
];
