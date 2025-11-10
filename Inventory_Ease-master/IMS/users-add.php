<?php

session_start();
if(!isset($_SESSION['user'])) header('location: login.php');
$_SESSION['table'] = 'users';
$user = $_SESSION['user'];
$users = include('database/show-users.php');

if ($user['role'] !== 'admin') {
    header('location: unauthorized.php');
    exit();
}

?>
<!DOCTYPE html>
<html> 
    <head>
        <title> Users - Stock Management</title>
        <link rel="stylesheet" type="text/css" href="css/users-add.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.35.4/css/bootstrap-dialog.min.css" integrity="sha512-PvZCtvQ6xGBLWHcXnyHD67NTP+a+bNrToMsIdX/NUqhw+npjLDhlMZ/PhSHZN4s9NdmuumcxKHQqbHlGVqc8ow==" crossorigin="anonymous" referrerpolicy="no-referrer" />
         <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    </head>
    <body>
    <script src="https://kit.fontawesome.com/4fbfb479cc.js" crossorigin="anonymous"></script>
      <div id="dashboardMainContainer">
        <?php include('partials/app-sidebar.php') ?>
        <div class="dashboard_content_container" id="dashboard_content_container">
        <?php include('partials/app-topnav.php') ?>
          <div class="dashboard_content">  
            <div class="dashboard_content_main" style="padding-bottom: 10px;"> 
             <div class="row">
              <div class="column column-5">
                <h1 class="section-header"  ><i class="fa fa-plus"></i> Create User</h1>
                <div id="userAddFormContainer">
                <form action="database/add.php" name="form" method="post" class="appForm" onsubmit="return validateForm();" >
                    <div class="appFormInputContainer">
                        <label for="">First Name</label>
                        <input type="text" class="appFormInput"  id="first_name" name="first_name">
                    </div>
                    <div class="appFormInputContainer">
                        <label for="">Last Name</label>
                        <input type="text" class="appFormInput" id="last_name" name="last_name">
                    </div>
                    <div class="appFormInputContainer">
                        <label for="">Email</label>
                        <input type="email" class="appFormInput" id="email" name="email">
                    </div>
                    <div class="appFormInputContainer"> 
                        <label for="">Password</label>
                        <input type="password" class="appFormInput" id="password" name="password">
                    </div>
                    <input type="hidden" name="table" value="users">
                    <button type="submit" class="appBtn"><i class="fa fa-plus"></i>&nbsp;&nbsp;Add User</button>
                  </form>
                  <?php 
    if (isset($_SESSION['response'])) {
        $response_message = $_SESSION['response']['message'];
        $is_success = $_SESSION['response']['message'];

        // Check for specific SQL errors and modify the message
        if (strpos($response_message, 'Duplicate entry') !== false && strpos($response_message, 'unique_email') !== false) {
            $response_message = "This email is already registered.";
            $error_class = "responseMessage__error"; // Assign error class
        } else {
            $error_class = $is_success ? 'responseMessage_success' : 'responseMessage_error';
        }
?>
    <div class="responseMessage <?= $error_class ?>">
        <p>
            <?= $response_message ?>
        </p>
    </div>
<?php 
        unset($_SESSION['response']);
    }
