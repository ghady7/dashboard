<?php
include('database/connection.php');

session_start();
if (!isset($_SESSION['user'])) {
    header('location: login.php');
    exit(); // Stop further execution if not logged in
}

$user = $_SESSION['user'];

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['submit'])) {
    // Check if the submit button is for deleting
    if ($_POST['submit'] == 'delete') {
        // Loop through each product to delete
        foreach ($_POST['quantity'] as $productId => $quantity) {
            // Ensure productId is a positive integer
            if (is_numeric($productId) && $productId > 0) {
                // Check if quantity to delete is specified and is a positive integer
                if (is_numeric($quantity) && $quantity > 0) {
                    $quantityToDelete = intval($quantity);
                    
                    // Perform deletion query
                    $stmt = $conn->prepare("UPDATE products SET quantity = quantity - :quantityToDelete WHERE id = :productId");
                    $stmt->bindParam(':quantityToDelete', $quantityToDelete, PDO::PARAM_INT);
                    $stmt->bindParam(':productId', $productId, PDO::PARAM_INT);
                    
                    if ($stmt->execute()) {
                        // Handle successful deletion
                    } else {
                        // Handle error in execution
                    }
                } else {
                    // Handle invalid quantity
                }
            }
        }
        header('location: delete-product.php');
        exit(); // Stop further execution
    }
}
?>


<!DOCTYPE html>
<html>

<head>
    <title>Delete Products - Stock Management</title>
    <link rel="stylesheet" type="text/css" href="css/products.css">
 <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <style>

    </style>
</head>

<body>
<script src="https://kit.fontawesome.com/4fbfb479cc.js" crossorigin="anonymous"></script>
    <div id="dashboardMainContainer">
        <?php include('partials/app-sidebar.php') ?>
        <div class="dashboard_content_container" id="dashboard_content_container">
            <?php include('partials/app-topnav.php') ?>
            <div class="dashboard_content">
                <div class="dashboard_content_main" style="padding-bottom:100px">
                    <div class="form-container">
                        <h2 >Delete Products</h2>
                        <form method="POST">
                            <div style="border: 1px solid grey;margin-top: 20px;border-radius: 5px;">
                                <table style="border-radius: 5px; 
                                    border-collapse: collapse; 
                                    overflow: hidden;
                                    margin-bottom: 0;

                                   ">
                                <tr>
                                    <th>Product Name</th>
                                    <th>Current Quantity</th>
                                    <th>Delete Quantity</th>
                                </tr>

                                <?php
                                $stmt = $conn->query("SELECT id, name, quantity FROM products");
                                $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                                foreach ($products as $product) {
                                    echo "<tr>";
                                    echo "<td>" . $product['name'] . "</td>";
                                    echo "<td>" . $product['quantity'] . "</td>";
                                    echo "<td><input type='number' name='quantity[" . $product['id'] . "]' min='0' max='" . $product['quantity'] . "'></td>";
                                    echo "</tr>";
                                }
                                ?>
                            </table></div>
                            <button style=" background-color:#c03e3e;margin-top: 20px;float: right;" type="submit" name="submit" value="delete"><i class="fas fa-trash-alt"></i> Delete Selected</button>
                        </form>
                    
                </div>
            </div>
        </div>
    </div>
    <script src="js/script.js"></script>
</body>

</html>