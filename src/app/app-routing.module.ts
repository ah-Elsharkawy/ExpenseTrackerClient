import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LayoutAuthComponent } from './Layout/layout-auth/layout-auth.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { LayoutMainComponent } from './Layout/layout-main/layout-main.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { authGuard } from '../Core/Guard/auth.guard';

const routes: Routes = [

  {path : "" , loadComponent:()=> import("./Layout/layout-auth/layout-auth.component").then(m=>m.LayoutAuthComponent) ,children:[
    {path : "" ,  redirectTo : "login" , pathMatch : "full"} ,
    {path : "login" , loadComponent:()=> import("./Components/login/login.component").then(m=>m.LoginComponent)} ,
    {path : "register" , loadComponent:()=> import("./Components/register/register.component").then(m=>m.RegisterComponent)} ,
    {path: 'verifyEmail' , loadComponent:()=> import("./Components/verify-email/verify-email.component").then(m=>m.VerifyEmailComponent)} ,
  ]} ,
  {path : "" , loadComponent:()=> import("./Layout/layout-main/layout-main.component").then(m=>m.LayoutMainComponent) ,children:[
    {path : "" ,  redirectTo : "home" , pathMatch : "full"} ,
    {path : "home" , canActivate : [authGuard] , loadComponent:()=> import("./Components/home/home.component").then(m=>m.HomeComponent)} ,
    {path : "income" , canActivate : [authGuard] , loadComponent:()=> import("./Components/income/income.component").then(m=>m.IncomeComponent)} ,
    {path : "profile" , canActivate : [authGuard] , loadComponent:()=> import("./Components/profile/profile.component").then(m=>m.ProfileComponent)} ,
  ]} ,
  {path : "**" , loadComponent:()=> import("./Components/notfound/notfound.component").then(m=>m.NotfoundComponent)} ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }