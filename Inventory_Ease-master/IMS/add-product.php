<?php
include('database/connection.php');

session_start();
if(!isset($_SESSION['user'])) {
    header('location: login.php');
    exit();
}

$user = $_SESSION['user'];

$stmt = $conn->query("SELECT DISTINCT category FROM products");
$categories = $stmt->fetchAll(PDO::FETCH_COLUMN);
?>

<!DOCTYPE html>
<html> 
<head>
    <title>Add Product - Stock Management</title>
    <link rel="stylesheet" type="text/css" href="css/products.css">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<style>



input, button, textarea, select {
    font: inherit;
}


#dashboardMainContainer {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
}

div.dashboard_sidebar {
    width: 20%;
    background: #323232;
    height: 100vh;
    padding: 20px 15px;
}

div.dashboard_content_container {
    width: 80%;
    background: #f4f6f9;
    display: flex;
    flex-direction: column;
}

.dashboard_content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;

}

.dashboard_content_main {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 900px; /* Limits form width */
    margin: 0 auto;
    
}

h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 600;
}


form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;}

label {
    font-weight: bold;
    font-size: 14px;
}

input[type="text"], input[type="number"], select, textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1.5px solid #ccc;
    margin-top: 5px;
    font-size: 14px;
    transition: all 0.3s;
}
input[type="text"]:focus, input[type="number"]:focus, select:focus, textarea:focus{
    border-color: #0056b3;
    outline: none;
} 

textarea {
    resize: vertical;
    min-height: 80px;
}

button.appBtn {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 16px;
    align-self: flex-end;
    margin-top: 20px;
}

button.appBtn:hover {
    background-color: #0056b3;
    transform: scale(1.02);
}

button.appBtn:focus {
    outline: none;
}

/* Responsive Styles */
@media screen and (max-width: 768px) {
    .dashboard_content_main {
        padding: 15px;
        width: 100%;
    }

    input[type="text"], input[type="number"], select, textarea {
        font-size: 16px;
        padding: 12px;
    }

    button.appBtn {
        width: 100%;
        padding: 12px 20px;
        font-size: 18px;
    }
}

    </style>
<body>
    <script src="https://kit.fontawesome.com/4fbfb479cc.js" crossorigin="anonymous"></script>
    <div id="dashboardMainContainer">
        <?php include('partials/app-sidebar.php') ?>
        <div class="dashboard_content_container" id="dashboard_content_container">
            <?php include('partials/app-topnav.php') ?>
            <div class="dashboard_content">
                <div class="dashboard_content_main"> 
                    <h2>Add New Product</h2>
                    <form method="POST" action="database/add-products.php" class="add-product-form">
                    <div class="form-group">
                        <label for="name">Product Name:</label>
                        <input type="text" name="name" id="name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="price">Price:</label>
                        <input type="number" name="price" id="price" step="0.01" min="0" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="quantity">Quantity:</label>
                        <input type="number" name="quantity" id="quantity" min="1" required>
                    </div>

                    <div class="form-group">
                        <label for="category">Category:</label>
                        <select name="category" id="category">
                            <option value="">Select Existing Category</option>
                            <?php foreach ($categories as $category) : ?>
                                <option value="<?php echo $category; ?>"><?php echo $category; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="new_category">Or Enter New Category:</label>
                        <input type="text" name="new_category" id="new_category">
                    </div>
                    
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <textarea name="description" id="description" rows="4" cols="50" required></textarea>
                    </div>
                    
                    <button type="submit" name="add_product" class="appBtn">Add Product</button>
                </form>
                </div>
            </div>
        </div>
    </div>
    <script src="js/script.js"></script>
</body>
</html>