package spring_core;

/**
 * Spring Core - Bean Configuration Example
 * Exercise: Demonstrates different ways to configure beans
 */

import java.util.List;
import java.util.ArrayList;

// Component stereotype (simulating Spring annotations)
@Component
class DatabaseConfig {
    private String url;
    private String username;
    private String password;
    
    public DatabaseConfig() {
        this.url = "jdbc:mysql://localhost:3306/mydb";
        this.username = "root";
        this.password = "password";
    }
    
    public String getUrl() { return url; }
    public String getUsername() { return username; }
    public String getPassword() { return password; }
}

// Service stereotype
@Service
class UserService {
    private List<String> users;
    
    public UserService() {
        this.users = new ArrayList<>();
        users.add("John Doe");
        users.add("Jane Smith");
        users.add("Bob Johnson");
    }
    
    public List<String> getAllUsers() {
        return users;
    }
    
    public void addUser(String user) {
        users.add(user);
    }
}

// Repository stereotype
@Repository
class UserRepository {
    private List<String> database;
    
    public UserRepository() {
        this.database = new ArrayList<>();
        database.add("user1");
        database.add("user2");
    }
    
    public String findById(String id) {
        for (String user : database) {
            if (user.equals(id)) {
                return user;
            }
        }
        return null;
    }
    
    public void save(String user) {
        database.add(user);
    }
}

// Configuration class (simulating @Configuration)
@Configuration
class AppConfig {
    
    @Bean
    public DatabaseConfig databaseConfig() {
        return new DatabaseConfig();
    }
    
    @Bean
    public UserService userService() {
        return new UserService();
    }
    
    @Bean
    public UserRepository userRepository() {
        return new UserRepository();
    }
}

// Stereotype annotations (simulated)
@interface Component {}
@interface Service {}
@interface Repository {}
@interface Configuration {}
@interface Bean {}

public class BeanConfigurationDemo {
    public static void main(String[] args) {
        System.out.println("=== Spring Core - Bean Configuration Demo ===\n");
        
        // Manual bean creation (simulating Spring IoC container)
        
        // Create beans
        DatabaseConfig dbConfig = new DatabaseConfig();
        UserService userService = new UserService();
        UserRepository userRepository = new UserRepository();
        
        // Use beans
        System.out.println("Database Configuration:");
        System.out.println("URL: " + dbConfig.getUrl());
        System.out.println("Username: " + dbConfig.getUsername());
        
        System.out.println("\nUserService - All Users:");
        userService.getAllUsers().forEach(System.out::println);
        
        System.out.println("\nUserRepository Operations:");
        System.out.println("Find user1: " + userRepository.findById("user1"));
        userRepository.save("user3");
        System.out.println("Find user3: " + userRepository.findById("user3"));
        
        System.out.println("\nAdding new user via UserService:");
        userService.addUser("Alice Williams");
        userService.getAllUsers().forEach(System.out::println);
    }
}
