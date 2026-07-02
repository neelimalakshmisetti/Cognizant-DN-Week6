package tdd;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

/**
 * Mockito Example
 * Exercise: Demonstrates mocking with Mockito
 */

interface UserRepository {
    User findById(int id);
    void save(User user);
    List<User> findAll();
}

class UserService {
    private UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User getUserById(int id) {
        if (id <= 0) {
            throw new IllegalArgumentException("Invalid user ID");
        }
        return userRepository.findById(id);
    }
    
    public String getUserName(int id) {
        User user = getUserById(id);
        return user != null ? user.getName() : null;
    }
}

class User {
    private int id;
    private String name;
    private String email;
    
    public User(int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    public int getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}

class MockitoExample {
    
    @Mock
    private UserRepository userRepository;
    
    private UserService userService;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepository);
    }
    
    @Test
    void testGetUserById() {
        // Arrange
        User expectedUser = new User(1, "John Doe", "john@example.com");
        when(userRepository.findById(1)).thenReturn(expectedUser);
        
        // Act
        User result = userService.getUserById(1);
        
        // Assert
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        verify(userRepository, times(1)).findById(1);
    }
    
    @Test
    void testGetUserByIdInvalidId() {
        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            userService.getUserById(-1);
        });
        
        verify(userRepository, never()).findById(anyInt());
    }
    
    @Test
    void testGetUserName() {
        // Arrange
        User user = new User(1, "Jane Smith", "jane@example.com");
        when(userRepository.findById(1)).thenReturn(user);
        
        // Act
        String name = userService.getUserName(1);
        
        // Assert
        assertEquals("Jane Smith", name);
        verify(userRepository, times(1)).findById(1);
    }
    
    @Test
    void testGetUserNameUserNotFound() {
        // Arrange
        when(userRepository.findById(999)).thenReturn(null);
        
        // Act
        String name = userService.getUserName(999);
        
        // Assert
        assertNull(name);
        verify(userRepository, times(1)).findById(999);
    }
}
