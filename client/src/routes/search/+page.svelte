<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>

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
      // Display Search Results
        response.data.forEach(recipe => {
          const card = createResultCard(recipe);
          resultsContainer.appendChild(card);
        });
      // End Search Results
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


function createResultCard(recipe) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = recipe.title;
  cardBody.appendChild(title);

  const description = document.createElement('p');
  description.classList.add('card-text');
  description.textContent = recipe.description; // Make sure you have a 'description' property in your recipe object
  cardBody.appendChild(description);

  const viewRecipeBtn = document.createElement('a');
  viewRecipeBtn.classList.add('btn', 'btn-primary');
  viewRecipeBtn.href = ``;
  viewRecipeBtn.textContent = 'View Recipe';
  cardBody.appendChild(viewRecipeBtn);

  card.appendChild(cardBody);

  return card;
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

  .card {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f5f2f219; /* Set the background color to #F5F2F2 */
    margin-bottom: 20px;
  }

  .card-body {
    padding: 20px;
  }

  .card-title {
    font-size: 1.5rem;
    color: #333;
  }

  .card-text {
    font-size: 1rem;
    color: #555;
  }

  .btn-primary {
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }
</style>
