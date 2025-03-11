<?php 

namespace App\Subscribers;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class InvoiceChronoSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private Security $security,
        private InvoiceRepository $invoiceRepository
    ) {}

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForInvoice(ViewEvent $viewEvent)
    {
        $invoice = $viewEvent->getControllerResult();
        $method = $viewEvent->getRequest()->getMethod();

        if ($invoice instanceof Invoice && $method == 'POST') {

            $user = $this->security->getUser();
            $nextChrono = $this->invoiceRepository->findNextChrono($user);
            $invoice->setChrono($nextChrono);

            if (empty($invoice->getSentAt())) {
                $invoice->setSentAt(new \DateTime());
            }

        }
    }
}