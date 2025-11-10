<?php
include('connection.php');

session_start();
if(!isset($_SESSION['user'])) header('location: login.php');

$user = $_SESSION['user'];


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $supplier_name = $_POST['supplier_name'];
    $supplier_location = $_POST['supplier_location'];
    $contact_details = $_POST['contact_details'];
    $products = $_POST['products'];
    
    try {
        
        $conn->beginTransaction();
        
        
        $stmt = $conn->prepare("INSERT INTO suppliers (supplier_name, supplier_location, contact_details, created_by) VALUES (:supplier_name, :supplier_location, :contact_details, :created_by)");
        $stmt->bindParam(':supplier_name', $supplier_name, PDO::PARAM_STR);
        $stmt->bindParam(':supplier_location', $supplier_location, PDO::PARAM_STR);
        $stmt->bindParam(':contact_details', $contact_details, PDO::PARAM_STR);
        $stmt->bindParam(':created_by', $user['id'], PDO::PARAM_INT);
        $stmt->execute();
        
        
        $supplier_id = $conn->lastInsertId();
        
        
        foreach ($products as $product_id) {
            $stmt = $conn->prepare("INSERT INTO supplier_products (supplier_id, product_id) VALUES (:supplier_id, :product_id)");
            $stmt->bindParam(':supplier_id', $supplier_id, PDO::PARAM_INT);
            $stmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
            $stmt->execute();
        }
        
        
        $conn->commit();
        
        
        header('location: ../supplier.php');
        exit();
    } catch (PDOException $e) {
       
        $conn->rollback();
        
       
        header('location: supplier.php?error=1');
        exit();
    }
} else {
    
    header('location: supplier.php');
    exit();
}
?>
