<script>
  import Header from './Header.svelte';
  import RegistrationForm from './register/+page.svelte';
  import LoginForm from './login/+page.svelte';
</script>

<div class="app">
  <div class="color-section"></div>

  <div class="image-section">
    <img src="/chefyourway.jpeg" alt="Chef Your Way" class="home-image" />
    <h1 class="home-title"><span class="bold">Chef Your Way</span></h1>
  </div>

  <div class="registration-section">
    <RegistrationForm />
  </div>
</div>

<style>
  /* Your existing styles */
  /* ... */

  /* Styles for the home sections */
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .color-section {
    position: relative;
    width: 100%;
    height: 60vh; /* Adjust the height as desired */
    background-color: #FFDAB9; /* Change to the desired color */
    z-index: -1;
  }

  .image-section {
    position: absolute;
    margin-top: 90px;
    top: 0;
    left: 0;
    width: 100%;
    height: 60vh; /* Should match the height of the color section */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .home-image {
    width: 100%;
    height: 100%; /* Ensure image takes up full height of container */
    object-fit: cover; /* Ensure the image covers the entire container */
  }

  .home-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    text-align: center;
    margin-top: 20px;
    color: white;
    z-index: 1;
  }

  .registration-section {
    width: 100%;
    max-width: 800px;
    margin: 20px auto; /* Adjust as needed */
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  /* Additional styles for the registration form */
  .registration-form {
    /* ... */
  }
</style>
