import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RecurrenceService } from '../../../Core/Service/recurrence.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Recurrence } from '../../../Core/Interface/Recurrence';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CategoryService } from '../../../Core/Service/category.service';
import { DropdownModule } from 'primeng/dropdown';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recurrence',
  standalone: true,
  imports: [TableModule,ButtonModule,
    DatePipe,DialogModule,ReactiveFormsModule,
    InputTextModule,FormsModule,
    CommonModule,FloatLabelModule,InputNumberModule,
    ToggleButtonModule,
    DropdownModule
  ],
  templateUrl: './recurrence.component.html',
  styleUrl: './recurrence.component.css'
})
export class RecurrenceComponent{


  recurrences: Recurrence[] = [];
  categories: [] = [];
  modalVisible: boolean = false;
  selectedCategory: any;
  ToggleType() {
  this.recurrence.type =     this.recurrence.type = this.isIncome ? 1 : 0; // Update Type based on toggle state
  this.isIncome = !this.isIncome; 
  this.categoryService.getCategoriesByType(this.recurrence.type).subscribe(
    categories => {
      this.categories = categories.result.map((category: { name: any; id: any; }) => ({
        name: category.name, // Assuming 'name' is the property for the category's name
        code: category.id    // Assuming 'id' is the property for the category's ID
      }));
    }
  );
  

}
isIncome: boolean = false; 
isSubmitActive: boolean = false;
isEdit: boolean = false;
recurrence: Recurrence= {
  amount: 0,
  type: 0, // Default to 0 (Expense)
  duration: 0,
  date: new Date(),
  description: '',
  categoryId: 1,
  id: 0,
};; 
deleteRecurrence(id: number) {
  Swal.fire({
    title: 'Confirmation',
    text: 'Are you sure you want to delete this recurrence?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      this.recurrenceService.DeleteRecurrence(id).subscribe(
        () => {
          this.recurrenceService.getUserRecurrences().subscribe(
            recurrences => {
              this.recurrences = recurrences.result;
            }
          );
        }
      );
    }
  });
}
editRecurrence(id:number) {

this.isEdit = true;
this.modalVisible = true;

  const recurrence = this.recurrences.find(r => r.id === id);
  if (recurrence) {
    this.recurrence = recurrence;
  
  }
}
hideAddRecurrenceModal() {
this.modalVisible = false;

}
saveRecurrence() {

  if (this.validateRecurrence()) {
    console.log(this.recurrence);
    this.recurrenceService.createRecurrence(this.recurrence).subscribe(
      () => {
        this.recurrenceService.getUserRecurrences().subscribe(
          recurrences => {
            this.recurrences = recurrences.result;
          }
        );
        this.modalVisible = false;
      }
    );
  }
}

  constructor(private recurrenceService: RecurrenceService,private categoryService: CategoryService) {

  }
  private destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.recurrenceService.getUserRecurrences().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      recurrences => {
        this.recurrences = recurrences.result;
        console.log(this.recurrences);

      }
    );
  }
  showAddRecurrenceModal(){
    this.modalVisible = true;
    this.recurrence = {
      amount: 0,
      type: 0,
      duration: 0,
      date: new Date(),
      description: '',
      categoryId: 1,
      id: 0,
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
    submitRecurrence() {
      if (this.validateRecurrence()) {
        this.recurrenceService.createRecurrence(this.recurrence).subscribe(
          () => {
            this.recurrenceService.getUserRecurrences().subscribe(
              recurrences => {
                this.recurrences = recurrences.result;
              }
            );
            this.modalVisible = false;
          }
        );
      }
    }

    validateRecurrence(): boolean {
      if (this.recurrence.amount <= 0) {
        return false;
      }
      if (this.recurrence.duration <= 0) {
        return false;
      }
      if (!this.recurrence.date) {
        return false;
      }
      if (!this.recurrence.description) {
        return false;
      }
      if (this.recurrence.categoryId <= 0) {
        return false;
      }

      return true;
    }
     formatDate(dateString: string): string {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
    updateCategory() {
      this.recurrence.categoryId = this.selectedCategory.code;
      console.log(this.selectedCategory.code);
    }
  }


