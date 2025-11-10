<?php
session_start();

// Check if the user is already logged in
if (isset($_SESSION['user'])) {
    header('location: dashboard.php');
    exit(); // Prevent further code execution
}

$error_message = '';
$username_value = '';  // This will hold the value for the username field if there's an error
$password_value = '';  // This will hold the value for the password field if there's an error

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include('database/connection.php');

    // Get the form data
    $username = $_POST['username'];
    $password = md5($_POST['password']); // Consider using a more secure hashing method like bcrypt in production

    // Prepare the SQL query to check user credentials
    $query = "SELECT * FROM users WHERE users.email = :username AND users.password = :password";
    $stmt = $conn->prepare($query);
    $stmt->execute(['username' => $username, 'password' => $password]);

    if ($stmt->rowCount() > 0) {
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $user = $stmt->fetch();
        $_SESSION['user'] = $user;
        header('location: dashboard.php');
        exit(); // Ensure no further code runs after the redirect
    } else {
        // More detailed error message
        $error_message = 'The email or password you entered is incorrect. Please check your details and try again.';
        
        // Keep the entered values in case of error
        $username_value = $username;
        $password_value = '';  // Clear the password field after wrong entry for security reasons
    }
}
?>

<!DOCTYPE html>
<html> 
<head>
    <title>Log In - Stock Management</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <style>
        /* Styling the error message */
        #errorMessage {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            margin-bottom: 20px;
            position: absolute; /* Position it at the top */
            width: 100%;
            top: 20px; /* Adjust the top position */
            left: 0;
            z-index: 100; /* Ensure it stays above other content */
        }

        /* Container for the form */
        .container {
            position: relative; /* Allow the error message to be positioned relative to the container */
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
        }
    </style>
</head>
<body id="loginBody">

<?php
// Display error message if any
if (!empty($error_message)) { ?>
    <div id="errorMessage">
        <strong>Error: </strong><p><?= $error_message ?></p>
    </div>
<?php } ?>

<div class="container">
    <div class="loginHeader" style="margin-top: 15px;">
        <h1 style="text-shadow: 2px 3px 2px whitesmoke;">Stock Management</h1>
    </div>
    
    <div class="loginBody" style="margin-top: 15px;">
        <form action="login.php" method="POST">
            <div class="loginInputsContainer">
                <label for="username">Email</label>
                <input placeholder="Enter Your Username" name="username" type="text" value="<?= htmlspecialchars($username_value) ?>" required>
            </div>
            <div class="loginInputsContainer">
                <label for="password">Password</label>
                <input placeholder="Enter Your Password" name="password" type="password" value="<?= htmlspecialchars($password_value) ?>" required>
            </div>
            <div class="loginButtonContainer">
                <button type="submit"><span>Login</span>
                    <span><i class="fa-solid fa-chevron-right" style="transform: scaleY(0.8);"></i></span>
                </button>
            </div>
        </form>
    </div>
</div>

</body>
</html>
