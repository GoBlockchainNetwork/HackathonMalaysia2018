<?php


if($_SERVER['REQUEST_METHOD']=='POST')
{
  
$dbhost="localhost";
$dbbuser="root";
$dbpass="";
$dbname="hospital";
$conn = new mysqli($dbhost,$dbbuser,$dbpass,$dbname) or die($conn->connect_error);
$input['public_address']=$_POST['public_address'];	

$stmt=$conn->prepare('UPDATE transaction_record SET status="submitted withdrawal" WHERE member_public_address = ?');
$stmt->bind_param('s',$input['public_address']);
$result=$stmt->execute();
$stmt->close();
$conn->close();
header('Location: index.php');
	
}
?>