<script>
    let title = "";
    let description = "";
    let ingredients = "";
    let directions = "";
  
    async function addRecipe() {
      const payload = {
        title,
        description,
        ingredients: ingredients.split(',').map(i => ({ name: i.trim() })),
        directions: directions.split('.').map(d => d.trim()),
        // Add other fields like amounts, tags, and userId as needed
        amounts: [],
        tags: [],
        // grab session.userId
        userId: 1,
      };
  
      try {
        const response = await fetch('localhost:3000/addRecipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        const data = await response.json();
        console.log(data);
  
      } catch (error) {
        console.error('Error:', error);
      }
    }
  </script>
  
  <form action="/submitRecipe" method="POST">
    <label for="title">Title:</label>
    <input type="text" id="title" name="title">
    
    <label for="description">Description:</label>
    <textarea id="description" name="description"></textarea>
    
    <!-- You can loop through or duplicate the following fields as per the number of ingredients -->
    <label for="ingredient_name">Ingredient Name:</label>
    <input type="text" id="ingredient_name" name="ingredient_name[]">
    
    <label for="unit">Unit:</label>
    <input type="text" id="unit" name="unit[]">
    
    <label for="value">Value:</label>
    <input type="text" id="value" name="value[]">
    
    <!-- You can loop through or duplicate the following fields for each direction -->
    <label for="instruction">Instruction:</label>
    <textarea id="instruction" name="instruction[]"></textarea>
    
    <!-- For the tags, use a dropdown selection with the ENUM options -->
    <label for="tag_name">Tag Name:</label>
    <input type="text" id="tag_name" name="tag_name[]">
    
    <label for="tag_type">Tag Type:</label>
    <select id="tag_type" name="tag_type[]">
        <option value="dietary restrictions">Dietary Restrictions</option>
        <option value="country of origin">Country of Origin</option>
        <option value="category">Category</option>
    </select>
    
    <!-- Submit button -->
    <input type="submit" value="Submit">
</form>

  