<div class="users form">
  <?= $this->Flash->render() ?>
  <?= $this->Form->create() ?>
      <fieldset>
          <h1>LOGIN</h1>
          <?= $this->Form->control('ic',['label'=>'Identity Card Number (IC)']) ?>
          <?= $this->Form->control('password') ?>
      </fieldset>
  <?= $this->Form->button(__('Login'), ['class' => 'btn btn-info']); ?>
  <?= $this->Form->end() ?>
</div>

			<div class="col-12 text-center pad-top-10">
				Forget your account? <?= $this->Html->link('Forget Password', ['action' => 'password'], ['class' => 'btn btn-outline-danger']) ?>
			</div>