import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent implements OnInit {
  @Input() optionMenu: string | undefined;
  sider!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  showSiderbar() {
    if (this.sider) {
      this.sider = false;
    } else {
      this.sider = true;
    }
  }
}
