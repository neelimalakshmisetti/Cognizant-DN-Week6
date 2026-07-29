import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Employee } from './employee.model';

// Angular HOL - Exercise 2: Services and Dependency Injection
// Services provide shared logic and data across components.

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/users';

  // Signal-based state (Angular 17+)
  private employeesSignal = signal<Employee[]>([]);
  private loadingSignal   = signal(false);

  // Computed values
  readonly employees  = this.employeesSignal.asReadonly();
  readonly loading    = this.loadingSignal.asReadonly();
  readonly totalCount = computed(() => this.employeesSignal().length);
  readonly activeCount = computed(() => this.employeesSignal().filter(e => e.isActive).length);

  // BehaviorSubject for selected employee
  private selectedEmployee$ = new BehaviorSubject<Employee | null>(null);
  selectedEmployee = this.selectedEmployee$.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    this.loadingSignal.set(true);
    return this.http.get<any[]>(this.API_URL).pipe(
      map(users => users.slice(0, 10).map((u, i) => ({
        id: u.id, name: u.name, email: u.email,
        role: ['Developer','Designer','Manager','QA','DevOps'][i % 5],
        department: ['Engineering','UX','HR','QA','Operations'][i % 5],
        salary: 60000 + (i * 5000), joinDate: '2023-01-01', isActive: i % 4 !== 0
      }))),
      tap(emps => { this.employeesSignal.set(emps); this.loadingSignal.set(false); }),
      catchError(err => { this.loadingSignal.set(false); return throwError(() => err); })
    );
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<any>(`${this.API_URL}/${id}`).pipe(
      map(u => ({ id: u.id, name: u.name, email: u.email,
        role: 'Developer', department: 'Engineering',
        salary: 80000, joinDate: '2023-01-01', isActive: true }))
    );
  }

  create(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(this.API_URL, employee);
  }

  update(id: number, employee: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${this.API_URL}/${id}`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => this.employeesSignal.update(emps => emps.filter(e => e.id !== id)))
    );
  }

  selectEmployee(emp: Employee | null): void {
    this.selectedEmployee$.next(emp);
  }
}
