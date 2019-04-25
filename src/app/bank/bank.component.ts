import { Component, OnInit } from '@angular/core';
import {BankService} from '../bank.service';
import {Account} from '../account';


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  bankservice: BankService;
  constructor(bankservice: BankService) {
    this.bankservice = bankservice;  
  }

  myAccount: Account;
  inputValue: string = '';

  ngOnInit() {
    this.myAccount = this.bankservice.evaAccount;
  }

  getBalanceFromService(){
    let balance = this.bankservice.bankFunctions.getBalance(this.bankservice.evaAccount);
    return balance
  }

  depositInService(account: Account, amount: number): void {
    this.bankservice.bankFunctions.deposit(account, amount);
  }
}
