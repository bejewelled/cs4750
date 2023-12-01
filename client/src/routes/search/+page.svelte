<!-- Your HTML and styles remain the same -->

<script>
  import axios from 'axios';
  import { onMount } from 'svelte';

  let name = '';
  let recipes = []; // Array to store fetched recipes

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const endpoint = `http://localhost:3000/searchRecipe?title=${name}`;
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });

      if (response.status === 200) {
        recipes = response.data; // Store fetched recipes
      } else if (response.status === 404) {
        recipes = []; // No recipes found
      } else {
        console.log('Unexpected response status ' + response.status + ' ' + response.statusText);
      }
    } catch (error) {
      console.error('Error during the request:', error);
    }
  }

  async function fetchRecipeDetails(recipe) {
    try {
      const recipeDetailsEndpoint = `http://localhost:3000/recipe/${recipe.recipe_id}`;
      const response = await axios.get(recipeDetailsEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });

      if (response.status === 200) {
        const index = recipes.findIndex(item => item.recipe_id === recipe.recipe_id);
        if (index !== -1) {
          recipes[index].details = response.data; // Store recipe details in the recipes array
        }
      } else {
        console.log('Failed to fetch recipe details:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  }

  onMount(async () => {
    // Fetch recipe details for each recipe initially
    for (const recipe of recipes) {
      await fetchRecipeDetails(recipe);
    }
  });
</script>

<!-- Update the HTML to display the fetched recipes and their details -->
<div class="text-column flexbox">
  <h1 class="text-center w-full text-black">Search for Recipes</h1>
</div>

<div class="gray-background text-column flexbox">
  <form on:submit={handleSubmit} method="GET">
    <div class="form-group mb-4">
      <label for="name" class="text-black text-lg">Recipe Name:</label>
      <input type="text" id="name" bind:value={name} class="form-control" />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>

<div class="text-column flexbox results">
  <h2 class="text-center w-full text-black">Search Results:</h2>
  <ul>
    {#each recipes as recipe}
      <li>
        <div>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          {#if recipe.details}
            <ul>
              {#each recipe.details.ingredients as ingredient}
                <li>{ingredient.name}</li>
              {/each}
            </ul>
            <ol>
              {#each recipe.details.directions as direction}
                <li>{direction}</li>
              {/each}
            </ol>
            <!-- Display other recipe details as needed -->
          {/if}
        </div>
      </li>
    {/each}
    {#if recipes.length === 0}
      <p>No recipes found with the provided title</p>
    {/if}
  </ul>
</div>
