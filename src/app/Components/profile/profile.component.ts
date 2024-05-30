import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  emailForm!: FormGroup;
  passwordForm!: FormGroup;
  isEditing = false;
  isEmailModalOpen = false;
  isPasswordModalOpen = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      password: [{ value: '', disabled: true }],
      registrationDate: [{ value: '', disabled: true }]
    });

    this.emailForm = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]],
      confirmNewEmail: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onEdit(): void {
    this.isEditing = true;
    this.profileForm.enable();
  }

  onSave(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      this.isEditing = false;
      this.profileForm.disable();
    }
  }

  openEmailModal(): void {
    this.isEmailModalOpen = true;
  }

  closeEmailModal(): void {
    this.isEmailModalOpen = false;
  }

  onChangeEmail(): void {
    if (this.emailForm.valid) {
      console.log(this.emailForm.value);
      this.closeEmailModal();
    }
  }

  openPasswordModal(): void {
    this.isPasswordModalOpen = true;
  }

  closePasswordModal(): void {
    this.isPasswordModalOpen = false;
  }

  onChangePassword(): void {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value);
      this.closePasswordModal();
    }
  }
}
