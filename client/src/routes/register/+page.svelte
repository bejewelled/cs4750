<div class="text-column flexbox">
  <h1 class="text-center w-full text-black">Register</h1>
</div>

<div class="gray-background text-column flexbox">
  <form on:submit={handleSubmit} method="POST">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="text" id="email" bind:value={email} 
      class="form-control" required 
      minlength="5"
      maxlength="31"
      />
    </div>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" id="username" bind:value={username} 
      class="form-control" required 
      minlength="5"
      maxlength="31"
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="text" id="password" bind:value={password} 
      class="form-control" required 
      minlength="8"
      maxlength="31"
      />
    </div>

      <!-- <div class="form-group">
        <label for="desc">Recipe Description:</label>
        <input type="text" id="desc" bind:value={desc} class="form-control" />
      </div> -->

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>



<script>
import axios from 'axios';

let email = '';
let username = '';
let password = '';

async function handleSubmit(event) {
  event.preventDefault();

  const data = {
    email: email,
    username: username,
    password: password,
  };
  
  try {
    const endpoint = `http://localhost:3000/register`;
    const response = await axios.post(endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error during the request:', error);
  }
}


</script>


<style>

    /* input:invalid {
      border: 2px dashed red;
    }

    input:valid {
      border: 2px solid black;
    }    */

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
