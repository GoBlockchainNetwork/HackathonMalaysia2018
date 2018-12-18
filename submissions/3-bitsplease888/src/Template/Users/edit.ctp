<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Field $field
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <?php if($user['2fa_status'] == 0){ ?>

        <li><?= $this->Html->link(__('Enable Two Factor Authenticator'), ['action' => 'authi']) ?></li>
    <?php }else{ ?>
        <li><?= $this->Html->link(__('Disable Two Factor Authenticator'), ['action' => 'disabletfa']) ?></li>
    <?php } ?>
    </ul>
</nav>
<div class="fields form large-9 medium-8 columns content">

    <fieldset>
        <legend><?= __('Edit Account') ?></legend>
        <?= $this->Form->create($user) ?>
        <div class="form-row">
            <div class="col-12 pad-btm-10">
                <div class="input text">
                    <label for="password">Password</label>
                    <input type="password" name="password" class="form-control" id="password" required />
                </div>
            </div>

            <div class="col-12 pad-btm-10">
                <div class="input text">
                    <label for="cpassword">Confirm Password</label>
                    <input type="password" name="cpassword" class="form-control" id="cpassword" required />
                </div>
            </div>

            <div class="col-12 text-center pad-btm-10">
                <?= $this->Form->button('Submit', ['class' => 'btn btn-outline-light', 'id' => 'submit']) ?>
            </div>
        </div>

        <?= $this->Form->end() ?>
    </div>
</div>


<script>
    $('#password').on('blur', function() 
    {
        var pass = $('#password').val();
        var cpass = $('#cpassword').val();
        
        if(pass !== cpass)
        {
            $('#cpassword').addClass('invalid');
        }
    });

    $('#cpassword').on('blur', function() 
    {
        var pass = $('#password').val();
        var cpass = $('#cpassword').val();
        
        if(pass === cpass)
        {
            $('#cpassword').removeClass('invalid');
        }
    });

    $('#submit').click(function()
    {
        var pass = $('#password').val();
        var cpass = $('#cpassword').val();
        
        if(pass === cpass)
        {
            return true;
        }
        else
        {
            alert('Password does not match');
            return false;
        }
    });
</script>
