import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostListener('window:message', ['$event'])
  onMessage(e: { origin: string; data: any; }) {
    if (e.origin === env.cerberoFrontURL) {
      console.log('onMessage', e);
      localStorage.setItem('user', JSON.stringify(e.data));
    }
  }
  title = 'gea';
}
