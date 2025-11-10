<?php
include('database/connection.php');
session_start();

if (!isset($_SESSION['user'])) {
    header('location: login.php');
}

$user = $_SESSION['user'];

// Capture the search query if it's set
$searchQuery = isset($_GET['search']) ? $_GET['search'] : '';

// Modify the query to filter based on the search term
$query = "SELECT suppliers.*, 
       GROUP_CONCAT(products.name) AS products_supplied
FROM suppliers
LEFT JOIN supplier_products 
    ON suppliers.id = supplier_products.supplier_id
LEFT JOIN products 
    ON supplier_products.product_id = products.id";

if ($searchQuery) {
    $query .= " WHERE suppliers.supplier_name LIKE :searchQuery 
                OR products.name LIKE :searchQuery
                OR suppliers.supplier_location LIKE :searchQuery";
}

$query .= " GROUP BY suppliers.id;"; // Group by supplier to get aggregated product names


$stmt = $conn->prepare($query);

if ($searchQuery) {
    $stmt->bindValue(':searchQuery', '%' . $searchQuery . '%');
}
$stmt->execute();

$suppliers = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <title>Supplier - Stock Management</title>
    <link rel="stylesheet" type="text/css" href="css/supplier.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <script src="https://kit.fontawesome.com/4fbfb479cc.js" crossorigin="anonymous"></script>
    <div id="dashboardMainContainer">
        <?php include('partials/app-sidebar.php') ?>
        <div class="dashboard_content_container" id="dashboard_content_container">
            <?php include('partials/app-topnav.php') ?>
            <div class="dashboard_content">
                <div class="dashboard_content_main">
                    <h2>Supplier Management</h2>
                    
                    <form method="GET">
                        <input type="text" name="search" id="searchInput" placeholder="Search..." value="<?= htmlspecialchars($searchQuery) ?>">
                    </form>
                    

                    <div class="supplier-list">
                        <div style="background-color: black; border:1px solid grey;border-radius:5px;">
    <table id="supplierTable" style="margin-bottom:0;">
        <thead>
            <tr>
                <th>Supplier Name</th>
                <th>Location</th>
                <th>Contact Details</th>
                <th>Created At</th>
                <th>Products Supplied</th>
            </tr>
        </thead>
        <tbody style="background-color: white;">
            <?php
            if (isset($suppliers) && count($suppliers) > 0) {
                foreach ($suppliers as $supplier) {
                    echo "<tr class='supplierRow'>";
                    echo "<td>" . $supplier['supplier_name'] . "</td>";
                    echo "<td>" . $supplier['supplier_location'] . "</td>";
                    echo "<td>" . $supplier['contact_details'] . "</td>";
                    echo "<td>" . $supplier['created_at'] . "</td>";
                    echo "<td>" . $supplier['products_supplied'] . "</td>"; 
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='5'>No suppliers found</td></tr>";
            }
            ?>
        </tbody>
    </table>
                        </div>
</div>

<script>
    // Instant client-side filtering
    document.getElementById('searchInput').addEventListener('input', function () {
        const filter = this.value.toLowerCase();
        const rows = document.querySelectorAll('#supplierTable .supplierRow');

        rows.forEach(function (row) {
            const supplierName = row.cells[0].textContent.toLowerCase();
            const supplierLocation = row.cells[1].textContent.toLowerCase();
            const productsSupplied = row.cells[4].textContent.toLowerCase();

            // Check if the filter matches supplier name, location, or products supplied
            if (
                supplierName.indexOf(filter) > -1 || 
                supplierLocation.indexOf(filter) > -1 || 
                productsSupplied.indexOf(filter) > -1
            ) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
</script>