<div>
	<div class="center">
		<div class="form-row">
			<div class="col-12 text-center">
				<h1>Password Reset</h1>
			</div>
		</div>
		
		<?= $this->Form->create() ?>
		<div class="form-row">
			<div class="col-12">
				<div class="input text">
					<label for="password">Password</label>
					<input type="password" name="password" class="form-control" id="password" required />
				</div>
			</div>

			<div class="col-12">
				<div class="input text">
					<label for="spassword">Confirm Password</label>
					<input type="password" name="spassword" class="form-control" id="spassword" required />
				</div>
			</div>

			<div class="col-12 text-center">
				<?= $this->Form->button('Submit', ['class' => 'btn', 'id' => 'submit']) ?>
			</div>
		</div>

		<?= $this->Form->end() ?>
	</div>
</div>


<script>
	$('#password').on('blur', function() 
	{
		var pass = $('#password').val();
		var spass = $('#spassword').val();
		
		if(pass !== spass)
		{
			$('#spassword').addClass('invalid');
		}
	});

	$('#spassword').on('blur', function() 
	{
		var pass = $('#password').val();
		var spass = $('#spassword').val();
		
		if(pass === spass)
		{
			$('#spassword').removeClass('invalid');
		}
	});

	$('#submit').click(function()
	{
		var pass = $('#password').val();
		var spass = $('#spassword').val();
		
		if(pass === spass)
		{
			return true;
		}
		else
		{
			alert('Password does not match!');
			return false;
		}
	});
</script>