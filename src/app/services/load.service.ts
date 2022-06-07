import { Injectable } from '@angular/core';
import { Credit } from '../models/credit';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class LoadService {
    public currentUser: User = null;
    public password: string;

    constructor() { }

    public loadCredit(): Credit {
        return JSON.parse(localStorage.getItem('currentCredit'));
    }

    public loadUsernameUser(): string {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.currentUser.username;
    }

    public loadPasswordUser(): string {
        this.password = localStorage.getItem('currentPassword');
        return this.password;
    }

    public loadUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}