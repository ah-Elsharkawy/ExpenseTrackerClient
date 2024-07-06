import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Core/Service/auth.service';
import { ProfileDataService } from '../../../Core/Service/profile-data.service';

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

  errorMsg : string = '';
  errorPass : string = '';
  userId: any;
  userEmail:string = "";
  constructor(
    private fb: FormBuilder,
    private _ProfileDataService: ProfileDataService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {    
    this.profileForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }],
      emailAddress: [{ value: '', disabled: true }],
      password: [{ value: '', disabled: true }],
    });

    // Initialize the change password form
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });

    this._AuthService.decodeUser();
    this.userId = this._AuthService.userID;

    this._ProfileDataService.getProfile(this.userId).subscribe({
      next: (data) => {
        console.log(data);
        this.profileForm.patchValue(data.result);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onEdit(): void {
    this.isEditing = true;
    this.profileForm.enable();
  }

  onSave(): void {
    if (this.profileForm.valid) {
      this._ProfileDataService
        .updateProfile(this.userId, this.profileForm.value)
        .subscribe({
          next: (data) => {
            console.log('Profile updated successfully', data);
            this._AuthService.userEmail.next(this.profileForm.value.emailAddress);
            this.isEditing = false;
            this.profileForm.disable();            
          },
          error: (err) => {
            console.error('Error updating profile', err);
            this.errorMsg = err.error.error.message;
          },
        });
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
      const currentPassword = this.passwordForm.get('currentPassword')?.value;
      const newPassword = this.passwordForm.get('newPassword')?.value;
      
      this._ProfileDataService.changePassword(this.userId, { currentPassword, newPassword }).subscribe({
        next: (data) => {
          console.log('Password updated successfully', data);
          this.closePasswordModal();
        },
        error: (err) => {
          console.error('Error updating password', err);
          this.errorPass = err.error.error.message;
        }
      });
    }
  }
}
