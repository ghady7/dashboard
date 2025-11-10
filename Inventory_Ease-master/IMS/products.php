<?php
include('database/connection.php');

session_start();
if(!isset($_SESSION['user'])) header('location: login.php');

$user = $_SESSION['user'];

$stmt = $conn->query("SELECT DISTINCT category FROM products");
$categories = $stmt->fetchAll(PDO::FETCH_COLUMN);
?>

<!DOCTYPE html>
<html> 
<head>
    <title>Products - Stock Management</title>
    <link rel="stylesheet" type="text/css" href="css/products.css">
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
                    <h2>Product Management</h2>
                    <br>
                    <form method="GET">
                        <input type="text" name="search" placeholder="Search">
                        <select name="category" >
                            <option value="" >All Categories</option>
                            <?php foreach ($categories as $category) : ?>
                            <option value="<?php echo $category; ?>"><?php echo $category; ?></option>
                            <?php endforeach; ?>
                        </select>
                        <button type="submit" style="margin-top:10px">Search</button>
                    </form>
                    <br>
                    <div class="product-list">
                        <?php
                        // Prepare the SQL query
                        $sql = "SELECT * FROM products";

                        // Handle search query
                        if(isset($_GET['search']) && !empty($_GET['search'])) {
                            $search = $_GET['search'];
                            $sql .= " WHERE name LIKE '%$search%'";
                        }

                        if(isset($_GET['category']) && !empty($_GET['category'])) {
                            $category = $_GET['category'];
                            $sql .= " WHERE category = '$category'";
                        }

                        // Execute the query
                        $stmt = $conn->query($sql);
                        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

                        // Display products
                        if (count($products) > 0) {
                            foreach ($products as $product) {
                                echo "<div class='product'>";
                                echo "<h3>" . $product['name'] . "</h3><hr color=black>";
                                echo "<p>Price: $" . $product['price'] . "</p>";
                                echo "<p>Quantity: " . $product['quantity'] . "</p>";
                                echo "<p>Description: " . $product['description'] . "</p>";
                                echo "</div>";
                            }
                        } else {
                            echo "<p>No products found</p>";
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/script.js"></script>
</body>
</html>
