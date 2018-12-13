import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  check(v) {
    return v.role === 'admin';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

}
