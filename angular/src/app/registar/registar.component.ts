import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';
import { HttpHeaders } from '@angular/common/http'
import { UserService } from '../user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.css']
})
export class RegistarComponent implements OnInit {
  public frmSignup: FormGroup;

  public jaExiste = false;

  public registou = false;

  httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.frmSignup = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        username: [
          null,
          Validators.compose([
            Validators.minLength(3),
            CustomValidators.patternValidator2(/^([a-zA-Z0-9áéíóúàèìòùãõâêîôûç]+)$/, {
              hasSymbol: true
            }),
            Validators.required
          ])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  submit() {
    var registo = { "name": this.frmSignup.value.username, "pw": this.frmSignup.value.password };
    this.userService.adduser(registo).subscribe(a => {
      if (a.message !== undefined) {
        this.jaExiste = true;
      }
      else {
        this.jaExiste = false;
        this.registou = true;
        alert("Regist was successful")
        this.router.navigate(["/login"]);
      }
    });
  }

  ngOnInit(): void {
  }
}