<div class="users form">
  <?= $this->Flash->render() ?>
  <?= $this->Form->create() ?>
      <fieldset>
          <h1>Register</h1>
          <?= $this->Form->control('ic',['label'=>'Identity Card Number (IC)']) ?>
          <?= $this->Form->control('name',['Real Name']) ?>
          <?= $this->Form->control('email') ?>
          <?= $this->Form->control('password') ?>
      </fieldset>
  <?= $this->Form->button(__('Register'), ['class' => 'btn btn-info']); ?>
  <?= $this->Form->end() ?>
</div>