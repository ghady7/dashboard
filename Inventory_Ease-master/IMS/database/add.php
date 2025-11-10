<?php
session_start();

$table_name = $_SESSION['table'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$password = $_POST['password'];
$encrypted = md5($password); 
if($first_name<>""&&$last_name<>""&&$email<>""&&$password<>""):

try {
    include('connection.php');

    $command = "INSERT INTO 
                $table_name (first_name, last_name, email, password, created_at, updated_at) 
                VALUES 
                ('$first_name', '$last_name', '$email', '$encrypted', NOW(), NOW())";

    $conn->exec($command);
    $response = [
        'success' => true,
        'message' => $first_name . ' ' . $last_name . ' Successfully created the user.'
    ];
} catch(Exception $e) {
    $response = [
        'success' => false,
        'message' => $e->getMessage()
    ];
}

$_SESSION['response'] = $response;
header('location: ../users-add.php');
else:
  
    echo "<script>alert('None of the fields should be empty');</script>";
    exit;
  
    
endif;
?>