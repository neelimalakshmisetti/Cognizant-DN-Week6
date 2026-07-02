/**
 * Application Debugging - JavaScript Example
 * Exercise: Demonstrates debugging techniques with Chrome DevTools
 */

// Example with intentional bugs for debugging practice

function calculateTotal(items) {
  let total = 0;
  
  for (let i = 0; i < items.length; i++) {
    // Bug: Not checking if price is a number
    total += items[i].price;
  }
  
  return total;
}

function filterActiveUsers(users) {
  // Bug: Using assignment instead of comparison
  const activeUsers = users.filter(user => user.active = true);
  return activeUsers;
}

function getUserData(userId) {
  const users = [
    { id: 1, name: 'John', active: true },
    { id: 2, name: 'Jane', active: false },
    { id: 3, name: 'Bob', active: true }
  ];
  
  // Bug: Using == instead of ===
  const user = users.find(user => user.id == userId);
  return user;
}

// Debugging checklist:
// 1. Use console.log() to inspect variables
// 2. Use debugger statement to pause execution
// 3. Use Chrome DevTools Sources panel
// 4. Set breakpoints on specific lines
// 5. Use Watch expressions to monitor variables
// 6. Step through code with Step Over, Step Into, Step Out
// 7. Check the Call Stack to understand execution flow
// 8. Use the Console to evaluate expressions

// Example with debugger statement
function complexCalculation(a, b, c) {
  debugger; // Execution will pause here
  const result1 = a * b;
  const result2 = result1 + c;
  const result3 = result2 / 2;
  return result3;
}

// Test the functions
const items = [
  { name: 'Item 1', price: 10 },
  { name: 'Item 2', price: '20' }, // String instead of number
  { name: 'Item 3', price: 30 }
];

console.log('Total:', calculateTotal(items));

const users = [
  { id: 1, name: 'John', active: true },
  { id: 2, name: 'Jane', active: false }
];

console.log('Active users:', filterActiveUsers(users));
console.log('User 1:', getUserData(1));
console.log('User 3:', getUserData(3));
