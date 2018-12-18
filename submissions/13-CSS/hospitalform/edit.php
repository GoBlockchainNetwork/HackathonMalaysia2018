<?php


$id = $_GET['id'];
$dbhost="localhost";
$dbbuser="root";
$dbpass="";
$dbname="hospital";
$conn = new mysqli($dbhost,$dbbuser,$dbpass,$dbname) or die($conn->connect_error);	
$query = "SELECT * FROM patient WHERE public_address=".$id;
$result = mysqli_query($conn, $query);

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Contact V5</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
	<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css">
	<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
	<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
	<link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
	<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
	<link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">
	<link rel="stylesheet" type="text/css" href="vendor/noui/nouislider.min.css">
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<style>
		ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
		background-color: #333;
		}

		li {
		float: left;
		}

		li a {
		display: block;
		color: white;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
		}

		li a:hover:not(.active) {
		background-color: #111;
		}

		.active {
		background-color: #4CAF50;
		}
		</style>
</head>
<body>
	<ul>
  	<li><a class="active" href="index">Home</a></li>
  	<li><a href="create">Add Patient</a></li>
	</ul>

	<div class="container-contact100">
		<div class="wrap-contact100">
			<form class="contact100-form validate-form" action="edit2.php" method="POST">
				<span class="contact100-form-title">
				Withdrawal Submittion
				</span>
<?php
while($row = mysqli_fetch_array($result)) 
{ ?>
		<div class="wrap-input100 bg1 rs1-wrap-input100" >
				<span class="label-input100">Identification Card Number <span style="color:red">*</span></span>
				<input class="input100" type="text" id="icNumber" name="icNumber" value="<?php echo $row['icNumber']?>" >
		</div>
		<div class="wrap-input100 bg1" >
						<span class="label-input100">Public address<span style="color:red">*</span></span>
						<input class="input100" type="text" id="public_address" name="public_address" value="<?php echo $row['public_address']?>" >
					</div>
				<div class="wrap-input100 bg1" >
					<span class="label-input100">Full Name <span style="color:red">*</span></span>
					<input class="input100" type="text" id="name" name="name" value="<?php echo $row['name']?>">

				</div>

				<div class="wrap-input100 bg1 rs1-wrap-input100" >
					<span class="label-input100">Email Address <span style="color:red">*</span></span>
					<input class="input100" type="text" id="email" name="email" value="<?php echo $row['email']?>" >
				</div>

				<div class="wrap-input100 bg1 rs1-wrap-input100">
					<span class="label-input100">Phone Number <span style="color:red">*</span></span>
					<input class="input100" type="text" id="phone" name="phone" value="<?php echo $row['phone']?>" >
				</div>

				<div class="wrap-input100 bg0 rs1-alert-validate" >
					<span class="label-input100">Corresponding address <span style="color:red">*</span></span>
					<textarea class="input100" id="correspondingAddress" name="correspondingAddress" ><?php echo $row['correspondingAddress']?></textarea>
				</div>
		
		<span>
		<div>
			<div style='float: left;'>
				<a href="index" class="contact100-form-btn">Cancel</a>
				
			 </div>&nbsp;
			 <div style='float: right;'>
				<input class="contact100-form-btn" type="submit" value='Confirm'  onclick="updateMessageValue()">
			 </div>
		</div>
		<script type="text/javascript" src="index.js"></script>	
			
		</span>
<?php } ?>    
		
		</div>
	</div>
</form>