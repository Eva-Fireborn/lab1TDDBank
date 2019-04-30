import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { BankComponent } from './bank.component';
import { BankService } from '../bank.service';


describe('BankComponent', () => {
  let component: BankComponent;
  let fixture: ComponentFixture<BankComponent>;
  let domElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ BankComponent ],
			providers: [
				BankService
			]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankComponent);
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    fixture.detectChanges();
    
  });

  it('should create a component called Bank', () => {
    expect(component).toBeTruthy();
  });

  describe('component DOM', () => {
    it('should show balance in a element that has the class accountbalance', () => {
      let expectedValue = component.myAccount.balance;
      let actualValue = domElement.querySelector('.balance');
      expect(expectedValue).toBeCloseTo(actualValue.innerHTML);
    });
  
    it('should have a inputfield with class amount', () => {
      let input = domElement.querySelector('.amount');
      expect(input).toBeTruthy();
    });

    it('should display an account name', () => {
      let expectedName = component.myAccount.customerName;
      let actualName = domElement.querySelector('.customerName');
      expect(expectedName).toBe(actualName.innerHTML);
    });
  });

  describe('account', () => {
    it('should be right value on account', () => {
      let balance = 500;
      let myAccount = {
        customerName: 'Eva Fireborn',
        balance: balance
      }
      let mockDataService = jasmine.createSpyObj(['getBalance']);
      mockDataService.getBalance.and.returnValue(balance);
      let component = new BankComponent(mockDataService);
      component.getBalanceFromService(myAccount);
      expect(mockDataService.getBalance).toHaveBeenCalled();
      expect(component.myAccount.balance).toBe(balance);
    });

    it('should use getBalance to get balance from service', () => {
      let balance = 500;
      let myAccount = {
        customerName: 'Eva Fireborn',
        balance: balance
      }
      let mockDataService = jasmine.createSpyObj(['getBalance']);
      mockDataService.getBalance.and.returnValue(balance);
      let component = new BankComponent(mockDataService);
      component.getBalanceFromService(myAccount);
      expect(mockDataService.getBalance).toHaveBeenCalled();
    });

    it('should use depositInService to deposit', () => {
      let mockDataService = jasmine.createSpyObj(['deposit']);
      mockDataService.deposit;
      let component = new BankComponent(mockDataService);
      component.inputValue = '300';
      component.depositInService();
      expect(mockDataService.deposit).toHaveBeenCalled();
    });

    it('should use withdrawInService to deposit', () => {
      let mockDataService = jasmine.createSpyObj(['withdraw']);
      mockDataService.deposit;
      let component = new BankComponent(mockDataService);
      component.withdrawInService();
      expect(mockDataService.withdraw).toHaveBeenCalled();
    });
  });

  describe('deposit function', () => {
    it('should be a function to deposit amount from input field to account', () => {
      expect(component.depositInService).toBeTruthy();
    });
  
    it('should be a button who triggers deposit function', () => {
      let depositButton = domElement.querySelector('.depositButton');
      expect(depositButton).toBeTruthy();
    });
  });

  describe('withdraw function', () => {
    it('should be a function to withdraw amount from input field from account', () => {
      expect(component.withdrawInService).toBeTruthy();
    });
  
    it('should be a button who triggers withdraw function', () => {
      let wihtdrawButton = domElement.querySelector('.withdrawButton');
      expect(wihtdrawButton).toBeTruthy();
    });
  });
  

});
