import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-income-form',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './income-form.component.html',
  styleUrl: './income-form.component.css'
})
export class IncomeFormComponent {
  showContent: boolean = false;

  incomeForm: FormGroup = new FormGroup({
    category: new FormControl(''),
    amount: new FormControl(''),
    type: new FormControl(''),
    duration: new FormControl(''),
    date: new FormControl(''),
  });

  handleSubmit(): void {
    console.log(this.incomeForm.value);
    this.incomeForm.reset();
  }

  ngOnInit(): void {
    this.incomeForm.get('type')?.valueChanges.subscribe((value) => {
      this.showContent = value === 'recurrence';
    });
  }
}
