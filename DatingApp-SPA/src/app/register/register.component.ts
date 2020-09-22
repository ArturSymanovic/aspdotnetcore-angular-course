import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  model: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  register(): any {
    console.log('this.model');
  }

  cancel(): any {
    console.log('Cancelled');
  }
}
