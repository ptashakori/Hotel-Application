var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var mkdirp = require('mkdirp');

var Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKey');

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

app.post('/create', function(req, res){
    console.log("Hello from inside the post create back end.. ");

    const encryptPassword = cryptr.encrypt(req.body.password);

    var sql = "INSERT INTO Guest (guestID, guestFName, guestLName, guestPhoneNumber, guestPassword) VALUES ( " +
    mysql.escape(req.body.guest_id) + ", " +
    mysql.escape(req.body.firstname) + ", " +
    mysql.escape(req.body.lastname) + ", " +
    mysql.escape(req.body.phone_number) + ", " +
    mysql.escape(encryptPassword) + ")";

    con.query(sql, function(err, result){
        if (err)
        {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Error while creating guest..");
            console.log("Error while creating guest!");
        }
        else
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })

            res.end('Guest created successfully!');
            console.log("Guest created successfully!");
        }
    })
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

app.post('/login', function(req, res){
    console.log("Hello from inside the post login back end.. ");

    var guest_id = req.body.guest_id;
    var password = req.body.password;

    var sql = "SELECT guestPassword FROM Guest WHERE guestID = " + 
    mysql.escape(guest_id);
    con.query(sql, function(err, result){

        console.log(result[0].guestPassword);

        const decryptPassword = cryptr.decrypt(result[0].guestPassword);
        console.log(decryptPassword);

        if (password === decryptPassword)
        {
            console.log("Valid password!");

            res.cookie('cookie', req.body.guest_id, {maxAge: 900000, httpOnly: false, path : '/'});
            //req.session.user = result;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })

            res.end("Successful login");
            console.log("Successful login!");
        }
        else
        {
            console.log("Invalid password!");

            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Invalid credentials");
            console.log("Invalid credentials!");
        }
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