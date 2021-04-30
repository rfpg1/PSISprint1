import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WallComponent } from './wall/wall.component';
import { LoginComponent } from './login/login.component';
import { RegistarComponent } from './registar/registar.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: WallComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registar', component: RegistarComponent },
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
