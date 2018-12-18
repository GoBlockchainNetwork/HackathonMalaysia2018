Hi <?= $user['name'] ?>,<br><br>

Click below link to reset your password :<br>

<?= $this->Url->build(['controller' => 'Users', 'action' => 'resetpwd', $user['id']], true) ?><br><br>

Thank you for choosing the,<br>

Blockchain Insurance System