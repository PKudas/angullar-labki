import { Component, OnInit } from '@angular/core';
import { KoszykService } from '../koszyk.service';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit {

  i = "";
  constructor(private koszykService: KoszykService) { }

  ngOnInit() {
    console.log("asdasd");
    this.koszykService.productAdded.subscribe(productInfo => {
      this.i = productInfo;
    })
  }

}
