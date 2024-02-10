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

// export function notation()
// {
//         const makeReviewElement = document.getElementById("make-review-section");
//         //* Récupération des éléments du DOM
//         const divStarElements = makeReviewElement.querySelectorAll("object>.fa-star");
//             const divStar = Array.from(divStarElements);
//
//             const rating = document.getElementById("rating");
//
//             //* Valeur de la notation
//             let value = null;
//
//             //* Pour toutes les étoiles
//             for (let i = 0; i < divStar.length; i++)
//             {
//                 divStar[i].addEventListener("mouseover", function ()
//                 {
//                     fillHover(divStar, i);
//                 });
//                 divStar[i].addEventListener("mouseleave", function ()
//                 {
//                     noFillLeave(divStar, value);
//                 });
//                 divStar[i].addEventListener("click", function ()
//                 {
//                     value = i;
//                     rating.setAttribute("value", "" + (value + 1));
//                 });
//             }
//
//     function fillHover(divStar, index)
//     {
//         //* Remplie toutes les étoiles qui précèdent celle survolée ainsi qu'elle-même
//         for (let i = 0; i < divStar.length; i++)
//         {
//             if (i <= index)
//             {
//
//                 divStar[i].setAttribute('data-prefix', 'fas');
//             }
//             else
//             {
//                 divStar[i].setAttribute('data-prefix', 'far');
//             }
//         }
//     }
//
//     function noFillLeave(divStar, value)
//     {
//         //*Toutes les étoiles sont vides, sauf si on a sauvegardé un nombre d'étoiles
//         for (let j = 0; j < divStar.length; j++)
//         {
//             if (value != null)
//             {
//                 if (j <= value)
//                 {
//                     divStar[j].setAttribute('data-prefix', 'fas');
//                 }
//                 else
//                 {
//                     divStar[j].setAttribute('data-prefix', 'far');
//                 }
//             }
//             else
//             {
//                 divStar[j].setAttribute('data-prefix', 'far');
//             }
//         }
//     }
// }

export function notation()
{
    const divStarNodes = document.querySelectorAll(".star");
    const divStar = Array.from(divStarNodes);
    //* Valeur de la notation
    let value = null;

    divStar.forEach(function(star, index){
        console.log('helo');
        star.addEventListener("mouseover", function ()
        {
            console.log("mouse over the n°" + (index + 1));
            starHover(index);
        });
        star.addEventListener("mouseleave", function ()
        {
            console.log("mouse leave the n°" + (index + 1));
            starLeave();
        });
        star.addEventListener("click", function(){
            starClick(index);
        })
    })

    function starClick(index)
    {
        const rating = document.getElementById("rating");
        value = index;
        rating.setAttribute("value", "" + (value + 1));
    }

    function starHover(index)
    {
        divStar.forEach(function(star, indexFor){
            const img = star.getElementsByTagName("img")[0];
            if(indexFor <= index)
            {
                img.setAttribute("src", "./assets/medias/images/sprites/fa-star-solid.svg");
            }
            else
            {
                img.setAttribute("src", "./assets/medias/images/sprites/fa-star-regular.svg");
            }
        })
    }

    function starLeave()
    {
        divStar.forEach(function(star, index){
            const img = star.getElementsByTagName("img")[0];
            if(value != null || value === 0)
            {
                if(index <= value)
                {
                    img.setAttribute("src", "./assets/medias/images/sprites/fa-star-solid.svg");
                }
                else
                {
                    img.setAttribute("src", "./assets/medias/images/sprites/fa-star-regular.svg");
                }
            }
            else
            {
                img.setAttribute("src", "./assets/medias/images/sprites/fa-star-regular.svg");
            }
        })
    }
}