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
      type: "list",
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
      console.log(answer.action)
       switch (answer.action) {
         case "View All Employees":
          findAllEmployees();
           break;

         case "View All Departments":
           findAllDepartments();
           break;

       
         case "View All Roles":
           findAllroles();
           break;

         case "Add Employee":
           AddEmployee();
           break;

        
         case "Update Employee Roll":
          UpdateRole();
           break;

        
         case "Add Roll":
           AddRoll();
           break;
        
         case "Add Department":
           AddDepartment();
           break;

       
       }
    });
}


  function findAllEmployees() {
    connection.query("SELECT * FROM employee ",
    
    function(err, result) {
      if (err) throw err;
      console.table(result)
      // console.log("SELECT * FROM employee ");
      runSearch();
    })
  }


function findAllDepartments() {
  connection.query("SELECT * FROM department ",
    
  function(err, result) {
    if (err) throw err;
    console.table(result)
    // console.log("SELECT * FROM employee ");
    runSearch();
  })
}



function findAllroles() {
  connection.query("SELECT * FROM role ",
    
  function(err, result) {
    if (err) throw err;
    console.table(result)
    // console.log("SELECT * FROM employee ");
    runSearch();
  })
}

function UpdateRole() {
  connection.query("SELECT * FROM role INNER JOIN department ON role.department_id = department.id ", function(err, results) {
    if (err) throw err;
    console.log(results)
    const roleArray = [];
    for (var i = 0; i < results.length; i++) {
      roleArray.push(results[i].title + '-' + results[i].salary + '-' + results[i].name);
    }
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: roleArray,
          message: "What role would you like to update?"
        },
        {
          name: "field",
          type: "list",
          choices: ["title", "salary"],
          message: "what field will you like to update?"
        },
        {
          name: "value",
          type: "input",
          message: "what is the new field value"
          
        }
      ])
      .then(function(answer) {
        let roleId 
        for (var i = 0; i < results.length; i++) {
          if(answer.choice.split('-')[0] === results[i].title) roleId = results[i].id 
        }
        connection.query(
          "UPDATE role SET ?? = ? WHERE id = ?",
          [
            answer.field, answer.value, roleId
          ],
          function(error) {
            if (error) throw err;
            console.log(answer.field + " changed to " + answer.value);
            runSearch();
          }
        );
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
