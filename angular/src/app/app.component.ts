import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PhotoHub Wall';

  goToDashboard(){
    window.location.href = "/dashboard"
    localStorage.setItem("profile", "false")
  }
}
