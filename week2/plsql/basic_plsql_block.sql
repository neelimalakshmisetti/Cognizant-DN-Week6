-- PL/SQL Basic Block Structure
-- Exercise: Understand PL/SQL anonymous blocks

-- Simple Anonymous Block
DECLARE
    -- Declaration section
    v_name VARCHAR2(50) := 'John Doe';
    v_age NUMBER := 30;
    v_salary NUMBER := 50000;
BEGIN
    -- Execution section
    DBMS_OUTPUT.PUT_LINE('Employee Name: ' || v_name);
    DBMS_OUTPUT.PUT_LINE('Employee Age: ' || v_age);
    DBMS_OUTPUT.PUT_LINE('Employee Salary: ' || v_salary);
    
    -- Calculate bonus
    IF v_salary < 40000 THEN
        DBMS_OUTPUT.PUT_LINE('Bonus: 10%');
    ELSIF v_salary BETWEEN 40000 AND 60000 THEN
        DBMS_OUTPUT.PUT_LINE('Bonus: 7%');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Bonus: 5%');
    END IF;
EXCEPTION
    -- Exception section
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('An error occurred: ' || SQLERRM);
END;
/

-- Block with Variables and Data Types
DECLARE
    v_id NUMBER(5);
    v_first_name VARCHAR2(30);
    v_last_name VARCHAR2(30);
    v_hire_date DATE;
    v_active BOOLEAN := TRUE;
    v_counter BINARY_INTEGER := 0;
BEGIN
    v_id := 1001;
    v_first_name := 'Jane';
    v_last_name := 'Smith';
    v_hire_date := SYSDATE;
    
    DBMS_OUTPUT.PUT_LINE('Employee ID: ' || v_id);
    DBMS_OUTPUT.PUT_LINE('Name: ' || v_first_name || ' ' || v_last_name);
    DBMS_OUTPUT.PUT_LINE('Hire Date: ' || v_hire_date);
    DBMS_OUTPUT.PUT_LINE('Active: ' || v_active);
    
    -- Loop example
    FOR i IN 1..5 LOOP
        v_counter := v_counter + i;
        DBMS_OUTPUT.PUT_LINE('Counter: ' || v_counter);
    END LOOP;
END;
/

-- Block with Exception Handling
DECLARE
    v_num1 NUMBER := 10;
    v_num2 NUMBER := 0;
    v_result NUMBER;
BEGIN
    v_result := v_num1 / v_num2;
    DBMS_OUTPUT.PUT_LINE('Result: ' || v_result);
EXCEPTION
    WHEN ZERO_DIVIDE THEN
        DBMS_OUTPUT.PUT_LINE('Error: Division by zero');
    WHEN VALUE_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('Error: Value error');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END;
/
