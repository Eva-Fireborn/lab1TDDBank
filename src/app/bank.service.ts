import { Injectable } from '@angular/core';
import { Account } from './account';
import { BankInterface } from './bank-interface';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  evaSavingsAccount: Account = {
    customerName: 'Eva Fireborn',
    balance: 800,
  }
  evaAccount: Account = {
    customerName: 'Eva Fireborn',
      balance: 500,
  }

  bankFunctions: BankInterface = {
    getBalance (account: Account): number {
      return account.balance;
    },
    deposit(account: Account, amount: number): void {
      account.balance += amount;
    },
    withdraw(account: Account, amount: number): void {
      account.balance -= amount;
    },
    transfer(from: Account, to: Account, amount: number): void {
      from.balance -= amount;
      to.balance += amount;
    },
  }
  
  countNumberOfAccounts(account1: Account, account2: Account): number {
    let name1 = account1.customerName;
    let name2 = account2.customerName;
    if (name1 === name2) {
      return 2;
    } else {
      return 1;
    }
  };

  constructor() { }
}
