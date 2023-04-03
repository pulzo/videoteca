import { Injectable, OnInit, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable()
export class DataSharingService {

    private userStorage;
    constructor() {
        // this.userStorage = JSON.parse(localStorage.getItem('student.example.com') || '');
        this.userStorage = environment.geaAppURL;
    }

    postCrossDomainMessage(portal = 'admin') {
        let iframeId: any;
        if (portal === 'admin') {
            iframeId = 'admin-ifr';
        }
        const iframe = document.getElementById(iframeId);
        // console.log(iframe);
        if (iframe == null) { return; }
        const iWindow = (iframe as HTMLIFrameElement).contentWindow;
        const storageData = this.userStorage;
        // console.log(storageData);
        setTimeout(function () {
            iWindow?.postMessage(storageData, environment.cerberoFrontURL);
            window.open(environment.cerberoFrontURL, '_self');
        }, 1000);
    }

}