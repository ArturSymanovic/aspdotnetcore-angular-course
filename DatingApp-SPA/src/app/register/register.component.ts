import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter(false);
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(): any {
    this.authService.register(this.model).subscribe(() => {
      console.log('Registration succesfull!');
    }, error => {
      console.log(error);
    });
  }

  cancel(): any {
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }
}
