<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        /* Top Navigation Bar */
        .dashboard_topNav {
    background-color: #f5f5f5; /* Default color */
    color: #fff;
    height: 45px;
    padding: 0 20px;
    margin-left: 10px; /* Adjust left margin to move it to the right */
    margin-right: 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 0;  /* Set top-left radius to 0 */
    border-top-right-radius: 0; /* Set top-right radius to 0 */
    border-bottom-left-radius: 8px; /* Bottom-left radius */
    border-bottom-right-radius: 8px; /* Bottom-right radius */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for the entire bar */
    transition: background-color 0.3s ease, box-shadow 0.9s ease;
}



        .dashboard_topNav:hover {
            background-color: #6A7684; /* Lighter tone on hover */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.5s ease;
            #toggleBtn{
                  transform: scale(1.1);
                color:white}
           #toggleBtn:hover {
            transform: scale(1.1); /* Subtle enlargement */
            color: #FFB300; /* Yellow on hover */
            
           
        }
         
        }

        /* Sidebar Toggle Button */
        #toggleBtn {
            color:#2A3644;
            font-size: 20px;
            cursor: pointer;
            transition: transform 0.3s ease, color 0.3s ease;

        }

      

        /* Logout Button */
        #logoutBtn {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
            padding: 4px 12px; /* Smaller padding */
            border-radius: 15px;
            background-color: #d9534f;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: transform 0.2s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }

        #logoutBtn i {
            margin-right: 8px;
        }

        #logoutBtn:hover {
            background-color: #e57373;
            transform: scale(1.03); /* Subtle enlargement */
            box-shadow: 0 4px 8px rgba(229, 115, 115, 0.4);
        }

        #logoutBtn:active {
            transform: scale(0.98); /* Subtle shrink effect */
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .dashboard_topNav {
                height: 40px;
                padding: 0 15px; /* Adjusted padding */
                margin-left: 15px; /* Adjusted margin for smaller screens */
            }

            #toggleBtn {
                font-size: 18px;
            }

            #logoutBtn {
                font-size: 13px;
                padding: 4px 8px;
            }
        }
    </style>
</head>
<body>

<div class="dashboard_topNav" id="topNav" >
    <!-- Sidebar Toggle Button -->
    <a href="#" id="toggleBtn" title="Toggle Sidebar"><i class="fa fa-bars"></i></a>

    <!-- Logout Button -->
    <a href="database/logout.php" id="logoutBtn" title="Log Out">
        <i class="fa fa-power-off"></i> Logout
    </a>
</div>

</body>
</html>
