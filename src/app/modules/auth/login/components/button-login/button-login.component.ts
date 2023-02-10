import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'button-login',
  styleUrls: ['./button-login.component.css'],
  templateUrl: './button-login.component.html',
})
export class ButtonLoginComponent {
  @Input() message = '';
  @Input() disabled = false;
  @Input() type = 'green';
  @Output() onClick = new EventEmitter();

  click() {
    if (this.disabled) {
      return;
    }

    this.onClick.emit();
  }
}
