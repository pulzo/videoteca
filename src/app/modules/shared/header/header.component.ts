import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string | undefined;

  constructor(private logoutSrv: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.logoutSrv.logout()
  }
}
