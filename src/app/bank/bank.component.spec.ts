import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { BankComponent } from './bank.component';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

describe('BankComponent', () => {
  let component: BankComponent;
  let fixture: ComponentFixture<BankComponent>;
  let domElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ BankComponent ]
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
      //spyOn(component, "getBalanceFromService");
      let expectedValue = component.getBalanceFromService();
      let actualValue = component.myAccount.balance;
      expect(expectedValue).toBe(actualValue);
    });
    
    /*it('should use bankservicefunctions for deposit, withdraw and fetch balance', () => {
      //TODO
    });*/
  });

  /*describe('deposit function', () => {
    it('should be a function to deposit amount from input field to account', () => {
      //TODO
    });
  
    it('should be a button who triggers deposit function', () => {
      //TODO
    });
  });

  describe('withdraw function', () => {
    it('should be a function to withdraw amount from input field from account', () => {
      //TODO
    });
  
    it('should be a button who triggers withdraw function', () => {
      //TODO
    });
  });*/


});
