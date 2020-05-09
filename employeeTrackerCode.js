const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log("***************************************")
  console.log("***************************************")
  console.log("*                                     *")
  console.log("*        EMPLOYEE                     *")
  console.log("*                                     *")
  console.log("*                 TRACKER             *")
  console.log("*                                     *")
  console.log("*                                     *")
  console.log("***************************************")
  console.log("***************************************")
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "View all Employees by Department",
        "View all Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all Employees":
          employeeView();
          break;

        case "View all Employees by Department":
          depView();
          break;

        case "View all Employees by Manager":
          managerView();
          break;

        case "Add Employee":
          addEmp();
          break;

        case "Remove Employee":
          delEmp();
          break;

        case "Update Employee Role":
          updateEmpRole();
          break;

        case "Update Employee Manager":
          updateEmpManager();
          break;
      }
    });
}

function employeeView() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    runSearch();
  })
}

function depView() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    runSearch();
  })
}

function managerView() {
  inquirer
    .prompt([{
      name: "managerID",
      type: "input",
      message: "What is the Manager ID to search?"
    }
    ]).then(function (answer) {
      var query = "SELECT * FROM employee WHERE manager_id = ?"

      connection.query(query, [answer.managerID] , function (err, results) {
        if (err) throw err;
        console.table(results);
        runSearch();
      });
    });
}


function addEmp() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the Employees first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the Employees last name?"
      },
      {
        name: "roleID",
        type: "input",
        message: "What is the Employees role ID?"
      },
      {
        name: "managerID",
        type: "input",
        message: "What is the Employees manager ID?"
      }
    ]).then(function (answer) {
      connection.query("INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleID,
          manager_id: answer.managerID
        },
        function (err) {
          if (err) throw err;
          console.log("Employee was created!!");
          // re-prompt the user for if they want to bid or post
          runSearch();
        }
      );

    })
}

function delEmp() {
  inquirer
    .prompt([{
      name: "roleID",
      type: "input",
      message: "What is the removed employee's role ID?"
    }
    ]).then(function (answer) {

      var query = "DELETE FROM employee WHERE role_id = ?";

      console.log(answer.roleID);

      connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        runSearch();
      });
    });
}

function updateEmpRole() {
  inquirer
    .prompt([
      {
        name: "currentRole",
        type: "input",
        message: "What is the ID number of the employee to update?"

      },

      {
        name: "roleUpdate",
        type: "input",
        message: "What role ID would you like to assign?"

      }


    ]).then(function (answer) {
      var query = "UPDATE employee SET role_id = ? WHERE role_id = ?";
      connection.query(query, [answer.roleUpdate, answer.currentRole], function (err, results) {
        if (err) throw err;
        console.table(results);
        runSearch();
      })

    })

}

function updateEmpManager() {
  inquirer
    .prompt([
      {
        name: "currentManager",
        type: "input",
        message: "What is the ID number of the employee to update?"

      },

      {
        name: "managerUpdate",
        type: "input",
        message: "What manager ID would you like to assign?"

      }


    ]).then(function (answer) {
      var query = "UPDATE employee SET manager_id = ? WHERE role_id = ?";
      connection.query(query, [answer.currentManager, answer.managerUpdate], function (err, results) {
        if (err) throw err;
        console.table(results);
        runSearch();
      })

    })

}