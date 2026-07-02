-- PL/SQL Stored Procedures and Functions
-- Exercise: Create stored procedures and functions

-- Create a table for demonstration
CREATE TABLE employees (
    employee_id NUMBER(5) PRIMARY KEY,
    first_name VARCHAR2(30),
    last_name VARCHAR2(30),
    salary NUMBER(10,2),
    department_id NUMBER(3)
);

-- Insert sample data
INSERT INTO employees VALUES (1001, 'John', 'Doe', 50000, 10);
INSERT INTO employees VALUES (1002, 'Jane', 'Smith', 60000, 20);
INSERT INTO employees VALUES (1003, 'Bob', 'Johnson', 55000, 10);
INSERT INTO employees VALUES (1004, 'Alice', 'Williams', 70000, 30);
COMMIT;

-- Stored Procedure to increase salary
CREATE OR REPLACE PROCEDURE increase_salary(
    p_employee_id IN employees.employee_id%TYPE,
    p_increase_percent IN NUMBER
) AS
    v_current_salary employees.salary%TYPE;
BEGIN
    SELECT salary INTO v_current_salary
    FROM employees
    WHERE employee_id = p_employee_id;
    
    UPDATE employees
    SET salary = salary + (salary * p_increase_percent / 100)
    WHERE employee_id = p_employee_id;
    
    DBMS_OUTPUT.PUT_LINE('Salary increased for employee ' || p_employee_id);
    DBMS_OUTPUT.PUT_LINE('Old salary: ' || v_current_salary);
    DBMS_OUTPUT.PUT_LINE('New salary: ' || (v_current_salary + (v_current_salary * p_increase_percent / 100)));
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Employee not found');
        ROLLBACK;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        ROLLBACK;
END;
/

-- Function to calculate annual salary
CREATE OR REPLACE FUNCTION get_annual_salary(
    p_employee_id IN employees.employee_id%TYPE
) RETURN NUMBER AS
    v_salary employees.salary%TYPE;
BEGIN
    SELECT salary INTO v_salary
    FROM employees
    WHERE employee_id = p_employee_id;
    
    RETURN v_salary * 12;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Employee not found');
        RETURN 0;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        RETURN 0;
END;
/

-- Procedure with OUT parameter
CREATE OR REPLACE PROCEDURE get_employee_details(
    p_employee_id IN employees.employee_id%TYPE,
    p_first_name OUT VARCHAR2,
    p_last_name OUT VARCHAR2,
    p_salary OUT NUMBER
) AS
BEGIN
    SELECT first_name, last_name, salary
    INTO p_first_name, p_last_name, p_salary
    FROM employees
    WHERE employee_id = p_employee_id;
    
    DBMS_OUTPUT.PUT_LINE('Employee details retrieved successfully');
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Employee not found');
        p_first_name := NULL;
        p_last_name := NULL;
        p_salary := NULL;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END;
/

-- Test the procedures and functions
DECLARE
    v_first_name VARCHAR2(30);
    v_last_name VARCHAR2(30);
    v_salary NUMBER;
    v_annual_salary NUMBER;
BEGIN
    -- Test increase_salary procedure
    increase_salary(1001, 10);
    
    -- Test get_annual_salary function
    v_annual_salary := get_annual_salary(1001);
    DBMS_OUTPUT.PUT_LINE('Annual salary: ' || v_annual_salary);
    
    -- Test get_employee_details procedure
    get_employee_details(1002, v_first_name, v_last_name, v_salary);
    DBMS_OUTPUT.PUT_LINE('Name: ' || v_first_name || ' ' || v_last_name);
    DBMS_OUTPUT.PUT_LINE('Salary: ' || v_salary);
END;
/
