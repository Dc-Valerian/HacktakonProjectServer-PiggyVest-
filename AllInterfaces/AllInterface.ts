export interface UserData{
    name:string;
    email:string;
    userName:string;
    password:string;
    phoneNumber:number;
    accountNumber:number;
    verified:boolean;
    wallet:{}[];
    history:{}[];
}

export interface WalletData{
    Balance:number;
    credit:number;
    debit:number;
}

export interface HistoryData{
    message:string;
    transactionReference:number;
    transactionType:boolean;

}