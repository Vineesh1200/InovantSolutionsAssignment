import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { EyeInvisibleOutline } from '@ant-design/icons-angular/icons';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { LoginInterface } from '../../interfaces/userInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzIconModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {

  validateForm: FormGroup;
  passwordVisible: boolean = false;

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private iconService = inject(NzIconService);
  private router = inject(Router);

  constructor() {
    this.iconService.addIcon(EyeInvisibleOutline);
    this.validateForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = {
        ...this.validateForm.value,
        phoneCode: "+91",
        firstName: "Inovant",
        lastName: "solutions",
        phoneNumber: "3521356123",
      }
      this.userService.login(formData).subscribe((response: LoginInterface) => {
        this.router.navigate(['profile'], { state: { userData: response } })
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
