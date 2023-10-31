<div class="text-column flexbox">
	<h2 class='text-center w-full text-gray-300'>
		Search for Recipes
	</h2>

	<form on:submit={handleSubmit}>
		<label for="name">Name:</label>
		<input type="text" id="name" bind:value={name} />
	  
		<label for="email">Email:</label>
		<input type="email" id="email" bind:value={email} />
	  
		<button type="submit">Submit</button>
	  </form>

	<button on:click={doPost()}>
	post
	</button>

	
</div>

<script>
let name = '';
let email = '';

async function handleSubmit(event) {
  event.preventDefault();

  const data = { name, email };

  const response = await fetch('/api/your-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    // Handle a successful response (e.g., show a success message)
  } else {
    // Handle errors (e.g., show an error message)
  }
}
</script>
