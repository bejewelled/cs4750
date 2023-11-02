<script>
    let title = "";
    let description = "";
  
    let ingredientNames = [''];
    let units = [''];
    let values = [''];
    let instructions = [''];
    let tagNames = [''];
    let tagTypes = [''];


    function addItem(identifier) {
        if(identifier === 'ingredientNames') {
            ingredientNames = [...ingredientNames, ''];
        }
        else if (identifier === 'instructions') {
            instructions = [...instructions, ''];
        } else if (identifier === 'tagNames') {
            tagNames = [...tagNames, ''];
        } else if (identifier === 'tagTypes') {
            tagTypes = [...tagTypes, ''];
        } else {
            console.log("Invalid identifier");
        }
    }

    function removeItem(identifier, index) {
        if(identifier === 'ingredientNames') {
            if (ingredientNames.length > 1) {
            ingredientNames.splice(index, 1);
            ingredientNames = [...ingredientNames];
            }
        } else if (identifier === 'instructions') {
            if (instructions.length > 1) {
            instructions.splice(index, 1);
            instructions = [...instructions];
            }
        } else if (identifier === 'tagNames') {
            if (tagNames.length > 1) {
            tagNames.splice(index, 1);
            tagNames = [...tagNames];
            }
        } else if (identifier === 'tagTypes') {
            if (tagTypes.length > 1) {
            tagTypes.splice(index, 1);
            tagTypes = [...tagTypes];
            }   
        } else {
            console.log("Invalid identifier");
        }
    }

    async function addRecipe(event) {
        event.preventDefault();
        
        // Build ingredients and amounts arrays
        const ingredients = [];
        const amounts = [];
        for(let i = 0; i < ingredientNames.length; i++) {
            ingredients.push({ name: ingredientNames[i] });
            amounts.push({
                ingredientId: i + 1,  
                unit: units[i],
                value: values[i]
            });
        }
        
        // Build directions array
        const directions = instructions;
        
        // Build tags array
        const tags = [];
        for(let i = 0; i < tagNames.length; i++) {
            tags.push({
                name: tagNames[i],
                type: tagTypes[i]
            });
        }
        
        const payload = {
            title,
            description,
            ingredients,
            amounts,
            directions,
            tags,
            userId: 1
        };

        try {
            const response = await fetch('http://localhost:3000/addRecipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Recipe added successfully.');
            } else {
                console.log('Failed to add recipe. Status:', response.status);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }


</script>
  
<form on:submit={addRecipe}>
    <label for="title">Title:</label>
    <input bind:value={title} type="text" id="title" name="title">
    
    <label for="description">Description:</label>
    <textarea bind:value={description} id="description" name="description"></textarea>
  
    {#each ingredientNames as name, index}
    <div>
      <label for={`ingredient_name_${index}`}>Ingredient Name:</label>
      <input bind:value={ingredientNames[index]} type="text" id={`ingredient_name_${index}`} name="ingredient_name[]">

      <label for={`unit_${index}`}>Unit:</label>
      <select bind:value={units[index]} id={`unit_${index}`} name="unit[]">
          <option value="grams">grams</option>
          <option value="kilograms">kilograms</option>
          <option value="ounces">ounces</option>
          <option value="pounds">pounds</option>
          <option value="milliliters">milliliters</option>
          <option value="liters">liters</option>
          <option value="fluid ounces">fluid ounces</option>
          <option value="gallons">gallons</option>
          <option value="quarts">quarts</option>
          <option value="pints">pints</option>
          <option value="cups">cups</option>
          <option value="tablespoons">tablespoons</option>
          <option value="teaspoons">teaspoons</option>
          <option value="pieces">pieces</option>
          <option value="slices">slices</option>
          <option value="pinch">pinch</option>
          <option value="dash">dash</option>    
          <option value="bunch">bunch</option>
          <option value="whole">whole</option>
          <option value="half">half</option>
          <option value="quarter">quarter</option>
      </select>      
  
      <label for={`value_${index}`}>Value:</label>
      <input bind:value={values[index]} type="text" id={`value_${index}`} name="value[]">

      <button type="button" on:click={() => addItem('ingredientNames')}>+</button>
      <button type="button" on:click={() => removeItem('ingredientNames', index)}>-</button>
      
    </div>
    {/each}

    {#each instructions as instruction, index}
    <div>
      <label for={`instruction_${index}`}>Instruction:</label>
      <textarea bind:value={instructions[index]} id={`instruction_${index}`} name="instruction[]"></textarea>
      <button type="button" on:click={() => addItem("instructions")}>+</button>
      <button type="button" on:click={() => removeItem("instructions", index)}>-</button>
    </div>
    {/each}
  
    {#each tagNames as tagName, index}
    <div>
      <label for={`tag_name_${index}`}>Tag Name:</label>
      <input bind:value={tagNames[index]} type="text" id={`tag_name_${index}`} name="tag_name[]">
      <button type="button" on:click={() => addItem("tagNames")}>+</button>
      <button type="button" on:click={() => removeItem("tagNames", index)}>-</button>
      
      <label for={`tag_type_${index}`}>Tag Type:</label>
      <select bind:value={tagTypes[index]} id={`tag_type_${index}`} name="tag_type[]">
          <option value="dietary restrictions">Dietary Restrictions</option>
          <option value="country of origin">Country of Origin</option>
          <option value="category">Category</option>
      </select>
    </div>
    {/each}
    
    <!-- Submit button -->
    <input type="submit" value="Submit">
</form>


<style>
  form {
    background-color: #f0f0f0; 
    padding: 20px;
    border-radius: 8px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    padding-right: 50px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    color: #333;  
  }

  input[type="text"],
  select,
  textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc; 
    border-radius: 4px;
  }

  select {
    appearance: none; 
  }

  button {
    background-color: #007BFF; 
    color: #fff; 
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 5px;
  }

  button:hover {
    background-color: #0056b3; 
  }

  input[type="submit"] {
    background-color: #007BFF; 
    color: #fff; 
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: #0056b3; 
  }
</style>
