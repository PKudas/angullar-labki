import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs/index';
import firebase = require('firebase');

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth) { }

  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  login({ email, password }: Credentials) {
    const session = firebase.auth.Auth.Persistence.SESSION;
    return this.fireAuth.auth.setPersistence(session).then(() => {
      return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    });
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }
}
