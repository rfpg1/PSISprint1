import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WallComponent } from './wall/wall.component';
import { LoginComponent } from './login/login.component';
import { RegistarComponent } from './registar/registar.component';

const routes: Routes = [
  { path: '', redirectTo: '/registar', pathMatch: 'full'},
  { path: 'dashboard', component: WallComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registar', component: RegistarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
