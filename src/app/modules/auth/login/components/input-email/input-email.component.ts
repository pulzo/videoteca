import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputEmailComponent),
      multi: true,
    },
  ],
})
export class InputEmailComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() label = '';
  @Input() placeholder = '';

  innerValue!: string;
  disabled!: boolean;
  isBlured!: boolean;
  isFocused!: boolean;

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
}
