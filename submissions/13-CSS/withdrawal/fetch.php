<?php
$connect = mysqli_connect("localhost", "root", "", "epf");
$output = '';
if(isset($_POST["query"]))
{
	$search = mysqli_real_escape_string($connect, $_POST["query"]);
	$query = "
	SELECT * FROM transaction 
	WHERE member_public_address LIKE '%".$search."%'";
}
else
{
	$query = "
	SELECT * FROM transaction ORDER BY id";
}
$result = mysqli_query($connect, $query);
if(mysqli_num_rows($result) > 0)
{
	$output .= '<div class="table-responsive">
					<table class="table table bordered">
						<tr>
							<th>Date</th>
							<th>Hospital Public Address</th>
							<th>Member Public Address</th>
							<th>Bill Number</th>
							<th>Status</th>
							<th></th>
						</tr>';
	while($row = mysqli_fetch_array($result))
	{
		if($row["status"]=='Pending'){
		$output .= '
			<tr>
				<td>'.$row["date"].'</td>
				<td>'.$row["hospital_public_address"].'</td>
				<td>'.$row["member_public_address"].'</td>
				<td>'.$row["bill_number"].'</td>
				<td>'.$row["status"].'</td>
				<td><a href="edit.php?id='.$row["member_public_address"] .'">Edit status</a></td>
			</tr>
		';
		}else{
		$output .='<tr>
				<td>'.$row["date"].'</td>
				<td>'.$row["hospital_public_address"].'</td>
				<td>'.$row["member_public_address"].'</td>
				<td>'.$row["bill_number"].'</td>
				<td>'.$row["status"].'</td>
				<td></td>
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