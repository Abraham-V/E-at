import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    location: string = localStorage.getItem('Item 1') || '';

    public Total = 0;
    public Selected = "";
    public Time = "";

    public aux: any = localStorage.getItem('Item 2');

    public places: any = JSON.parse(this.aux);
    
    public addFood(index: any) {
        if (this.places[index].Place == this.Selected) {
            this.Total += this.places[index].Price;
            this.places[index].Quantity++;
        } else {
            for (var i = 0; i < 23; i++) {
                this.places[i].Quantity = 0;
            }
            this.Total = 0;
            this.Selected = this.places[index].Place;
            this.Total += this.places[index].Price;
            this.places[index].Quantity++;
            this.Time = this.places[index].Time;
        }

    }
    public removeFood(index: any) {
        if (this.places[index].Quantity != 0) {
            this.Total -= this.places[index].Price;
            this.places[index].Quantity--;
        }
    }

    public savePlaces() {
        let key2 = 'Item 2';
        localStorage.setItem(key2, JSON.stringify(this.places));
        let key3 = 'Item 3';
        localStorage.setItem(key3, this.Selected);
        let key4 = 'Item 4';
        localStorage.setItem(key4, this.Total.toString());
        let key5 = 'Item 5';
        localStorage.setItem(key5, this.Time);
    }

}
