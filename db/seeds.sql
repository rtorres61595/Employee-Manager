USE employee_DB;
INSERT INTO department(name) VALUES("accounting");
INSERT INTO department(name) VALUES("engineering");

INSERT INTO role(title, salary, department_id) VALUES("software developer", 80000, 1);
INSERT INTO role(title, salary, department_id) VALUES("lead developer", 100000, 2);

INSERT INTO employee(first_name, last_name, role_id) VALUES("person first name" ,"person last name", 3);