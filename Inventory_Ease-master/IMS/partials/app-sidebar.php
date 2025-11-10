<?php
// Assuming you're using a PHP session for login

// Database connection setup
$host = 'localhost'; // Your database host
$dbname = 'inventory'; // Your database name
$username = 'root'; // Your database username
$password = ''; // Your database password

// Create PDO connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Fetch the current logged-in user (change the logic based on your authentication system)
$currentUser = $_SESSION['user'];

// Fetch users for displaying in the modal
$query = "SELECT id, first_name, last_name, email,created_at,updated_at FROM users";
$stmt = $pdo->prepare($query);
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// If the form for login is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login_user'])) {
    $userId = $_POST['user_id'];
    $password = $_POST['password'];

    // Get user details from the database
    $userQuery = "SELECT * FROM users WHERE id = :id";
    $stmt = $pdo->prepare($userQuery);
    $stmt->bindParam(':id', $userId);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        // Correct password, set the session and redirect
        $_SESSION['user'] = $user;
        header("Location: dashboard.php");
        exit();
    } else {
        $errorMessage = "Invalid credentials!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        .dashboard_sidebar {
            background-color: blue;
            color: #fff;
            padding: 20px;
            width: 250px;
            overflow: scroll;
        }

        .dashboard_logo {
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
        }

        .dashboard_sidebar_user {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            padding: 10px;
            background-color: rgba(255, 255, 255, 0.25);
            width: 80%;
            margin: auto;
            border-radius: 8px;
            flex-direction: column;
        }

        .dashboard_sidebar_user img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

        .dashboard_sidebar_user span {
            font-size: 18px;
        }

        .dashboard_menu_lists {
            list-style: none;
            padding: 0;
        }

        .menuActive a {
            color: #fff;
        }

        .menuText {
            margin-left: 20px;
            color:black;
            font-size: 17px;
            margin-left: 0;
            font-weight: 350;
        }

        .submenu {
            display: none;
            list-style: none;
            padding-left: 20px;
        }

        .submenu a {
            color: #fff;
            text-decoration: none;
            display: block;
            padding: 12px 0;
            text-align: center;
            transition: background-color 0.3s;
        }

        .submenu-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            height: 35px;
        }

        .submenu-toggle i {
            margin-right: 10px;
        }

        .dashboard_sidebar_user #userName {
            display: block;
            font-weight: 400;
        }

        .dashboard_menu_lists li:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
        }

        .glass-effect {
            position: relative;
            background-color: rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            padding: 15px;
            backdrop-filter: blur(20px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff;
            transition: all 0.3s ease-in-out;
        }

        .glass-effect:hover {
            background-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
            border-color: rgba(255, 255, 255, 0.3);
        }

        .glass-effect h2, .glass-effect p {
            margin: 0;
            padding: 0;
            color: inherit;
            font-weight: 500;
        }

        .glass-effect h2 {
            font-size: 1.5em;
            margin-bottom: 15px;
        }

        .glass-effect p {
            font-size: 1em;
            line-height: 1.6;
        }
        #userListModal {
            display: none;
            position: fixed;
            opacity: 0;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            width: 300px;
            transition: 0.3s all ease; 
        }

        #userListModal ul {
            list-style: none;
            padding: 0;
            padding-top: 8px;
        }

        #userListModal ul li {
            margin: 10px 0;
            text-align: center;
        }

        #userListModal ul li a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;

        }

        #userListModal ul li a:hover {
            color: blue;
        }

        #userListModal button {
            float: right;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
        }
         #userListModal h3 {
            text-align: center;
        }

        body.modal-open {
            overflow: hidden;
        }
       
            #userListOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent black */
        z-index: 999; /* Ensure it appears below the modal */
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    </style>
    
