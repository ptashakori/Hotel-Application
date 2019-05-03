var db = {};
var crypt = require('./crypt');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Hotel'
})

db.createUser = function(user, successCallback, failureCallback)
{
    var passwordHash;
    crypt.createHash(user.password, function(res){
        passwordHash = res;

        con.connect(function(err){
            if (err)
            {
                throw err;
            }
            else
            {
                console.log("MySQL connection successful!");
                var sql = "INSERT INTO Guest (guestID, guestFName, guestLName, guestPhoneNumber, guestPassword) VALUES (" +
                mysql.escape(user.guest_id) + ", " +
                mysql.escape(user.firstname) + ", " + 
                mysql.escape(user.lastname) + ", " + 
                mysql.escape(user.phone_number) + ", " + 
                mysql.escape(passwordHash) + ")";
                
                con.query(sql, function(err, result){
                    if (err)
                    {
                        console.log(err);
                        failureCallback(err);
                        return;
                    }

                    console.log("SUCCESS!");
                    successCallback();
                })

            }
        })
    })
}

db.createEmployee = function(employee, successCallback, failureCallback)
{
    var passwordHash;
    crypt.createHash(employee.emp_password, function(res){
        passwordHash = res;

        con.connect(function(err){
            if (err)
            {
                throw err;
            }
            else
            {
                console.log("MySQL connection successful!");
                var sql = "INSERT INTO Employee (employeeID, employeeSSN, employeeFName, employeeLName, employeeDOB, employeeSalary, employeePassword, dno) VALUES (" +
                mysql.escape(employee.emp_id) + ", " +
                mysql.escape(employee.emp_ssn) + ", " + 
                mysql.escape(employee.emp_firstname) + ", " + 
                mysql.escape(employee.emp_lastname) + ", " + 
                mysql.escape(employee.emp_dob) + ", " +
                mysql.escape(employee.emp_salary) + ", " + 
                mysql.escape(passwordHash) + ", " + 
                mysql.escape(employee.emp_dno) + ")";
                
                con.query(sql, function(err, result){
                    if (err)
                    {
                        console.log(err);
                        failureCallback(err);
                        return;
                    }

                    console.log("SUCCESS!");
                    successCallback();
                })

            }
        })
    })
}

db.findUser = function(user, successCallback, failureCallback)
{
    con.connect(function(err){
        if (err)
        {
            throw err;
        }
        else
        {
            console.log("MySQL connection successful!");

            var sql = "SELECT * FROM Guest WHERE guestID = " + 
            mysql.escape(user.guest_id);

            con.query(sql, function(err, result){
                if (err)
                {
                    console.log("Unable to find guest!");

                    failureCallback(err);
                    return;
                }
                else
                {
                    console.log("Guest found!");
                    console.log(JSON.stringify(result[0]));

                    successCallback(result);
                }
            })
        }
    })
}

db.findEmployee = function(employee, successCallback, failureCallback)
{
    con.connect(function(err){
        if (err)
        {
            throw err;
        }
        else
        {
            console.log("MySQL connection successful!");

            var sql = "SELECT * FROM Employee WHERE employeeID = " + 
            mysql.escape(employee.emp_id);

            con.query(sql, function(err, result){
                if (err)
                {
                    console.log("Unable to find employee!");

                    failureCallback(err);
                    return;
                }
                else
                {
                    console.log("Employee found!");
                    console.log(JSON.stringify(result[0]));

                    successCallback(result);
                }
            })
        }
    })
}

module.exports = db;
