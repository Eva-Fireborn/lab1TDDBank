export interface BankInterface {
    getBalance(account): number;
	deposit(account, amount: number): void;
	withdraw(account, amount: number): void;
	transfer(from, to, amount: number): void;
}
