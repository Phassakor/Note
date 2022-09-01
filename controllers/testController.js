const db = require('../database/dbTest')
const path = require('path');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt')
// req.params อ่านข้อมูลตัว variable ที่เรา set ให้กับตัว route ที่เป็น /:id
// req.query อ่านข้อมูลของ query string ที่ user ส่งเข้ามาผ่าน url   ใช้ร่วมกับ method:get ในกรณีที่ส่งข้อมูลมาทาง html input
// req.body การอ่านข้อมูลที่ user ส่งมาผ่าน request body  ใช้ร่วมกับ method:post ส่งข้อมูลมาทาง html หรือ postman 
// res.json() ส่งข้อมูล json กลับไปหา client 



exports.getTest =  (req, res) => {
    res.send('Hello '+req.body.str1)
}

exports.login =  (req, res) => {
    res.sendFile(path.join(__dirname + '../../login/login.html'));
}

exports.auth =  (request, response) => {
    var usernamet = request.body.username;
	var passwordt = request.body.password;
	if (usernamet && passwordt) {
		db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [usernamet, passwordt], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = usernamet
				response.redirect('/getStr');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
}

exports.getStr =  (request, response) => {
    db.query("SELECT email FROM accounts", function (err, result, fields) {
		if (err) throw err;
		//request.session.logemail = true;
		
		Object.keys(result).forEach(function(key) {
			var row = result[key];
			console.log(row.email)	
			request.session.email = row.email;
			response.redirect('/home');
		 });
		 
	});
}

/* 
exports.getstr =  (request, response) => {
db.query("SELECT author FROM books WHERE id=1", function (err, result, fields) {
    if (err) throw err;
    //request.session.logemail = true;
    
    Object.keys(result).forEach(function(key) {
        var row = result[key];
        console.log(row.author)	
        request.session.email = row.author;
        response.redirect('/home');
        });
        
});
}
*/

exports.home =  (request, response) => {
    if (request.session.loggedin) {
		//response.send('Welcome back, ' + request.session.anyDB + '!');
		response.send('Welcome back, ' + request.session.email + '!');
		//response.send('Welcome back, ' + request.session.username + '!');
		
	} else {
		response.send('Please login to view this page!');
	}

	response.end();
}


//login
exports.userLogin =  (req, res) => {
    res.sendFile(path.join(__dirname + '../../login/userLogin.html'));
}

exports.getUser = (req,res) =>{
    db.query("SELECT * FROM persons", function (err, result, fields) {
       
       let message = "";
       if (result === undefined || result.length == 0) {
           message = 'User table is empty';
       }
       else{
           message = "Successfully retrieved all User";
       }
       var d = new Date()
       //console.log(d.toLocaleDateString())
       return res.send({error:false,data:result,message:message+ " //Search : "+ d.toLocaleString()});
    })
}

exports.getUserByID = (req,res) => {
    let id = req.params.id;
	db.query(`SELECT * FROM persons WHERE userID=${id}`, function (err, result, fields) {
		if (err) throw err;
        let message = ""
        if (result === undefined || result.length == 0) {
            message = 'User not found';
        }
        else{
            message = "Successfully retrieved User data";
        }
        return res.send({error:false,data:result,message:message}); 
	});
}


exports.loginUser = (req,res) =>{
    var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		db.query('SELECT * FROM persons WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
                req.session.status = 'wellcome : '
                Object.keys(results).forEach(function(key) {
                    var row = results[key];	
                    req.session.key = row.secretKey
                });
			} else {
                req.session.status = 'Login Failed Incorrect Username or Password! '
			}	
            res.redirect('/userHomeLogin');
		});
	}else {
		res.send('Please enter Username and Password!');
	}
}

