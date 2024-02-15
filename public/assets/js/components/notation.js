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
    const divStarNodes = document.querySelectorAll(".star");
    const divStar = Array.from(divStarNodes);
    let value = null;

    divStar.forEach(function(star, index){
        star.addEventListener("mouseover", function ()
        {
            starHover(index);
        });
        star.addEventListener("mouseleave", function ()
        {
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