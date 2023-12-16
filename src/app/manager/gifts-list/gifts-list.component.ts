import { Component, OnInit } from '@angular/core';
import { Gift } from '../../models/gift.model';
import { GiftsService } from '../../services/gifts.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-gifts-list',
  templateUrl: './gifts-list.component.html',
  styleUrls: ['./gifts-list.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class GiftsListComponent implements OnInit {

  giftDialog: boolean = false;

  gifts: Gift[] = [];

  gift: Gift = new Gift();

  selectedGifts!: Gift[];

  submitted!: boolean;


  constructor(public giftService: GiftsService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.giftService.reloadGifts$.subscribe(x => {
        this.giftService.getGifts().subscribe(data => this.gifts = data);
    });
  }

  openNew() {
    this.gift = new Gift();
    this.submitted = false;
    this.giftDialog = true;
  }
 

  editGift(gift: Gift) {
    this.gift = { ...gift };
    this.giftDialog = true;
  }

  //למה לפונקציה הזאת אין קריאה מהסרויס?
  deleteGift(gift: Gift) {
    let id=gift.id;
    console.log(id);
    
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + gift.name + '?',
       header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       // this.gifts = this.gifts.filter(val => val.id !== gift.id);
       this.giftService.deleteGift(id).subscribe();
        this.gift = new Gift();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gift Deleted', life: 3000 });
       }
    });
    // this.giftService.delete(gift.id);????????????
   }
}