/*
exports.registerUser = (req,res) =>{
   var userName = req.body.username; 
   var passWord = req.body.password; 
   var phone = req.body.phone; 
   var email = req.body.email;
   var firstName = req.body.firstName; 
   var lastName = req.body.lastName; 

   function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
     return result;
    }

   var secretKey = userName+makeid(5);

   if (!userName || !passWord || !phone || !email || !firstName || !lastName) {
        //return res.status(400).send({ error:true, message: 'Please input all data.' });
        res.status(400).send('Please input all data.')
   }else{
        db.query("SELECT username FROM persons WHERE username = '"+ userName +"'", function(err, result, field){

            if(result.length === 0){
                db.query(`INSERT INTO persons (username, password, phone, email, firstName,lastName,secretKey) VALUES(?,?,?,?,?,?,?)`,
                [userName,passWord,phone,email,firstName,lastName,secretKey], (error, results, fields) => {
                    if(error){
                        message = "Register Failed";
                    }
                    else{
                        message = "Register successfully"
                    }
                //return res.send({error:false,data:results,message:message});
                res.send(message)
                })
            }else{  
                res.status(400).send('Username is used or try another username')
            }
        })
    
   }
}
*/

exports.registerUser = (req,res) =>{
    var userName = req.body.username; 
    var passWord = req.body.password; 
    var phone = req.body.phone; 
    var email = req.body.email;
    var firstName = req.body.firstName; 
    var lastName = req.body.lastName; 
  
    let jwtToken = jwt.sign({
        userName: userName,
        passWord: passWord
    }, 
    "create-authen-nodejs", {
        expiresIn: "1h"
    });
    //ใส่ข้อความอะไรก็ได้ ตรง create-authen-nodejs หรือ process.env.TOKEN_KEY เป็นข้อความจาก ไฟล์ env

    var secretKey = jwtToken;
    db.query("SELECT username FROM persons WHERE username = '"+ userName +"'", function(err, result, field){

        if(result.length === 0){
            db.query(`INSERT INTO persons (username, password, phone, email, firstName,lastName,secretKey) VALUES(?,?,?,?,?,?,?)`,
            [userName,passWord,phone,email,firstName,lastName,secretKey], (error, results, fields) => {
                if(error){
                    res.status(400).send(`
                        <script>
                            alert("Register Failed Something Wrong + ${error}");
                            window.history.back();
                        </script>  
                    `)
                }
                else{
                    res.send(`
                        <script>
                            alert("Register successfully");
                            location.href = '/getUser' 
                        </script>  
                    `)
                }
            })
        }else{  
            res.status(400).send(`
            <script>
                alert("Username is used or try another username");
                window.history.back();
            </script>  
            `)
        }
    })
 }
 

exports.userHomeLogin = (req,res) =>{
    db.query("SELECT username, secretKey FROM persons WHERE secretKey = '"+ req.session.key +"'", function(err, result, field){
        Object.keys(result).forEach(function(key) {
            var row = result[key];	
            req.session.name = row.username
        });
        if(result.length === 0){
           //res.send(`<script>alert("${req.session.status}")</script>`+`<script> window.history.back();</script>`)
            res.send(`
            <script>
                alert("${req.session.status}");
                window.history.back();
            </script>  
            `)
        }else{  
            // res.send(`<script>alert("${req.session.status+'  '+req.session.name}")</script>`+ 
            //          `<script> location.href = '/getUser'  </script>` )
            res.send(`
                <script>
                    alert("${req.session.status+'  '+req.session.name}");
                    location.href = '/getUser' 
                </script>  
            `)
        }
    })
    
}

exports.getDay = (req,res) =>{
    var d = new Date()
    //เดือน เป็น 0-11 0 คือ ม.ค. 11 คือ ธ.ค.
    res.send(d.getDate()+' '+d.getMonth()+' '+d.getFullYear().toString().substr(-2))
}

exports.test = (req,res) =>{
    res.send(req.body);
}

exports.logout = (req,res) =>{
    req.session.destroy();
    res.redirect('/userLogin')
}

/*
exports.checkUser = (req,res) =>{
    var userName = req.body.username; 
    db.query("SELECT username FROM persons WHERE username = '"+ userName +"'", function(err, result, field){

    if(result.length === 0){
           res.send('User Empty')
    }else{  
        res.send('xisting user, redirect to another page ')
     }


    })
}*/
