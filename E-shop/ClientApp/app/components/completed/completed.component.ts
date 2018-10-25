import { Component } from '@angular/core';

@Component({
    selector: 'completed',
    templateUrl: './completed.component.html'
})
export class CompletedComponent {
    public Time: any = localStorage.getItem('Item 5');
}


