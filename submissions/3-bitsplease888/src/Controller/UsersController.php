<?php
namespace App\Controller;

use App\Controller\AppController;
use GoogleAuthenticator\GoogleAuthenticator;
use Cake\I18n\Time;
use Cake\Event\Event;
use Cake\Routing\Router;
use Cake\Mailer\Email;
/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 *
 * @method \App\Model\Entity\User[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class UsersController extends AppController
{

    public function initialize() 
    {
        parent::initialize();
        $this->loadComponent('GoogleAuthenticator');
        $this->Auth->allow(['register','password','verify','beforeverify','reset','forgotpassword']);

    }


    public function index()   
    {
        if ($this->request->is('post')) {
            
            $user = $this->Auth->identify();
            if ($user) {
                        
                    $userstatus =  $user['2fa_status'];
                    $userkey =  $user['2fa_key'];
                if($userstatus==1 && $userkey!="")
                {   
                    $session = $this->request->session();
                    $session->write('user', $user);
                    return $this->redirect(array('controller' => 'Users', 'action' => 'verify'));
                }
                elseif($userstatus==0 && $userkey=="")
                {
                $session = $this->request->session()->write('user', $user);
                $this->redirect(['action' => 'beforeverify']);

            }else
            {
                $this->Flash->error('Your account is not Verified or Incorrect Credential.');
            }
        }

           
    }
}    


    public function register()
    {
        $user = $this->Users->newEntity();
        if ($this->request->is('post')) {
            $user = $this->Users->patchEntity($user, $this->request->getData());
            if($user->secretkey == null)
            {
                $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $charactersLength = strlen($characters);
                $randomString = '';
                for ($i = 0; $i < 9; $i++) 
                {
                    $randomString .= $characters[rand(0, $charactersLength - 1)];
                }
                $user->secretkey = $randomString;
                $this->Flash->success(__('Dont Click or Copy before you write it down on paper!!!, use this key for Reset Password Purpose:'. $user->secretkey));
            }
            if ($this->Users->save($user)) {
                $this->Flash->success(__('The user has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The user could not be saved. Please, try again.'));
        }
        $this->set(compact('user'));
    }

    public function password()
    {
        if ($this->request->is('post')) {
            $query = $this->Users->findByEmail($this->request->data['email']);
            $user = $query->first();
            if (is_null($user)) {
                $this->Flash->error('Email address does not exist. Please try again');
            } else {
                $passkey = uniqid();
                $url = Router::Url(['controller' => 'users', 'action' => 'reset'], true) . '/' . $passkey;
                $timeout = time() + DAY;
                 if ($this->Users->updateAll(['passkey' => $passkey, 'timeout' => $timeout], ['id' => $user->id])){
                    $this->sendResetEmail($url, $user);
                    $this->redirect(['action' => 'index']);
                } else {
                    $this->Flash->error('Error saving reset passkey/timeout');
                }
            }
        }
    }


    private function sendResetEmail($url, $user) {
        $email = new Email();

        $email->template('resetpw');
        $email->emailFormat('both');
        $email->from('testgcs12@gmail.com');
        $email->to($user->email);
        $email->subject('Reset your password');
        $email->viewVars(['url' => $url, 'name' => $user->name]);
        $email->send();
        $this->Flash->success(__('Check your email for your reset password link'));

    }

    public function reset($passkey = null) {
        if ($passkey) {
            $query = $this->Users->find('all', ['conditions' => ['passkey' => $passkey, 'timeout >' => time()]]);
            $user = $query->first();
            if ($user) {
                if (!empty($this->request->data)) {
                    // Clear passkey and timeout
                    $this->request->data['passkey'] = null;
                    $this->request->data['timeout'] = null;
                    $user = $this->Users->patchEntity($user, $this->request->data);
                    if ($this->Users->save($user)) {
                        $this->Flash->set(__('Your password has been updated.'));
                        return $this->redirect(array('action' => 'index'));
                    } else {
                        $this->Flash->error(__('The password could not be updated. Please, try again.'));
                    }
                }
            } else {
                $this->Flash->error('Invalid or expired passkey. Please check your email or try again');
                $this->redirect(['action' => 'password']);
            }
            unset($user->password);
            $this->set(compact('user'));
        } else {
            $this->redirect('/');
        }
    }

/*     public function forgotpassword($email = null)
     {

        if($this->request->is('post')) {
             $email = $this->request->data['email'];

             $emails = TableRegistry::get('Users'); 
             $user = $emails->find()->where(['email' => $email ])->first();
             if (!$user) {
                 $this->Flash->error(__('No user with that email found.'));
                 return $this->redirect(['controller' => 'Users','action' => 'forgotpassword']);

            }else{

                    $newpass =  $user->secretkey;

                    $user = $this->Users->PatchEntity($user, ['password' => $newpass]);

                    if ($this->Users->save($user)) {
                        $this->Flash->success(__('Your Password will be change to Secret Key.'));
                         return $this->redirect(['controller' => 'Users','action' => 'forgotpassword']);

                    }

            }
        }
    }*/


    public function beforeverify($user = null)
    {
            $user = $this->request->session()->read('user');
            if($user != null)
            {

                $ga = $this->GoogleAuthenticator;
                $user_cur_id =  $user; // Put your user id here
                $getcomp_user = $user['id'];
                $useremail = $user['email'];
                $userkey = $user['2fa_key'];
            if (isset($_POST['code'])) {
                $secret = $this->request->data['secretcode'];
                $onecode = $_POST['code'];
                $checkresult = $ga->verifyCode($secret, $onecode,2);

                if ($checkresult) {
                    $savedata['2fa_key'] = $this->request->data['secretcode'];
                    $savedata['2fa_status'] = 1;
                    $curuser = $this->Users->get($user['id']);
                    $user = $this->Users->PatchEntity($curuser, $savedata);
                    if($this->Users->save($user)){
                            $this->Auth->setUser($user);
                            return $this->redirect($this->Auth->redirectUrl());
                    }

                    
                } else {
                        $this->Flash->error(__('Invalid Code!'));
                }
            }
                
          
             $this->set(compact('useremail'));
            }
            else
            {
                $this->Flash->error(__('Invalid Access'));
                return $this->redirect(array("controller" => "Users","action" => "index"));
            }

    }



      public function verify($user = null)
      {
            $user = $this->request->getSession()->read('user');
            $ga = $this->GoogleAuthenticator;
            $user_cur_id =  $user; // Put your user id here
            $getcomp_user = $user;
            $useremail = $getcomp_user['email'];
            $secret = $getcomp_user['2fa_key'];

        if (isset($_POST['code'])) {
            $code = $_POST['code'];
            $result = $ga->verifyCode($secret, $code);

            if ($result == 1) {
                $this->Auth->setUser($user);
                unset($_SESSION['user']);
                return $this->redirect(array("controller" => "Users","action" => "test"));
                
            } else {
                    $this->Flash->error(__('Invalid Code!'));
            }
        }
            
      
         $this->set(compact('useremail','secret'));
    }

    public function edit($id = null)
    {
        if($this->Auth->user('id') == null)
        {
            return $this->redirect(['controller' => 'users', 'action' => 'index']);
        }
        $user = $this->Users->find()
                        ->where(['id'=>$id])
                        ->first();

        if ($this->request->is(['patch', 'post', 'put'])) {
            $user = $this->Users->patchEntity($user, $this->request->getData());
            if ($this->Users->save($user)) {
                $this->Flash->success(__('The password has been Updated.'));

                return $this->redirect(['controller' => 'users', 'action' => 'test']);
            }
            $this->Flash->error(__('The password could not be saved. Please, try again.'));
        }
        $this->set(compact('user'));
    }

    public function logout()
    {
        $this->Flash->success('You are now logged out.');
        return $this->redirect($this->Auth->logout());
    }


    public function test()
    {

    }


    public function isAuthorized($user)
    {
        // Any registered user can access public functions
        if (!$this->request->getParam('prefix')) {

            return true;
        }
    }

}
