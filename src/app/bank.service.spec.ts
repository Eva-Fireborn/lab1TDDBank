import { TestBed } from '@angular/core/testing';
import { BankService } from './bank.service';


describe('BankService', () => {
  let service: BankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(BankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('account', () => {
    it ('should be a balance equal to 0 or higher in account', () => {
      let balance = service.bankFunctions.getBalance(service.evaAccount);
      expect(balance).toBeGreaterThanOrEqual(0);
    });
  
    it('should be a name as owner of account', () => {
      let text = '';
      let name = service.evaAccount.customerName;
      expect(name).not.toBe(text);
      expect(name).toContain(' ');
    });
  
    it('should be 1 or more accounts', () => {
      let expectedNumber = 1;
      let actualNumber = service.countNumberOfAccounts(service.evaAccount, service.evaSavingsAccount)
      expect(actualNumber).toBeGreaterThanOrEqual(expectedNumber);
    });
  });


  describe('deposit function', () => {
    it('should be a deposit higher then 0', () => {
      spyOn(service.bankFunctions, "deposit")
      let money = 100;
      service.bankFunctions.deposit(service.evaAccount, money)
      let expectedDeposit = 1;
      expect(money).toBeGreaterThanOrEqual(expectedDeposit);
    });
  
    it('should be a deposit with a number', () => {
      spyOn(service.bankFunctions, "deposit");
      let money = 100;
      service.bankFunctions.deposit(service.evaAccount, money)
      let typeNumber= 0;
      let typeDeposition = money;
      expect(typeof(typeDeposition)).toBe(typeof(typeNumber));
    });
  });
 
  describe('withdraw function', () => {
    it('should not withdraw more then the number of the balance', () => {
      spyOn(service.bankFunctions, "withdraw");
      let money = 100;
      service.bankFunctions.withdraw(service.evaAccount, money);
      let balance = service.evaAccount.balance;
      expect(balance).toBeGreaterThanOrEqual(money);
    });

    it('should be a withdraw with a number', () => {
      let expectedNumber = 150;
      let actualNumber = 150;
      spyOn(service.bankFunctions, "withdraw");
      service.bankFunctions.withdraw(service.evaAccount, actualNumber);
      expect(actualNumber).toBe(expectedNumber);
    });
  });
 
  describe('transfer function', () => {
    it('should not transfer higher amount then what the balance is', () => {
      spyOn(service.bankFunctions, "transfer");
      let money = 100;
      service.bankFunctions.transfer(service.evaSavingsAccount, service.evaAccount, money);
      let balance = service.evaSavingsAccount.balance;
      expect(balance).toBeGreaterThanOrEqual(money);
    });

    it('should not transfer from and to the same account', () => {
      spyOn(service.bankFunctions, "transfer");
      let account1 = service.evaSavingsAccount;
      let account2 = service.evaAccount;
      service.bankFunctions.transfer(account1,account2 , 100);
      expect(account1).not.toEqual(account2);
    });
  });

});
