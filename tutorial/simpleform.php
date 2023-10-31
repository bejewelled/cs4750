
<?php

require('connect-db.php');
require('friend-db.php');
$friendList = getAllFriends();
if ($_SERVER['REQUEST_METHOD']=='POST')
{
    if (!empty($_POST['addBtn'])) {
        addFriend($_POST['friendname'], $POST['major'], $_POST['year']);
        //$friendList = getAllFriends();
    }
}


?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">  
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="your name">
  <meta name="description" content="include some description about your page">  
  <title>Get started with DB programming</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">  
  <link rel="icon" type="image/png" href="http://www.cs.virginia.edu/~up3f/cs4750/images/db-icon.png" />
</head>

<body>
<div class="container">
  <h1>DB programming: Get Started</h1>  

  <!-- <a href="simpleform.php">Click to open the next page</a> -->
 
  <form name="mainForm" action="simpleform.php" method="post">   
      <div class="row mb-3 mx-3">
        Your name:
        <input type="text" class="form-control" name="friendname" required />        
      </div>  
      <div class="row mb-3 mx-3">
        Major:
        <input type="text" class="form-control" name="major" required />        
      </div>  
      <div class="row mb-3 mx-3">
        Year:
        <input type="text" class="form-control" name="year" required />        
      </div>  
      <div class="row mb-3 mx-3">
        <input type="submit" value="Add friend" name="actionBtn" style="width:50%"
                class="btn btn-primary" title="Insert a friend into a friends table" />
      </div>  
    </form>     

<div class="row justify-content-center">  
<table class="w3-table w3-bordered w3-card-4 center" style="width:70%">
  <thead>
  <tr style="background-color:#B0B0B0">
    <th width="30%">Name        
    <th width="30%">Major        
    <th width="30%">Year 
  </tr>
  </thead>
<?php foreach ($friendList as $f): ?>
  <tr>
     <td><?php echo $f['name']; ?></td>
     <td><?php echo $f['major']; ?></td>        
     <td><?php echo $f['year']; ?></td>              
  </tr>
<?php endforeach; ?>
</table>
</div> 




  <!-- CDN for JS bootstrap -->
  <!-- you may also use JS bootstrap to make the page dynamic -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script> -->
  
  <!-- for local -->
  <!-- <script src="your-js-file.js"></script> -->  
  
</div>    
</body>
</html>