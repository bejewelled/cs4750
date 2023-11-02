<main>
  <div class="image-container">
    <img src="/chefyourway.jpeg" alt="Chef Your Way" class="home-image" />
    <h1 class="home-title"><span class="bold">Chef Your Way</span></h1>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-container {
    position: relative;
    width: 100%;
    max-width: 100%; /* Ensure the image is 100% of the screen width */
  }

  .home-image {
    width: 100%;
    height: auto; 
    display: block;
  }

  .home-title {
    position: absolute;
    top: 50%; /* Center the text vertically */
    left: 50%; /* Center the text horizontally */
    transform: translate(-50%, -50%); /* Center the text both horizontally and vertically */
    font-size: 2rem;
    text-align: center;
    margin-top: 20px; /* Adjust the margin as needed */
    color: white; /* Set the text color to white or your preferred color */
  }
</style>
