
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
				<?= $this->Form->control('email', ['class' => 'form-control']) ?>
			</div>

			<div class="col-12 text-center">
				<?= $this->Form->button('Submit', ['class' => 'btn btn-outline-light']) ?>
			</div>
		</div>

		<?= $this->Form->end() ?>
	</div>
</div>