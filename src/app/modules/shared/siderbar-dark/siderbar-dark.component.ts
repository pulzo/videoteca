import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-siderbar-dark',
  templateUrl: './siderbar-dark.component.html',
  styleUrls: ['./siderbar-dark.component.css']
})
export class SiderbarDarkComponent implements OnInit {
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
