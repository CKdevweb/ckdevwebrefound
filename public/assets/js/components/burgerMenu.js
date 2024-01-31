export function burgerMenu()
{
    const header = document.querySelector("header");
    const menu = document.querySelector("#menu-burger");
    const button = document.querySelector("#button-burger");
    const main = document.querySelector("main");

    let isButonClicked = false;

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

        isButonClicked = true;
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
}