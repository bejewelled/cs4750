const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;


const con = mysql.createConnection({
  host: "mysql01.cs.virginia.edu", // Optional, since 3306 is the default MySQL port
  user: "jtg7sz",
  password: "Fall2023",
  database: "jtg7sz"
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
