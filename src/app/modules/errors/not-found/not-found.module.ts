import { Component, OnInit } from '@angular/core';
import { PulzoHubService } from 'src/app/core/services';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: [],
})
export class NotFoundComponent implements OnInit {
  constructor(private pulzoHubService: PulzoHubService) { }

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
