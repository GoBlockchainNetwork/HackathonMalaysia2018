<?php


$id = $_GET['id'];
$dbhost="localhost";
$dbbuser="root";
$dbpass="";
$dbname="epf";
$conn = new mysqli($dbhost,$dbbuser,$dbpass,$dbname) or die($conn->connect_error);	
$query = "SELECT * FROM member WHERE public_address=".$id;
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
</head>
<body>


	<div class="container-contact100">
		<div class="wrap-contact100">
			<form class="contact100-form validate-form" action="edit2.php" method="POST">
				<span class="contact100-form-title">
				title
				</span>
<?php
while($row = mysqli_fetch_array($result)) 
{ ?>
		<div class="wrap-input100 validate-input bg1" data-validate="Please Type Your Name">
			<span class="label-input100">FULL NAME *</span>
			<input class="input100" type="text" name="name" value="<?php echo $row['name']; ?>" disabled> 
		</div>
		<div class="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Your Email">
			<span class="label-input100">Email *</span>
			<input class="input100" type="text" name="email" value="<?php echo $row['email']; ?>" disabled>
		</div>
		<div class="wrap-input100 bg1 rs1-wrap-input100">
			<span class="label-input100">Phone</span>
			<input class="input100" type="text" name="phone" value="<?php echo $row['phone'];?>" disabled>
		</div>
		
		<div class="wrap-input100 validate-input bg1" data-validate = "Enter Your Email">
			<span class="label-input100">Public address *</span>
			<input class="input100" type="text" id="public_address" name="public_address" value="<?php echo $row['public_address'];?>">
		</div>
		<div class="wrap-input100 bg1 rs1-wrap-input100">
			<span class="label-input100">ic number</span>
			<input class="input100" type="text" name="phone" value="<?php echo $row['ic_number'];?>" disabled>
		</div>

		<div class="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate = "<?php echo $row['address'];?>" disabled>
			<span class="label-input100">Address</span>
			<textarea class="input100" name="message" disabled><?php echo $row['address']?></textarea>
		</div>
		<span>
		<div align="center">
			<div style='float: left;'>
				<a href="index" class="contact100-form-btn">Cancel</a>
			 </div>&nbsp;
			 <div style='float: left;'>
				<a href="index" class="contact100-form-btn">Reject</a>
			 </div>
			 <div style='float: right;'>
				<input class="contact100-form-btn" type="submit" value='Confirm'>
			 </div>
		</div>
			
			
		</span>
<?php } ?>    
		
		</div>
	</div>
</form>