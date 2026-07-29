import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';

// Angular HOL - Exercise 3: Smart & Presentational Components
// Smart components manage state; presentational components display data.

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="employee-container">
      <h2>Employee List
        <span class="badge">{{ employeeService.totalCount() }} total |
          {{ employeeService.activeCount() }} active</span>
      </h2>

      <div class="toolbar">
        <input [(ngModel)]="searchTerm" placeholder="Search employees..."
               (ngModelChange)="applyFilter()" />
        <select [(ngModel)]="filterDept" (ngModelChange)="applyFilter()">
          <option value="">All Departments</option>
          <option *ngFor="let d of departments" [value]="d">{{ d }}</option>
        </select>
      </div>

      <div *ngIf="employeeService.loading()" class="loading">Loading...</div>

      <table *ngIf="!employeeService.loading()">
        <thead>
          <tr>
            <th (click)="sortBy('name')">Name ↕</th>
            <th>Role</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let emp of filtered; trackBy: trackById"
              [class.inactive]="!emp.isActive"
              (click)="employeeService.selectEmployee(emp)">
            <td>{{ emp.name }}</td>
            <td>{{ emp.role }}</td>
            <td>{{ emp.department }}</td>
            <td>{{ emp.salary | currency }}</td>
            <td>
              <span [class]="emp.isActive ? 'badge-active' : 'badge-inactive'">
                {{ emp.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .badge        { font-size: 0.75rem; background: #007bff; color: white; padding: 2px 8px; border-radius: 12px; }
    .badge-active { color: green; font-weight: bold; }
    .badge-inactive { color: gray; }
    tr.inactive   { opacity: 0.6; }
    table         { width: 100%; border-collapse: collapse; }
    th, td        { padding: 0.75rem; border-bottom: 1px solid #ddd; text-align: left; }
    th            { cursor: pointer; background: #f5f5f5; }
    .toolbar      { display: flex; gap: 1rem; margin-bottom: 1rem; }
    .toolbar input, .toolbar select { padding: 0.5rem; flex: 1; }
  `]
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  filtered: Employee[] = [];
  departments: string[] = [];
  searchTerm = '';
  filterDept = '';
  sortField: keyof Employee = 'name';

  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getAll().pipe(takeUntil(this.destroy$)).subscribe(emps => {
      this.departments = [...new Set(emps.map(e => e.department))];
      this.applyFilter();
    });
  }

  applyFilter(): void {
    this.filtered = this.employeeService.employees()
      .filter(e => (!this.searchTerm || e.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
                && (!this.filterDept || e.department === this.filterDept));
  }

  sortBy(field: keyof Employee): void {
    this.sortField = field;
    this.filtered = [...this.filtered].sort((a, b) => String(a[field]).localeCompare(String(b[field])));
  }

  trackById(_: number, emp: Employee): number { return emp.id; }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
