<?php
session_start();
session_destroy();
header('Location: /IMS/login.php');
exit;
?>
