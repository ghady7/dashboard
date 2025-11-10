<?php
include('database/connection.php');

session_start();
if (!isset($_SESSION['user'])) {
    header('location: login.php');
    exit();
}

$user = $_SESSION['user'];


?>

<!DOCTYPE html>
<html lang="en"> 
<head>
    <title>Add Order - Stock Management</title>
    <link rel="stylesheet" type="text/css" href="css/order.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
       
        .dashboard_content_main {
            background-color: #fff;
            padding: 20px;
            padding-bottom: 10px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            margin: 0 auto;
        }

        h2 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #333;
        }

        form {
            display: flex;
            flex-direction: column;
        }

        label {
            font-size: 16px;
            color: #333;
            margin-bottom: 8px;
        }

        select, input[type="number"] {
            width: 100%;
            padding: 12px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 14px;
            transition: all 0.3s ease;
        }

        select:focus, input[type="number"]:focus {
            border-color: #0056b3;
            outline: none;
        }

        input[type="submit"] {
            background-color: #0056b3;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 6px;
            margin-top: 20px;
            margin-left:auto ;
            width: 150px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        input[type="submit"]:hover {
            background-color: #004085;
        }

        input[type="submit"]:focus {
            outline: none;
            background-color: #003366;
        }
    </style>
</head>
<body>
    <script src="https://kit.fontawesome.com/4fbfb479cc.js" crossorigin="anonymous"></script>
    <div id="dashboardMainContainer">
        <?php include('partials/app-sidebar.php') ?>
        <div class="dashboard_content_container" id="dashboard_content_container">
            <?php include('partials/app-topnav.php') ?>
            <div class="dashboard_content">
                <div class="dashboard_content_main">
                    <h2>Add New Order</h2>
                    <form method="POST" action="database/add-orders.php">
                        <label for="product">Product:</label>
                        <select id="product" name="product" required>
                            <!-- Fetch and display product options from the database -->
                            <?php
                            include('database/connection.php');
                            $stmt = $conn->query("SELECT * FROM products");
                            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            foreach ($products as $product) {
                                echo "<option value='" . $product['id'] . "'>" . $product['name'] . "</option>";
                            }
                            ?>
                        </select>

                        <label for="qty_ordered">Ordered Quantity:</label>
                        <input type="number" id="qty_ordered" name="qty_ordered" required>

                        <label for="supplier">Supplier:</label>
                        <select id="supplier" name="supplier" required>
                            <!-- Fetch and display supplier options from the database -->
                            <?php
                            $stmt = $conn->query("SELECT * FROM suppliers");
                            $suppliers = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            foreach ($suppliers as $supplier) {
                                echo "<option value='" . $supplier['id'] . "'>" . $supplier['supplier_name'] . "</option>";
                            }
                            ?>
                        </select>

                        <input type="submit" value="Add Order">
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="js/script.js"></script>
</body>
</html>