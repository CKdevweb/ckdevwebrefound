/*
 * Copyright (c) 2024.
 * /
 *   Droit d'auteur (c) 2024 par Kévin Corvaisier, fondateur de C.K devweb. Tous droits réservés.
 *
 *  Pour en savoir plus sur mes services et découvrir mes réalisations, visitez mon site web :
 *   https://www.ckdevweb.fr
 *
 *  N'hésitez pas à me contacter pour discuter de vos besoins en développement web et logiciel.
 *
 *  Merci de choisir C.K devweb pour votre projet numérique.
 */

export function notation()
{
    window.addEventListener("load", function(){
        const makeReviewElement = document.getElementById("make-review-section");
        //* Récupération des éléments du DOM
        const starsElements = makeReviewElement.getElementsByClassName("fa-star");
        const parent = starsElements[0].parentNode;
        parent.addEventListener("mouseover", function(){
            const stars = Array.from(starsElements);

            const rating = document.getElementById("rating");

            //* Valeur de la notation
            let value = null;

            //* Pour toutes les étoiles
            for (let i = 0; i < stars.length; i++)
            {
                stars[i].addEventListener("mouseover", function ()
                {
                    fillHover(stars, i);
                });
                stars[i].addEventListener("mouseleave", function ()
                {
                    noFillLeave(stars, value);
                });
                stars[i].addEventListener("click", function ()
                {
                    value = i;
                    rating.setAttribute("value", "" + (value + 1));
                });
            }
        })

    })

    function fillHover(stars, index)
    {
        //* Remplie toutes les étoiles qui précèdent celle survolée ainsi qu'elle-même
        for (let i = 0; i < stars.length; i++)
        {
            if (i <= index)
            {
                stars[i].setAttribute('data-prefix', 'fas');
            }
            else
            {
                stars[i].setAttribute('data-prefix', 'far');
            }
        }
    }

    function noFillLeave(stars, value)
    {
        //*Toutes les étoiles sont vides, sauf si on a sauvegardé un nombre d'étoiles
        for (let j = 0; j < stars.length; j++)
        {
            if (value != null)
            {
                if (j <= value)
                {
                    stars[j].setAttribute('data-prefix', 'fas');
                }
                else
                {
                    stars[j].setAttribute('data-prefix', 'far');
                }
            }
            else
            {
                stars[j].setAttribute('data-prefix', 'far');
            }
        }
    }
}