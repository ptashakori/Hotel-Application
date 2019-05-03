var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var mkdirp = require('mkdirp');

const bcrypt = require('bcrypt');
var crypt = require('./app/crypt.js');
var db = require('./app/db');

var jwt = require('jsonwebtoken');

const fileUpload = require('express-fileupload');
app.use(fileUpload());

// allow access control 
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
})

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Hotel'
})

con.connect(function(err){
    if (err)
    {
        throw err;
    }
    else
    {
        console.log("Connected!");
    }
})

app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.use(bodyParser.json());

// you can see this on your browser, localhost:3001
app.get('/', function(req, res){
    res.send("Hello from index.js back end!");
})

app.post('/create', function(request, response){
    console.log("Hello from inside the post create backend..!");
    
    console.log(request.body);

    if (!request.body.guest_id || !request.body.firstname || !request.body.lastname || !request.body.phone_number || !request.body.password)
    {
        response.status(400).json({success: false, message: "Please enter guest ID, first name, last name, phone number and password."});
    }
    else
    {
        var newUser = 
        {
            guest_id: request.body.guest_id,
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            phone_number: request.body.phone_number,
            password: request.body.password
        };

        // attempt to save user
        db.createUser(newUser, function(res){
            response.status(201).json({success: true, message: "Successfully created new user!"});
        }, function(err){
            console.log(err);
            return response.status(400).json({success: false, message: "Could not create user!"});
        })
    }
});

app.post('/createemp', function(request, response){
    console.log("Hello from inside the post create employee backend..!");
    
    console.log(request.body);

    if (!request.body.emp_id || !request.body.emp_ssn || !request.body.emp_firstname || !request.body.emp_lastname || !request.body.emp_dob || !request.body.emp_salary || ! request.body.emp_password || !request.body.emp_dno)
    {
        response.status(400).json({success: false, message: "Please enter guest ID, first name, last name, phone number and password."});
    }
    else
    {
        var newEmployee = 
        {
            emp_id: request.body.emp_id,
            emp_ssn: request.body.emp_ssn,
            emp_firstname: request.body.emp_firstname,
            emp_lastname: request.body.emp_lastname,
            emp_dob: request.body.emp_dob,
            emp_salary: request.body.emp_salary,
            emp_password: request.body.emp_password,
            emp_dno: request.body.emp_dno
        };

        // attempt to save employee
        db.createEmployee(newEmployee, function(res){
            response.status(201).json({success: true, message: "Successfully created new employee!"});
        }, function(err){
            console.log(err);
            return response.status(400).json({success: false, message: "Could not create employee!"});
        })
    }
});

app.post('/login', function(request, response){
    console.log("Hello from inside the (post) login backend..!");

    db.findUser({
        guest_id: request.body.guest_id

    }, function(res){

        var user = 
        {
            guest_id: res[0].guestID,
            firstname: res[0].guestFName,
            lastname: res[0].guestLName,
            phone_number: res[0].guestPhoneNumber,
            password: res[0].guestPassword
        };

        // check if password matches
        crypt.compareHash(request.body.password, user.password, function(err, isMatch){
            if (isMatch && !err)
            {
                // create token if the password matched and no error was thrown
                var token = jwt.sign(user, "Passphrase for encryption should be 45-50 chars long", {
                    expiresIn: 10080 // in seconds
                });

                console.log("Login successful!");
                response.cookie('cookie', user.guest_id, {maxAge: 900000, httpOnly: false, path: '/'});
                
                response.status(200).json({success: true, token: 'JWT ' + token});
            }
            else
            {
                console.log("Login NOT successful!");

                response.status(401).json({success: false, message: "Authentication failed. Passwords do not match!"});
            }
        }, function(err){

            console.log("Login NOT successful!");
            
            console.log(err);
            response.status(401).json({success: false, message: "Authentication failed. Guest not found!"});

        }, function(err){

            console.log("Login NOT successful!");

            console.log(err);
            response.status(401).json({success: false, message: "Authentication failed. Guest not found!"});
        });
    })
})

app.post('/emplogin', function(request, response){
    console.log("Hello from inside the (post) employee login backend..!");

    db.findEmployee({
        emp_id: request.body.emp_id

    }, function(res){

        var employee = 
        {
            emp_id: res[0].employeeID,
            emp_ssn: res[0].employeeSSN,
            emp_firstname: res[0].employeeFName,
            emp_lastname: res[0].employeeLName,
            emp_dob: res[0].employeeDOB,
            emp_salary: res[0].employeeSalary,
            emp_password: res[0].employeePassword,
            emp_dno: res[0].dno
        };

        // check if password matches
        crypt.compareHash(request.body.emp_password, employee.emp_password, function(err, isMatch){
            if (isMatch && !err)
            {
                // create token if the password matched and no error was thrown
                var token = jwt.sign(employee, "Passphrase for encryption should be 45-50 chars long", {
                    expiresIn: 10080 // in seconds
                });

                console.log("Login successful!");
                response.cookie('cookie', employee.emp_id, {maxAge: 900000, httpOnly: false, path: '/'});
                
                response.status(200).json({success: true, token: 'JWT ' + token});
            }
            else
            {
                console.log("Login NOT successful!");

                response.status(401).json({success: false, message: "Authentication failed. Passwords do not match!"});
            }
        }, function(err){

            console.log("Login NOT successful!");
            
            console.log(err);
            response.status(401).json({success: false, message: "Authentication failed. Employee not found!"});

        }, function(err){

            console.log("Login NOT successful!");

            console.log(err);
            response.status(401).json({success: false, message: "Authentication failed. Employee not found!"});
        });
    })
})

app.listen(3001, function(req, res){
    console.log("Port 3001 is open and ready!");
});