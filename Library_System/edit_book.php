<?php

include 'db.php';

$book = null;

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    $query = "SELECT * FROM books WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $book = $result->fetch_assoc();

    if (!$book) {
        die('Book not found');
    }
} else {
    die('Invalid book ID');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['id']) && isset($_POST['title']) && isset($_POST['author']) && isset($_POST['published_date']) && isset($_POST['genre']) && isset($_POST['price']) && isset($_POST['status'])) {

        $id = $_POST['id'];
        $title = $_POST['title'];
        $author = $_POST['author'];
        $published_date = $_POST['published_date'];
        $genre = $_POST['genre'];
        $price = $_POST['price'];
        $status = $_POST['status'];
        
        $update_query = "UPDATE books SET title = ?, author = ?, published_date = ?, genre = ?, price = ?, status = ? WHERE id = ?";
        $stmt_update = $conn->prepare($update_query);

        if ($stmt_update === false) {
            die('Error in preparing the statement: ' . $conn->error);
        }

        $stmt_update->bind_param("ssssdsi", $title, $author, $published_date, $genre, $price, $status, $id);

        if ($stmt_update->execute()) {
            header('Location: index.php');
            exit();
        } else {
            echo "Error updating book: " . $stmt_update->error;
        }

    } 
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edit Book</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body>
  <main class="form-container">
    <h1>Edit Book</h1>

    <?php if ($book): ?>
    <form action="edit_book.php" method="POST" class="add_book_form_main_container">
      <input type="hidden" name="id" value="<?php echo $book['id']; ?>">

      <label class="row" for="title">
        <span>Title:</span>
        <input type="text" name="title" id="title" value="<?php echo $book['title']; ?>" required>
      </label>

      <label class="row" for="author">
        <span>Author:</span>
        <input type="text" name="author" id="author" value="<?php echo $book['author']; ?>" required>
      </label>

      <label class="row" for="published_date">
        <span>Published Date:</span>
        <input type="date" name="published_date" id="published_date" value="<?php echo $book['published_date']; ?>" required>
      </label>

      <label class="row" for="genre">
        <span>Genre:</span>
        <input type="text" name="genre" id="genre" value="<?php echo $book['genre']; ?>" required>
      </label>

      <label class="row" for="price">
        <span>Price:</span>
        <input type="number" name="price" id="price" value="<?php echo $book['price']; ?>" required>
      </label>

      <label class="row">
        <span>Status:</span>
        <div class="radio-group">
          <label>
            <input type="radio" name="status" value="available" <?php echo $book['status'] === 'available' ? 'checked' : ''; ?>> Available
          </label>
          <label>
            <input type="radio" name="status" value="checked_out" <?php echo $book['status'] === 'checked_out' ? 'checked' : ''; ?>> Checked Out
          </label>
          <label>
            <input type="radio" name="status" value="reserved" <?php echo $book['status'] === 'reserved' ? 'checked' : ''; ?>> Reserved
          </label>
        </div>
      </label>

      <button type="submit" id="addBookBtn">Update Book</button>
    </form>
    <?php else: ?>
      <p>Book not found. Please check the ID.</p>
    <?php endif; ?>
  </main>
</body>
</html>
