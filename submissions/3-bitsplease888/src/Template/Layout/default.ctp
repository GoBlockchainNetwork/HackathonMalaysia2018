<?php
/**
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link          https://cakephp.org CakePHP(tm) Project
 * @since         0.10.0
 * @license       https://opensource.org/licenses/mit-license.php MIT License
 */
$user_data =$this->request->getSession()->read('Auth.User');
$cakeDescription = 'CakePHP: the rapid development php framework';
?>
<!DOCTYPE html>
<html>
<head>
    <?= $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <?= $cakeDescription ?>:
        <?= $this->fetch('title') ?>
    </title>
    <?= $this->Html->meta('icon') ?>

    <?= $this->Html->css('base.css') ?>
    <?= $this->Html->css('style.css') ?>

    <?= $this->fetch('meta') ?>
    <?= $this->fetch('css') ?>
    <?= $this->fetch('script') ?>
</head>
<body>
    <nav class="top-bar expanded" data-topbar role="navigation">
        <ul class="title-area large-3 medium-4 columns">
            <li class="name">
                <h1><a href=""><?= 'Insurance System' ?></a></h1>
            </li>
        </ul>

        <div class="top-bar-section">
            <ul class="right">
                <?php if($this->request->getSession()->read('Auth')) { ?>
                    <?= $this->Html->link('Home', ['controller' => 'users', 'action' => 'test'], ['class' => 'button']) ?>
                    <?= $this->Html->link('Account', ['controller' => 'users', 'action' => 'edit',$user_data['id']], ['class' => 'button']) ?>

                    <?= $this->Html->link('Log Out', ['controller' => 'users', 'action' => 'logout'], ['class' => 'button']) ?>

                <?php }else{ ?>
                    <?= $this->Html->link('Home', ['controller' => 'users', 'action' => 'index'], ['class' => 'button']) ?>
                    <?= $this->Html->link('Register', ['controller' => 'users', 'action' => 'register'], ['class' => 'button']) ?>
                    <?= $this->Html->link('Sign In', ['controller' => 'users', 'action' => 'index'], ['class' => 'button']) ?>
                <?php }?>

            </ul>
        </div>
    </nav>
    <?= $this->Flash->render() ?>
    <div>
        <?= $this->fetch('content') ?>
    </div>
    <footer>
    </footer>
</body>
</html>
