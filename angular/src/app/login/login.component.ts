import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';
import { HttpHeaders } from '@angular/common/http'
import { UserService } from '../user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public frmSignup: FormGroup;

  public falhaLogin = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.frmSignup = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        username: [null, Validators.compose([Validators.required])],
        password: [null, Validators.compose([Validators.required])]
      }
    );
  }

  submit() {
    var username = this.frmSignup.value.username;
    var password = this.frmSignup.value.password;
    this.userService.loginuser(username, password).subscribe(a => {
      if (a.length > 0) {
        this.router.navigate(["/dashboard"]);
        localStorage.setItem('login', "true");
        localStorage.setItem('user', username);
      }
      else {
        this.falhaLogin = true;
        localStorage.setItem('login', "false");
      }
    });
  }

  ngOnInit(): void {
  }

}