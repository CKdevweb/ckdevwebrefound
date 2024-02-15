/*
 * Copyright (c) 2024. Droit d'auteur (c) 2024 par Kévin Corvaisier,
 * fondateur de C.K DevWeb.
 * Tous droits réservés.
 *
 * Pour en savoir plus sur mes services et découvrir mes réalisations,
 * visitez mon site web : https://www.ckdevweb.fr
 *
 * N'hésitez pas à me contacter pour discuter de vos besoins en développement web et logiciel.
 * Merci de choisir C.K DevWeb pour votre projet numérique.
 */

export function underlineScaling()
{
    const sectionsNodes = document.querySelectorAll("section");
    const sections = Array.from(sectionsNodes);
    const body = document.querySelector("body");

    init();
    function init()
    {
        sections.forEach(function(section, index){
            const title = section.querySelector("h2");
            const underline = section.querySelector(".underline");


            if(title && underline)
            {

                if(testOnScreen(title, section))
                {
                    section.removeChild(underline);
                    const object = underline;
                    object.style.cssText = "width: " + (title.offsetWidth * 1.15) + "px;";
                    section.classList.add("animend");
                    title.insertAdjacentElement("afterend", object);
                }


            }

        })

    }

    window.addEventListener('scroll', function() {
        init();
    })

    function testOnScreen(element, section)
    {
        // Obtenir la position de l'élément dans la fenêtre
        const rect = element.getBoundingClientRect();

        // Vérifier si l'élément est visible dans la fenêtre
        return rect.top >= 0 && rect.bottom <= window.innerHeight && !section.classList.contains("animend");
    }
}