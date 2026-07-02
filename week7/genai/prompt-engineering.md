# Prompt Engineering Examples
# Exercise: Demonstrates different prompting techniques

## Zero-Shot Prompting
**Prompt:**
```
Write a Java method to calculate the factorial of a number.
```

**Expected Output:**
```java
public int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

## Few-Shot Prompting
**Prompt:**
```
Convert the following numbers to words:
1 -> One
5 -> Five
10 -> Ten
25 -> ?
```

**Expected Output:**
```
Twenty-Five
```

## Chain-of-Thought Prompting
**Prompt:**
```
If a store sells apples for $2 each and oranges for $3 each, 
and a customer buys 5 apples and 3 oranges, how much do they spend?
Think step by step.
```

**Expected Output:**
```
Step 1: Calculate cost of apples: 5 apples × $2 = $10
Step 2: Calculate cost of oranges: 3 oranges × $3 = $9
Step 3: Add the costs: $10 + $9 = $19
Answer: The customer spends $19.
```

## Role-Based Prompting
**Prompt:**
```
You are a senior软件 engineer with 10 years of experience in Java development.
Review the following code and suggest improvements for better performance and readability.
```

## Context Engineering
**Prompt:**
```
Context: I'm building a Spring Boot REST API for employee management.
The application uses Spring Data JPA for database operations and needs to support
CRUD operations for employees with fields: id, name, email, department, and salary.

Task: Write a Spring Data JPA repository interface with custom query methods to:
1. Find employees by department
2. Find employees with salary greater than a given amount
3. Find employees by name containing a specific string
```

## Best Practices for Prompt Engineering

1. **Be Specific**: Clearly define what you want
2. **Provide Context**: Give relevant background information
3. **Use Examples**: Show examples of desired output
4. **Specify Format**: Indicate the expected output format
5. **Iterate**: Refine prompts based on results
6. **Chain Prompts**: Break complex tasks into smaller steps
7. **Use Constraints**: Specify what should NOT be included
