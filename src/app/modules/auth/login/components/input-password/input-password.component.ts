import { Component, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true,
    },
  ],
})
export class InputPasswordComponent implements ControlValueAccessor {
  @ViewChild('input') inputElement!: ElementRef;
  @Input() label = '';
  @Input() placeholder = '';

  innerValue!: string;
  disabled!: boolean;
  isBlured!: boolean;
  isFocused!: boolean;

  type = 'password';

  private onChangeCallback: (value: any) => void;
  private onTouchedCallback: () => void;

  constructor() {
    this.onChangeCallback = () => ({});
    this.onTouchedCallback = () => ({});
  }

  writeValue(value: any) {
    this.innerValue = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  updateInnerValue($event: any) {
    this.innerValue = $event;
    this.onChangeCallback($event);
  }

  onBlur() {
    this.isBlured = true;
    this.isFocused = false;
    this.onTouchedCallback();
  }

  onFocus() {
    this.isFocused = true;
  }

  changeType() {
    this.type = this.type === 'password' ? 'text' : 'password';
    this.inputElement.nativeElement.focus();
  }
}
