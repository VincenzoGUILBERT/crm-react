<?php

namespace App\Entity;

use ApiPlatform\Metadata\Link;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\InvoiceRepository;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
#[ApiResource(
    paginationEnabled: true,
    paginationItemsPerPage: 10,
    normalizationContext: ['groups' => ['invoices_read']],
    collectDenormalizationErrors: true
    
)]
#[ApiResource(
    uriTemplate: '/customers/{id}/invoices',
    uriVariables: [
        'id' => new Link(
            fromClass: Customer::class,
            fromProperty: 'invoices'
        )
        ],
    operations: [new GetCollection()],
    normalizationContext: ['groups' => ['invoices_sub']]
)]
#[ApiFilter(OrderFilter::class, properties:['sentAt', 'amount'])]
class Invoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['invoices_read', 'customers_read', 'invoices_sub'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['invoices_read', 'customers_read', 'invoices_sub'])]
    #[Assert\NotBlank(message: "Montant obligatoire.")]
    #[Assert\Type(
        type: 'numeric',
        message: 'Le Montant doit être un nombre'
    )]
    private ?float $amount = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['invoices_read', 'customers_read', 'invoices_sub'])]
    #[Assert\NotBlank(message: "Une date doit être renseignée.")]
    private ?\DateTimeInterface $sentAt = null;

    #[ORM\Column(length: 255)]
    #[Groups(['invoices_read', 'customers_read', 'invoices_sub'])]
    #[Assert\NotBlank(message: "Statut obligatoire.")]
    #[Assert\Choice(["SENT", "PAID", "CANCELLED"], message: "Le statut est forcément SENT, PAID ou CANCELLED")]
    private ?string $status = null;

    #[ORM\Column]
    #[Groups(['invoices_read', 'customers_read', 'invoices_sub'])]
    #[Assert\NotBlank(message: "Le chrono doit être renseigné.")]
    #[Assert\Type(
        type: 'integer',
        message: 'Le chrono doit être un nombre entier'
    )]
    private ?int $chrono = null;

    #[ORM\ManyToOne(inversedBy: 'invoices')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['invoices_read'])]
    #[Assert\NotBlank(message: "Le client doit être renseigné.")]
    private ?Customer $customer = null;

    #[Groups(['invoices_read', 'invoices_sub'])]
    public function getUser(): User
    {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): static
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): static
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): static
    {
        $this->chrono = $chrono;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): static
    {
        $this->customer = $customer;

        return $this;
    }
}
