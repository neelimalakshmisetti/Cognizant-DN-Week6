/**
 * AWS Lambda Function Example
 * Exercise: Demonstrates serverless function with AWS Lambda
 */

exports.handler = async (event) => {
  try {
    console.log('Event:', JSON.stringify(event, null, 2));
    
    // Extract data from event
    const { name, action } = event;
    
    // Process based on action
    let response;
    
    switch (action) {
      case 'greet':
        response = {
          statusCode: 200,
          body: JSON.stringify({
            message: `Hello, ${name}! Welcome to AWS Lambda.`
          })
        };
        break;
        
      case 'calculate':
        const { num1, num2, operation } = event;
        let result;
        
        switch (operation) {
          case 'add':
            result = num1 + num2;
            break;
          case 'subtract':
            result = num1 - num2;
            break;
          case 'multiply':
            result = num1 * num2;
            break;
          case 'divide':
            result = num1 / num2;
            break;
          default:
            throw new Error('Invalid operation');
        }
        
        response = {
          statusCode: 200,
          body: JSON.stringify({
            result: result,
            operation: operation
          })
        };
        break;
        
      default:
        response = {
          statusCode: 400,
          body: JSON.stringify({
            message: 'Invalid action'
          })
        };
    }
    
    return response;
    
  } catch (error) {
    console.error('Error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
        error: error.message
      })
    };
  }
};

// Example event for testing
/*
{
  "name": "John",
  "action": "greet"
}

{
  "num1": 10,
  "num2": 5,
  "action": "calculate",
  "operation": "add"
}
*/
