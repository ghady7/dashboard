<?php
include('database/connection.php');

session_start();
if(!isset($_SESSION['user'])) header('location: login.php');

$user = $_SESSION['user'];

?>

<!DOCTYPE html>
<html> 
<head>
    <title>Add Supplier - Stock Management</title>
    <link rel="stylesheet" type="text/css" href="css/supplier.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
<body>
    <script src="https://kit.fontawesome.com/4fbfb479cc.js" crossorigin="anonymous"></script>
    <div id="dashboardMainContainer">
        <?php include('partials/app-sidebar.php') ?>
        <div class="dashboard_content_container" id="dashboard_content_container">
            <?php include('partials/app-topnav.php') ?>
            <div class="dashboard_content">
                <div class="dashboard_content_main"> 
                    <h2>Add New Supplier</h2>
                    <br>
                    <form method="POST" action="database/add-suppliers.php">
                        <label for="supplier_name">Supplier Name:</label><br>
                        <input type="text" id="supplier_name" name="supplier_name" required><br><br>
                        
                        <label for="supplier_location">Location:</label><br>
                        <input type="text" id="supplier_location" name="supplier_location" required><br><br>
                        
                        <label for="contact_details">Contact Details:</label><br>
                        <input type="text" id="contact_details" name="contact_details" required><br><br>
                        
                        <label for="products">Products Supplied:</label><br><br>
                      <div class="product-checkboxes">
    <?php
    $stmt = $conn->query("SELECT * FROM products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($products as $product) {
        echo "<div class='product-checkbox'>";
        echo "<input type='checkbox' id='product_" . $product['id'] . "' name='products[]' value='" . $product['id'] . "'>";
        echo "<label style='font-weight:normal' for='product_" . $product['id'] . "'>" . htmlspecialchars($product['name']) . "</label>";
        echo "</div>";
    }
    ?>
</div>
<style>
    /* In css/supplier.css */
.product-checkboxes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    margin-top: 10px;
}

.product-checkbox {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    transition: background-color 0.3s;
}

.product-checkbox:hover {
    background-color: #e6e6e6;
}


.product-checkbox input[type="checkbox"] {
    transform: scale(1.2);
}

</style>
<br>

                        
                        <button type="submit" style="background-color:#0056b3;text-align: center;">Add</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="js/script.js"></script>
</body>
</html>
