package solid_principles;

/**
 * Single Responsibility Principle (SRP)
 * A class should have only one reason to change.
 * 
 * Exercise: Implement SRP by separating concerns
 */

// Bad example - violates SRP
class EmployeeBad {
    private String name;
    private String email;
    private double salary;

    public EmployeeBad(String name, String email, double salary) {
        this.name = name;
        this.email = email;
        this.salary = salary;
    }

    public String getName() { return name; }
    public String getEmail() { return email; }
    public double getSalary() { return salary; }

    // Violates SRP - handles payroll logic
    public void calculatePay() {
        System.out.println("Calculating pay for " + name + ": " + salary);
    }

    // Violates SRP - handles email sending
    public void sendEmail() {
        System.out.println("Sending email to " + email);
    }
}

// Good example - follows SRP
class Employee {
    private String name;
    private String email;
    private double salary;

    public Employee(String name, String email, double salary) {
        this.name = name;
        this.email = email;
        this.salary = salary;
    }

    public String getName() { return name; }
    public String getEmail() { return email; }
    public double getSalary() { return salary; }
}

class PayrollCalculator {
    public void calculatePay(Employee employee) {
        System.out.println("Calculating pay for " + employee.getName() + ": " + employee.getSalary());
    }
}

class EmailSender {
    public void sendEmail(Employee employee) {
        System.out.println("Sending email to " + employee.getEmail());
    }
}

public class SingleResponsibilityPrinciple {
    public static void main(String[] args) {
        System.out.println("=== Single Responsibility Principle Demo ===\n");
        
        // Bad example
        System.out.println("Bad Example (Violates SRP):");
        EmployeeBad badEmployee = new EmployeeBad("John Doe", "john@example.com", 50000);
        badEmployee.calculatePay();
        badEmployee.sendEmail();
        
        System.out.println("\nGood Example (Follows SRP):");
        Employee goodEmployee = new Employee("Jane Smith", "jane@example.com", 60000);
        PayrollCalculator payroll = new PayrollCalculator();
        EmailSender emailSender = new EmailSender();
        payroll.calculatePay(goodEmployee);
        emailSender.sendEmail(goodEmployee);
    }
}
