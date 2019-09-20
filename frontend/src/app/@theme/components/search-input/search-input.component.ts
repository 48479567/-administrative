import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  template: `
    <i class="control-icon ion ion-ios-search"
      (click)="showInput()"></i>
    <input placeholder="Buscar en la Plataforma..."
           #input
           [class.hidden]="!isInputShown"
           (blur)="hideInput()"
           (input)="onInput(input.value)" />
  `
})
export class SearchInputComponent {
  @ViewChild('input', { static: true }) input: ElementRef;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  isInputShown: boolean;

  constructor() {
    this.isInputShown = false;
  }

  showInput(): void {
    this.isInputShown = true;
    this.input.nativeElement.focus();
  }

  hideInput(): void {
    this.isInputShown = false;
  }

  onInput(val: string): void {
    this.search.emit(val);
  }

}
