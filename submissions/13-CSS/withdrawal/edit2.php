<?php


if($_SERVER['REQUEST_METHOD']=='POST')
{
  
$dbhost="localhost";
$dbbuser="root";
$dbpass="";
$dbname="epf";
$conn = new mysqli($dbhost,$dbbuser,$dbpass,$dbname) or die($conn->connect_error);
$input['public_address']=$_POST['public_address'];	

$stmt=$conn->prepare('UPDATE transaction SET status="approved" WHERE member_public_address = ?');
$stmt->bind_param('s',$input['public_address']);
$result=$stmt->execute();
$stmt->close();
$conn->close();
header('Location: index.php');
	
}
?>