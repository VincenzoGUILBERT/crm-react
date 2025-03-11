<?php 

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $jwtEvent): void
    {
        $user = $jwtEvent->getUser();

        $data = $jwtEvent->getData();
        $data["firstName"] = $user->getFirstName();
        $data["lastName"] = $user->getLastName();

        $jwtEvent->setData($data);
    }
}