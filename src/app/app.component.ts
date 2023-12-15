import { Component, HostListener} from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gea';

  constructor(private storageService: StorageService) { }

  @HostListener('window:message', ['$event'])
  onMessage(e: { origin: string; data: any; }) {
    if (e.origin === env.cerberoFrontURL) {
      this.storageService.encryptAndSaveObject('user', e.data);
    }
  }
}
