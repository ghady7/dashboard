<?php
include 'db.php';
if (isset($_POST["title"])):
    
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $author = $_POST['author'];
    $published_date = $_POST['published_date'];
    $genre = $_POST['genre'];
    $price = $_POST['price'];
    $status = $_POST['status'];

      
    $query = "INSERT INTO books (title, author, published_date, genre, price, status) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssds", $title, $author, $published_date, $genre, $price, $status);
    $stmt->execute();

      
    header('Location: index.php');
    exit();
  }

  $mysqli->close();
else:
?>

  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Book</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  </head>

  <body>
    <main class="form-container">
      <h1>Add New Book</h1>
      <form action="add_book.php" method="POST" class="add_book_form_main_container">
        <label class="row" for="title">
          <span>Title:</span>
          <input type="text" name="title" required>
        </label>

        <label class="row" for="author">
          <span>Author:</span>
          <input type="text" name="author" required>
        </label>

        <label class="row" for="published_date">
          <span>Published Date:</span>
          <input type="date" name="published_date" required>
        </label>

        <label class="row" for="genre">
          <span>Genre:</span>
          <input type="text" name="genre" required>
        </label>

        <label class="row" for="price">
          <span>Price:</span>
          <input type="number" step="0.01" name="price" required>
        </label>

        <label class="row">
          <span>Status:</span>
          <div class="radio-group">
            <label>
              <input type="radio" name="status" value="available" required> Available
            </label>
            <label>
              <input type="radio" name="status" value="checked_out"> Checked Out
            </label>
            <label>
              <input type="radio" name="status" value="reserved"> Reserved
            </label>
          </div>
        </label>

     
          <button type="submit" id="addBookBtn">Add Book</button>
       

      </form>
    <?php endif; ?>
    </main>
  </body>

  </html>