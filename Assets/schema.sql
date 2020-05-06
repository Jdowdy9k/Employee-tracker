DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
    id INT NOT NULL,
    dep_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE emp_role (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    dep_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    ind INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM emp_role;
SELECT * FROM employees;