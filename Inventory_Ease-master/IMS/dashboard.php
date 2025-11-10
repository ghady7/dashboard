<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('location: login.php');
    exit();
}

$user = $_SESSION['user'];


include('database/connection.php');
include('database/dashboard-get.php');

?>

<!DOCTYPE html>
<html> 
<head>
    <title>Dashboard - Stock Management</title>
    <link rel="stylesheet" type="text/css" href="css/dashboard.css">
    <script src="https://kit.fontawesome.com/4fbfb479cc.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
<body >
    <div id="dashboardMainContainer">
        <?php include('partials/app-sidebar.php') ?>
        <div class="dashboard_content_container" id="dashboard_content_container">
            <?php include('partials/app-topnav.php') ?>
            <div class="dashboard_content">
                <div class="dashboard_content_main"> 
                    <div class="dashboard-section" style="margin-bottom: 0;">
                        <div class="dashboard-section-header">
                            <h2 class="section-title">User Overview</h2>
                        </div>
                        <div class="dashboard-section-content">
                            <div class="user-stats">
                                <div class="stat">
                                    <p class="stat-label">Total Users:</p>
                                    <strong class="stat-value"><?php echo $totalUsersResult['total_users']; ?></strong>
                                </div>
                            </div>
                            <div class="latest-users">
                                <h3 class="section-subtitle">Latest Users</h3>
                                <ul class="user-list">
                                    <?php foreach ($latestUsers as $user): ?>
                                        <li class="user-item">
                                            <span class="user-name"><?php echo $user['first_name'] . ' ' . $user['last_name']; ?></span>
                                            <span class="user-date"><?php echo $user['created_at']; ?></span>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="dashboard-section" style="margin-bottom: 0;">
                        <div class="dashboard-section-header">
                            <h2 class="section-title">Supplier Overview</h2>
                        </div>
                        <div class="dashboard-section-content">
                            <div class="supplier-stats">
                                <div class="stat">
                                    <p class="stat-label">Total Suppliers:</p>
                                    <strong class="stat-value"><?php echo $totalSuppliersResult['total_suppliers']; ?></strong>
                                </div>
                            </div>
                            <div class="latest-suppliers">
                                <h3 class="section-subtitle">Latest Suppliers</h3>
                                <ul class="supplier-list">
                                    <?php foreach ($latestSuppliers as $supplier): ?>
                                        <li class="supplier-item">
                                            <span class="supplier-name"><?php echo $supplier['supplier_name']; ?></span>
                                            <span class="supplier-date"><?php echo $supplier['created_at']; ?></span>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-section">
                        <div class="dashboard-section-header">
                            <h2 class="section-title">Product Overview</h2>
                        </div>
                        <div class="dashboard-section-content">
                            <div class="product-stats">
                                <div class="stat">
                                    <p class="stat-label">Total Products:</p>
                                    <strong class="stat-value"><?php echo $totalProductsResult['total_products']; ?></strong>
                                </div>
                            </div>
                            <div class="low-quantity-products">
                                <h3 class="section-subtitle">Low Quantity Products</h3>
                                <ul class="product-list">
                                    <?php foreach ($lowQuantityProducts as $product): ?>
                                        <li class="product-item">
                                            <span class="product-name"><?php echo $product['name']; ?></span>
                                            <span class="product-quantity">Quantity: <?php echo $product['quantity']; ?></span>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-section">
                        <div class="dashboard-section-header">
                            <h2 class="section-title">Order Overview</h2>
                        </div>
                        <div class="dashboard-section-content">
                            <div class="order-stats">
                                <div class="stat">
                                    <p class="stat-label">Total Orders:</p> 
                                    <strong class="stat-value"><?php echo $totalOrdersResult['total_orders']; ?></strong>
                                </div>
                                <div class="stat">
                                    <p class="stat-label">Pending Orders:</p>
                                    <strong class="stat-value"><?php echo $pendingOrdersResult['pending_orders']; ?></strong>
                                </div>
                            </div>
                            <div class="latest-orders">
                                <h3 class="section-subtitle">Pending Orders</h3>
                                <ul class="order-list">
                                    <?php foreach ($latestOrders as $order): ?>
                                        <?php if ($order['status'] == 'Pending'): ?>
                                            <li class="order-item">
                                                Order ID: <?php echo $order['id']; ?> - Status: <?php echo $order['status']; ?> - <?php echo $order['created_at']; ?>
                                            </li>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/script.js"></script>
</body>
</html>