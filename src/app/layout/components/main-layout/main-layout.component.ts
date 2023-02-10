import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {
  adminNavbar!: boolean;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(() => {
      this.adminNavbar = !!this.route?.snapshot?.firstChild?.data?.['adminNavbar'];
    });
  }
}
