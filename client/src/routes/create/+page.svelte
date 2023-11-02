
<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<div class="text-column flexbox">
	<h1>
		Create a Recipe 
	</h1>

	<Form />


</div>

<script>

import axios from 'axios'
import Form from './Form.svelte';


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
