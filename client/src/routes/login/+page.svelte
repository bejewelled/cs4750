<script>
  import axios from 'axios';
  
  let email = '';
  let password = '';

  const handleLogin = async () => {
    const userData = { email, password };

    try {
      const response = await axios.post('/login', JSON.stringify(userData), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Login successful, redirect or show success message
      } else {
        const errorData = await response.json();
        // Handle login error (show error message, etc.)
        console.error(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle fetch error
    }
  };
</script>

<div class="text-column flexbox">
  <h1>Login</h1>
  <h2>If you do not have an account, <a href="/register">register here</a>!</h2>

  <div class="gray-background text-column flexbox">
    <form on:submit|preventDefault={handleLogin}>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} class="form-control" />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} class="form-control" />
      </div>

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</div>

<style>
 
  /* Styles for the gray background and form */
  .gray-background {
    background-color: #f0f0f0;
    padding: 20px 40px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    max-width: 400px; /* Adjust width as needed */
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
