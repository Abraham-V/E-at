import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { AccordionModule } from 'primeng/accordion';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html',
    styleUrls: ['./animations.css']
})
export class FetchDataComponent {

    public location: any = localStorage.getItem('Item 1');
    public aux: any = localStorage.getItem('Item 2');
    public Selection: any = localStorage.getItem('Item 3');
    public Total: any = localStorage.getItem('Item 4');

    public places: any = JSON.parse(this.aux);

}
