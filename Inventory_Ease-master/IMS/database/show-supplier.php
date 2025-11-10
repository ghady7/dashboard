<?php

try {
    // Select supplier information along with the product names supplied by each supplier and the name of the creator
    $stmt = $conn->query("
        SELECT s.id, s.supplier_name, s.supplier_location, s.contact_details, u.first_name, u.last_name, s.created_at, GROUP_CONCAT(p.name) AS products_supplied
        FROM suppliers s
        INNER JOIN supplier_products sp ON s.id = sp.supplier_id
        INNER JOIN products p ON sp.product_id = p.id
        INNER JOIN users u ON s.created_by = u.id
        GROUP BY s.id
    ");
    if ($stmt) {
        $suppliers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else {
        echo "Error executing query";
    }
} catch (PDOException $e) {
    echo "Database Error: " . $e->getMessage();
}


?>