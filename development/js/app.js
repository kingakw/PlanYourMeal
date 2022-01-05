//Changing active menu element
const appMenu = document.getElementById("sectionMenu");
const menuItems = appMenu.getElementsByClassName("menu__item");
for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", function () {
        let current = document.getElementsByClassName(" menu__item--active");
        current[0].className = current[0].className.replace(" menu__item--active", "");
        this.className += " menu__item--active";
    });
}

//Changing window for recipe view
    const widgetRecipe = document.getElementById("widget_recipe");
    const desktopActive = document.querySelector(".container__pulpit");
    const recipeWindow = document.querySelector(".container__recipe");

    widgetRecipe.addEventListener("click", function () {
        desktopActive.classList.add("nonActive");
        recipeWindow.classList.remove("nonActive");
});

//Changing window for plan view
const widgetPlan = document.getElementById("widget_plan");
const recipeSchedule = document.querySelector(".container__schedule");

widgetPlan.addEventListener("click", function (){
    desktopActive.classList.add("nonActive");
    recipeWindow.classList.remove("nonActive");
})



