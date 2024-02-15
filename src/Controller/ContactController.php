<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Throwable;
use Symfony\Component\RateLimiter\RateLimiterFactory;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class ContactController extends AbstractController
{

    private CsrfTokenManagerInterface $csrfTokenManager;
    private RateLimiterFactory $submissionEmailLimiter;
    private MailerInterface $mailer;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager, RateLimiterFactory $submissionEmailLimiter, MailerInterface $mailer)
    {
        $this->csrfTokenManager = $csrfTokenManager;
        $this->submissionEmailLimiter = $submissionEmailLimiter;
        $this->mailer = $mailer;
    }

    #[Route('/contact', name: 'app_contact')]
    public function index(): Response
    {
        $csrfToken = $this->csrfTokenManager->getToken('review-submit')->getValue();

        return $this->render('contact/index.html.twig', [
            'controller_name' => 'ContactController',
            'csrf_token' => $csrfToken
        ]);
    }

    #[Route('/submit-contact', name: 'submit_contact', methods: "POST")]
    public function sendEmail(Request $request) : Response
    {
        //TOKEN CSRF
        $submittedToken = $request->request->get('_csrf_token');
        if (!$this->isCsrfTokenValid('review-submit', $submittedToken)) {
            return $this->redirectToRoute('app_contact', [
                'controller_name' => 'ContactController',
                'message' => "Un problème est survenu, veuillez réessayer plus tard",
                'success' => 'false',
            ]);
        }

        //RATE LIMITER
        $limiter = $this->submissionEmailLimiter->create('submission_email_limiter');
        if ($limiter->consume()->isAccepted() === false) {
            return $this->redirectToRoute('app_contact', [
                'controller_name' => 'ContactController',
                'message' => "Un problème est survenu, veuillez réessayer plus tard",
                'success' => 'false',
            ]);
        }

        //GET NAME
        $name = $request->request->get('name');

        $email = $request->request->get('email');
        // VALIDATION EMAIL
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->redirectToRoute('app_contact', [
                'controller_name' => 'ContactController',
                'message' => "L'email renseigné n'est pas valide !",
                'success' => 'false',
            ]);
        }

        $content = $request->request->get('content');

        $email = (new Email())
            ->from($email) // Adresse expéditeur
            ->to("ckdevweb.35@gmail.com") // Adresse destinataire
            ->subject("MESSAGE CLIENT SITE C.K DevWeb: message de ".$name." email: ".$email)
            ->text($content);
        try {
            $this->mailer->send($email);
        } catch (Throwable) {
            return $this->redirectToRoute('app_contact', [
                'controller_name' => 'ContactController',
                'message' => "Une érreur est survenue, l'email n'a pas été envoyé.",
                'success' => 'false',
            ]);
        }

        return $this->redirectToRoute('app_contact', [
            'controller_name' => 'ContactController',
            'message' => "L'email à bien été envoyé. Je vous répondrais dans les plus brefs délais.",
            'success' => 'true',
        ]);
    }
}
