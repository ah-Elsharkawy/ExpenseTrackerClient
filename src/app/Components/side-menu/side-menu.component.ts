import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IncomeFormComponent } from '../income/income-form/income-form.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule , RouterLink , IncomeFormComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  // openIncomeModal() {
  //   const modal = new bootstrap.Modal(document.getElementById('incomeModal')!);
  //   modal.show();
  // }
}
