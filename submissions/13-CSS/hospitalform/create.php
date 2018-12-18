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
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="/resources/demos/style.css">
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
			<form class="contact100-form validate-form" method="post" action= "DataAccess.php">
				<span class="contact100-form-title">
					Patient Information
				</span>


				<div class="wrap-input100 bg1 rs1-wrap-input100" >
						<span class="label-input100">Identification Card Number <span style="color:red">*</span></span>
						<input class="input100" type="text" id="icNumber" name="icNumber" placeholder="eg: xxxxxx-xx-xxxx" required>
				</div>
				<div class="wrap-input100 bg1" >
						<span class="label-input100">Public address <span style="color:red">*</span></span>
						<input class="input100" type="text" id="public_address" name="public_address" placeholder="Public Address " required>
					</div>
				<div class="wrap-input100 bg1" >
					<span class="label-input100">FULL NAME <span style="color:red">*</span></span>
					<input class="input100" type="text" id="name" name="name" placeholder="Name "required>

				</div>

				<div class="wrap-input100 bg1 rs1-wrap-input100" >
					<span class="label-input100">Email Address <span style="color:red">*</span></span>
					<input class="input100" type="text" id="email" name="email" placeholder="Email " required>
				</div>

				<div class="wrap-input100 bg1 rs1-wrap-input100">
					<span class="label-input100">Phone Number <span style="color:red">*</span></span>
					<input class="input100" type="text" id="phone" name="phone" placeholder="Phone Number" required>
				</div>

				<div class="wrap-input100 bg0 rs1-alert-validate" >
					<span class="label-input100">Corresponding address <span style="color:red">*</span></span>
					<textarea class="input100" id="correspondingAddress" name="correspondingAddress" placeholder="Corresponding Address" required></textarea>
				</div>

			<div>
				<div style='float: left;'>
				<a href="index" class="contact100-form-btn">Cancel</a>
			 	</div>&nbsp;
			 	<div style='float: right;'>
					<input class="contact100-form-btn" type="submit" value="submit">
				</div>
			</div>
			</form>
		</div>
	</div>




	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="vendor/animsition/js/animsition.min.js"></script>
	<script src="vendor/bootstrap/js/popper.js"></script>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
	<script src="vendor/select2/select2.min.js"></script>
	<script>
		$( function() {
		  $( "#datepicker" ).datepicker({
			  changeMonth:true,
			  changeYear:true,
			  dateFormat:'dd/mm/yy',
		  });
		} );
		</script>
	<script>
		$(".js-select2").each(function(){
			$(this).select2({
				minimumResultsForSearch: 20,
				dropdownParent: $(this).next('.dropDownSelect2')
			});


			$(".js-select2").each(function(){
				$(this).on('select2:close', function (e){
					if($(this).val() == "Please chooses") {
						$('.js-show-service').slideUp();
					}
					else {
						$('.js-show-service').slideUp();
						$('.js-show-service').slideDown();
					}
				});
			});
		})
	</script>
	<script src="vendor/daterangepicker/moment.min.js"></script>
	<script src="vendor/daterangepicker/daterangepicker.js"></script>
	<script src="vendor/countdowntime/countdowntime.js"></script>
	<script src="vendor/noui/nouislider.min.js"></script>
	<script>
	    var filterBar = document.getElementById('filter-bar');

	    noUiSlider.create(filterBar, {
	        start: [ 1500, 3900 ],
	        connect: true,
	        range: {
	            'min': 1500,
	            'max': 7500
	        }
	    });

	    var skipValues = [
	    document.getElementById('value-lower'),
	    document.getElementById('value-upper')
	    ];

	    filterBar.noUiSlider.on('update', function( values, handle ) {
	        skipValues[handle].innerHTML = Math.round(values[handle]);
	        $('.contact100-form-range-value input[name="from-value"]').val($('#value-lower').html());
	        $('.contact100-form-range-value input[name="to-value"]').val($('#value-upper').html());
	    });
	</script>
	<script src="js/main.js"></script>

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-23581568-13"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-23581568-13');
</script>

</body>
</html>
