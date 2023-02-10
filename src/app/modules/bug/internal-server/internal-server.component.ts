import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrls: [],
})
export class InternalServerComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
