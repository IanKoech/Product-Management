import { Component, OnChanges,Input, EventEmitter,Output } from '@angular/core';

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges {
    @Input() rating:number;
    //rating property will be passed into the nested component
    starWidth: number;
    @Output() ratingClicked:EventEmitter<string>=new EventEmitter<string>();
    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;
    }
    onClick(){
        this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
    }
}
