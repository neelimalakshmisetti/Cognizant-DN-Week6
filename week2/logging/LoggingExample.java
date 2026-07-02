package logging;

import lombok.extern.slf4j.Slf4j;

/**
 * SLF4J Logging Example with Lombok
 * Exercise: Demonstrates different logging levels and Lombok @Slf4j annotation
 */

@Slf4j
public class LoggingExample {
    
    public void demonstrateLoggingLevels() {
        log.trace("This is a TRACE message - most detailed");
        log.debug("This is a DEBUG message - for debugging");
        log.info("This is an INFO message - general information");
        log.warn("This is a WARN message - warning condition");
        log.error("This is an ERROR message - error condition");
    }
    
    public void processUserData(String userId, String userName) {
        log.info("Processing user data for ID: {}", userId);
        
        try {
            if (userId == null || userId.isEmpty()) {
                log.warn("User ID is null or empty");
                return;
            }
            
            log.debug("User name: {}", userName);
            log.info("User data processed successfully for ID: {}", userId);
            
        } catch (Exception e) {
            log.error("Error processing user data for ID: {}", userId, e);
        }
    }
    
    public void calculateResult(int a, int b) {
        log.debug("Calculating result for {} and {}", a, b);
        
        try {
            int result = a / b;
            log.info("Calculation result: {}", result);
            
        } catch (ArithmeticException e) {
            log.error("Division by zero attempted: {} / {}", a, b, e);
        }
    }
    
    public static void main(String[] args) {
        LoggingExample example = new LoggingExample();
        
        log.info("=== Logging Example Demo ===");
        
        example.demonstrateLoggingLevels();
        example.processUserData("123", "John Doe");
        example.processUserData("", "Jane Smith");
        example.calculateResult(10, 2);
        example.calculateResult(10, 0);
        
        log.info("=== Demo Complete ===");
    }
}
