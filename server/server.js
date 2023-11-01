const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;


const con = mysql.createConnection({
  // host: "mysql01.cs.virginia.edu", // Optional, since 3306 is the default MySQL port
  // user: "jtg7sz",
  // password: "Fall2023",
  // database: "jtg7sz"
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
 

app.post('/addRecipe', (req, res) => {
  const { title, description, ingredients, amounts, directions, tags, userId } = req.body;
  
  console.log('Received a request to add a recipe with title:', title);
  
  con.query('INSERT INTO Recipe (title, description) VALUES (?, ?)', [title, description], (err, result) => {
    if (err) {
      console.error('Error inserting recipe:', err);
      return res.status(500).send('Failed to insert recipe');
    }
    
    const recipeId = result.insertId;
    console.log('Inserted recipe with ID:', recipeId);

    ingredients.forEach(ingredient => {
      con.query('INSERT INTO Recipe_Ingredients (recipe_id, ingredient_name) VALUES (?, ?)', [recipeId, ingredient.name], (err, result) => {
        if (err) {
          console.error('Error inserting ingredient:', ingredient.name, err);
        } else {
          console.log('Inserted ingredient:', ingredient.name);
        }
      });
    });

    amounts.forEach(amount => {
      con.query('INSERT INTO Ingredients_Amounts (recipe_id, ingredient_id, unit, value) VALUES (?, ?, ?, ?)', [recipeId, amount.ingredientId, amount.unit, amount.value], (err, result) => {
        if (err) {
          console.error('Error inserting amount for ingredient ID:', amount.ingredientId, err);
        } else {
          console.log('Inserted amount for ingredient ID:', amount.ingredientId);
        }
      });
    });

    directions.forEach(direction => {
      con.query('INSERT INTO Recipe_Directions (recipe_id, instruction) VALUES (?, ?)', [recipeId, direction], (err, result) => {
        if (err) {
          console.error('Error inserting direction:', direction, err);
        } else {
          console.log('Inserted direction:', direction);
        }
      });
    });

    tags.forEach(tag => {
      con.query('INSERT INTO Tags (recipe_id, tag_name, type) VALUES (?, ?, ?)', [recipeId, tag.name, tag.type], (err, result) => {
        if (err) {
          console.error('Error inserting tag:', tag.name, 'of type', tag.type, err);
        } else {
          console.log('Inserted tag:', tag.name, 'of type', tag.type);
        }
      });
    });

    con.query('INSERT INTO Created_by (user_id, recipe_id) VALUES (?, ?)', [userId, recipeId], (err, result) => {
      if (err) {
        console.error('Error associating user with recipe:', err);
        return res.status(500).send('Failed to associate user with recipe');
      } else {
        console.log('Associated user ID:', userId, 'with recipe ID:', recipeId);
        res.status(200).send('Recipe added successfully');
      }
    });
  });
});


// Consider using SQL transactions since you have multiple insert operations that depend on each other. This way, if one fails, you can rollback the entire transaction to maintain data integrity.

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
