import { Component, OnInit } from '@angular/core';
import { Gift } from '../../models/gift.model';
import { GiftsService } from '../../services/gifts.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
  styleUrls: ['./raffle.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class RaffleComponent implements OnInit {

  giftDialog: boolean = false;

  gifts: Gift[] = [];

  gift: Gift = new Gift();

  selectedGifts!: Gift[];

  submitted!: boolean;

  users: User[] = []
  constructor(public giftService: GiftsService, private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

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
  Selected_Users: User[] = []
  winner: User = new User;
  randome(gift: Gift) {
    this.Selected_Users = []
    this.userService.reloadUsers$.subscribe(x => {
      this.userService.getUsers().subscribe(data => this.users = data)
    })
    let giftId = gift.id;
    for (let i = 0; i < this.users.length; i++) {
      var user = this.users[i];
      user.tickets.map(x => {
        if (x.id == giftId)
          this.Selected_Users.push(user)
      })
    }

    var c = Math.floor(Math.random() * this.Selected_Users.length)
    this.winner = this.Selected_Users[c];

    alert(`the winner is ${this.winner.userName}`)

  }

}
