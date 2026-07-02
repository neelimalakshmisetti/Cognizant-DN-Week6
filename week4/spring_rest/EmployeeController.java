package spring_rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Spring REST - REST Controller Example
 * Exercise: Demonstrates REST API with CRUD operations
 */

@RestController
@RequestMapping("/api/employees")
@Validated
public class EmployeeController {
    
    private final ConcurrentHashMap<Long, EmployeeDTO> employeeMap = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);
    
    // GET all employees
    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employees = new ArrayList<>(employeeMap.values());
        return ResponseEntity.ok(employees);
    }
    
    // GET employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long id) {
        EmployeeDTO employee = employeeMap.get(id);
        if (employee == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employee);
    }
    
    // POST - Create new employee
    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) {
        Long id = idGenerator.getAndIncrement();
        employeeDTO.setId(id);
        employeeMap.put(id, employeeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeDTO);
    }
    
    // PUT - Update employee
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeDTO employeeDTO) {
        
        if (!employeeMap.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        
        employeeDTO.setId(id);
        employeeMap.put(id, employeeDTO);
        return ResponseEntity.ok(employeeDTO);
    }
    
    // DELETE - Delete employee
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        if (!employeeMap.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        
        employeeMap.remove(id);
        return ResponseEntity.noContent().build();
    }
    
    // GET - Search by name
    @GetMapping("/search")
    public ResponseEntity<List<EmployeeDTO>> searchByName(@RequestParam String name) {
        List<EmployeeDTO> results = employeeMap.values().stream()
                .filter(emp -> emp.getFirstName().equalsIgnoreCase(name) || 
                            emp.getLastName().equalsIgnoreCase(name))
                .toList();
        return ResponseEntity.ok(results);
    }
    
    // GET - Filter by salary range
    @GetMapping("/filter/salary")
    public ResponseEntity<List<EmployeeDTO>> filterBySalary(
            @RequestParam Double minSalary,
            @RequestParam Double maxSalary) {
        
        List<EmployeeDTO> results = employeeMap.values().stream()
                .filter(emp -> emp.getSalary() >= minSalary && emp.getSalary() <= maxSalary)
                .toList();
        return ResponseEntity.ok(results);
    }
}
