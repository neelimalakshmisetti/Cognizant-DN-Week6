// Angular HOL - Data Models
export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  salary: number;
  joinDate: string;
  isActive: boolean;
}

export interface Department {
  id: number;
  name: string;
  headCount: number;
  budget: number;
}

export type EmployeeRole = 'Developer' | 'Designer' | 'Manager' | 'QA' | 'DevOps';
