import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'dateTimeCustom',
})
export class DateTimeCustomPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const now = new Date();

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const startOfWeek = new Date(today);
    const dayOfWeek = (today.getDay() + 6) % 7;

    startOfWeek.setDate(today.getDate() - dayOfWeek);

    if (date >= today) {
      return date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    if (date >= yesterday) {
      return 'Вчера';
    }

    if (date >= startOfWeek) {
      return date.toLocaleDateString('ru-RU', {
        weekday: 'long',
      });
    }

    return date.toLocaleDateString('ru-RU');
  }
}
