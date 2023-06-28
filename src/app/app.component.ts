import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private storageService: StorageService) { }

  @HostListener('window:message', ['$event'])
  onMessage(e: { origin: string; data: any; }) {
    if (e.origin === env.cerberoFrontURL) {
      console.log('onMessage', e);
      this.storageService.encryptAndSaveObject('user', e.data);
    }
  }
  title = 'gea';
}
