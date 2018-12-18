<?php
require'connection.php';
$error['BillDate'] = '';
$error['IcNumber'] = '';
$error['PublicAddress'] = '';
$error['Name'] = '';
$error['Email'] = '';
$error['PhoneNumber'] = '';
$error['CorrespondingAddress'] = '';

if($_SERVER['REQUEST_METHOD']=='POST'){
    $conn=connect();

    $input['icNumber']=$_POST['icNumber'];
    $input['name']=$_POST['name'];
    $input['correspondingAddress']=$_POST['correspondingAddress'];
    $input['phone']=$_POST['phone'];
    $input['email']=$_POST['email'];
    $input['public_address']=$_POST['public_address'];
    
    $stmt=$conn->prepare("INSERT INTO patient (icNumber, name, correspondingAddress, phone, email, public_address) VALUES(?,?,?,?,?,?)");
    $stmt->bind_param("ssssss",$input['icNumber'],$input['name'],$input['correspondingAddress'],$input['phone'],$input['email'],$input['public_address']);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    header('Location: submitted.php');
}

?>