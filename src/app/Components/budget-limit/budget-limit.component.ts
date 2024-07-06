import { Component, OnInit } from '@angular/core';
import { BudgetlimitFormComponent } from './budgetlimit-form/budgetlimit-form.component';
import { ButtonModule } from 'primeng/button';
import { UserCategoryService } from '../../../Core/Service/user-category.service';
import { Budget } from '../../../Core/Interface/budget';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { LimitTypePipe } from '../../pipes/limitpipe';
import { UserCategory } from '../../../Core/Interface/UserCategory';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-budget-limit',
  standalone: true,
  imports: [BudgetlimitFormComponent, ButtonModule, CommonModule, FormsModule, TableModule, LimitTypePipe],
  templateUrl: './budget-limit.component.html',
  styleUrls: ['./budget-limit.component.css']
})
export class BudgetLimitComponent implements OnInit {
  BudgetToEdit: UserCategory | undefined;
  mode: string = 'Add';
  visible: boolean = false;
  budgets: Budget[] = [];

  constructor(private usercategoryService: UserCategoryService) {}

  ngOnInit() {
    this.usercategoryService.getBudgets().subscribe((data) => {
      this.budgets = data.result;
    });
  }

  showDialog() {
    this.BudgetToEdit = undefined;
    this.visible = true;
    this.mode = 'Add';
  }

  editBudget(id: number) {
  this.usercategoryService.getUserCategory(id).subscribe(
      (data) => {
        this.BudgetToEdit = {
          categoryId: data.result.categoryId,
          amount: data.result.amount,
          limitType: data.result.limitType
        
        };
        this.visible = true;
        this.mode = 'Edit';
      },
      (error) => {

      }
  )
  }

  deleteBudget(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this budget limit!',
    })
    .then((willDelete) => {
      if(willDelete.isConfirmed) {
        this.usercategoryService.deleteBudget(id).subscribe(
          (data) => {
            if(data.success) {
              this.budgets = this.budgets.filter((item) => item.id !== id);
              Swal.fire('Success', 'Budget deleted successfully', 'success');
              return;
            }else{
              Swal.fire('Error', 'An error occured while deleting the budget', 'error');
            }
    
          }
        )
      }
    });

  }

  handleFormClose() {
    this.visible = false;
  }

  handleFormSave() {
    this.usercategoryService.getBudgets().subscribe((data) => {
      this.budgets = data.result;
    })
    this.visible = false;
  }
}
