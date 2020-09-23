import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter(false);
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  register(): any {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registration succesfull!');
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel(): any {
    this.cancelRegister.emit(false);
  }
}
