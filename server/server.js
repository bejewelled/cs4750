const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const app = express();
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());


const port = 3000;


const con = mysql.createConnection({
  // host: "mysql01.cs.virginia.edu", // Optional, since 3306 is the default MySQL port
  // user: "jtg7sz",
  // password: "Fall2023",
  // database: "jtg7sz"
  host: "mysql01.cs.virginia.edu",
  port: "3306", // Optional, since 3306 is the default MySQL port
  user: "ft9kr",
  password: "Passwordforphp",
  database: "ft9kr_b"
});


con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
 
    con.query("SHOW TABLES", (err, result) => {
      if (err) throw err;
      console.log("Tables in database:");
      console.log(result);
    });
  });

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
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
  
  console.log("Received body:", JSON.stringify(req.body, null, 2));

  console.log('Received a request to add a recipe with title:', title);
  
  con.query('INSERT INTO recipe (title, description) VALUES (?, ?)', [title, description], (err, result) => {
    if (err) {
      console.error('Error inserting recipe:', err);
      return res.status(500).send('Failed to insert recipe');
    }
    
    const recipeId = result.insertId;
    console.log('Inserted recipe with ID:', recipeId);

    ingredients.forEach(ingredient => {
      con.query('INSERT INTO recipe_ingredients (recipe_id, ingredient_name) VALUES (?, ?)', [recipeId, ingredient.name], (err, result) => {
        if (err) {
          console.error('Error inserting ingredient:', ingredient.name, err);
        } else {
          console.log('Inserted ingredient:', ingredient.name);
        }
      });
    });

    amounts.forEach(amount => {
      con.query('INSERT INTO ingredients_amounts (recipe_id, ingredient_id, unit, value) VALUES (?, ?, ?, ?)', [recipeId, amount.ingredientId, amount.unit, amount.value], (err, result) => {
        if (err) {
          console.error('Error inserting amount for ingredient ID:', amount.ingredientId, err);
        } else {
          console.log('Inserted amount for ingredient ID:', amount.ingredientId);
        }
      });
    });

    directions.forEach(direction => {
      con.query('INSERT INTO recipe_directions (recipe_id, instruction) VALUES (?, ?)', [recipeId, direction], (err, result) => {
        if (err) {
          console.error('Error inserting direction:', direction, err);
        } else {
          console.log('Inserted direction:', direction);
        }
      });
    });

    tags.forEach(tag => {
      con.query('INSERT INTO tags (recipe_id, tag_name, type) VALUES (?, ?, ?)', [recipeId, tag.name, tag.type], (err, result) => {
        if (err) {
          console.error('Error inserting tag:', tag.name, 'of type', tag.type, err);
        } else {
          console.log('Inserted tag:', tag.name, 'of type', tag.type);
        }
      });
    });

    con.query('INSERT INTO created_by (user_id, recipe_id) VALUES (?, ?)', [userId, recipeId], (err, result) => {
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

app.get('/searchRecipe', (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'Title is required for search' });
  }

  console.log('Received a request to search for a recipe with title:', title);

  con.query('SELECT * FROM recipe WHERE title LIKE ?', ['%' + title + '%'], (err, results) => {
    if (err) {
      console.error('Error searching for recipe:', err);
      return res.status(500).json({ error: 'Failed to search for recipe' });
    }

    // Always returning 200 status code
    res.status(200).json(results);
  });
});




// Registration endpoint
// Registration endpoint
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  console.log('Received body:', JSON.stringify(req.body, null, 2));
  console.log('Received a request to register user with username:', username);

  con.query('INSERT INTO user (username, password, email) VALUES (?, ?, ?)', [username, password, email], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).send('Registration failed');
    }

    const userId = result.insertId;
    console.log('Inserted user with ID:', userId);

    // Other tables related to user (if needed)
    // ...

    // Return a success response
    res.status(200).send('User registered successfully');
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Retrieve user data from the database
  const sql = 'SELECT * FROM users WHERE email = ?';
  connection.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).send('Login failed');
    }

    if (results.length > 0) {
      // Compare hashed password
      bcrypt.compare(password, results[0].password, (err, match) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).send('Login failed');
        }
        
        if (match) {
          // Passwords match, user is authenticated
          return res.status(200).send('Login successful');
        } else {
          return res.status(401).send('Invalid credentials');
        }
      });
    } else {
      return res.status(401).send('User not found');
    }
  });
});


// Example request body:
// {
//   "title": "Test Recipe",
//   "description": "Test Description",
//   "ingredients": [{"name": "Sugar"}],
//   "amounts": [{"ingredientId": 1, "unit": "teaspoon", "value": "2"}],
//   "directions": ["Add sugar"],
//   "tags": [{"name": "Dessert", "type": "category"}],
//   "userId": 1
// }


// ERROR LOGGING

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).send('Bad Request');
});

// TODO Consider using SQL transactions since you have multiple insert operations that depend on each other. This way, if one fails, you can rollback the entire transaction to maintain data integrity.

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
