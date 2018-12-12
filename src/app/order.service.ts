import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders$: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.orders$ = afs.collection('orders');
  }

  addOrder(order) {
    this.orders$.add(order);
  }
}
