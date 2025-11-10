<?php
include('connection.php');

session_start();
if (!isset($_SESSION['user'])) {
    header('location: login.php');
    exit();
}

$user = $_SESSION['user'];

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve data from the form
    $product = $_POST['product'];
    $qty_ordered = $_POST['qty_ordered'];
    $supplier = $_POST['supplier'];
    $status = 'Pending'; // Default status
    
    try {
        // Insert into the orders table
        $stmt = $conn->prepare("INSERT INTO orders (product_id, qty_ordered, supplier_id, status, ordered_by) VALUES (:product_id, :qty_ordered, :supplier_id, :status, :ordered_by)");
        $stmt->bindParam(':product_id', $product, PDO::PARAM_INT);
        $stmt->bindParam(':qty_ordered', $qty_ordered, PDO::PARAM_INT);
        $stmt->bindParam(':supplier_id', $supplier, PDO::PARAM_INT);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        $stmt->bindParam(':ordered_by', $user['id'], PDO::PARAM_INT);
        $stmt->execute();

        // Redirect back to the order page if the order was added successfully
        header('location: ../order.php');
        exit();
    } catch (PDOException $e) {
        // Redirect back to the add order page with an error message
        header('location: add-order.php?error=1');
        exit();
    }
} else {
    // If the form is not submitted, redirect back to the add order page
    header('location: add-order.php');
    exit();
}
?>
