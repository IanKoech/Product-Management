import {Component, OnInit} from '@angular/core';
import {IProduct} from './product';

import {ProductService} from './product.service';

@Component({
    selector:'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    pageTitle:string='Product List';
    imageWidth:number=50;
    imageMargin:number=2;
    showImage:boolean=false;
    errorMessage:string;
    
    _listFilter:string;
    get listFilter():string{
      //getters define a read only property and has a return type
      return this._listFilter;
    }

    set listFilter(value:string){
      //defines a write only property. no return type
       this._listFilter=value;
       this.filteredProducts=this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    filteredProducts:IProduct[];
    products:IProduct[]=[];
    
    constructor(private productService:ProductService){
      
    }

    onRatingClicked(message:string):void{
      this.pageTitle='Product List' + message;
    }

    performFilter(filterBy:string):IProduct[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product:IProduct)=>
      product.productName.toLocaleLowerCase().indexOf(filterBy)!== -1);
    }
    toggleImage():void{
      this.showImage=!this.showImage;
    }

    ngOnInit():void{
      //on init lifecycle hook provided place to perform component initialization & data retrieval
      this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts=this.products;
        },
        error: err => this.errorMessage = err
      });
      this.filteredProducts=this.products;
    }
}