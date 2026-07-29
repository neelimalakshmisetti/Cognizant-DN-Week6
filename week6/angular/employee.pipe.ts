import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './employee.model';

// Angular HOL - Exercise 7: Custom Pipes
// Transform data in templates without modifying the source.

// 1. Search/filter pipe
@Pipe({ name: 'searchFilter', standalone: true, pure: false })
export class SearchFilterPipe implements PipeTransform {
  transform(employees: Employee[], searchTerm: string, field: keyof Employee = 'name'): Employee[] {
    if (!searchTerm?.trim()) return employees;
    const term = searchTerm.toLowerCase();
    return employees.filter(e => String(e[field]).toLowerCase().includes(term));
  }
}

// 2. Salary format pipe
@Pipe({ name: 'salaryFormat', standalone: true })
export class SalaryFormatPipe implements PipeTransform {
  transform(salary: number, currency = '₹'): string {
    if (salary >= 100000) return `${currency}${(salary / 100000).toFixed(1)}L`;
    if (salary >= 1000)   return `${currency}${(salary / 1000).toFixed(0)}K`;
    return `${currency}${salary}`;
  }
}

// 3. Time-ago pipe
@Pipe({ name: 'timeAgo', standalone: true })
export class TimeAgoPipe implements PipeTransform {
  transform(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days   = Math.floor(diff / 86400000);
    const months = Math.floor(days / 30);
    const years  = Math.floor(months / 12);
    if (years  > 0) return `${years} year${years  > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days   > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    return 'today';
  }
}
