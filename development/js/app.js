//Changing active menu element
const appMenu = document.getElementById("sectionMenu");
const menuItems = appMenu.getElementsByClassName("menu__item");
for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", function () {
        let currentMenu = document.getElementsByClassName(" menu__item--active");
        currentMenu[0].className = currentMenu[0].className.replace(" menu__item--active", "");
        this.className += " menu__item--active";
        let currentSection = document.getElementsByClassName(" active");
        currentSection[0].className = currentSection[0].className.replace(" active", "")
        if (i === 0) {
            document.getElementById("containerPulpit").className += " active";
        } else if (i === 1) {
            document.getElementById("containerRecipes").className += " active";
        } else {
            document.getElementById("containerSchedules").className += " active";
        }
    });
}
//******************************************


//Funkcja wciagajaca inny HTML do DIVA
function includeHTML() {
    let z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};
includeHTML();
//*****************************************


// Dodawanie pozycji w tabeli z przepisami. Podajemy Nazwe przepisu i opis jak wykonac. ID wyciaga samo
function addRecipe(recipeName = "test name", recipeDesc = "test description") {
    let recipeID = document.getElementsByClassName("recipe__id");
    let newID = recipeID.length + 1;
    let myHtmlContent = `<td class="recipe__id">${newID}</td>
                        <td class="recipe__name">${recipeName}</td>
                        <td class="recipe__description">${recipeDesc}</td>
                        <td class="recipe__action">
                            <button class="btn btn__edit">
                                <i class="far fa-edit fa-1x"></i>
                            </button>
                            <button class="btn btn__trash">
                                <i class="far fa-trash-alt fa-1x"></i>
                            </button>
                        </td>`

    let tableRef = document.getElementById("recipe__list");
    let newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = myHtmlContent;
}

//************************************************************


const delayscript = function () {
    // ------------------- TUTAJ DODAJEMY SKRYPTY DLA ZEWNETRZNYCH HTML Opoznienie potrzebne do zaladowania tych html

    const addRecip = document.getElementById("btnPlus");
    addRecip.addEventListener("click", function () {
        document.getElementById("containerAddRecipe").style.display = "block"
    })


    // -------------- Koniec miejsca na skrypty zewnetrzne
};
setTimeout(delayscript, 500);

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

widgetPlan.addEventListener("click", function () {
    desktopActive.classList.add("nonActive");
    recipeWindow.classList.remove("nonActive");
})


class User {
    constructor(name) {
        this.name = name;
        this.recipList = [];
        this.schedulesList = [];
    }

    addRecipe(recipe) {
        this.recipList.push(recipe)
    }
}

class Recipe {
    constructor(name, desc) {
        this.name = name;
        this.desc = desc;
        this.instructions = [];
        this.ingredients = [];
    }
}

const Zbyszek = new User("Zbyszek");
document.getElementById("name").innerText = Zbyszek.name;
window.localStorage.setItem(Zbyszek.name, JSON.stringify(Zbyszek));

//Event dla przycisku Zapisz i zamknij z obszaru dodaj przepis
document.getElementById("btnNewRecipe").addEventListener("click", function () {
    //Wylacz contener AddRecipe
    document.getElementById("containerAddRecipe").style.display = "none"
    //Pobierz klucz uzytkownika
    let userName = document.getElementById("name").innerText;
    //Zaciagnij dane uzytkownika
    let currentUser = JSON.parse(window.localStorage.getItem(userName));
    //Pobierz dane z formularza nowego przepisu
    let recipeName = document.getElementById("recipe__name").value;
    let recipeDesc = document.getElementById("recipe__description").value;
    //Stworz obiekt z nowym przepisem
    let newRecip = new Recipe(recipeName, recipeDesc);
    //Wyslij nowy przepis na liste html
    currentUser.addRecipe(newRecip);
    //dodaj nowy przepis uzytkownikowi
    addRecipe(recipeName, recipeDesc);
    // zaktualizuj uzytkownika
    window.localStorage.setItem(userName, JSON.stringify(currentUser));
    //wyzeruj formularz
    document.getElementById("recipe__name").value = null;
    document.getElementById("recipe__description").value = null;
})

