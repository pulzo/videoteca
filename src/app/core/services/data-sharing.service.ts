import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataSharingService {
  
    private userStorage;
    constructor() {
        this.userStorage = env.geaAppURL;
    }

    postCrossDomainMessage() {
        const iframe = document.getElementById('admin-ifr');
        if (iframe == null) { return; }
        const iWindow = (iframe as HTMLIFrameElement).contentWindow;
        const storageData = this.userStorage;
        setTimeout(function () {
            iWindow?.postMessage(storageData, env.cerberoFrontURL);
            setTimeout(function () {
                window.open(env.cerberoFrontURL, '_self');
            }, 1000);
        }, 1000);
    }
}