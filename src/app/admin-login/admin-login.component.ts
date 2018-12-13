import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  myForm: FormGroup;

  constructor(private authService: AuthService,
     private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      email: new FormControl(name, [
        Validators.required
      ]),
      password: new FormControl(name, [
        Validators.required
      ])
    });
  }

  private submitForm() {
    this.authService.login({ email: this.myForm.value.email, password: this.myForm.value.password})
    .then(() => this.router.navigate(['/admin']));
  }

  ngOnInit() {
    console.log(this.authService.user);
    this.authService.authState$.subscribe(state => {if (state != null) { this.router.navigate(['/admin']); }});
  }
}
