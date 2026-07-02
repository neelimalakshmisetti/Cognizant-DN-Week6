package spring_core;

/**
 * Spring Core - Dependency Injection Example
 * Exercise: Demonstrates Constructor and Setter injection
 */

// Service interface
interface MessageProvider {
    String getMessage();
}

// Implementation 1
class HelloMessageProvider implements MessageProvider {
    @Override
    public String getMessage() {
        return "Hello, World!";
    }
}

// Implementation 2
class GreetingMessageProvider implements MessageProvider {
    private String name;
    
    public GreetingMessageProvider(String name) {
        this.name = name;
    }
    
    @Override
    public String getMessage() {
        return "Hello, " + name + "!";
    }
}

// Service class using constructor injection
class MessageService {
    private final MessageProvider messageProvider;
    
    // Constructor injection
    public MessageService(MessageProvider messageProvider) {
        this.messageProvider = messageProvider;
    }
    
    public void displayMessage() {
        System.out.println("Message: " + messageProvider.getMessage());
    }
    
    // Setter injection example
    private String prefix;
    
    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }
    
    public void displayMessageWithPrefix() {
        System.out.println(prefix + " " + messageProvider.getMessage());
    }
}

// Another service for autowiring example
class EmailService {
    private MessageProvider messageProvider;
    
    // Setter injection
    public void setMessageProvider(MessageProvider messageProvider) {
        this.messageProvider = messageProvider;
    }
    
    public void sendEmail() {
        System.out.println("Sending email with message: " + messageProvider.getMessage());
    }
}

public class MessageServiceDemo {
    public static void main(String[] args) {
        System.out.println("=== Spring Core - Dependency Injection Demo ===\n");
        
        // Manual dependency injection (simulating Spring IoC)
        
        // Constructor injection
        MessageProvider helloProvider = new HelloMessageProvider();
        MessageService service1 = new MessageService(helloProvider);
        service1.displayMessage();
        
        // Constructor injection with parameter
        MessageProvider greetingProvider = new GreetingMessageProvider("John");
        MessageService service2 = new MessageService(greetingProvider);
        service2.displayMessage();
        
        // Setter injection
        service2.setPrefix("Greeting:");
        service2.displayMessageWithPrefix();
        
        // Setter injection for EmailService
        EmailService emailService = new EmailService();
        emailService.setMessageProvider(helloProvider);
        emailService.sendEmail();
    }
}
