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

<div>
  <h2>Register</h2>
  <form on:submit|preventDefault={handleRegister}>
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username} />

    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} />

    <button type="submit">Register</button>
  </form>
</div>
