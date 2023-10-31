const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;


const con = mysql.createConnection({
  host: "localhost",
  port: "3306", // Optional, since 3306 is the default MySQL port
  user: "pk0523",
  password: "Fall2023",
  database: "milestone2"
});


con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
 
    con.query("SELECT * FROM recipe", (err, result) => {
      if (err) throw err;
      console.log("Data received from Db:");
      console.log(result);
    });
  });


app.use(cors());




app.get('/getData', (req, res) => {
    con.query('SELECT * FROM recipe', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Database query failed');
      } else {
        res.json(result);
      }
    });
});
 


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
