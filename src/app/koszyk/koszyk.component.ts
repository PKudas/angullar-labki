import { Component, OnInit } from '@angular/core';
import { KoszykService } from '../koszyk.service';
import { Product } from '../Product';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit {

  basketContent: Product[] = [];
  constructor(private koszykService: KoszykService) { }

  ngOnInit() {
    this.basketContent = this.koszykService.getContent();
  }
}
