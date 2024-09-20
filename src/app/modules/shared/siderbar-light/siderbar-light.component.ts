import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-siderbar-light',
  templateUrl: './siderbar-light.component.html',
  styleUrls: ['./siderbar-light.component.css']
})
export class SiderbarLightComponent implements OnInit {
  @Input() optionMenu: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  navigateToSlack(){
    window.open('https://pulzoworkspace.slack.com/archives/CUB8B5YJX')
  }

}
