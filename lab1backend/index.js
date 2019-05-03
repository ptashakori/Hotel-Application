var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var mkdirp = require('mkdirp');

const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKey');

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
});

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Hotel'
})

var profileEmail = null;

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

// allows us to use req.body
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send("Hello from index.js back end!");
})

app.post('/login', function(req, res){
    console.log("Hello from inside the post login back end.. ");

    var guest_id = req.body.guest_id;
    var password = req.body.password;

    var sql = "SELECT guestPassword FROM Guest WHERE guestID = " + 
    mysql.escape(guest_id);
    con.query(sql, function(err, result){

        const decryptPassword = cryptr.decrypt(result[0].guestPassword);

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

app.post('/emplogin', function(req, res){
    console.log("Hello from inside the post employee login back end.. ");

    var emp_id = req.body.emp_id;
    var password = req.body.password;

    var sql = "SELECT employeePassword FROM Employee WHERE employeeID = " + 
    mysql.escape(emp_id);
    con.query(sql, function(err, result){

        const decryptPassword = cryptr.decrypt(result[0].employeePassword);

        if (password === decryptPassword)
        {
            console.log("Valid password!");

            res.cookie('cookie', req.body.emp_id, {maxAge: 900000, httpOnly: false, path : '/'});
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

app.post('/create', function(req, res){
    console.log("Hello from inside the post create back end.. ");

    const encryptPassword = cryptr.encrypt(req.body.password);

    var sql = "INSERT INTO Guest (guestID, guestFName, guestLName, guestPhoneNumber, guestPassword) VALUES ( " +
    mysql.escape(req.body.guest_id) + ", " +
    mysql.escape(req.body.firstname) + ", " +
    mysql.escape(req.body.lastname) + ", " + 
    mysql.escape(req.body.phone_number) + ", " +
    mysql.escape(encryptPassword) + " )";

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
})

app.post('/empcreate', function(req, res){
    console.log("Hello from inside the post employee create back end.. ");

    const encryptPassword = cryptr.encrypt(req.body.password);

    var sql = "INSERT INTO Employee (employeeID, employeeSSN, employeeFName, employeeLName, employeeDOB, employeeSalary, employeePassword, dno) VALUES ( " +
    mysql.escape(req.body.emp_id) + ", " +
    mysql.escape(req.body.ssn) + ", " +
    mysql.escape(req.body.firstname) + ", " +
    mysql.escape(req.body.lastname) + ", " + 
    mysql.escape(req.body.dob) + ", " +
    mysql.escape(req.body.salary) + ", " +
    mysql.escape(encryptPassword) + ", " + 
    mysql.escape(req.body.dno) + ")";

    con.query(sql, function(err, result){
        if (err)
        {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Error while creating employee..");
            console.log("Error while creating employee!");
        }
        else
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })

            res.end('Employee created successfully!');
            console.log("Employee created successfully!");
        }
    })
})

app.listen(3001, function(){
    console.log("Back end is running on port 3001.. ");
})