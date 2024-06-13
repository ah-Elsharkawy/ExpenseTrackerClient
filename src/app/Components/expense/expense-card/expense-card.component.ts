import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-expense-card',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatProgressBarModule,CommonModule,MatIcon],
  templateUrl: './expense-card.component.html',
  styleUrl: './expense-card.component.css'
})
export class ExpenseCardComponent {
  @Input() budget: any;  // Declare the input property
}
