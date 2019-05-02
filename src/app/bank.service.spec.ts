import { TestBed } from '@angular/core/testing';
import { BankService } from './bank.service';
import { Account } from './account';

describe('BankService', () => {
  let service: BankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(BankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Account', () => {
    it ('should return account if balance is equal to 0 or higher', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let account = service.isValidAccount(testAccount);
      expect(account).toBe(testAccount);
    });

    it ('should return undefined if balance is below 0', () => {
      let testAccount2: Account = {
        customerName: 'Eva',
        balance: -10
      }
      let account = service.isValidAccount(testAccount2);
      expect(account).toBe(undefined);
    });
  
    it('should return account if name is valid', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let account = service.isValidAccount(testAccount);
      expect(account).toBe(testAccount);
    });

    it('should return undefined if name is invalid', () => {
      let testAccount2: Account = {
        customerName: 'Eva',
        balance: -10
      }
      let account = service.isValidAccount(testAccount2);
      expect(account).toBe(undefined);
    });
  });
  describe('number of accounts', () => {
    it('should be 1 or more accounts', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let testAccount2: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let expectedNumber = 1;
      let actualNumber = service.countNumberOfAccounts(testAccount, testAccount2)
      expect(actualNumber).toBeGreaterThanOrEqual(expectedNumber);
    });

    it('should return 0 if either account is invalid', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let testAccount2: Account = {
        customerName: 'Eva',
        balance: -10
      }
      let actualNumber = service.countNumberOfAccounts(testAccount, testAccount2)
      expect(actualNumber).toBe(0);
    });
  });
  describe('get balance function',() => {
    it('should return correct amount from valid account', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let amount = service.getBalance(testAccount);
      expect(amount).toBe(testAccount.balance);
    });

    it('should throw error if account is invalid', () => {
      let testAccount2: Account = {
        customerName: 'Eva',
        balance: -10
      }
      const dangerousCall = () => { service.getBalance(testAccount2); }
      expect(dangerousCall).toThrow();
    });
  });
  const money = 100;
  const invalidMoney = -1;
  const toHighAmountMoney = 10000;
  describe('deposit function', () => {
    it('should throw error if amount is below or equal to 0', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      const dangerousCall = () => { service.deposit(testAccount, invalidMoney); }
      expect(dangerousCall).toThrow();
    });
  
    it('should throw error if amount is not of type number', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      const dangerousCall = () => { service.deposit(testAccount, NaN); }
      expect(dangerousCall).toThrow();
    });

    it('should deposit if account and amount is correct', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let expectedBalance = testAccount.balance + money;
      service.deposit(testAccount, money);
      expect(testAccount.balance).toBe(expectedBalance);
    });
  });
 
  describe('withdraw function', () => {
    it('should not withdraw if amount is greater then balance on account', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let expectedBalance = testAccount.balance;
      service.withdraw(testAccount, toHighAmountMoney);
      expect(testAccount.balance).toBe(expectedBalance);
    });

    it('should not withdraw if amount is NaN', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let expectedBalance = testAccount.balance;
      service.withdraw(testAccount, NaN);
      expect(testAccount.balance).toBe(expectedBalance);
    });

    it('should not withdraw if account is undefined', () => {
      let falsyTestAccount: Account = {
        customerName: 'Eva',
        balance: 1000
      }
      let expectedBalance = falsyTestAccount.balance;
      service.withdraw(falsyTestAccount, 200);
      expect(falsyTestAccount.balance).toBe(expectedBalance);
    })

    it('should withdraw if account and amount is valid', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let expectedBalance = testAccount.balance - money;
      service.withdraw(testAccount, money);
      expect(testAccount.balance).toBe(expectedBalance);
    });
  });
 
  describe('transfer function', () => {
    it('should not transfer if amount is below or equal to 0', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let testAccount3: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let balance1 = testAccount3.balance;
      let balance2 = testAccount.balance;
      service.transfer(testAccount3, testAccount, invalidMoney);
      expect(testAccount3.balance).toBe(balance1);
      expect(testAccount.balance).toBe(balance2);
    });

    it('should not transfer higher amount then what the balance is', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let testAccount3: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let balance1 = testAccount3.balance;
      let balance2 = testAccount.balance;
      service.transfer(testAccount3, testAccount, toHighAmountMoney);
      expect(testAccount3.balance).toBe(balance1);
      expect(testAccount.balance).toBe(balance2);
    });
    
    it('should transfer if accounts and amount is correct', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let testAccount3: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let account1 = testAccount;
      let balance1 = testAccount.balance - money;
      let account2 = testAccount3;
      let balance2 = testAccount3.balance + money;
      service.transfer(account1, account2 , money);
      expect(account1.balance).toBe(balance1);
      expect(account2.balance).toBe(balance2)
    });

    it('should not transfer money if the accounts are the same account', () => {
      let testAccount: Account = {
        customerName: 'Eva Fireborn',
        balance: 1000
      }
      let account1 = testAccount;
      let balance1 = testAccount.balance;
      service.transfer(account1, account1 , money);
      expect(account1.balance).toBe(balance1);
    });
  });

});
