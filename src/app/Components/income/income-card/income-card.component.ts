import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-income-card',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatProgressBarModule,CommonModule],
  templateUrl: './income-card.component.html',
  styleUrl: './income-card.component.css'
})
export class IncomeCardComponent {
  @Input() budget: any;  // Declare the input property
}
