<div class="text-column flexbox">
	<h2 class='text-center w-full text-gray-300'>
		Search for Recipes
	</h2>

	<form on:submit={handleSubmit} method='POST'>
		<label for="name">Recipe Name:</label>
		<input type="text" id="name" bind:value={name} />
	  
		<label for="desc">Recipe Description:</label>
		<input type="desc" id="desc" bind:value={desc} />
	  
		<button type="submit">Submit</button>
	  </form>

</div>

<script>

import axios from 'axios'


let name = '';
let desc = '';

async function handleSubmit(event) {
  event.preventDefault();

  const data = { name, desc };

  try {
    const response = await axios.post('/search', data, {
      headers: {
        'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
      },
    });

    if (response.status === 200) {
		console.log('success')
    } else {
		console.log('returned status ' + response.status + ' ' + response.statusText)
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error(error);
  }
}
</script>
