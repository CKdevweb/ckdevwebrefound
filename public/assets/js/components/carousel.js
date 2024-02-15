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

export function carousel()
{
    let container = document.querySelector('.carousel-articles');

    if(container)
    {
        let slides = null;
        if(container === document.querySelector('.carousel-articles'))
        {
            slides = container.querySelectorAll('.carousel-articles .review');
        }

        let slidesTab = Array.from(slides);

        const leftBtn = document.getElementById("slideLeft");
        const rightBtn = document.getElementById("slideRight");
        let side = "left";

        if(leftBtn && rightBtn)
        {
            leftBtn.addEventListener("click", function() {
                slidesTab.forEach(function(slide)
                {

                    slide.classList.add("slideLeft");
                    side = "left";
                })

            });
            rightBtn.addEventListener("click", function() {
                slidesTab.forEach(function(slide)
                {
                    slide.classList.add("slideRight");
                    side = "right";
                })
            });


            slidesTab[0].addEventListener("animationend", function() {
                slidesTab.forEach(function(slideIn)
                {
                    slideIn.classList.remove("slideRight");
                    slideIn.classList.remove("slideLeft");
                })
                if (side === "left") {
                    slidesTab[0].remove();
                    container.insertBefore(slidesTab[0], null);

                    slidesTab.push(slidesTab[0]);

                    slidesTab.splice(0, 1);
                    slidesTab = slidesTab.filter(function(element) {
                        return element !== undefined;
                    });
                }
                else if (side === "right") {
                    slidesTab[slidesTab.length - 1].remove();
                    const premierEnfant = container.firstChild;
                    container.insertBefore(slidesTab[slidesTab.length - 1], premierEnfant);

                    slidesTab.unshift(slidesTab[slidesTab.length - 1]);

                    slidesTab.splice(slidesTab.length - 1, 1);
                    slidesTab = slidesTab.filter(function(element) {
                        return element !== undefined;
                    });
                }
            });
        }
    }
}
