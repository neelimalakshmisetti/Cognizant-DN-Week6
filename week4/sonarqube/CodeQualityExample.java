package sonarqube;

/**
 * SonarQube Code Quality Example
 * Exercise: Demonstrates code quality issues and best practices
 */

import java.util.ArrayList;
import java.util.List;

public class CodeQualityExample {
    
    // Bad practice: Magic numbers
    public double calculateInterest(double principal, int years) {
        return principal * 0.05 * years; // 0.05 is a magic number
    }
    
    // Good practice: Use constants
    private static final double INTEREST_RATE = 0.05;
    
    public double calculateInterestGood(double principal, int years) {
        return principal * INTEREST_RATE * years;
    }
    
    // Bad practice: Empty catch block
    public void processData(String data) {
        try {
            // Process data
            System.out.println("Processing: " + data);
        } catch (Exception e) {
            // Empty catch - code smell
        }
    }
    
    // Good practice: Handle exceptions properly
    public void processDataGood(String data) {
        try {
            System.out.println("Processing: " + data);
        } catch (Exception e) {
            System.err.println("Error processing data: " + e.getMessage());
            // Log the exception
        }
    }
    
    // Bad practice: Cyclomatic complexity too high
    public String getGrade(int score) {
        if (score >= 90) {
            return "A";
        } else if (score >= 80) {
            return "B";
        } else if (score >= 70) {
            return "C";
        } else if (score >= 60) {
            return "D";
        } else if (score >= 50) {
            return "E";
        } else {
            return "F";
        }
    }
    
    // Good practice: Reduce complexity using strategy pattern or lookup table
    public String getGradeGood(int score) {
        if (score >= 90) return "A";
        if (score >= 80) return "B";
        if (score >= 70) return "C";
        if (score >= 60) return "D";
        if (score >= 50) return "E";
        return "F";
    }
    
    // Bad practice: Duplicated code
    public void sendEmail(String to, String subject, String body) {
        System.out.println("To: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Body: " + body);
        System.out.println("Sending email...");
    }
    
    public void sendNotification(String to, String subject, String body) {
        System.out.println("To: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Body: " + body);
        System.out.println("Sending notification...");
    }
    
    // Good practice: Extract common method
    public void sendMessage(String to, String subject, String body, String messageType) {
        System.out.println("To: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Body: " + body);
        System.out.println("Sending " + messageType + "...");
    }
    
    // Bad practice: Long method
    public void processOrder(String orderId, String customerId, String productId, 
                            int quantity, double price, String address, String paymentMethod) {
        System.out.println("Processing order: " + orderId);
        System.out.println("Customer: " + customerId);
        System.out.println("Product: " + productId);
        System.out.println("Quantity: " + quantity);
        System.out.println("Price: " + price);
        System.out.println("Address: " + address);
        System.out.println("Payment: " + paymentMethod);
        // ... more processing logic
    }
    
    // Good practice: Break down into smaller methods
    public void processOrderGood(Order order) {
        validateOrder(order);
        calculateTotal(order);
        processPayment(order);
        shipOrder(order);
    }
    
    private void validateOrder(Order order) {
        // Validation logic
    }
    
    private void calculateTotal(Order order) {
        // Calculation logic
    }
    
    private void processPayment(Order order) {
        // Payment logic
    }
    
    private void shipOrder(Order order) {
        // Shipping logic
    }
    
    // Order DTO
    static class Order {
        private String orderId;
        private String customerId;
        private String productId;
        private int quantity;
        private double price;
        private String address;
        private String paymentMethod;
        
        // Getters and setters
        public String getOrderId() { return orderId; }
        public String getCustomerId() { return customerId; }
        public String getProductId() { return productId; }
        public int getQuantity() { return quantity; }
        public double getPrice() { return price; }
        public String getAddress() { return address; }
        public String getPaymentMethod() { return paymentMethod; }
    }
}
