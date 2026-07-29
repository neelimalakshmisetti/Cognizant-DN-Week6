import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Angular HOL - Exercise 5: Reactive Forms & Custom Validation
// Build a type-safe, validated employee registration form.

function salaryRangeValidator(min: number, max: number) {
  return (control: AbstractControl) => {
    const val = +control.value;
    if (val < min) return { salaryTooLow:  { min, actual: val } };
    if (val > max) return { salaryTooHigh: { max, actual: val } };
    return null;
  };
}

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h2>Add New Employee</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <div class="field">
          <label>Full Name *</label>
          <input formControlName="name" placeholder="John Doe" />
          <small *ngIf="f['name'].invalid && f['name'].touched" class="error">
            Name must be 2–50 characters.
          </small>
        </div>

        <div class="field">
          <label>Email *</label>
          <input formControlName="email" type="email" />
          <small *ngIf="f['email'].invalid && f['email'].touched" class="error">
            Valid email is required.
          </small>
        </div>

        <div class="field">
          <label>Salary (₹) *</label>
          <input formControlName="salary" type="number" />
          <small *ngIf="f['salary'].errors?.['salaryTooLow']" class="error">
            Salary must be at least ₹{{ f['salary'].errors?.['salaryTooLow'].min | number }}.
          </small>
        </div>

        <div class="field">
          <label>Department *</label>
          <select formControlName="department">
            <option value="">Select department</option>
            <option *ngFor="let d of departments" [value]="d">{{ d }}</option>
          </select>
        </div>

        <div class="field">
          <label>Join Date</label>
          <input formControlName="joinDate" type="date" />
        </div>

        <button type="submit" [disabled]="form.invalid">Submit</button>
        <button type="button" (click)="form.reset()">Reset</button>
      </form>

      <pre *ngIf="submitted">{{ submitted | json }}</pre>
    </div>
  `,
  styles: [`
    .form-container { max-width: 500px; margin: 0 auto; }
    .field          { margin-bottom: 1rem; display: flex; flex-direction: column; }
    .field label    { font-weight: 600; margin-bottom: 0.25rem; }
    .field input, .field select { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
    .error          { color: red; font-size: 0.8rem; }
    button          { margin-right: 0.5rem; padding: 0.5rem 1.5rem; }
  `]
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;
  submitted: any = null;
  departments = ['Engineering', 'UX', 'HR', 'QA', 'Operations', 'Finance'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:       ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email:      ['', [Validators.required, Validators.email]],
      salary:     [null, [Validators.required, salaryRangeValidator(30000, 500000)]],
      department: ['', Validators.required],
      joinDate:   [new Date().toISOString().split('T')[0]],
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = this.form.value;
      console.log('Form submitted:', this.submitted);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
