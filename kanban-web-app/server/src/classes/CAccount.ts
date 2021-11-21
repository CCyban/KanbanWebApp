import { IAccount } from "../interfaces/IAccount";

export class CAccount implements IAccount {

    Username: string;
    Password: string;
    
    constructor(
        _Username: string,
        _Password: string
    ) {
        this.Username = _Username;
        this.Password = _Password;
    }
}