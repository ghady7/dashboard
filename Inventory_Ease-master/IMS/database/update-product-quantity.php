<?php
include('connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $productId = isset($_POST['product_id']) ? $_POST['product_id'] : null;
    $qtyReceived = isset($_POST['qty_received']) ? $_POST['qty_received'] : null;
    $orderId = isset($_POST['order_id']) ? $_POST['order_id'] : null;

    if ($productId && $qtyReceived !== null) {
        // Update product quantity
        $stmt = $conn->prepare("UPDATE products SET quantity = quantity + :qty_received WHERE id = :product_id");
        $stmt->bindParam(':qty_received', $qtyReceived, PDO::PARAM_INT);
        $stmt->bindParam(':product_id', $productId, PDO::PARAM_INT);

        try {
            $conn->beginTransaction();
            $stmt->execute();

            // Update order status to 'Completed'
            if ($orderId) {
                $stmt = $conn->prepare("UPDATE orders SET status = 'Completed' WHERE id = :order_id");
                $stmt->bindParam(':order_id', $orderId, PDO::PARAM_INT);
                $stmt->execute();
            }

            $conn->commit();
            echo "Product quantity updated successfully.";
        } catch (PDOException $e) {
            $conn->rollBack();
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "Product ID or Quantity Received is missing.";
    }
}
?>
