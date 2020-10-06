import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter(false);
  model: any = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-red',
    };
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(g: FormGroup): any {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  register(): any {
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('Registration succesfull!');
    // }, error => {
    //   this.alertify.error(error);
    // });
    console.log(this.registerForm.value);
  }

  cancel(): any {
    this.cancelRegister.emit(false);
  }
}
