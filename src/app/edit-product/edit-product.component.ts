import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  myForm: FormGroup;
  @Input() product;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      name: new FormControl(name, [
        Validators.required
      ]),
      quantity: new FormControl(name, [
        Validators.required
      ]),
      category: new FormControl(name, [
        Validators.required
      ]),
      price: new FormControl(name, [
        Validators.required
      ]),
      description: new FormControl(name, [
        Validators.required
      ]),
      link: new FormControl(name, [
        Validators.required
      ])
    });
  }

  private submitForm() {
    this.activeModal.close(this.myForm.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  ngOnInit() {
  }


}
