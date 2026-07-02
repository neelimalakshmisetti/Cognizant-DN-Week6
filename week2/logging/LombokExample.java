package logging;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

/**
 * Lombok Annotations Example
 * Exercise: Demonstrates various Lombok annotations to reduce boilerplate code
 */

@Slf4j
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class LombokExample {
    
    private int id;
    private String name;
    private String email;
    
    // Using @Builder pattern
    @Builder
    public static class Employee {
        private int employeeId;
        private String firstName;
        private String lastName;
        private double salary;
    }
    
    // Using @Data (combines @Getter, @Setter, @ToString, @EqualsAndHashCode, @RequiredArgsConstructor)
    @Data
    public static class Product {
        private int productId;
        private String productName;
        private double price;
        private boolean inStock;
    }
    
    // Using @Value for immutable class
    @Value
    public static class ImmutableUser {
        int userId;
        String username;
        String email;
    }
    
    public static void main(String[] args) {
        log.info("=== Lombok Annotations Demo ===");
        
        // Using @NoArgsConstructor and @AllArgsConstructor
        LombokExample example1 = new LombokExample();
        example1.setId(1);
        example1.setName("John Doe");
        example1.setEmail("john@example.com");
        
        LombokExample example2 = new LombokExample(2, "Jane Smith", "jane@example.com");
        
        log.info("Example 1: {}", example1.toString());
        log.info("Example 2: {}", example2.toString());
        log.info("Equals: {}", example1.equals(example2));
        
        // Using @Builder
        Employee employee = Employee.builder()
                .employeeId(100)
                .firstName("Bob")
                .lastName("Johnson")
                .salary(75000)
                .build();
        
        log.info("Employee: {}", employee);
        
        // Using @Data
        Product product = new Product();
        product.setProductId(1);
        product.setProductName("Laptop");
        product.setPrice(999.99);
        product.setInStock(true);
        
        log.info("Product: {}", product);
        
        // Using @Value (immutable)
        ImmutableUser user = new ImmutableUser(1, "alice", "alice@example.com");
        log.info("Immutable User: {}", user);
        
        log.info("=== Demo Complete ===");
    }
}
