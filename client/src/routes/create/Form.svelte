<script>
  let title = "";
  let description = "";

  let ingredientNames = [""];
  let units = [""];
  let values = [""];
  let instructions = [""];
  let tagNames = [""];
  let tagTypes = [""];

  let showModal = false;

  function addItem(identifier) {
    if (identifier === "ingredientNames") {
      ingredientNames = [...ingredientNames, ""];
    } else if (identifier === "instructions") {
      instructions = [...instructions, ""];
    } else if (identifier === "tagNames") {
      tagNames = [...tagNames, ""];
    } else if (identifier === "tagTypes") {
      tagTypes = [...tagTypes, ""];
    } else {
      console.log("Invalid identifier");
    }
  }

  function removeItem(identifier, index) {
    if (identifier === "ingredientNames") {
      if (ingredientNames.length > 1) {
        ingredientNames.splice(index, 1);
        ingredientNames = [...ingredientNames];
      }
    } else if (identifier === "instructions") {
      if (instructions.length > 1) {
        instructions.splice(index, 1);
        instructions = [...instructions];
      }
    } else if (identifier === "tagNames") {
      if (tagNames.length > 1) {
        tagNames.splice(index, 1);
        tagNames = [...tagNames];
      }
    } else if (identifier === "tagTypes") {
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
    for (let i = 0; i < ingredientNames.length; i++) {
      ingredients.push({ name: ingredientNames[i] });
      amounts.push({
        ingredientId: i + 1,
        unit: units[i],
        value: values[i],
      });
    }

    // Build directions array
    const directions = instructions;

    // Build tags array
    const tags = [];
    for (let i = 0; i < tagNames.length; i++) {
      tags.push({
        name: tagNames[i],
        type: tagTypes[i],
      });
    }

    const payload = {
      title,
      description,
      ingredients,
      amounts,
      directions,
      tags,
      userId: 1,
    };

    try {
      const response = await fetch("http://localhost:3000/addRecipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Recipe added successfully.");

        // Reset the form data
        title = "";
        description = "";
        ingredientNames = [""];
        units = [""];
        values = [""];
        instructions = [""];
        tagNames = [""];
        tagTypes = [""];

        // Show the modal
        showModal = true;
      } else {
        console.log("Failed to add recipe. Status:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  function closeModal() {
    showModal = false;
  }
</script>

<form on:submit={addRecipe}>
  <label for="title">Title:</label>
  <input
    bind:value={title}
    type="text"
    id="title"
    name="title"
    required
    maxlength="100"
  />
  <label for="description">Description:</label>
  <textarea
    bind:value={description}
    id="description"
    name="description"
    required
  />

  <!-- Ingredients -->
  <h3>Ingredients:</h3>
  {#each ingredientNames as name, index}
    <div>
      <br />
      <label for={`ingredient_name_${index}`}>Ingredient Name:</label>
      <input
        bind:value={ingredientNames[index]}
        type="text"
        id={`ingredient_name_${index}`}
        name="ingredient_name[]"
        required
        maxlength="50"
      />

      <label for={`unit_${index}`}>Unit:</label>
      <select
        bind:value={units[index]}
        id={`unit_${index}`}
        name="unit[]"
        required
      >
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
      <input
        bind:value={values[index]}
        type="text"
        id={`value_${index}`}
        name="value[]"
        required
      />

      <button type="button" on:click={() => addItem("ingredientNames")}
        >Add Ingredient</button
      >
      <button
        type="button"
        on:click={() => removeItem("ingredientNames", index)}
        >Remove Ingredient</button
      >
    </div>
  {/each}

  <!-- Instructions -->
  <br />
  <h3>Instructions:</h3>
  {#each instructions as instruction, index}
    <div>
      <br />
      <label for={`instruction_${index}`}>Instruction:</label>
      <textarea
        bind:value={instructions[index]}
        id={`instruction_${index}`}
        name="instruction[]"
        required
      />
      <button type="button" on:click={() => addItem("instructions")}
        >Add Instruction</button
      >
      <button type="button" on:click={() => removeItem("instructions", index)}
        >Remove Instruction</button
      >
    </div>
  {/each}

  <!-- Tags -->
  <br />
  <h3>Tags:</h3>
  {#each tagNames as tagName, index}
    <div>
      <br />
      <label for={`tag_name_${index}`}>Tag Name:</label>
      <input
        bind:value={tagNames[index]}
        type="text"
        id={`tag_name_${index}`}
        name="tag_name[]"
        required
      />
      <label for={`tag_type_${index}`}>Tag Type:</label>
      <select
        bind:value={tagTypes[index]}
        id={`tag_type_${index}`}
        name="tag_type[]"
        required
      >
        <option value="dietary restrictions">Dietary Restrictions</option>
        <option value="country of origin">Country of Origin</option>
        <option value="category">Category</option>
      </select>
      <button type="button" on:click={() => addItem("tagNames")}>Add Tag</button
      >
      <button type="button" on:click={() => removeItem("tagNames", index)}
        >Remove Tag</button
      >
    </div>
  {/each}

  <br />

  <!-- Submit button -->
  <div style="float:right;">
    <input type="submit" value="Submit" />
  </div>
</form>

{#if showModal}
  <div class="modal">
    <div class="modal-content">
      <span class="close-button" on:click={closeModal}>&times;</span>
      <p>Recipe added successfully!</p>
    </div>
  </div>
{/if}

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
    background-color: #007bff;
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
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: #0056b3;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px;
    width: 300px;
    text-align: center;
    position: relative;
  }

  .close-button {
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 24px;
    cursor: pointer;
    border: none;
    background: none;
    color: #555;
  }
</style>
