<?php
include('connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $orderId = isset($_POST['order_id']) ? $_POST['order_id'] : null;

    if ($orderId) {
        // Update order status to 'Completed'
        $stmt = $conn->prepare("UPDATE orders SET status = 'Completed' WHERE id = :order_id");
        $stmt->bindParam(':order_id', $orderId, PDO::PARAM_INT);

        try {
            $conn->beginTransaction();
            $stmt->execute();
            $conn->commit();
            echo "Order status updated successfully.";
        } catch (PDOException $e) {
            $conn->rollBack();
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "Order ID is missing.";
    }
}
?>
