export interface UserData {
	name: string;
	email: string;
	userName: string;
	password: string;
	phoneNumber: number;
	accountNumber: number;
	verified: boolean;
	wallet: {}[];
	history: {}[];
}

export interface WalletData {
	Balance: number;
	credit: number;
	debit: number;
	quickSave: {}[];
	saveLock: {}[];
	Target: {}[];
}

export interface HistoryData {
	message: string;
	transactionReference: number;
	transactionType: string;
}

export interface Quick {
	amount: number;
	autoSave: boolean;
	dateTime: number | string;
	interest: number;
}

export interface Locks {
	amount: number;
	PayBackTime: string;
	interest: number;
	lock: boolean;
	title: string;
}

export interface TargetData {
	amount: number;
	fixedAmount: number;
	interest: number;
	dateTime: string;
	title: string;
	targetValue: boolean;
}
