import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-income-card',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatProgressBarModule,CommonModule,MatIcon],
  templateUrl: './income-card.component.html',
  styleUrl: './income-card.component.css'
})
export class IncomeCardComponent {
  @Input() budget: any;  // Declare the input property
}
