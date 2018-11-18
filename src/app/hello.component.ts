import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class HelloComponent {
  imie = 'Jan';
  nazwisko = 'Kowalski';

  ngOnInit() {
    let list1 = [0,1,2,3];
    let list2 = ['Ala', 'ma', 'kota'];
    this.tabliczka(list1, list2);
  }

  tabliczka(numbers: number[], strings: string[]) : void {
    for (let i of strings) {
      for (let j of numbers) {
        console.log(i + j);
      }
    }

    for (let i in strings) {
      for (let j in numbers) {
        console.log(strings[i] + numbers[j]);
      }
    }
  }
}
