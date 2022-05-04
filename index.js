const express = require("express")
const fileUpload = require('express-fileupload')
const app = express()
const cookieSession = require('cookie-session');


const mysql = require('mysql')

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'employee'
})

app.use(fileUpload());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: 'afsgdhfdgsfadasfhg'
  })
);

var currentuser = "";

// app.use(express.static(path.join(__dirname, 'client', 'build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return;
    }
    var sql = "SELECT password, eno FROM login_details WHERE username='"+username+"'";
    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      }
      var pass = JSON.parse(JSON.stringify(result))[0]['password'];
      var eno = JSON.parse(JSON.stringify(result))[0]['eno'];
      if(pass === password){
        currentuser = username;
        var sql = `INSERT INTO currentuser VALUES('${username}',${eno})`;
        connection.query(sql, function (err, result) {
          connection.release();
          if (err) {
            throw err;
          }
        })
        res.send({
          token: 'ufhsdgkhjckmaxdsyugaodjkx'
        });
      }
      else{
        res.send("Wrong Credentials")
      }
    })
  })



  // if (username == "admin" && password == "admin") {
  //   res.send({
  //     token: 'ufhsdgkhjckmaxdsyugaodjkx'
  //   });
  // }
  // else {
  //   res.send("Wrong Credentials")
  // }
});

app.post('/currentuser', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return;
    }
    var sql = "SELECT username FROM currentuser";
    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      }
      var username = JSON.parse(JSON.stringify(result))[0]['username'];
      res.send(username);
    })
  })
    
});


app.post('/logout', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return;
    }
    var sql = "DELETE FROM currentuser";
    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      }
      currentuser = "";
      })
    })
});


app.post('/allemployees', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return;
    }
    var sql = "SELECT name FROM employee_details;";
    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      }
      var employees = JSON.parse(JSON.stringify(result));
      employee_names = []
      for(var i=0;i<employees.length;i++){
        employee_names.push(employees[i]['name'])
      }
      res.send(employee_names);  
    })
  })
});


app.post('/performancescore', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return;
    }
    //getting employee number
    var sql = "SELECT eno FROM currentuser";
    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      }
      var eno = JSON.parse(JSON.stringify(result))[0]['eno'];
      //getting all review scores
      var sql = "SELECT * FROM employee_rating WHERE eno="+eno;
      connection.query(sql, function (err, result) {
        if (err) {
          throw err;
        }
        var rows = JSON.parse(JSON.stringify(result))[0];
        if(rows == undefined){
          res.send("No one Reviewed Your Profile.")
        }
        else{
          var score = (rows['leadership'] + rows['teamwork'] + rows['creativity'] + rows['problem_solving']) / 4
          rows['Performance Score'] = score;
          var sql = `UPDATE employee_details SET performance_score = ${score} WHERE eno = ${eno}`;
          connection.query(sql, function (err, result) {
            if (err) {
              throw err;
            }
            
          })
          res.send(rows)

        }
  
  
      })



    })
  })
});





app.post('/insertdetails', (req, res) => {
  console.log(req.body);
  const details = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return;
    }
    var sql = "SELECT eno FROM employee_details WHERE name='"+details.employee_name+"'";
    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      }
      var eno = JSON.parse(JSON.stringify(result))[0]['eno'];
      //to get past feedbacks on this eno
      var sql = "SELECT * FROM employee_rating WHERE eno="+eno;
      connection.query(sql, function (err, result) {
        if (err) {
          throw err;
        }
        var rows = JSON.parse(JSON.stringify(result))[0];
        console.log(rows)
        if(rows != undefined){
          console.log("GGG")
          //bring all the data and calculate and update
          var count = rows['total_reviews'] + 1
          var leadership_new = ((rows['leadership']*rows['total_reviews']) + Number(details['leadership'])) / count
          var teamwork_new = ((rows['teamwork']*rows['total_reviews']) + Number(details['teamwork'])) / count
          var creativity_new = ((rows['creativity']*rows['total_reviews']) + Number(details['creativity'])) / count
          var problemsolving_new = ((rows['problem_solving']*rows['total_reviews']) + Number(details['problemsolving'])) / count
          var sql = `REPLACE INTO employee_rating VALUES(${eno},${leadership_new},${teamwork_new},${creativity_new},${problemsolving_new},${count})`
          connection.query(sql, function (err, result) {
            if (err) {
              throw err;
            }
          })
        }
        else{
          //Insert directly
          var sql = `INSERT INTO employee_rating VALUES(${eno},${details.leadership},${details.teamwork},${details.creativity},${details.problemsolving},1)`
          connection.query(sql, function (err, result) {
            if (err) {
              throw err;
            }

          })

        }
      })
    })
  })
  res.sendStatus(200);
});



const temp_port = 80;
const PORT = process.env.PORT || temp_port
app.listen(PORT, () => {
  console.log("Server is up at port ", PORT)
})