import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleAtuthenticationComponent } from '../role-atuthentication/role-atuthentication.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  myForm: FormGroup;

  constructor(private authService: AuthService,
     private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal) {
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
    .then(() => { this.router.navigate(['/admin']); }
      // const modal = this.modalService.open(RoleAtuthenticationComponent);
      // this.authService.fetchUserRole();
      // this.authService.roleSubject.subscribe(status => {
      //   if (status) {
      //     modal.close();
      //     this.router.navigate(['/admin']);
      //   }
      // }); }
      );
  }

  ngOnInit() {
    //this.authService.authState$.subscribe(state => {if (state != null) { this.router.navigate(['/admin']); }});
  }
}