?>
<style>
    .responseMessage_error {
    background-color: #f8d7da; /* Light red */
    padding: 5px;
    margin-top: 20px;
    color: #721c24; /* Dark red text */
text-align: center;
    margin-left: auto;
    margin-right: auto;
    border: 0px solid #f5c6cb;
    width: 90%;
    border-radius: 5px;
}
.responseMessage_error p {
   
    margin-bottom: 0;
 
}
.responseMessage_success {
    background-color: #d4edda; /* Light green */
    color: #155724; /* Dark green text */
    padding: 5px;
    margin-top: 20px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    border: 1px solid #c3e6cb;
    border-radius: 5px;
}
.responseMessage_success p {
   
   margin-bottom: 0;

}
    </style>
                </div>
                </div>
                <div class="column column-7">
                  <h1 class="section-header"  style="margin-left: 0px;margin-right:0px"><i class="fa fa-list"></i> List Of Users</h1>
                  <div class="section_content">
                  <div class="users" style="margin-top:30px;">
                     <div style="border-radius: 7px;border:1px solid #cacaca;background-color: #f4f6f9;max-height:370px;overflow: scroll;">
                     <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <?php foreach($users as $index => $user){ ?>
                          <tr>
                            <td><?= $index + 1?></td>
                            <td class="firstName" ><?= $user['first_name']?></td>
                            <td class="lastName" ><?= $user['last_name']?></td>
                            <td class="email" ><?= $user['email']?></td>
                            <td><?= date('M d,Y @ h:i:s A', strtotime($user['created_at']))?></td>
                            <td><?= date('M d,Y @ h:i:s A', strtotime($user['updated_at']))?></td>
                            <td>
                              <a href="" class="updateUser" data-userid="<?= $user['id'] ?>" ><i class='fa fa-pencil'></i>&nbsp; Edit </a>
<br>
                              <a style="display:flex; justify-content: flex-start;align-items: center;"href="" class="deleteUser" data-userid="<?= $user['id'] ?>" data-fname="<?= $user['first_name'] ?>" data-lname="<?= $user['last_name'] ?>"><i class='fa fa-trash' ></i> &nbsp;Delete</a>
                            </td>
                          </tr>
                          <?php } ?>
                        </tbody>
                    </table>
                     </div>
                    <p class='userCount'style="font-size: 15px;"><?= count($users)?> Users</p>
                  </div>
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <script src="js/script.js"></script>
      <script src="js/jquery/jquery-3.7.1.min.js"></script>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.35.4/js/bootstrap-dialog.js" integrity="sha512-AZ+KX5NScHcQKWBfRXlCtb+ckjKYLO1i10faHLPXtGacz34rhXU8KM4t77XXG/Oy9961AeLqB/5o0KTJfy2WiA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      
      <script>
        
        function validateForm(){
            let fname=document.forms['form']['first_name'].value;
            let lname=document.forms['form']['last_name'].value;
            let email=document.forms['form']['email'].value;
            let password=document.forms['form']['password'].value;
            

            if(!fname||!lname||!email||!password){
                alert ("None of the fields should be empty");
                return false;
            }
            else if(!isNaN(fname)){
                alert ("First Name should be literal");
                return  false;
            }
            else if(!isNaN(lname)){
                alert ("Last Name should be literal");
                return  false;

            }
            else if(password.length<8){
                alert("Password field should consist of at least 8 characters");
                return false;
            }
            else{
                return true;
            }


        }
    function script(){

        this.initialize = function(){
            this.registerEvents();
        };

        this.registerEvents = function(){
            document.addEventListener('click', function(e){
                targetElement = e.target;
                classList = targetElement.classList;

                if(classList.contains('deleteUser')){
                    e.preventDefault();
                    userId = targetElement.dataset.userid;
                    fname = targetElement.dataset.fname;
                    lname = targetElement.dataset.lname;
                    fullName = fname + ' ' +lname;

                    BootstrapDialog.confirm({
                        title: 'Delete ' + fullName,
                        message: 'Are you sure to delete '+ fullName +'?',
                        type: BootstrapDialog.TYPE_WARNING,
                        callback: function(isDelete){
                            if(isDelete){
                                $.ajax({
                                    method: 'POST',
                                    data: {
                                        user_id: userId,
                                        f_name: fname,
                                        l_name: lname
                                    },
                                    url: 'database/delete-user.php',
                                    dataType: 'json',
                                    success: function(data){
                                        if(data.success){
                                            BootstrapDialog.alert({
                                                type: BootstrapDialog.TYPE_SUCCESS,
                                                message: data.message,
                                                callback: function(){
                                                    location.reload();
                                                }
                                            });
                                        } else {
                                            BootstrapDialog.alert({
                                                type: BootstrapDialog.TYPE_DANGER,
                                                message: data.message,
                                            }); 
                                        } 
                                    }
                                });
                            }
                        }
                    });
                } 

                if(classList.contains('updateUser')){ 
                    e.preventDefault();

                    firstName = targetElement.closest('tr').querySelector('td.firstName').innerHTML;
                    lastName = targetElement.closest('tr').querySelector('td.lastName').innerHTML;
                    email = targetElement.closest('tr').querySelector('td.email').innerHTML;
                    userId = targetElement.dataset.userid;

                    BootstrapDialog.confirm({
                        title: 'Update ' + firstName + ' ' + lastName,
                        message: '<form>\
                            <div class="form-group">\
                                <label for="firstName">First Name:</label>\
                                <input type="text" class="form-control" id="firstName" value="'+ firstName +'">\
                            </div>\
                            <div class="form-group">\
                                <label for="lastName">Last Name:</label>\
                                <input type="text" class="form-control" id="lastName" value="'+ lastName +'">\
                            </div>\
                            <div class="form-group">\
                                <label for="email">Email Address:</label>\
                                <input type="email" class="form-control" id="emailUpdate" value="'+ email +'">\
                            </div>\
                        </form>',
                        callback: function(isUpdate){
                            if(isUpdate){
                                $.ajax({
                                    method: 'POST',
                                    data: { 
                                        user_Id: userId,
                                        f_name: document.getElementById('firstName').value,
                                        l_name: document.getElementById('lastName').value,
                                        email: document.getElementById('emailUpdate').value,
                                    },
                                    url: 'database/update-user.php',
                                    dataType: 'json',
                                    success: function(data){
                                        if(data.success){
                                            BootstrapDialog.alert({
                                                type: BootstrapDialog.TYPE_SUCCESS,
                                                message: data.message,
                                                callback: function(){
                                                    location.reload();
                                                }
                                            });
                                        } else {
                                            BootstrapDialog.alert({
                                                type: BootstrapDialog.TYPE_DANGER,
                                                message: data.message,
                                            });
                                        }
                                    }
                                });
                            } else {
                                BootstrapDialog.alert({
                                    type: BootstrapDialog.TYPE_DANGER,
                                    message: 'Update cancelled.',
                                });
                            }
                        }
                    });
                }
            }); 
        };
    }

    var script = new script();
    script.initialize();
</script>


    </body>
</html>