package microservices;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/**
 * Spring Cloud - Feign Client for Inter-Service Communication
 * Exercise: Demonstrates declarative REST client with Feign
 */

@FeignClient(name = "department-service", url = "http://localhost:8082")
public interface DepartmentClient {
    
    @GetMapping("/departments")
    List<Department> getAllDepartments();
    
    @GetMapping("/departments/{id}")
    Department getDepartmentById(@PathVariable("id") Long id);
    
    @GetMapping("/departments/name/{name}")
    Department getDepartmentByName(@PathVariable("name") String name);
}

// Department DTO
class Department {
    private Long id;
    private String name;
    private String location;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}
