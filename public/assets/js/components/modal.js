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

export function modal()
{
    const modalElement = document.getElementById("message");

    if(modalElement)
    {
        const textModal = modalElement.getElementsByTagName("span")[0];
        if(textModal.textContent.length > 0)
        {
            modalElement.classList.remove("hidden");
            const colorInput = modalElement.getElementsByTagName("input")[0];
            if(colorInput.value === "true")
            {
                textModal.classList.add("success-modal")
            }
            else
            {
                textModal.classList.add("error-modal")
            }
            setTimeout(function()
            {
                modalElement.classList.add("remove-fade-out");
            },3000);
        }
    }
}