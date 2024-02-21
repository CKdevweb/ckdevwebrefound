<?php

namespace App\Controller;

use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Reviews;
use App\Repository\ReviewsRepository;
use Doctrine\ORM\EntityManagerInterface;
use DateTime;
use DateTimeZone;
use Symfony\Component\RateLimiter\RateLimiterFactory;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class HomepageController extends AbstractController
{
    private CsrfTokenManagerInterface $csrfTokenManager;
    private ReviewsRepository $reviewsRepository;
    private RateLimiterFactory $submissionReviewLimiter;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager, ReviewsRepository $reviewsRepository, RateLimiterFactory $submissionReviewLimiter)
    {
        $this->csrfTokenManager = $csrfTokenManager;
        $this->reviewsRepository = $reviewsRepository;
        $this->submissionReviewLimiter = $submissionReviewLimiter;
    }

    #[Route('/', name: 'app_homepage')]
    public function index(): Response
    {
        $csrfToken = $this->csrfTokenManager->getToken('review-submit')->getValue();

        $this->getReviews();

        return $this->render('homepage/index.html.twig', [
            'controller_name' => 'HomepageController',
            "reviews" => $this->getReviews(),
            'csrf_token' => $csrfToken
        ]);
    }


    /**
     * @throws Exception
     */
    #[Route('/submit-review', name: 'app_submitReview')]
    public function submitReview(Request $request, EntityManagerInterface $entityManager): Response
    {
        //TOKEN CSRF
        $submittedToken = $request->request->get('_csrf_token');
        if (!$this->isCsrfTokenValid('review-submit', $submittedToken)) {
            return $this->redirectToRoute('app_homepage', [
                'controller_name' => 'HomepageController',
                'message' => "Un problème est survenu, veuillez réessayer plus tard",
                'success' => 'false',
                'reviews' => $this->getReviews()
            ]);
        }

        //RATE LIMITER
        $limiter = $this->submissionReviewLimiter->create('submission_review_limiter');
        if ($limiter->consume()->isAccepted() === false) {
            return $this->redirectToRoute('app_homepage', [
                'controller_name' => 'HomepageController',
                'message' => "Un problème est survenu, veuillez réessayer plus tard",
                'success' => 'false',
                'reviews' => $this->getReviews()
            ]);
        }

        //GET NAME
        $name = $request->request->get('name');

        $email = $request->request->get('email');
        // VALIDATION EMAIL
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->redirectToRoute('app_homepage', [
                'controller_name' => 'HomepageController',
                'message' => "L'email renseigné n'est pas valide !",
                'success' => 'false',
                'reviews' => $this->getReviews()
            ]);
        }

        //GET CONTENT
        $content = $request->request->get('content');

        //GET RATING
        $rating = $request->request->get('rating');
        $rating = (int)$rating;

        //GET DATE
        $date = new DateTime("now", new DateTimeZone("Europe/Paris"));

        //SET A NEW REVIEW
        $review = new Reviews();
        $review->setName($name);
        $review->setEmail($email);
        $review->setContent($content);
        $review->setRate($rating);
        $review->setDate($date);

        //AJOUTER LA REVIEW A LA BDD
        $entityManager->persist($review);
        $entityManager->flush();

        //RENDU DE LA HOMEPAGE
        return $this->redirectToRoute('app_homepage', [
            'controller_name' => 'HomepageController',
            'message' => 'Merci pour votre commentaire !',
            'success' => 'true',
            'reviews' => $this->getReviews()
        ]);
    }

    private function getReviews() : array
    {
        $reviews = $this->reviewsRepository->findBySomeField();
        $reviewsArray = array();

        foreach ($reviews as $review) {
            $reviewsArray[] = array(
                'name' => $this->textEchap($review->getName()),
                'email' => $review->getEmail(),
                'content' => $this->textEchap($review->getContent()),
                'date' => $review->getDate(),
                'rate' => $review->getRate()
            );
        }
        return $reviewsArray;
    }

    protected function textEchap(string $text) : string
    {
        return htmlspecialchars($text, ENT_NOQUOTES | ENT_HTML401, 'UTF-8');
    }
}