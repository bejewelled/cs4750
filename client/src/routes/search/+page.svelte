<div class="text-column flexbox">
  <h1 class="text-center w-full text-black">Search for Recipes</h1>
</div>

<div class="gray-background text-column flexbox">
  <form on:submit={handleSubmit} method="GET">
    <div class="form-group">
      <label for="name">Recipe Name:</label>
      <input type="text" id="name" bind:value={name} class="form-control" />
    </div>

      <!-- <div class="form-group">
        <label for="desc">Recipe Description:</label>
        <input type="text" id="desc" bind:value={desc} class="form-control" />
      </div> -->

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>

<div class="text-column flexbox results">
  <h2 class="text-center w-full text-black">Search Results:</h2>
  <ul id="recipeResults">
  </ul>
</div>

<script>
import axios from 'axios';

let name = '';
let desc = '';

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

    const resultsContainer = document.getElementById('recipeResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    const searchInput = document.getElementById('name');
    searchInput.value = ''; // Clear search input

    if (response.status === 200) {
      console.log('success', response.data);

      if (response.data.length === 0) {
        const noResultsMsg = document.createElement('p');
        noResultsMsg.textContent = 'No recipes found with the provided title';
        resultsContainer.appendChild(noResultsMsg);
      } else {
        response.data.forEach(recipe => {
          const listItem = document.createElement('li');
          listItem.textContent = recipe.title;
          resultsContainer.appendChild(listItem);
        });
      }

    } else if (response.status === 404) {
      const noResultsMsg = document.createElement('p');
      noResultsMsg.textContent = 'No recipes found with the provided title';
      resultsContainer.appendChild(noResultsMsg);
    } else {
      console.log('Unexpected response status ' + response.status + ' ' + response.statusText);
    }
  } catch (error) {
    console.error('Error during the request:', error);
  }
}


</script>


<style>

  .gray-background {
    background-color: #f0f0f0; 
    padding: 20px; 
    border-radius: 8px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    padding-right: 50px;
  }

  .text-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .text-center {
    text-align: center;
  }

  .text-gray-300 {
    color: #ccc; 
  }

  .form-group {
    margin-bottom: 10px;
  }

  .form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .btn {
    background-color: #007BFF;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn-primary {
    background-color: #007BFF; 
  }

  .btn-primary:hover {
    background-color: #0056b3; 
  }
</style>
