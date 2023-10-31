<?php 
function addFriend($friendname, $major, $year)
{
    global $db;
    $query = "insert into friends values (:friendname, :major, :year)"; 
    $db->query($query);
    //prepare
    // prepare (compile), then
    // bindValue + execute

    $statement =  $db->prepare($query);
    $statement->bindValue(':friendname', $friendname);
    $statement->bindValue(':major', $major);
    $statement->bindValue(':year', $year);
    $statement->execute();

    $statement->closeCursor();
}

function getAllFriends()
{
    global $db;
    try {
    $query = "select * from friends";
    $statement =  $db->prepare($query);
    $statement->execute();
    $results = $statement->fetchAll();
    $statement->closeCursor();
    } catch(Exception $error) {
        echo $error;
    }

    return $results;
}
?>