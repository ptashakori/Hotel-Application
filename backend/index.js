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

app.post('/emplogin', function(req, res){
    console.log("Hello from inside the (post) employee login backend..!");

    var sql = "SELECT employeePassword From Employee WHERE employeeID = " + 
    mysql.escape(employee_id);

    con.query(sql, function(err, result){
        if (result.length > 0)
        {
            bcrypt.compare(req.body.password, result[0].employeePassword, function(err, success){
                if (success == true)
                {
                    console.log("Valid password!");

                    res.cookie('cookie', guest_id, {maxAge: 900000, httpOnly: false, path: '/'});

                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })

                    res.end("Successful login!");
                }
                else
                {
                    console.log("Invalid password!");

                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })

                    res.end("Invalid credentials!");
                }
            })
        }
    })
})

app.listen(3001, function(req, res){
    console.log("Port 3001 is open and ready!");
});