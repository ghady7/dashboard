<?php
header('Content-Type: application/json');

// Include database connection
include('../database/connection.php');

// Get POST data
$userId = $_POST['user_id'];
$password = $_POST['password'];


// Validate input
if (!isset($userId, $password)) {
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit;
}

// Query to check user credentials
$query = "SELECT password FROM users WHERE id = :user_id";
$stmt = $conn->prepare($query);
$stmt->execute(['user_id' => $userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    // Hash the user-provided password with MD5
    $hashedPassword = md5($password);

    if ($user['password'] === $hashedPassword) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Wrong password.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'User not found.']);
}
?>