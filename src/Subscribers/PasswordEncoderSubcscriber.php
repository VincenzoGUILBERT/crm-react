<?php

namespace App\Subscribers;

use App\Entity\User;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class PasswordEncoderSubcscriber implements EventSubscriberInterface
{

    public function __construct(
        private UserPasswordHasherInterface $encoder
    ) {}

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE]
        ];
    }

    public function encodePassword(ViewEvent $event)
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($user instanceof User && $method == 'POST')
        {
            $hash = $this->encoder->hashPassword($user, $user->getPassword());
            $user->setPassword($hash);
        }
    }
}