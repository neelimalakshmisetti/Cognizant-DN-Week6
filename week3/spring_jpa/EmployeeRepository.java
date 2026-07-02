package spring_jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA - Repository Example
 * Exercise: Demonstrates Spring Data JPA repository methods and custom queries
 */

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    // Derived query method - find by last name
    List<Employee> findByLastName(String lastName);
    
    // Derived query method - find by first name and last name
    List<Employee> findByFirstNameAndLastName(String firstName, String lastName);
    
    // Derived query method - find by email
    Optional<Employee> findByEmail(String email);
    
    // Derived query method - find by active status
    List<Employee> findByActive(Boolean active);
    
    // Derived query method - find by salary greater than
    List<Employee> findBySalaryGreaterThan(Double salary);
    
    // Derived query method - find by salary between
    List<Employee> findBySalaryBetween(Double minSalary, Double maxSalary);
    
    // Custom query using @Query annotation
    @Query("SELECT e FROM Employee e WHERE e.firstName LIKE %:keyword% OR e.lastName LIKE %:keyword%")
    List<Employee> searchByName(@Param("keyword") String keyword);
    
    // Custom query for counting active employees
    @Query("SELECT COUNT(e) FROM Employee e WHERE e.active = true")
    Long countActiveEmployees();
    
    // Custom query for finding employees hired after a certain date
    @Query("SELECT e FROM Employee e WHERE e.hireDate >= :date")
    List<Employee> findEmployeesHiredAfter(@Param("date") java.time.LocalDateTime date);
    
    // Native query example
    @Query(value = "SELECT * FROM employees ORDER BY salary DESC LIMIT :limit", nativeQuery = true)
    List<Employee> findTopEarners(@Param("limit") int limit);
}
