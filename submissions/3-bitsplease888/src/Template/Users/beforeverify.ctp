<?php 
$ga = new PHPGangsta_GoogleAuthenticator();

$secret = $ga->createSecret(32);
$qrCodeUrl = $ga->getQRCodeGoogleUrl($useremail, $secret);
use Cake\ORM\TableRegistry;
$users = TableRegistry::get('Users');
$users = $users->find()
               ->select(['2fa_key'])
               ->where(['id'=>$this->request->getSession()->read('Auth.User.id')])
               ->first();
$users = $users['2fa_key']; 
?>
<div>
    <div>
        <div class="col-12 text-center">
            <h1>Activate Two Factor Authenticator</h1>
        </div>
    </div>


     <div class="row">
            <div class="col-12 text-center">
                
                        <?php if($users !=null) { ?>
                <?= $this->Html->link('Disable 2FA', ['action'=>'disabletfa','_full'=>true,'class'=>'tgl-btn'])?>
                <?php }else{ ?>
                <button type="button" id="btn-dpt" class="btn btn-light tgl-btn" data-val="authi">ENABLE 2FA</button>
                <?php } ?>
            </div>
        </div>



        <?= $this->Form->create() ?>
            <div class="center-align">
                <div class="row" style="width:80%">
                    <div class="col-12 pad-btm-10">
                        <fieldset>
                            <?= $this->Form->input('code', array('type' => 'text','class' => 'form-control','label' => 'Code','required'=>true)); ?>
                       
                            <?= $this->Form->input('secretcode', array('type' => 'hidden','class' => 'form-control','value' => $secret)); ?>

                        </fieldset>
                    </div>
                </div>  
            </div>        

                    <div class="col-12 text-center">
                        <?= $this->Form->button('Enable 2FA', array('div' => false,'class' => 'btn', 'title' => 'Enable 2FA')); ?>
                    </div>

                  
                    <div class="col-12 text-center">
                        <img src="<?php  echo $qrCodeUrl; ?>" name="qr" />
                    </div>


             
                        <div class="col-12 text-center">
                            <?php echo "Please record the Two Factor Authenticator Secret Key: Two Factor Authenticator Secret Key + Your Email = Two Factor Authenticator's Pin" ?>
                            <label><?php echo "Secret Key is: ".$secret."\n\n"; ?></label>
                    </div>

  <?= $this->Form->end() ?>
                 </div>