</head>
<body>
<div class="dashboard_sidebar" id="dashboard_sidebar" style="background-color:#4a5663;border-right:1px solid #D1D1D1">
    <div class="glass-effect">
        <h3 class="dashboard_logo" id="dashboard_logo" style="text-shadow: 2px 5px 5px #4a5663;">Stock Management</h3>
        <div class="dashboard_sidebar_user" onclick="showUserList();">
            <img src="images/user/profile.jpg" alt="" id="userImage">
            <span id="userName"><?= $currentUser['first_name'] . ' ' . $currentUser['last_name'] ?></span>
        </div>
        <div class="dashboard_sidebar_menus">
            <ul class="dashboard_menu_lists">
                <li>
                    <div class="submenu-toggle">
                        <i class="fas fa-tachometer-alt"></i>
                        <span class="menuText">Dashboard</span>
                        <i class="fas fa-caret-down"></i>
                    </div>
                    <ul class="submenu">
                        <li><a class="submenuLinks" href="dashboard.php"><i class="fas fa-user"></i>&nbsp; Dashboard</a></li>
                    </ul>
                </li>
                <?php if ($currentUser['role'] === 'admin'): ?>
                <li>
                    <div class="submenu-toggle">
                        <i class="fas fa-user-plus"></i>
                        <span class="menuText">Users</span>
                        <i class="fas fa-caret-down"></i>
                    </div>
                    <ul class="submenu">
                        <li><a class="submenuLinks" href="users-add.php"><i class="fas fa-user-plus"></i>&nbsp; Add User</a></li>
                    </ul>
                </li>
                <?php endif; ?>
                <li>
                    <div class="submenu-toggle">
                        <i class="fas fa-box"></i>
                        <span class="menuText">Products</span>
                        <i class="fas fa-caret-down"></i>
                    </div>
                    <ul class="submenu">
                        <li><a class="submenuLinks" id="managementLink" href="products.php"><i class="fas fa-box"></i> &nbsp;Management</a></li>
                        <?php if ($currentUser['role'] === 'admin'): ?>
                        <li><a class="submenuLinks" href="add-product.php"><i class="fas fa-plus"></i> &nbsp;Add Products</a></li>
                        <li><a class="submenuLinks" id="deleteLink" href="delete-product.php"><i class="fas fa-trash"></i> &nbsp;Del. Products</a></li>
                        <?php endif; ?>
                    </ul>
                </li>
                <li>
                    <div class="submenu-toggle">
                        <i class="fas fa-money-bill"></i>
                        <span class="menuText">Supplier</span>
                        <i class="fas fa-caret-down"></i>
                    </div>
                    <ul class="submenu">
                        <li><a class="submenuLinks" href="supplier.php"><i class="fas fa-money-bill"></i> &nbsp;View Supplier</a></li>
                        <?php if ($currentUser['role'] === 'admin'): ?>
                        <li><a class="submenuLinks" href="add-supplier.php"><i class="fas fa-truck"></i> &nbsp;Add Supplier</a></li>
                        <?php endif; ?>
                    </ul>
                </li>

                <li>
                    <div class="submenu-toggle">
                        <i class="fas fa-ticket"></i>
                        <span class="menuText">Purchase Order</span>
                        <i class="fas fa-caret-down"></i>
                    </div>
                    <ul class="submenu">
                        <li><a class="submenuLinks" href="order.php"><i class="fas fa-eye"></i> &nbsp;View Orders</a></li>
                        <li><a class="submenuLinks" href="add-order.php"><i class="fas fa-plus"></i> &nbsp;Create Order</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
<!-- User selection modal -->
<div id="userListOverlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5);"></div>

<div id="userListModal" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background:#fff; padding:20px; border-radius:8px;">
    <div>
        <h3><u>Select a User to Log In:</u></h3>
        <ul>
            <?php foreach ($users as $user): ?>
                <li>
                    <a href="#" onclick="selectUser(<?= $user['id'] ?>, '<?= $user['first_name'] . ' ' . $user['last_name'] ?>')">
                        <?= $user['first_name'] . ' ' . $user['last_name'] ?>
                    </a>        
                    
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</div>

<script>
function showUserList() {
    const modal = document.getElementById('userListModal');
    const overlay = document.getElementById('userListOverlay');

    // Show modal and overlay with transition
    overlay.style.display = 'block';
    modal.style.display = 'block';

    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.opacity = '1';
    }, 10);

    document.body.classList.add('modal-open'); // Prevent body scroll

    // Add click event listener to the overlay
    overlay.addEventListener('click', closeUserList);
}

function closeUserList() {
    const modal = document.getElementById('userListModal');
    const overlay = document.getElementById('userListOverlay');

    // Hide modal and overlay with transition
    overlay.style.opacity = '0';
    modal.style.opacity = '0';

    // Wait for transition to complete before hiding
    setTimeout(() => {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }, 300);

    document.body.classList.remove('modal-open'); // Restore body scroll

    // Remove event listener to avoid duplicates
    overlay.removeEventListener('click', closeUserList);



}
   function selectUser(userId, userName) {
    let password = prompt("Enter password for " + userName);
    if (password) {
        // Use AJAX to validate the password
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'partials/validate_password.php', true); // Replace with your actual validation endpoint
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // Data to send to the server
        const data = `user_id=${encodeURIComponent(userId)}&password=${encodeURIComponent(password)}`;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            // If the password is correct, proceed with form submission
                            let form = document.createElement('form');
                            form.method = 'POST';
                            form.action = 'partials/login_user.php';
                            form.innerHTML = `<input type="hidden" name="user_id" value="${userId}">
                                              <input type="hidden" name="password" value="${password}">
                                              <input type="hidden" name="login_user" value="1">`;
                            document.body.appendChild(form);
                            form.submit();
                        } else {
                            // If the password is incorrect, show an alert
                            alert('Incorrect password. Please try again.');
                        }
                    } catch (e) {
                        alert('An error occurred while parsing the server response. Please try again.');
                    }
                } else {
                    alert('An error occurred while validating the password. Please try again.');
                }
            }
        };

        // Send the AJAX request
        xhr.send(data);
    }
}


     document.addEventListener('DOMContentLoaded', function() {
        const submenuToggles = document.querySelectorAll('.submenu-toggle');
        submenuToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const submenu = this.parentElement.querySelector('.submenu');
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            });
        });
    });

</script>




</body>
</html>