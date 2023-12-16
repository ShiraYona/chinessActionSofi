import { Component, OnInit } from '@angular/core';
import { Gift } from 'src/app/models/gift.model';
import { GiftsService } from 'src/app/services/gifts.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import {  Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-user-gifts-list',
  templateUrl: './user-gifts-list.component.html',
  styleUrls: ['./user-gifts-list.component.css'],
  providers: [ConfirmationService, MessageService, CarouselModule ]

})
export class UserGiftsListComponent implements OnInit{
  autoplayInterval: number = 3000;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  giftDialog: boolean = false;
  gifts: Gift[] = [];

  gift: Gift = new Gift();

  selectedGifts!: Gift[];

  submitted!: boolean;

  cart:Gift[]=[];

  count:number=0;
  constructor(
    public giftService: GiftsService, private messageService: MessageService, private confirmationService: ConfirmationService,private activatedroute: ActivatedRoute,private router:Router
  ) { }

  ngOnInit() {
    if(sessionStorage.getItem("count")){
      this.count=JSON.parse(sessionStorage.getItem("count")??"0");
    }
    if(sessionStorage.getItem("cart")){
      this.cart=JSON.parse(sessionStorage.getItem("cart")??"v");
    }
    this.giftService.reloadGifts$.subscribe(x => {
        this.giftService.getGifts().subscribe(data => this.gifts = data);
    });
  }

  
addToCart(gift:Gift) {
  this.cart.push(gift);
  sessionStorage.setItem("cart",JSON.stringify(this.cart) );
  this.count++;
  sessionStorage.setItem("count",JSON.stringify(this.count))
 }
 
 goToCart(){
 
  this.router.navigate(["../cart"],{relativeTo:this.activatedroute});
}

}
