import { Injectable } from '@angular/core';
import { Account } from './account';

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

    getBalance (account: Account): number {
      account = this.isValidAccount(account);
      if(account === undefined){
        return -1
      } else {
        return account.balance;
      }
    }
    deposit(account: Account, amount: number): void {
      account = this.isValidAccount(account);
      if(account !== undefined && amount > 0 && typeof(amount) === typeof(0) && isNaN(amount) === false){
        account.balance += amount;
      } else if (account === undefined){
        throw new Error('undefined account')
      } else {
        throw new Error('not correct amount')
      }
    }
    withdraw(account: Account, amount: number): void {
      account = this.isValidAccount(account);
      if(account !== undefined && amount < account.balance && typeof(amount) === typeof(0) && isNaN(amount) === false){
        account.balance -= amount;
      }
    }
    transfer(from: Account, to: Account, amount: number): void {
      from = this.isValidAccount(from);
      to = this.isValidAccount(to);
      if(from !== undefined && to !== undefined){
        if(from !== to && amount < from.balance && amount > 0){
          from.balance -= amount;
          to.balance += amount;
        }
      }
    }
    isValidAccount(account: Account): any {
      if (account.balance <= 0) {
        return undefined;
      } else if( typeof(account.customerName) !== typeof('string')){
        return undefined;
      } else if(account.customerName !== '' && account.customerName.includes(' ')) {
        return account;
      } else {
        return undefined;
      }
    }
  
  
  countNumberOfAccounts(account1: Account, account2: Account): number {
    let name1 = this.isValidAccount(account1);
    let name2 = this.isValidAccount(account2);
    if(name1 === undefined || name2 === undefined) {
      return 0;
    } 
    else if (name1 === name2) {
      return 2;
    } else {
      return 1;
    }
  };



  constructor() { }
}
