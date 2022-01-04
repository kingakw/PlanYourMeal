//Changing active menu element
const appMenu = document.getElementById("sectionMenu");
const menuItems = appMenu.getElementsByClassName("menu__item");
for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", function() {
        let current = document.getElementsByClassName(" menu__item--active");
        current[0].className = current[0].className.replace(" menu__item--active", "");
        this.className += " menu__item--active";
    });
}

//Changing window for recipe widget
const widgetRecipe = document.getElementById("widget_recipe");
widgetRecipe.addEventListener("click", function (){
    window.location = "./recipes.html"
})

//Changing window for plan widget
const widgetPlan = document.getElementById("widget_plan");
widgetPlan.addEventListener("click", function (){
    window.location = "./schedules.html"
})


