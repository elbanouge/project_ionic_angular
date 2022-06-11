import { Injectable } from '@angular/core';
import { Credit } from '../models/credit';
import { User } from '../models/user';
import * as CryptoJS from 'crypto-js';
import { ToastController } from '@ionic/angular';

let key = '123456$#@$^@1ERF';

@Injectable({
    providedIn: 'root'
})
export class LoadService {
    public currentUser: User = new User();
    public password: string;
    public otp: string;

    constructor(private toastController: ToastController) { }

    //The set method is use for encrypt the value.
    set(keys, value) {
        var key = CryptoJS.enc.Utf8.parse(keys);
        var iv = CryptoJS.enc.Utf8.parse(keys);
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        return encrypted.toString();
    }

    //The get method is use for decrypt the value.
    get(keys, value) {
        var key = CryptoJS.enc.Utf8.parse(keys);
        var iv = CryptoJS.enc.Utf8.parse(keys);
        var decrypted = CryptoJS.AES.decrypt(value, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    public encrypted(password: string): any {
        return this.set(key, password);
    }

    public decrypted(password: string): any {
        return this.get(key, this.encrypted(password));
    }

    public loadCredit(): Credit {
        return JSON.parse(localStorage.getItem('currentCredit'));
    }

    public loadUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    public loadUsernameUser(): string {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.currentUser.username;
    }

    public loadPasswordUser(): string {
        this.password = localStorage.getItem('currentPassword');
        return this.decrypted(this.password);
    }

    public loadOtpUser(): string {
        this.otp = localStorage.getItem('currentOTP');
        return this.otp;
    }

    async presentToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            color: color
        });
        toast.present();
    }
}