package genai;

import java.util.ArrayList;
import java.util.List;

/**
 * GitHub Copilot Usage Examples
 * Exercise: Demonstrates how to effectively use GitHub Copilot for code generation
 */

public class GitHubCopilotExample {
    
    // Example 1: Generate a method with comments
    // TODO: Write a method to check if a string is a palindrome
    public boolean isPalindrome(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        int left = 0;
        int right = str.length() - 1;
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
    
    // Example 2: Generate a class with Copilot suggestions
    // TODO: Create a class to represent a BankAccount with balance, deposit, and withdraw methods
    static class BankAccount {
        private double balance;
        
        public BankAccount(double initialBalance) {
            this.balance = initialBalance;
        }
        
        public void deposit(double amount) {
            if (amount > 0) {
                balance += amount;
            }
        }
        
        public boolean withdraw(double amount) {
            if (amount > 0 && balance >= amount) {
                balance -= amount;
                return true;
            }
            return false;
        }
        
        public double getBalance() {
            return balance;
        }
    }
    
    // Example 3: Generate test cases with Copilot
    // TODO: Write unit tests for the isPalindrome method
    public static void testIsPalindrome() {
        GitHubCopilotExample example = new GitHubCopilotExample();
        
        // Test cases
        assert example.isPalindrome("racecar") == true;
        assert example.isPalindrome("hello") == false;
        assert example.isPalindrome("") == false;
        assert example.isPalindrome(null) == false;
        assert example.isPalindrome("a") == true;
        
        System.out.println("All palindrome tests passed!");
    }
    
    // Example 4: Generate documentation
    /**
     * Calculates the Fibonacci number at the given position.
     * 
     * @param n The position in the Fibonacci sequence (0-indexed)
     * @return The Fibonacci number at position n
     * @throws IllegalArgumentException if n is negative
     */
    public long fibonacci(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be non-negative");
        }
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    // Example 5: Generate code from natural language comment
    // TODO: Sort a list of integers in ascending order using bubble sort
    public void bubbleSort(List<Integer> list) {
        int n = list.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (list.get(j) > list.get(j + 1)) {
                    // Swap
                    int temp = list.get(j);
                    list.set(j, list.get(j + 1));
                    list.set(j + 1, temp);
                }
            }
        }
    }
    
    public static void main(String[] args) {
        testIsPalindrome();
        
        // Test BankAccount
        BankAccount account = new BankAccount(1000);
        account.deposit(500);
        account.withdraw(200);
        System.out.println("Final balance: " + account.getBalance());
        
        // Test bubble sort
        List<Integer> numbers = new ArrayList<>();
        numbers.add(64);
        numbers.add(34);
        numbers.add(25);
        numbers.add(12);
        numbers.add(22);
        
        GitHubCopilotExample example = new GitHubCopilotExample();
        example.bubbleSort(numbers);
        System.out.println("Sorted numbers: " + numbers);
    }
}

/*
GitHub Copilot Best Practices:

1. **Write Clear Comments**: Describe what you want in natural language
2. **Provide Context**: Include relevant variable names and method signatures
3. **Use Descriptive Names**: Copilot understands naming conventions
4. **Iterate**: Accept suggestions and refine them
5. **Review Generated Code**: Always review and test Copilot suggestions
6. **Use Copilot for Boilerplate**: Let it generate repetitive code
7. **Learn from Suggestions**: Study patterns Copilot suggests
8. **Customize**: Provide examples to guide Copilot's style

Example prompts for Copilot:
- "Create a REST controller for managing users"
- "Write a method to validate email addresses"
- "Generate unit tests for this class"
- "Add error handling for this method"
- "Refactor this code to use streams"
*/
