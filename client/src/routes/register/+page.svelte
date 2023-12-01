<!-- HTML & Svelte Code for Registration -->
<script>
  import axios from 'axios'
  
  let username = '';
  let email = '';
  let password = '';

  const handleRegister = async () => {
    const userData = { username, email, password };

    try {
      const response = await axios.post('/register', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Registration successful
        console.log('Registration successful');
        // You can perform additional actions like redirecting to another page or displaying a success message
      } else {
        // Handle registration error (show error message, etc.)
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle request error
    }
  };
</script>

<h1>Register</h1>
<div class="register-container">
  <form on:submit|preventDefault={handleRegister}>
    <div class="input-group">
      <label for="username">Username:</label>
      <input type="text" id="username" bind:value={username} />
    </div>

    <div class="input-group">
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} />
    </div>

    <div class="input-group">
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} />
    </div>

    <button type="submit">Register</button>
  </form>
</div>

<style>
  /* CSS Styling */
  .register-container {
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
    padding: 40px 40px 40px 40px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f0f0f0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .input-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
