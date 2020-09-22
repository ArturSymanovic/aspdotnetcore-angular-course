import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter(false);
  model: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  register(): any {
    console.log('this.model');
  }

  cancel(): any {
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }
}
