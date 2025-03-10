<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Invoice;
use App\Entity\Customer;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{

    public function __construct(public UserPasswordHasherInterface $encoder){}

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        
        for ($u=0; $u < 10; $u++) { 
            
            $user = new User();
            $invoiceNumber = 1;
            $hash = $this->encoder->hashPassword($user, 'password');
            $user->setFirstName($faker->firstName())
                 ->setLastName($faker->lastName())
                 ->setEmail($faker->email())
                 ->setPassword($hash)
            ;

            $manager->persist($user);

            for ($i=0; $i < mt_rand(5,20); $i++) { 
    
                $customer = new Customer();
                $customer->setFirstName($faker->firstName())
                        ->setLastName($faker->lastName())
                        ->setCompany($faker->company())
                        ->setUser($user)
                        ->setEmail($faker->email());
                
                $manager->persist($customer);
    
                for ($j=0; $j < mt_rand(3,10); $j++) { 
    
                    $invoice = new Invoice();
                    $invoice->setAmount($faker->randomFloat(2, 250, 5000))
                            ->setSentAt($faker->dateTimeBetween('-6 months'))
                            ->setStatus($faker->randomElement(['SENT', 'PAID', 'CANCELLED']))
                            ->setChrono($invoiceNumber)
                            ->setCustomer($customer);
    
                    $invoiceNumber++;
                    
                    $manager->persist($invoice);
                }
            }
    
            $manager->flush();
        }
    }
}
