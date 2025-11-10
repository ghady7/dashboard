<?php
include('connection.php');

if(isset($_POST['add_product'])) {
    try {
        // Retrieve form data
        $name = $_POST['name'];
        $price = $_POST['price'];
        $quantity = $_POST['quantity']; // Added quantity
        $category = ($_POST['category'] != "") ? $_POST['category'] : $_POST['new_category'];
        $description = $_POST['description'];

        // Insert product into the database
        $sql = "INSERT INTO products (name, price, quantity, category, description) VALUES (:name, :price, :quantity, :category, :description)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':quantity', $quantity); // Bind quantity parameter
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':description', $description);

        if($stmt->execute()) {
            // Product added successfully
            header('Location: ../products.php'); // Redirect to product listing page
            exit();
        } else {
            // Error occurred during execution
            throw new Exception("Error executing SQL statement.");
        }
    } catch (Exception $e) {
        // Handle exception
        echo "Error: " . $e->getMessage();
    }
}
?>
