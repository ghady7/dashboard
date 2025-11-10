<?php
include 'db.php';

$limit = 5;

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

$selected_genre = isset($_GET['genre']) ? $_GET['genre'] : '';

$query = "SELECT DISTINCT genre FROM books";
$result = $conn->query($query);
$genres = [];
while ($row = $result->fetch_assoc()) {
  $genres[] = $row['genre'];
}

$query_books = "SELECT * FROM books WHERE genre LIKE '%$selected_genre%' LIMIT $limit OFFSET $offset";
$result_books = $conn->query($query_books);
$books = [];
while ($row = $result_books->fetch_assoc()) {
  $books[] = $row;
}

$query_count = "SELECT COUNT(*) AS total FROM books WHERE genre LIKE '%$selected_genre%'";
$result_count = $conn->query($query_count);
$total_books = $result_count->fetch_assoc()['total'];
$total_pages = ceil($total_books / $limit);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Library System</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body>

  <div class="container">
    <h1>Library System</h1>

    <div class="genres">
      <h3>Genres</h3>
      <div class="genre-list">
      <a href="?page=1" class="genre <?php echo ($selected_genre === '' || $selected_genre === 'All') ? 'active' : ''; ?>">All</a>
      <?php foreach ($genres as $genre): ?>
          <a href="?page=1&genre=<?php echo urlencode($genre); ?>" class="genre <?php echo ($selected_genre === $genre) ? 'active' : ''; ?>"><?php echo $genre; ?></a>
        <?php endforeach; ?>
        
      </div>
    </div>

     <div class="table-container">
    <table class="book-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Published Date</th>
          <th>Genre</th>
          <th>Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($books as $book): ?>
          <tr>
            <td><?php echo $book['id']; ?></td>
            <td><?php echo $book['title']; ?></td>
            <td><?php echo $book['author']; ?></td>
            <td><?php echo $book['published_date']; ?></td>
            <td><?php echo $book['genre']; ?></td>
            <td>$<?php echo number_format($book['price'], 2); ?></td>
            <td><?php echo ucfirst(str_replace('_', ' ', $book['status'])); ?></td>
            <td class="actions">
              <form action="delete_book.php" method="POST">
                <input type="hidden" name="id" value="<?php echo $book['id']; ?>">
                <button class="delete"> <i class="fas fa-trash-alt" style="font-size:12px;"></i> Delete</button>
              </form>
              <form action="edit_book.php" method="POST">
    <input type="hidden" name="id" value="<?php echo $book['id']; ?>">
    <button class="edit">
        <i class="fas fa-pencil-alt" style="font-size:12px;"></i> Edit
    </button>
</form>

            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
    </div>

    <div class="pagination">
      <?php
      for ($i = 1; $i <= $total_pages; $i++) {
          $genre_param = $selected_genre ? "&genre=" . urlencode($selected_genre) : '';
          if ($i == $page) {
              echo "<span class='page-link current'>$i</span>";
          } else {
              echo "<a href='?page=$i$genre_param' class='page-link'>$i</a>";
          }
      }
      ?>
    </div>

    <form action="add_book.php" method="POST" class="add-book">
      <button class="add-btn"><i class="fas fa-plus" style="font-size: 14px;"></i> Add Book</button>
    </form>
  </div>

</body>
</html>

<?php
$conn->close();
?>
