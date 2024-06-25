import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(minutes: number): string {
    if (!minutes || isNaN(minutes)) {
      return '';
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} דקות`;
    }

    if (remainingMinutes === 0) {
      return `${hours} שעות`;
    }

    return `${hours} שעות ו ${remainingMinutes} דקות`;
  }


}
