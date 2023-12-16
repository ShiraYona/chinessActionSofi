

import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Gift } from 'src/app/models/gift.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private activatedroute: ActivatedRoute,private router:Router){

  }
cart:Gift[]=[];
gift: Gift = new Gift();
selectedGifts!: Gift[];
total:number=0;
giftDialog: boolean = false;

count: number=0 ;

gifts: Gift[] = [];

submitted!: boolean;


 ngOnInit(): void {
  this.count=JSON.parse(sessionStorage.getItem("count")??"0");
  this.cart=JSON.parse(sessionStorage.getItem("cart")??"v");
  console.log(this.cart)
  for(let i=0;i<this.cart.length;i++){
    this.gift=this.cart[i];
      this.total+=this.cart[i].cost;
      console.log(this.total);
 }}

 openNew() {
  this.gift = new Gift();
  this.submitted = false;
  this.giftDialog = true;
}

 placeOrder(){
  if(this.cart.length<1){
    alert("your cart is empty");
    return;
  }
  else{
    this.giftDialog = true;
    this.router.navigate(["../placeOrder"],{relativeTo:this.activatedroute});
  }
  
}
ContinueShopping(){
  this.router.navigate(['../gifts'], { relativeTo: this.activatedroute});
}
deleteItem(gift:Gift){
  let index = this.cart.findIndex(prod => prod.id == gift.id);
  if (index !== -1) {
    this.cart.splice(index, 1); 
  }
this.count--;
sessionStorage.setItem("count",JSON.stringify(this.count))
 sessionStorage.setItem("cart",JSON.stringify(this.cart));
}}
