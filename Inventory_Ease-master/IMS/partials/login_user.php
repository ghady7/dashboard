
<?php
session_start();

$error_message = '';
$username_value = '';  // To retain the username value in case of an error
$password_value = '';  // To clear the password field on error

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include('../database/connection.php');

    // Get the form data
    $username = $_POST['user_id'];
    $password = $_POST['password'];

    // Hash the user-provided password using MD5
    $hashedPassword = md5($password);

    // Prepare the SQL query to check user credentials
    $query = "SELECT * FROM users WHERE id = :user_id AND password = :password";
    $stmt = $conn->prepare($query);

    // Execute with correctly named placeholders
    $stmt->execute(['user_id' => $username, 'password' => $hashedPassword]);

    if ($stmt->rowCount() > 0) {
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $user = $stmt->fetch();
        $_SESSION['user'] = $user;
        header('location: ../dashboard.php');
        exit(); // Ensure no further code runs after the redirect
    } else {
        // Detailed error message
        $error_message = 'The username or password you entered is incorrect. Please check your details and try again.';
        
        // Keep the entered values in case of error
        $username_value = htmlspecialchars($username, ENT_QUOTES, 'UTF-8'); // Sanitize output
        $password_value = '';  // Clear the password field for security reasons
    }
}
?>