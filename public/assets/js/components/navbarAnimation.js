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

export function navbarAnimations()
{
    const navbar = document.getElementsByClassName("navbar-header")[0];
    const nav = navbar.querySelector("nav");
    const links = nav.getElementsByTagName("a");

    const linksArray = Array.from(links);

    let actualLink = window.location.href;
    let actualAttribut = actualLink.split(/[/?]+/, 4);
    let completeHref = "/" + actualAttribut[2];
    let matcher = null;

    linksArray.forEach(function (link)
    {
        let linkAttribut = link.getAttribute("href");
        if(actualLink.includes("=") && actualLink.includes("/?"))
        {
            completeHref = "/"
        }
        if (completeHref === linkAttribut)
        {
            matcher = completeHref;
            link.classList.add("active");
        }
        link.addEventListener("mouseenter", function ()
        {
            link.classList.remove("a-leave");
            link.classList.add("a-hover")
        })

        link.addEventListener("mouseleave", function ()
        {
            if (link.getAttribute("href") !== matcher)
            {
                link.classList.remove("a-hover");
                link.classList.add("a-leave");
            }
        })

        link.addEventListener("animationend", function(){
            if(link.classList.length > 0)
            {
                link.classList.forEach(function(className){
                    if(className === "a-leave")
                    {
                        link.classList.add("fix-a-leave");
                    }
                    else if(className === "a-hover")
                    {
                        link.classList.add("fix-a-hover");
                    }
                })
            }
        })

    });
}