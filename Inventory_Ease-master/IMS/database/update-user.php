<?php
$data = $_POST;
$user_id = (int) $data['user_Id']; 
$first_name = $data['f_name'];
$last_name = $data['l_name'];
$email = $data['email'];

try {
    include('connection.php');
    $sql = "UPDATE users SET email=?, last_name=?, first_name=? WHERE id=?";

    $stmt = $conn->prepare($sql);
    $stmt->execute([$email, $last_name, $first_name, $user_id]);

    echo json_encode([
        'success' => true,
        'message' => $first_name . ' ' . $last_name . ' Successfully Updated.'
    ]);
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error processing your request: ' . $e->getMessage()
    ]);
}
?>
