//Changing active menu element
const appMenu = document.getElementById("sectionMenu");
const menuItems = appMenu.getElementsByClassName("menu__item");
for (let i = 0; i < menuItems.length; i++) {

    menuItems[i].addEventListener("click", function () {
        document.querySelector(".container__recipe").classList.remove("active");
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
                            <button class="btn btn__
                            edit">
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

function napierdalamPlany (weekNR){
    //Pobierz klucz uzytkownika
    let userName = document.getElementById("name").innerText;
    //Zaciagnij dane uzytkownika
    let currentUser = JSON.parse(localStorage.getItem(userName));
    let pn = [];
    let wt = [];
    let sr = [];
    let cz = [];
    let pt = [];
    let sb = [];
    let nd = [];
    for (let i = 0; i < currentUser.schedulesList.length; i++) {
        if (currentUser.schedulesList[i].weekNr === weekNR){
            pn.push(currentUser.schedulesList[i].scheduleObj.pon);
            wt.push(currentUser.schedulesList[i].scheduleObj.wt);
            sr.push(currentUser.schedulesList[i].scheduleObj.sr);
            cz.push(currentUser.schedulesList[i].scheduleObj.czw);
            pt.push(currentUser.schedulesList[i].scheduleObj.pt);
            sb.push(currentUser.schedulesList[i].scheduleObj.sb);
            nd.push(currentUser.schedulesList[i].scheduleObj.nd);
        }
    }
    console.log(currentUser.schedulesList[0])
    let myHtml = `<tr>
                        <td>${pn[0][0]}</td>
                        <td>${wt[0][0]}</td>
                        <td>${sr[0][0]}</td>
                        <td>${cz[0][0]}</td>
                        <td>${pt[0][0]}</td>
                        <td>${sb[0][0]}</td>
                        <td>${nd[0][0]}</td>
                    </tr>
                    <tr>
                        <td>${pn[0][1]}</td>
                        <td>${wt[0][1]}</td>
                        <td>${sr[0][1]}</td>
                        <td>${cz[0][1]}</td>
                        <td>${pt[0][1]}</td>
                        <td>${sb[0][1]}</td>
                        <td>${nd[0][1]}</td>
                    </tr>
                    <tr>
                        <td>${pn[0][2]}</td>
                        <td>${wt[0][2]}</td>
                        <td>${sr[0][2]}</td>
                        <td>${cz[0][2]}</td>
                        <td>${pt[0][2]}</td>
                        <td>${sb[0][2]}</td>
                        <td>${nd[0][2]}</td>
                    </tr>
                    <tr>
                        <td>${pn[0][3]}</td>
                        <td>${wt[0][3]}</td>
                        <td>${sr[0][3]}</td>
                        <td>${cz[0][3]}</td>
                        <td>${pt[0][3]}</td>
                        <td>${sb[0][3]}</td>
                        <td>${nd[0][3]}</td>
                    </tr>
                    <tr>
                        <td>${pn[0][4]}</td>
                        <td>${wt[0][4]}</td>
                        <td>${sr[0][4]}</td>
                        <td>${cz[0][4]}</td>
                        <td>${pt[0][4]}</td>
                        <td>${sb[0][4]}</td>
                        <td>${nd[0][4]}</td>
                    </tr>`
    let tableRef = document.getElementById("kupa");
    tableRef.innerHTML = myHtml;
    document.getElementById("qupa").innerHTML = weekNR;
}
//************************************************************

//

const delayscript = function () {
    // ------------------- TUTAJ DODAJEMY SKRYPTY DLA ZEWNETRZNYCH HTML Opoznienie potrzebne do zaladowania tych html

    //Wyswietlenie okna z dodaj przepis
    const addRecip = document.getElementById("btnPlus");
    addRecip.addEventListener("click", function () {
        // document.getElementById("containerRecipes").className = "box";
        // let currentMenu = document.getElementsByClassName(" menu__item--active");
        // currentMenu[0].className = currentMenu[0].className.replace(" menu__item--active", "");
        // document.getElementById("sectionMenu").firstElementChild.className += " menu__item--active";
        recipeWindow.classList.add("active");
        // document.querySelector('.recipes__container').classList.remove('active');
    })
    createRecipListFromLocalStorage()


    // -------------- Koniec miejsca na skrypty zewnetrzne
};
setTimeout(delayscript, 1000);

//Changing window for recipe view
const widgetRecipe = document.getElementById("widget_recipe");
const desktopActive = document.querySelector(".container__pulpit");
const recipeWindow = document.querySelector(".container__recipe");

widgetRecipe.addEventListener("click", function () {
    // desktopActive.classList.remove("active");
    recipeWindow.classList.add("active");
});

//Changing window for plan view
const widgetPlan = document.getElementById("widget_plan");
const planWindow = document.querySelector(".container__addSchedule");

widgetPlan.addEventListener("click", function () {
    desktopActive.classList.remove("active");
    planWindow.classList.add("active");
})

//Checking if new User and display new user input form
const newUserWindow = document.getElementById("newUserContainer");
const userName = document.getElementById("name");

function newUserCheck() {
    if (localStorage.name === undefined) {
        newUserWindow.classList.add("newUser");
        desktopActive.classList.add("nonActive");
        desktopActive.classList.remove("active")
    } else {
        userName.innerText = localStorage.name;
    }
}

document.addEventListener("DOMContentLoaded", newUserCheck);

//Saving user name in localstorage and go to desktop view
const submitUserName = document.getElementById("submitUserName");
const userNameInput = document.getElementById("userName");

//Konstruktor uzytkownika
class User {
    constructor(name) {
        this.name = name;
        this.recipList = [];
        this.schedulesList = [];
    }
}

//Konstruktor przepisu
class Recipe {
    constructor(name, desc) {
        this.name = name;
        this.desc = desc;
        this.instructions = [];
        this.ingredients = [];
    }
}

//Konstruktor planu
class Schedule {
    constructor(weekNr, planName, planDesc) {
        this.weekNr = weekNr;
        this.planName = planName;
        this.planDesc = planDesc;
        this.scheduleObj = {
            pon: null,
            wt: null,
            sr: null,
            czw: null,
            pt: null,
            sb: null,
            nd: null
        }
    }
}

submitUserName.addEventListener("click", function () {
    const userNameValue = userNameInput.value;
    localStorage.setItem("name", userNameValue);
    userName.innerText = localStorage.name;
    newUserWindow.classList.remove("newUser");
    desktopActive.classList.remove("nonActive");
    desktopActive.classList.add("active");
//Creating User database
    const userObject = new User(userNameValue);
    localStorage.setItem(userObject.name, JSON.stringify(userObject));
})

//Zmienne pomocnicze pamietajace wprowadzane dane
let recipeInstructions = [];
let recipeIngredients = [];

//Event dla przycisku Zapisz i zamknij z obszaru dodaj przepis
document.getElementById("btnNewRecipe").addEventListener("click", function () {
    //Wylacz contener AddRecipe


    recipeWindow.classList.remove("active");
    // desktopActive.classList.add("active");


    //Pobierz klucz uzytkownika
    let userName = document.getElementById("name").innerText;
    //Zaciagnij dane uzytkownika
    let currentUser = JSON.parse(localStorage.getItem(userName));
    //Pobierz dane z formularza nowego przepisu
    let recipeName = document.getElementById("recipe__name").value;
    let recipeDesc = document.getElementById("recipe__description").value;
    //Stworz obiekt z nowym przepisem
    let newRecip = new Recipe(recipeName, recipeDesc);
    newRecip.instructions.push(recipeInstructions)
    newRecip.ingredients.push(recipeIngredients)
    //Wyslij nowy przepis na liste html
    currentUser.recipList.push(newRecip);
    //dodaj nowy przepis uzytkownikowi
    addRecipe(recipeName, recipeDesc);
    // zaktualizuj uzytkownika
    console.log("Uzytkownik nazwa: " + userName)
    console.log("obiekt uzytkownika: ")
    console.log(currentUser)
    localStorage.setItem(userName, JSON.stringify(currentUser));
    //wyzeruj dane
    document.getElementById("recipe__name").value = null;
    document.getElementById("recipe__description").value = null;
    document.getElementById('instructionList').innerHTML = "";
    document.getElementById('ingredientList').innerHTML = "";
    recipeInstructions = []
    recipeIngredients = []
})

//tablica z nr tygodni
let weekNumbersList = [];

//Event dla przycisku Zapisz i zamknij z obszaru dodaj plan
document.querySelector(".newSchedule__btn").addEventListener("click", function () {
    //Wylacz contener addschedule
    planWindow.classList.remove("active");
    desktopActive.classList.add("active");
    // desktopActive.classList.add("active");


    //Pobierz klucz uzytkownika
    let userName = document.getElementById("name").innerText;
    //Zaciagnij dane uzytkownika
    let currentUser = JSON.parse(localStorage.getItem(userName));
    //Pobierz dane z formularza nowego planu
    let plaName = document.getElementById("schedule__name").value;
    let plaDesc = document.getElementById("schedule__description").value;
    let nrTygodnia = document.getElementById("schedule__nr").value;
    const sniadania = document.querySelectorAll(".sniadanie");
    const dSniadania = document.querySelectorAll(".drugieSnadanie");
    const zupy = document.querySelectorAll(".zupa");
    const dDania = document.querySelectorAll(".drugieDanie");
    const kolacje = document.querySelectorAll(".kolacja");

    //Stworz obiekt z nowym planem
    let newPlan = new Schedule(nrTygodnia, plaName, plaDesc);
    const dayNames = ["pon", "wt", "sr", "czw", "pt", "sb", "nd"];
    for (let i = 0; i < dayNames.length; i++) {
        console.log(newPlan.scheduleObj[dayNames[i]]);
        newPlan.scheduleObj[dayNames[i]] = [sniadania[i].value, dSniadania[i].value, zupy[i].value, dDania[i].value, kolacje[i].value];
    }
    //newPlan.scheduleObj.pon = [sniadania[0].value, dSniadania[0].value, zupy[0].value, dDania[0].value, kolacje[0].value]
    currentUser.schedulesList.push(newPlan);
    weekNumbersList.push(nrTygodnia);
    console.log(weekNumbersList);
    //Wyslij nowy plan na liste html

    //dodaj nowy plan uzytkownikowi

    // zaktualizuj uzytkownika
    console.log("Uzytkownik nazwa: " + userName)
    console.log("obiekt uzytkownika: ")
    console.log(currentUser)
    localStorage.setItem(userName, JSON.stringify(currentUser));
    //wyzeruj dane
    plaName = null;
    plaDesc = null;
    nrTygodnia = null;
})

//Event dla przycisku Dodaj Instrukcje z obszaru dodaj przepis
document.getElementById("instruction__btn").addEventListener("click", function () {
    //Pobierz dane z pola tekstowego
    let instructionField = document.getElementById("instructionField").value;
    //Wypchnij dane do tablicy tymczasowej
    recipeInstructions.push(instructionField);
    //Wyzeruj pole tekstowe
    document.getElementById("instructionField").value = null;
    //Wypisz dodany skladnik w liscie
    let buttons = "<i class=\"far fa-edit\"></i><i class=\"fas fa-trash-alt\"></i>"
    const list = document.getElementById('instructionList');
    const entry = document.createElement('li');
    entry.classList.add("instruction__list")
    entry.appendChild(document.createTextNode(instructionField));
    list.appendChild(entry);
    list.lastElementChild.innerHTML = `${instructionField} ${buttons}`
})

//Event dla przycisku Dodaj Skladnik z obszaru dodaj przepis
document.getElementById("ingredient__btn").addEventListener("click", function () {
    //Pobierz dane z pola tekstowego
    let ingredientField = document.getElementById("ingredientField").value;
    //Wypchnij dane do tablicy tymczasowej
    recipeIngredients.push(ingredientField);
    //Wyzeruj pole tekstowe
    document.getElementById("ingredientField").value = null;
    //Wypisz dodany skladnik w liscie
    let buttons = "<i class=\"far fa-edit\"></i><i class=\"fas fa-trash-alt\"></i>"
    const list = document.getElementById('ingredientList');
    const entry = document.createElement('li');
    entry.classList.add("ingredient__list")
    entry.appendChild(document.createTextNode(ingredientField));
    list.appendChild(entry);
    list.lastElementChild.innerHTML = `${ingredientField} ${buttons}`
})

//Uzupelnienie listy przepisow z pamieci localStorage
function createRecipListFromLocalStorage() {
    let userName = document.getElementById("name").innerText;
    if (userName === "Imie"){
        console.log("New user, nothing to do")
    } else {
        let currentUser = JSON.parse(localStorage.getItem(userName));
        for (let i = 0; i < currentUser.recipList.length; i++) {
            addRecipe(currentUser.recipList[i].name, currentUser.recipList[i].desc)
        }

    }
}

// SKRYPT DLA ZMIEN PLAN
const previousSchedule = document.querySelector('.schedule__previous ')
const nextSchedule= document.querySelector('.schedule__next')
const numberOfWeek = document.querySelector('.week_number').innerText;

let activePlan = 0;

previousSchedule.addEventListener('click', ()=>{
    let numertygodnia = document.getElementById("qupa").innerHTML
    let userName = document.getElementById("name").innerText;
    //Zaciagnij dane uzytkownika
    let currentUser = JSON.parse(localStorage.getItem(userName));
    currentUser.schedulesList.sort((a,b)=> a.weekNr - b.weekNr)
    activePlan--
    if (activePlan < 0 ) {
        activePlan = currentUser.schedulesList.length - 1;
    }
    napierdalamPlany(currentUser.schedulesList[activePlan].weekNr)

    // if (activePlan > numberOfWeek.length - 1) {
    //     activePlan = 1;
    // }
    console.log('działa wstecz')


    // setActivePlan()
})



nextSchedule.addEventListener('click', ()=>{
    let numertygodnia = document.getElementById("qupa").innerHTML
    let userName = document.getElementById("name").innerText;
    //Zaciagnij dane uzytkownika
    let currentUser = JSON.parse(localStorage.getItem(userName));

    currentUser.schedulesList.sort((a,b)=> a.weekNr - b.weekNr)
    if (activePlan > currentUser.schedulesList.length - 1) {
        activePlan = 0;
    }




    napierdalamPlany(currentUser.schedulesList[activePlan].weekNr)

    // for (let i = 0; i < currentUser.schedulesList.length; i++) {
    //     if(currentUser.schedulesList[i].weekNr>numertygodnia){
    //         napierdalamPlany(currentUser.schedulesList[i].weekNr)
    //     }
    // }
    activePlan++

    // activePlan--
    // if (activePlan < numberOfWeek.length - 1) {
    //     activePlan = 1;
    // }
    console.log('działa dalej')
    //
    // setActivePlan()


})
// function setActivePlan(){
// //Pobierz klucz uzytkownika
//     let userName = document.getElementById("name").innerText;
//     //Zaciagnij dane uzytkownika
//     let currentUser = JSON.parse(localStorage.getItem(userName));
//     let lista = currentUser.schedulesList;
// }


Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
    var dayOfYear = ((today - onejan + 86400000)/86400000);
    return Math.ceil(dayOfYear/7)
};
var today = new Date();
var currentWeekNumber = today.getWeek();
document.getElementById("qupa").innerHTML=currentWeekNumber;