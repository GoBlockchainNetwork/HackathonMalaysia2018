<?php $ga = new PHPGangsta_GoogleAuthenticator();


?>
<div>
    <div>
        <div>
            <h1>Activate Two Factor Authenticator</h1>
        </div>
    </div>


        <?= $this->Form->create() ?>
      
                     
                <div>
                    <fieldset>
                        <?= $this->Form->input('code', array('type' => 'text','class' => 'form-control','label' => 'Code','required'=>true)); ?>
                       
                        <?= $this->Form->input('secretcode', array('type' => 'hidden','class' => 'form-control','value' => $secret)); ?>
                    </fieldset>
                </div>
                            
                    <div class="col-12 text-center pad-btm-10">
                        <?= $this->Form->button('Login', array('div' => false,'class' => 'btn')); ?>
                    </div>


  <?= $this->Form->end() ?>
                 </div>
     </div>
</div>