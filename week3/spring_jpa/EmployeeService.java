package spring_jpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA - Service Layer Example
 * Exercise: Demonstrates service layer with CRUD operations and pagination
 */

@Service
@Transactional
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    // CRUD Operations
    
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }
    
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }
    
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    
    public Page<Employee> getAllEmployees(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }
    
    public Employee updateEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }
    
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
    
    // Custom query methods
    
    public List<Employee> findByLastName(String lastName) {
        return employeeRepository.findByLastName(lastName);
    }
    
    public Optional<Employee> findByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
    
    public List<Employee> getActiveEmployees() {
        return employeeRepository.findByActive(true);
    }
    
    public List<Employee> getEmployeesBySalaryRange(Double minSalary, Double maxSalary) {
        return employeeRepository.findBySalaryBetween(minSalary, maxSalary);
    }
    
    public List<Employee> searchEmployees(String keyword) {
        return employeeRepository.searchByName(keyword);
    }
    
    public Long getActiveEmployeeCount() {
        return employeeRepository.countActiveEmployees();
    }
    
    public List<Employee> getTopEarners(int limit) {
        return employeeRepository.findTopEarners(limit);
    }
    
    // Business logic methods
    
    public void giveRaise(Long employeeId, Double percentage) {
        Optional<Employee> employeeOpt = employeeRepository.findById(employeeId);
        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            Double newSalary = employee.getSalary() * (1 + percentage / 100);
            employee.setSalary(newSalary);
            employeeRepository.save(employee);
        }
    }
    
    public void deactivateEmployee(Long employeeId) {
        Optional<Employee> employeeOpt = employeeRepository.findById(employeeId);
        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            employee.setActive(false);
            employeeRepository.save(employee);
        }
    }
}
