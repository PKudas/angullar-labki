import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, Subject, BehaviorSubject} from 'rxjs/index';
import * as firebase from 'firebase';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { User, Role } from './user';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly userRole$: Observable<any>;

  readonly authState$: Observable<any | null> = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.userRole$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.collection('roles').doc(user.email).valueChanges();
        } else {
          of(null);
        }
      })
    );
  }

  get user(): any | null {
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
