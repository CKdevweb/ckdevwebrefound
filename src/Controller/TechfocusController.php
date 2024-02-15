<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TechfocusController extends AbstractController
{
    #[Route('/techfocus', name: 'app_techfocus')]
    public function index(): Response
    {
        return $this->render('techfocus/index.html.twig', [
            'controller_name' => 'TechfocusController',
        ]);
    }
}
