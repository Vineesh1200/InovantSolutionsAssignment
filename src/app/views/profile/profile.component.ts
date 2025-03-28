import { Component, inject } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EyeInvisibleOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-profile',
  imports: [
    NzInputModule, NzButtonModule, NzFormModule, ReactiveFormsModule, NzSelectModule, NzIconModule, NzGridModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {

  validateForm: FormGroup;
  passwordVisible1 = false;
  passwordVisible2 = false;
  passwordVisible3 = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private iconService = inject(NzIconService);

  constructor() {
    this.iconService.addIcon(EyeInvisibleOutline);
    this.validateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      phoneCode: ['+965'],
      password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    });
    const currentNavigation: any = this.router.getCurrentNavigation();
    const userData = currentNavigation?.extras?.state?.userData;
    if (userData) {
      this.validateForm.patchValue(userData);
    }
  }

  onSubmit(): void {
    if (this.validateForm.valid) {
      console.log('Form submitted:', this.validateForm.value);
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
