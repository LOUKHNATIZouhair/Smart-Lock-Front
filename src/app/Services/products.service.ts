import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../Model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products! : Array<Product>;

  constructor() {
    this.products=[
      /*{id:1,name:"Computer",price:1223,promotion : true},
      {id:2,name:"Test2",price:2345,promotion: false},
      {id:3,name:"Computer",price:5543,promotion:true},
      {id:4,name:"Test4",price:34567,promotion:false},
      {id:5,name:"Computer",price:678,promotion:false},
      {id:6,name:"Test44",price:765,promotion:false},
      {id:7,name:"Computer",price:5555,promotion : true},
      {id:8,name:"Test2",price:5432,promotion: false},
      {id:9,name:"Computer",price:6666,promotion:true},
      {id:10,name:"RT",price:25555,promotion:false},
      {id:11,name:"Computer",price:2543,promotion:false},
      {id:12,name:"Computer",price:2000,promotion:false},
      {id:13,name:"Computer",price:2000,promotion:false},*/
      {id:"XXXXXXXX",name:"Anas Bahia",price:1,promotion:true},
      {id:"YYYYYYYY",name:"Hamza Bahia",price:1,promotion:true},
      {id:"VVVVVVVV",name:"Ayoub Elayar",price:1,promotion:false},
      {id:"ZZZZZZZZ",name:"Zouhair Lak",price:1,promotion:true},
      {id:"BBBBBBBB",name:"Badr Bandero",price:1,promotion:false},
      {id:"PPPPPPPP",name:"Ismail Asri",price:1,promotion:true},

    ];
  }

  public getAllProducts() : Observable<Product[]>{
    return of([...this.products]);
  }

  public getPageProducts(page : number ,size : number) : Observable<PageProduct>{
    let index = page*size;
    let totalPages = ~~(this.products.length/size);
    if(this.products.length % size != 0)
     totalPages++;
     let productPage = this.products.slice(index,index+size);
     return of({ page:page, size:size ,totalPages:totalPages, products:productPage});


  }

  public deleteProduct(id : string) : Observable<boolean>{
    this.products = this.products.filter(p=>p.id!=id);
    return of(true);
  }

  public setPromotion(id : string) : Observable<boolean>{

    let product =   this.products.find(p=>p.id===id);
    if(product!= undefined){
      product.promotion=!product.promotion;
      return of(true);
    }
    else return throwError(()=>new Error("Product not exist"));
  }

  public searchProduct(keyword : string, page : number , size : number) : Observable<PageProduct>{
    let result = this.products.filter(p=>p.name.includes(keyword));
    let index = page*size;
    let totalPages = ~~(result.length/size);
    if(result.length % size != 0)
      totalPages++;
    let productPage = result.slice(index,index+size);
    return of({page:page, size:size, totalPages:totalPages, products:productPage});
  }
}
