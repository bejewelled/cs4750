<main>
  <div class="image-container">
    <img src="/chef.jpeg" alt="Chef Your Way" class="home-image" />
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
    max-width: 100%;  
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
</style>
