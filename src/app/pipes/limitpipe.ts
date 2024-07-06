import { Pipe, PipeTransform } from '@angular/core';
import { LimitType } from '../../Core/Enums/LimitType'; // Adjust the path as needed

@Pipe({
  name: 'LimitTypePipe',
  standalone: true
})
export class LimitTypePipe implements PipeTransform {
  transform(value: LimitType): string {
    switch (value) {
      case LimitType.monthly:
        return 'Monthly';
      case LimitType.weekly:
        return 'weekly';
      case LimitType.yearly:
        return 'Yearly';
      default:
        return 'Unknown';
    }
  }
}