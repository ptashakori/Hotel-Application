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

module.exports = db;