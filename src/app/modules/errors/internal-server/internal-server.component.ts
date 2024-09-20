import { Component, OnInit } from '@angular/core';
import { PulzoHubService } from 'src/app/core/services';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrls: [],
})
export class InternalServerComponent implements OnInit {
  constructor(private pulzoHubService: PulzoHubService) {}

  ngOnInit(): void {}

  redirectToLogin(): void {
    this.removeItems()
    window.open(`${env.cerberoFrontURL}/login`, '_self');
  }

  private removeItems(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.pulzoHubService.removePulzoHub();
  }
}
