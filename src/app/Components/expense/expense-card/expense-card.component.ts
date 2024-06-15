import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import Swal from 'sweetalert2';
import { TransactionService } from '../../../../Core/Service/transaction.service';
@Component({
  selector: 'app-expense-card',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatProgressBarModule,CommonModule,MatIcon],
  templateUrl: './expense-card.component.html',
  styleUrl: './expense-card.component.css'
})
export class ExpenseCardComponent {

  constructor(
    private _TransactionService: TransactionService
  ) {}
  @Input() budget: any;  // Declare the input property
  @Input() transaction: any;  // Declare the input property

  deleteTransaction(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this transaction!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._TransactionService.deleteTransaction(id).subscribe(
          () => {
            this._TransactionService.removeTransaction(id);
            Swal.fire(
              'Deleted!',
              'Your transaction has been deleted.',
              'success'
            );
          },
          (error) => {
            console.error('Error deleting transaction:', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the transaction.',
              'error'
            );
          }
        );
      }
    });
  }
}


