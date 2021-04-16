import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WallComponent } from './wall/wall.component';

const routes: Routes = [
  /*{ path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '/dashboard', component: WallComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
