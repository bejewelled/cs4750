<script>
  let email = '';
  let password = '';

  const handleLogin = async () => {
    const userData = { email, password };
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
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

<div>
  <h2>Login</h2>
  <form on:submit|preventDefault={handleLogin}>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} />

    <button type="submit">Login</button>
  </form>
</div>
