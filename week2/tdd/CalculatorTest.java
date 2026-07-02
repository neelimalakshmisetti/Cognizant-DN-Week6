package tdd;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

/**
 * JUnit 5 Test Class for Calculator
 * Exercise: Demonstrates TDD with AAA pattern and various JUnit 5 features
 */

class CalculatorTest {
    
    private Calculator calculator;
    
    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }
    
    @Test
    void testAdd() {
        // Arrange
        int a = 5;
        int b = 3;
        int expected = 8;
        
        // Act
        int result = calculator.add(a, b);
        
        // Assert
        assertEquals(expected, result, "Addition should work correctly");
    }
    
    @Test
    void testSubtract() {
        // Arrange
        int a = 10;
        int b = 4;
        int expected = 6;
        
        // Act
        int result = calculator.subtract(a, b);
        
        // Assert
        assertEquals(expected, result);
    }
    
    @Test
    void testMultiply() {
        assertEquals(6, calculator.multiply(2, 3));
        assertEquals(0, calculator.multiply(5, 0));
        assertEquals(-15, calculator.multiply(3, -5));
    }
    
    @Test
    void testDivide() {
        assertEquals(2.5, calculator.divide(5, 2));
        assertEquals(3.0, calculator.divide(9, 3));
    }
    
    @Test
    void testDivideByZero() {
        Exception exception = assertThrows(ArithmeticException.class, () -> {
            calculator.divide(10, 0);
        });
        
        assertEquals("Cannot divide by zero", exception.getMessage());
    }
    
    @Test
    void testIsEven() {
        assertTrue(calculator.isEven(4));
        assertTrue(calculator.isEven(0));
        assertFalse(calculator.isEven(3));
        assertFalse(calculator.isEven(7));
    }
    
    @ParameterizedTest
    @ValueSource(ints = {2, 4, 6, 8, 10})
    void testIsEvenWithParameterizedInput(int number) {
        assertTrue(calculator.isEven(number));
    }
    
    @Test
    void testFactorial() {
        assertEquals(1, calculator.factorial(0));
        assertEquals(1, calculator.factorial(1));
        assertEquals(2, calculator.factorial(2));
        assertEquals(6, calculator.factorial(3));
        assertEquals(24, calculator.factorial(4));
        assertEquals(120, calculator.factorial(5));
    }
    
    @Test
    void testFactorialNegative() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            calculator.factorial(-5);
        });
        
        assertEquals("Factorial is not defined for negative numbers", exception.getMessage());
    }
    
    @ParameterizedTest
    @CsvSource({
        "5, 3, 8",
        "10, -5, 5",
        "0, 0, 0",
        "-5, -3, -8"
    })
    void testAddWithParameterizedInput(int a, int b, int expected) {
        assertEquals(expected, calculator.add(a, b));
    }
    
    @Test
    void testFindMax() {
        int[] numbers = {3, 7, 2, 9, 1};
        int[] result = calculator.findMax(numbers);
        
        assertEquals(9, result[0]);
        assertEquals(3, result[1]);
    }
    
    @Test
    void testFindMaxEmptyArray() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            calculator.findMax(new int[]{});
        });
        
        assertEquals("Array cannot be null or empty", exception.getMessage());
    }
    
    @Test
    void testFindMaxNullArray() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            calculator.findMax(null);
        });
        
        assertEquals("Array cannot be null or empty", exception.getMessage());
    }
}
