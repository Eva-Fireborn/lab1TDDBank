import { Component, OnInit } from '@angular/core';
import {BankService } from '../bank.service';
import {Account} from '../account';


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  service: BankService;
  constructor(service: BankService) { this.service = service }

  myAccount: Account = {
    customerName: 'Eva Fireborn',
    balance: 500
  }
  inputValue: string = '';

  ngOnInit() {
  }

  getBalanceFromService(account: Account = this.myAccount){
    this.myAccount.balance = this.service.getBalance(account);
  }

  depositInService(): void {
    let amount = Number(this.inputValue)
    this.service.deposit(this.myAccount, amount);
  }
  withdrawInService(): void {
    let amount = Number(this.inputValue)
    this.service.withdraw(this.myAccount, amount);
  }
}
