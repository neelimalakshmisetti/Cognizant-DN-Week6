-- PL/SQL Cursors
-- Exercise: Implement implicit and explicit cursors

-- Implicit Cursor Example
DECLARE
    v_employee_id employees.employee_id%TYPE;
    v_first_name employees.first_name%TYPE;
    v_salary employees.salary%TYPE;
BEGIN
    -- Implicit cursor (SELECT INTO)
    SELECT employee_id, first_name, salary
    INTO v_employee_id, v_first_name, v_salary
    FROM employees
    WHERE employee_id = 1001;
    
    DBMS_OUTPUT.PUT_LINE('Employee ID: ' || v_employee_id);
    DBMS_OUTPUT.PUT_LINE('Name: ' || v_first_name);
    DBMS_OUTPUT.PUT_LINE('Salary: ' || v_salary);
    
    -- Check if a row was found using SQL%ROWCOUNT
    IF SQL%ROWCOUNT > 0 THEN
        DBMS_OUTPUT.PUT_LINE('Row found successfully');
    END IF;
    
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('No employee found');
    WHEN TOO_MANY_ROWS THEN
        DBMS_OUTPUT.PUT_LINE('Multiple employees found');
END;
/

-- Explicit Cursor Example
DECLARE
    CURSOR emp_cursor IS
        SELECT employee_id, first_name, last_name, salary
        FROM employees
        WHERE salary > 55000
        ORDER BY salary DESC;
    
    v_emp emp_cursor%ROWTYPE;
BEGIN
    OPEN emp_cursor;
    
    LOOP
        FETCH emp_cursor INTO v_emp;
        EXIT WHEN emp_cursor%NOTFOUND;
        
        DBMS_OUTPUT.PUT_LINE('ID: ' || v_emp.employee_id || 
                            ', Name: ' || v_emp.first_name || ' ' || v_emp.last_name ||
                            ', Salary: ' || v_emp.salary);
    END LOOP;
    
    CLOSE emp_cursor;
    
    DBMS_OUTPUT.PUT_LINE('Total rows processed: ' || emp_cursor%ROWCOUNT);
END;
/

-- Cursor with FOR LOOP (simplified)
DECLARE
    CURSOR emp_cursor IS
        SELECT employee_id, first_name, last_name, salary
        FROM employees
        ORDER BY employee_id;
BEGIN
    FOR v_emp IN emp_cursor LOOP
        DBMS_OUTPUT.PUT_LINE('ID: ' || v_emp.employee_id || 
                            ', Name: ' || v_emp.first_name || ' ' || v_emp.last_name ||
                            ', Salary: ' || v_emp.salary);
    END LOOP;
END;
/

-- Parameterized Cursor
DECLARE
    CURSOR emp_cursor(p_dept_id IN NUMBER) IS
        SELECT employee_id, first_name, last_name, salary
        FROM employees
        WHERE department_id = p_dept_id;
    
    v_emp emp_cursor%ROWTYPE;
BEGIN
    OPEN emp_cursor(10);
    
    LOOP
        FETCH emp_cursor INTO v_emp;
        EXIT WHEN emp_cursor%NOTFOUND;
        
        DBMS_OUTPUT.PUT_LINE('Dept 10 - ID: ' || v_emp.employee_id || 
                            ', Name: ' || v_emp.first_name || ' ' || v_emp.last_name);
    END LOOP;
    
    CLOSE emp_cursor;
END;
/
