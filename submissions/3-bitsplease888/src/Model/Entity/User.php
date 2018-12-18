<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\Auth\DefaultPasswordHasher;
/**
 * User Entity
 *
 * @property int $id
 * @property string $ic
 * @property string $name
 * @property string $password
 * @property string $email
 * @property string|null $phone
 * @property string|null $secretkey
 * @property string|null $passkey
 * @property string|null $2fa_key
 * @property int|null $2fa_status
 * @property \Cake\I18n\FrozenTime|null $timeout
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 */
class User extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'ic' => true,
        'name' => true,
        'password' => true,
        'email' => true,
        'phone' => true,
        'secretkey' => true,
        'passkey' => true,
        '2fa_key' => true,
        '2fa_status' => true,
        'timeout' => true,
        'created' => true,
        'modified' => true
    ];

    /**
     * Fields that are excluded from JSON versions of the entity.
     *
     * @var array
     */


    protected function _setPassword($value) {
        return (new DefaultPasswordHasher)->hash($value);
    }
}

