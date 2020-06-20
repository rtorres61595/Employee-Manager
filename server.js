const mysql = require("mysql");
const inquirer = require("inquirer");
const DB = require("./db");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employee_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Managers",
        "View All Roles",
        "Add Employee",
        "Remove Employee",
        "Update Employee Roll",
        "Update Employee Manager",
        "Add Roll",
        "Remove Roll",
        "Add Department",
        "Quit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          findAllEmployees();
          break;

        case "View All Departments":
          findAllDepartments();
          break;

        case "View All Managers":
          findAllmanagers();
          break;

        case "View All Roles":
          findAllroles();
          break;

        case "Add Employee":
          AddEmployee();
          break;

        case "Remove Employee":
          RemoveEmployee();
          break;

        case "Update Employee Roll":
          UpdateEmployeeRoll();
          break;

        case "Update Employee Manager":
          UpdateEmployeeManager();
          break;
        case "Add Roll":
          AddRoll();
          break;
        case "Remove Roll":
          RemoveRoll();
          break;
        case "Add Department":
          AddDepartment();
          break;

        case "Quit":
          Quit();
          break;  
      }
    });
}

function findAllEmployees() {
  inquirer
    .prompt({
      name: "employee",
      type: "list",
      message: "view all employees by ",
      choices: ["Name", "Manager id", "Role id"],
    })
    .then(function (answer) {
      const query =
        "SELECT first_name, last_name, role_id, manager_id FROM employee WHERE ?";
      connection.query(query, { employee: answer.employee }, function (err,res) {
        for (const i = 0; i < res.length; i++) {
          console.log(
            "Name: " +
              res[i].first_name +
              " || Last Name: " +
              res[i].last_name +
              " ||  Role: " +
              res[i].role_id +
              " || Manager: " +
              res[i].manager_id
          );
        }
        runSearch();
      });
    });
}

function findAllDepartments() {
  inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "view all Departments by ",
      choices: ["Name"]
    })
    .then(function (answer) {
      const query =
        "SELECT name, FROM department WHERE ?";
      connection.query(query, { department: answer.department }, function (err,res) {
        for (const i = 0; i < res.length; i++) {
          console.log(
            "Name: " + res[i].name  
          );
        }
        runSearch();
      });
    });
}

function findAllmanagers() {
  inquirer
    .prompt({
      name: "manager",
      type: "list",
      message: "view all employees by ",
      choices: ["Name", "Manager id"]
    })
    .then(function (answer) {
      const query =
        "SELECT first_name, last_name, role_id, manager_id FROM employee WHERE ?";
      connection.query(query, { employee: answer.employee }, function (err,res) {
        for (const i = 0; i < res.length; i++) {
          console.log(
            "Name: " +
              res[i].first_name +
              " || Last Name: " +
              res[i].last_name +
              " ||  Role: " +
              res[i].role_id +
              " || Manager: " +
              res[i].manager_id
          );
        }
        runSearch();
      });
    });
}
  


function findAllroles() {
  inquirer
    .prompt({
      name: "role",
      type: "list",
      message: "view all roles by ",
      choices: ["Title", "Salary", "Department id"],
    })
    .then(function (answer) {
      const query =
        "SELECT title, salary, department_id, FROM role WHERE ?";
      connection.query(query, { employee: answer.employee }, function (err,res) {
        for (const i = 0; i < res.length; i++) {
          console.log(
            "Title: " +
              res[i].title +
              " || Salary: " +
              res[i].salary +
              " ||  Department id: " +
              res[i].department_id 
          );
        }
        runSearch();
      });
    });
}

function UpdateEmployeeRoll() {
  connection.query("SELECT * FROM employee", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to newRoll on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var employeeArray = [];
            for (var i = 0; i < results.length; i++) {
              employeeArray.push(results[i].first_name,last_name);
            }
            return employeeArray;
          },
          message: "What would you like to do?"
        },
        {
          name: "newRole",
          type: "input",
          message: "what new role will this employee have?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var updatedEmployee;
        for (var i = 0; i < results.length; i++) {
          if (results[i].first_name.last_name === answer.choice) {
            updatedEmployee = results[i];
          }
        }

        // determine if newRoll was high enough
        if (updatedEmployee,first_name,last_name === parseInt(answer.newRole)) {
          // newRoll was high enough, so update db, let the user know, and runSearch over
          connection.query(
            "UPDATE auctions SET ? WHERE ?",
            [
              {
                id: updatedEmployee,first_name,last_name
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("newRoll placed successfully!");
              runSearch();
            }
          );
        }
      });
  });
}

 
  function AddEmployee() {
    // prompt for info about the Employee being put up for auction
    inquirer
      .prompt([
        {
          name: "employee",
          type: "input",
          message: "What is the Employee name?"
        },
        {
          name: "employeeLastname",
          type: "input",
          message: "What is the Employee last name?"
        },
        {
          name: "roll",
          type: "input",
          message: "What is the employee roll id?"
          
        },
         
      ])
      .then(function(answer) {
        // when finished prompting, insert a new Employee into the db with that info
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.employee,
            last_name: answer.employeeLastname,
            role_id: answer.roll,
          },
          function(err) {
            if (err) throw err;
            console.log("employee made!");
            runSearch();
          }
        );
      });
  }
    
  


function RemoveEmployee() {
  inquirer
    .prompt({
     
  })
     runSearch();
  
}

function UpdateEmployeeManager() {
  inquirer
    .prompt({
     
  })
     runSearch();
  
}

function AddRoll() {
  // prompt for info about the Employee being put up for auction
  inquirer
  .prompt([
    {
      name: "title",
      type: "input",
      message: "What is the title role?"
    },
    {
      name: "salary",
      type: "input",
      message: "what is the salary for the role?"
    },
    {
      name: "department",
      type: "input",
      message: "What is the department id?"
      
    },
     
  ])
  .then(function(answer) {
    // when finished prompting, insert a new Employee into the db with that info
    connection.query(
      "INSERT INTO role SET ?",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.department,
      },
      function(err) {
        if (err) throw err;
        console.log("role made!");
        runSearch();
      }
    );
  });
}

function RemoveRoll() {
  inquirer
    .prompt({
     
  })
     runSearch();
  
}

function Quit() {
  inquirer
    .prompt({
     
  })
     runSearch();
  
}


// view all employyes
// view all employyees by department
// view all employees by managor id
// add employee

// remove employee
// updated employee roll
// update employee managor
// view all rolls
// add roll
// remove roll
// view all departments
// add department
// quit
