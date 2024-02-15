/*
 * Copyright (c) 2024. Droit d'auteur (c) 2024 par Kévin Corvaisier, fondateur de C.K DevWeb. Tous droits réservés.
 * Pour en savoir plus sur mes services et découvrir mes réalisations, visitez mon site web : https://www.ckdevweb.fr
 * N'hésitez pas à me contacter pour discuter de vos besoins en développement web et logiciel.
 * Merci de choisir C.K DevWeb pour votre projet numérique.
 */

export function burgerMenu()
{
    const header = document.querySelector("header");
    const menu = document.querySelector("#menu-burger");
    const button = document.querySelector("#button-burger");
    const main = document.querySelector("main");

    button.addEventListener("click", function(){
        if(menu.classList.contains("scaleY-down"))
        {
            menu.classList.add("open-burger");
            menu.classList.remove("close-burger");
        }
        else if(menu.classList.contains("scaleY-up"))
        {
            menu.classList.remove("open-burger");
            menu.classList.add("close-burger");
            menu.classList.remove("scaleY-up");
        }
    })

    header.addEventListener("click", function(){
        if(menu.classList.contains("scaleY-up"))
        {
            menu.classList.remove("open-burger");
            menu.classList.remove("scaleY-up");
            menu.classList.add("close-burger");
        }
    })

    main.addEventListener("click", function(){
        if(menu.classList.contains("scaleY-up"))
        {
            menu.classList.remove("open-burger");
            menu.classList.remove("scaleY-up");
            menu.classList.add("close-burger");
        }
    })

    menu.addEventListener("animationend", function(){
        if(menu.classList.contains("open-burger"))
        {
            menu.classList.add("scaleY-up");
            menu.classList.remove("scaleY-down");
        }
        else if(menu.classList.contains("close-burger"))
        {
            menu.classList.remove("scaleY-up");
            menu.classList.add("scaleY-down");
        }
    })

    window.addEventListener("resize", function(){
        if(window.innerWidth >= 768)
        {
            menu.classList.remove("scaleY-up");
            menu.classList.add("scaleY-down");
            menu.classList.remove("close-burger");
            menu.classList.remove("open-burger");
        }
        else
        {
            menu.classList.remove("scaleY-up");
            menu.classList.add("scaleY-down");
        }
    })
}
