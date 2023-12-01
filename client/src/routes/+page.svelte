<script>
  import Header from './Header.svelte';
  import RegistrationForm from './register/+page.svelte';
  import LoginForm from './login/+page.svelte';
  import './styles.css';
</script>

<div class="app">
  <main>
    <div class="image-container">
      <img src="/chefyourway.jpeg" alt="Chef Your Way" class="home-image" />
      <h1 class="home-title"><span class="bold">Chef Your Way</span></h1>
    </div>

    <div class="registration-container">
      <RegistrationForm />
    </div>

    <div class="login-container">
      <LoginForm />
    </div>
  </main>

  
</div>

<style>
  /* Your existing styles */
  /* ... */

  /* Styles for main content */
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Styles for the image and title */
  .image-container {
    position: relative;
    width: 100%;
    max-width: 100vw; /* Set maximum width to viewport width */
  }

  .home-image {
    width: 100%;
    height: auto;
    display: block;
  }

  .home-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    text-align: center;
    margin-top: 20px;
    color: white;
  }

  /* Styles for registration and login containers */
  .registration-container,
  .login-container {
    width: 100%;
    max-width: 400px; /* Adjust the width as needed */
    margin: 20px auto; /* Adjust margins based on layout */
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  /* Footer styles */
  footer {
    /* Your footer styles */
  }
</style>
