	<?php



include('database/connection.php');

// Fetch dashboard information
$stmt = $conn->query("SELECT COUNT(*) AS total_users FROM users");
$totalUsersResult = $stmt->fetch(PDO::FETCH_ASSOC);

$stmt = $conn->query("SELECT * FROM users ORDER BY created_at DESC LIMIT 5");
$latestUsers = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmt = $conn->query("SELECT COUNT(*) AS total_products FROM products");
$totalProductsResult = $stmt->fetch(PDO::FETCH_ASSOC);

$stmt = $conn->query("SELECT * FROM products WHERE quantity < 50");
$lowQuantityProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmt = $conn->query("SELECT COUNT(*) AS total_suppliers FROM suppliers");
$totalSuppliersResult = $stmt->fetch(PDO::FETCH_ASSOC);

$stmt = $conn->query("SELECT * FROM suppliers ORDER BY created_at DESC LIMIT 5");
$latestSuppliers = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmt = $conn->query("SELECT COUNT(*) AS total_orders FROM orders");
$totalOrdersResult = $stmt->fetch(PDO::FETCH_ASSOC);

$stmt = $conn->query("SELECT COUNT(*) AS pending_orders FROM orders WHERE status = 'Pending'");
$pendingOrdersResult = $stmt->fetch(PDO::FETCH_ASSOC);

$stmt = $conn->query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 5");
$latestOrders = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>