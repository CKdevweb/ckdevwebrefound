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