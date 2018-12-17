import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { switchMap, map } from 'rxjs/operators';
import { ProductService } from './product.service';
import { NodeProductService } from './node-product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs: AngularFirestore, private productService: NodeProductService) {
  }

  get orders() {
    return this.afs.collection('orders', ref => ref.orderBy('status', 'desc')).snapshotChanges().pipe(
      map(orders => orders.map(o => {
        const data = o.payload.doc.data();
        const _id = o.payload.doc.id;
        return {_id, ...data};
      })));
  }

  addOrder(order) {
    this.afs.collection('orders').add(order);
  }

  confirmOrder(_id, items) {
    this.afs.collection('orders').doc(_id).update(({ status: false }));
    items.forEach(i => this.productService.updateProductCount(i._id, i.quantity));
  }
}
