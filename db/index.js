const connection = require("./connection");

class DB{
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.query("SELECT employee FROM employee GROUP BY role_id HAVING count(*) > 1")
    }

    findAllDepartments() {
        return this.connection.query("SELECT department FROM department GROUP BY name HAVING count(*) > 1")
    }

    findAllmanagers() {
        return this.connection.query("SELECT employee FROM employee GROUP BY manager_id HAVING count(*) > 1")
    }

    findAllroles() {
        return this.connection.query("SELECT role FROM role GROUP BY department_id HAVING count(*) > 1")
    }
    
}
module.export = new DB(connection)

// Make some tables
    // Employees
        // first_name
        // last_name
        // join_role which gets your title, department, salary
        // manager column will be an id that joins to the employee table, not inner join
    // Roles
        // titles
        // salary
        // id to match up to department (foreign key)
    // Departments
        // Name
        // Utilized Budget (adding up all the employees salaries in the employees table per department)
// Views
    // View All
        // has
            // first_name
            // last_name
            // join_role which gets your title, department, salary
            // manager column will be an id that joins to the employee table, not inner join
    // By department
        // has
            // first_name
            // last_name
            // title
    // Manager
        // pick an employee and see their direct reports
            // matching the selected employee's id to all the employees where the manager id
            // matches the selected id
// Inserts
    // Department
        // Just a name
    // Role
        // Name
        // Salary
        // Pick a department (related by id to departments table)
    // Employee
        // first_name
        // last_name
        // pick a role (related by id to the roles table)
        // pick a manager (related by id to the employees table, can be NULL)
// Updates
    // Employee role
        // change their role_id
    // Employee Manager
        // change their manager_id
// WHERE TO START!??!?!
    // DEPARTMENTS!
        // just have a name
    // ROLES!
        // just have a name, salary, and a foreign key relating it to departments
    // EMPLOYEES!
        // first/last name, role, manager_id
        