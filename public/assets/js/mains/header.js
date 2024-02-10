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
 *  Merci de choisir C.K DevWeb pour votre projet numérique.
 */

import { burgerMenu } from "../components/burgerMenu.js";
import { navbarAnimations } from "../components/navbarAnimation.js";
import { underlineScaling } from "../components/underlineScaling.js";



document.addEventListener('DOMContentLoaded', () =>
{
    burgerMenu();
    navbarAnimations();
    underlineScaling();
});