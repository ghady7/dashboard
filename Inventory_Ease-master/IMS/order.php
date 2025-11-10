<?php
include('database/connection.php');

session_start();
if (!isset($_SESSION['user'])) {
    header('location: login.php');
    exit();
}

$user = $_SESSION['user'];


// Fetch orders data
$stmt = $conn->query("SELECT o.id, p.id AS product_id, p.name AS product_name, o.qty_ordered, o.qty_received, s.supplier_name, o.status, CONCAT(u.first_name, ' ', u.last_name) AS ordered_by, o.created_at FROM orders o
INNER JOIN products p ON o.product_id = p.id
INNER JOIN suppliers s ON o.supplier_id = s.id
INNER JOIN users u ON o.ordered_by = u.id");

$orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html> 
<head>
    <title>Order - Stock Management</title>
    <link rel="stylesheet" type="text/css" href="css/order.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .status-pending {
            background-color: yellow;
            padding: 5px 10px;
            border-radius: 5px;
            width: 100%;
        }
        .status-completed {
            background-color: green;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
        }
        .update-btn {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
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
                    <h2>Orders</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Ordered Qty</th>
                                <th>Received Qty</th>
                                <th>Supplier</th>
                                <th>Status</th>
                                <th>Ordered By</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <?php foreach ($orders as $order): ?>
                            <tr>
                                <td><?php echo $order['product_name']; ?></td>
                                <td><?php echo $order['qty_ordered']; ?></td>
                                <td>
                                    <input type="number" name="qty_received_<?php echo $order['id']; ?>" value="<?php echo $order['qty_received']; ?>">
                                </td>
                                <td><?php echo $order['supplier_name']; ?></td>
                                <td id="status_<?php echo $order['id']; ?>">
                                    <?php if ($order['status'] == 'Pending'): ?>
                                    <span class="status-pending"><?php echo $order['status']; ?></span>
                                    <?php elseif ($order['status'] == 'Completed'): ?>
                                    <span class="status-completed"><?php echo $order['status']; ?></span>
                                    <?php endif; ?>
                                </td>
                                <td><?php echo $order['ordered_by']; ?></td>
                                <td><?php echo $order['created_at']; ?></td>
                                <td>
                                    <button class="update-btn" data-order-id="<?php echo $order['id']; ?>" data-product-id="<?php echo $order['product_id']; ?>">Update</button>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <script>
var updateButtons = document.querySelectorAll('.update-btn');
updateButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        var orderId = button.getAttribute('data-order-id');
        var productId = button.getAttribute('data-product-id');
        var qtyReceivedInput = document.querySelector('input[name="qty_received_' + orderId + '"]');
        var qtyReceived = parseInt(qtyReceivedInput.value);

        // Update status to Completed
        var statusSpan = document.getElementById('status_' + orderId);
        statusSpan.innerHTML = '<span class="status-completed">Completed</span>';


        // Update status in the database
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'database/update-order-status.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText); // Log response from server
            }
        };
        xhr.send('order_id=' + orderId); // Send order ID to the server-side script


        // Update product quantity in the database
        var xhr2 = new XMLHttpRequest();
        xhr2.open('POST', 'database/update-product-quantity.php', true);
        xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr2.onreadystatechange = function() {
            if (xhr2.readyState == 4 && xhr2.status == 200) {
                console.log(xhr2.responseText); // Log response from server
            }
        };
        xhr2.send('product_id=' + productId + '&qty_received=' + qtyReceived);

        // Reset input field after update
        qtyReceivedInput.value = '';

        // Hide update button and input field
        button.style.display = 'none';
        qtyReceivedInput.style.display = 'none';

        // Store the order ID in localStorage to remember which buttons were clicked
        localStorage.setItem('order_' + orderId, 'completed');
    });
});

// Check localStorage on page load to hide update buttons for completed orders
updateButtons.forEach(function(button) {
    var orderId = button.getAttribute('data-order-id');
    if (localStorage.getItem('order_' + orderId) === 'completed') {
        var qtyReceivedInput = document.querySelector('input[name="qty_received_' + orderId + '"]');
        button.style.display = 'none';
        qtyReceivedInput.style.display = 'none';
    }
});

</script>
<script src="js/script.js"></script>
</body>
</html>
