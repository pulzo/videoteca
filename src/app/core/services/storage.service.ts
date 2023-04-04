import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  secretKey: string = env.secretKey;

  constructor() { }

  encrypt(valor: string) {
    const encrypted = CryptoJS.AES.encrypt(valor, this.secretKey).toString();
    return encrypted;
  }

  decrypt(valor: string) {
    const decrypted = CryptoJS.AES.decrypt(valor, this.secretKey).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  encryptAndSaveObject(key: string, object: any) {
    const encrypted = this.encrypt(JSON.stringify(object));
    localStorage.setItem(key, encrypted);
  }

  decryptAndGetObject(key: string) {
    const encrypted = localStorage.getItem(key);
    if (encrypted) {
      const decrypted = this.decrypt(encrypted);
      return JSON.parse(decrypted);
    }
    return null;
  }
}
