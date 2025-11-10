<?php
include 'db.php';

  
if (isset($_POST['id'])) {
    $book_id = $_POST['id'];

      
    $query = "DELETE FROM books WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $book_id);

    if ($stmt->execute()) {
        echo "Book deleted successfully.";
    } else {
        echo "Error deleting book.";
    }

      
    header("Location: index.php");
    exit();
} else {
    echo "No book ID specified.";
}

$conn->close();
?>