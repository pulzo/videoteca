import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { PulzoHubService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService, private pulzoHubService: PulzoHubService) {}
  getPulzoHub() {
    return this.pulzoHubService.getPulzoHub();
  }
  logout() {
    this.authService.logout();
  }
}
