<?php

namespace App\Entity;

use App\Entity\User;
use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CustomerRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    paginationEnabled: true,
    paginationItemsPerPage: 50,
    paginationClientItemsPerPage: true,
    order: ['lastName' => 'ASC'],
    normalizationContext: ['groups' => ['customers_read']],
    operations: [
        new Get(),
        new Post(),
        new GetCollection(),
        new Patch(),
        new Delete()
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['firstName' => "start", 'lastName' => 'start'])]
#[ORM\Entity(repositoryClass: CustomerRepository::class)]
class Customer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['customers_read', 'invoices_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['customers_read', 'invoices_read'])]
    #[Assert\Length(
        min: 2,
        max: 255,
        minMessage: "Le prénom doit faire entre 2 et 255 caractères",
        maxMessage: "Le prénom doit faire entre 2 et 255 caractères"
    )]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['customers_read', 'invoices_read'])]
    #[Assert\Length(
        min: 2,
        max: 255,
        minMessage: "Le nom doit faire entre 2 et 255 caractères",
        maxMessage: "Le nom doit faire entre 2 et 255 caractères"
    )]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['customers_read', 'invoices_read'])]
    #[Assert\NotBlank(message:"Cette valeure ne peut pas être vide.")]
    #[Assert\Email(message: "Adresse invalide.")]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['customers_read', 'invoices_read'])]
    private ?string $company = null;

    /**
     * @var Collection<int, Invoice>
     */
    #[ORM\OneToMany(targetEntity: Invoice::class, mappedBy: 'customer', orphanRemoval: true)]
    #[Groups(['customers_read'])]
    private Collection $invoices;

    #[ORM\ManyToOne(inversedBy: 'customers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['customers_read'])]
    #[Assert\NotBlank(message: "L'utilisateur doit être renseigné.")]
    private ?User $user = null;

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): static
    {
        $this->company = $company;

        return $this;
    }

    #[Groups(['customers_read'])]
    public function getTotalAmount(): float
    {
        return array_reduce($this->invoices->toArray(), function($total, $invoice) {
            return $total + $invoice->getAmount();
        }, 0);
    }

    #[Groups(['customers_read'])]
    public function getUnpaidAmount(): float
    {
        return array_reduce($this->invoices->toArray(), function($total, $invoice) {
            if ($invoice->getStatus() == 'SENT') {
                return $total + $invoice->getAmount();
            }
        }, 0);
    }

    /**
     * @return Collection<int, Invoice>
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): static
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices->add($invoice);
            $invoice->setCustomer($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): static
    {
        if ($this->invoices->removeElement($invoice)) {
            // set the owning side to null (unless already changed)
            if ($invoice->getCustomer() === $this) {
                $invoice->setCustomer(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
