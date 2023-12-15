import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-back-header',
  templateUrl: './back-header.component.html',
  styleUrls: ['./back-header.component.css']
})
export class BackHeaderComponent implements OnInit {
  @Input() link: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
