<script type="text/javascript" src="index.js"></script>	
<?php
$connect = mysqli_connect("localhost", "root", "", "hospital");
$output = '';
if(isset($_POST["query"]))
{
	$search = mysqli_real_escape_string($connect, $_POST["query"]);
	$query = "
	SELECT * FROM transaction_record 
	WHERE member_public_address LIKE '%".$search."%'";
}
else
{
	$query = "
	SELECT * FROM transaction_record ORDER BY member_public_address";
}
$result = mysqli_query($connect, $query);
if(mysqli_num_rows($result) > 0)
{
	$output .= '<div class="table-responsive">
					<table class="table table bordered">
						<tr>
							<th>bill_number</th>
							<th>Public Address</th>
							<th>date</th>
							<th>status</th>
							<th>Withdrawal Confirmation</th>
						</tr>';
	while($row = mysqli_fetch_array($result))
	{
		if($row["status"]=='Pending'){
		$output .= '
			<tr>
				<td><input id="bill_number" value="'.$row["bill_number"].'" disabled></td>
				<td><input id="member_public_address" value="'.$row["member_public_address"].'"disabled></td>
				<td><input id="date" value="'.$row["date"].'"disabled></td>
				<td><input id="status" value="'.$row["status"].'"disabled></td>
				<td><input class="contact100-form-btn" type="submit" value="Confirm"  onclick="updateMessageValue()"></td>
			</tr>
		';
		}else{
		$output .='<tr>
				<td>'.$row["bill_number"].'</td>
				<td>'.$row["member_public_address"].'</td>
				<td>'.$row["date"].'</td>
				<td>'.$row["status"].'</td>
				<td> - </td>
			</tr>
		';
		}
	}
	echo $output;
}
else
{
	echo 'Data Not Found';
}
?>