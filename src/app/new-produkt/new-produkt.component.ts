import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-produkt',
  templateUrl: './new-produkt.component.html',
  styleUrls: ['./new-produkt.component.css']
})
export class NewProduktComponent implements OnInit {

  myForm: FormGroup;

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
