import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserCategory } from '../../../../Core/Interface/UserCategory';
import { UserCategoryService } from '../../../../Core/Service/user-category.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

interface AvailableCategory {
  name: string;
  code: string;
}

interface LimitType {
  name: string;
  code: string;
}

@Component({
  standalone: true,
  selector: 'app-budgetlimit-form',
  templateUrl: './budgetlimit-form.component.html',
  styleUrls: ['./budgetlimit-form.component.css'],
  imports: [DialogModule, CommonModule, FormsModule, InputNumberModule, DropdownModule, ButtonModule]
})
export class BudgetlimitFormComponent implements OnInit {
  @Input() BudgetToEdit: UserCategory | undefined;
  @Input() mode: string = 'Add';
  @Input() visible: boolean = false;
  @Output() formClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() formSave: EventEmitter<void> = new EventEmitter<void>();

  limitTypes: LimitType[] | undefined;
  usercategory: UserCategory = {
    categoryId: 0,
    amount: 0,
    limitType: 0
  };

  Categories: AvailableCategory[] = [];

  constructor(private userCategoryService: UserCategoryService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadLimitTypes();
    this.loadBudgetToEdit();
  }

  loadCategories() {
    this.userCategoryService.getUserCategories().subscribe((data: any) => {
      this.Categories = data.result.map((item: any) => ({
        name: item.name,
        code: item.id
      }));
    });
  }

  loadLimitTypes() {
    this.limitTypes = [
      { name: 'Weekly', code: '0' },
      { name: 'Monthly', code: '1' },
      { name: 'Daily', code: '2' }
    ];
  }

  loadBudgetToEdit() {
    if (this.BudgetToEdit !== undefined) {
      this.usercategory = {
        categoryId: this.BudgetToEdit.categoryId,
        amount: this.BudgetToEdit.amount,
        limitType: this.BudgetToEdit.limitType
      };
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.mode === 'Add') {
        this.addBudgetLimit();
      } else {
        this.updateBudgetLimit();
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill all the fields',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  updateBudgetLimit() {
  debugger;
    this.userCategoryService.updateBudgetLimit(this.usercategory).subscribe((data: any) => {
      if (data.status === 'error') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Budget Limit Update Failed',
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }
      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Budget Limit Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      });
      this.formSave.emit();
    });
  }

  addBudgetLimit() {
    this.userCategoryService.createBudgetLimit(this.usercategory).subscribe((data: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Budget Limit Added Successfully',
        showConfirmButton: false,
        timer: 1500
      });
      this.formSave.emit();
    });
  }

  onClose() {
    this.formClose.emit();
  }
}