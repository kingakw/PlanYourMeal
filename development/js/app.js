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
            document.querySelector(".schedules__container").classList.remove("active");
            document.querySelector(".container__addSchedule ").classList.remove("active");
            document.getElementById("containerSchedules").classList.remove("active")


        } else if (i === 1) {
            document.getElementById("containerRecipes").className += " active";
            document.querySelector(".schedules__container").classList.remove("active");
            document.querySelector(".container__addSchedule ").classList.remove("active");
            document.getElementById("containerSchedules").classList.remove("active")
        } else {
            document.getElementById("containerSchedules").className += " active";
            document.querySelector(".schedules__container").classList.remove("active");
            document.querySelector(".container__addSchedule ").classList.remove("active");

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
function addRecipe(recipeName = "test name", recipeDesc = "test description", recipeId) {
    let recipeID = document.getElementsByClassName("recipe__id");
    let newID = recipeID.length;
    let trId = "recipeTrId" + recipeId;
    let myHtmlContent = `<td class="recipe__id">${ newID }</td>
                        <td class="recipe__name">${ recipeName }</td>
                        <td class="recipe__description">${ recipeDesc }</td>
                        <td class="recipe__action">
                            <button class="btn btn__edit" onclick="editRecipButton(${ trId })">
                                <i class="far fa-edit fa-1x"></i>
                            </button>
                            <button class="btn btn__trash" onclick="delRecipButton(${ trId })">
                                <i class="far fa-trash-alt fa-1x"></i>
                            </button>
                        </td>`

    let tableRef = document.getElementById("recipe__list");
    let newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.id = `${ trId }`
    newRow.innerHTML = myHtmlContent;
}

function addScheduleHTML(scheduleName = "test Name", scheduleDesc = "test desc", weekNr = "999", scheduleId) {
    let scheduleHtmlId = document.getElementsByClassName("schedule__id");
    //let newID = scheduleHtmlId.length + 1;
    let newID = scheduleHtmlId.length;
    let myHtmlContent = `<td class="schedule__id">${ newID }</td>
                                            <td class="schedule__name">${ scheduleName }</td>
                                            <td class="schedule__description">${ scheduleDesc }</td>
                                            <td class="schedule__weekNr">${ weekNr }</td>
                                            <td class="schedule__action">
                                                <button class="btn btn__edit" onclick="editScheduleButton(${ scheduleId })">
                                                    <i class="far fa-edit fa-1x"></i>
                                                </button>
                                                <button class="btn btn__trash" onclick="delScheduleButton(${ scheduleId })">
                                                    <i class="far fa-trash-alt fa-1x"></i>
                                                </button>
                                            </td>`
    let tableRef = document.getElementById("schedule__list");
    let newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.id = `scheduleTrId${ scheduleId }`;
    newRow.innerHTML = myHtmlContent;
}

function schuldeSlider(weekNR) {
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
        if (currentUser.schedulesList[i].weekNr === weekNR) {
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
                        <td>${ pn[0][0] }</td>
                        <td>${ wt[0][0] }</td>
                        <td>${ sr[0][0] }</td>
                        <td>${ cz[0][0] }</td>
                        <td>${ pt[0][0] }</td>
                        <td>${ sb[0][0] }</td>
                        <td>${ nd[0][0] }</td>
                    </tr>
                    <tr>
                        <td>${ pn[0][1] }</td>
                        <td>${ wt[0][1] }</td>
                        <td>${ sr[0][1] }</td>
                        <td>${ cz[0][1] }</td>
                        <td>${ pt[0][1] }</td>
                        <td>${ sb[0][1] }</td>
                        <td>${ nd[0][1] }</td>
                    </tr>
                    <tr>
                        <td>${ pn[0][2] }</td>
                        <td>${ wt[0][2] }</td>
                        <td>${ sr[0][2] }</td>
                        <td>${ cz[0][2] }</td>
                        <td>${ pt[0][2] }</td>
                        <td>${ sb[0][2] }</td>
                        <td>${ nd[0][2] }</td>
                    </tr>
                    <tr>
                        <td>${ pn[0][3] }</td>
                        <td>${ wt[0][3] }</td>
                        <td>${ sr[0][3] }</td>
                        <td>${ cz[0][3] }</td>
                        <td>${ pt[0][3] }</td>
                        <td>${ sb[0][3] }</td>
                        <td>${ nd[0][3] }</td>
                    </tr>
                    <tr>
                        <td>${ pn[0][4] }</td>
                        <td>${ wt[0][4] }</td>
                        <td>${ sr[0][4] }</td>
                        <td>${ cz[0][4] }</td>
                        <td>${ pt[0][4] }</td>
                        <td>${ sb[0][4] }</td>
                        <td>${ nd[0][4] }</td>
                    </tr>`
    let tableRef = document.getElementById("scheduleTableTbody");
    tableRef.innerHTML = myHtml;
    document.querySelector(".week_number").textContent = weekNR;
}

//************************************************************

//

const delayscript = function () {
    // ------------------- TUTAJ DODAJEMY SKRYPTY DLA ZEWNETRZNYCH HTML Opoznienie potrzebne do zaladowania tych html

    //Wyswietlenie okna z dodaj przepis
    const addRecip = document.getElementById("btnPlus");
    addRecip.addEventListener("click", function () {
        recipeWindow.classList.add("active");
    })
    const addSchedule = document.getElementById("scheduleBtnPlus");
    addSchedule.addEventListener("click", function () {

        planWindow.classList.add("active");

    })

    loadHtmlContentFromLocalStorage()
    recipeQuantity()
    schuldeQuantity()

    // -------------- Koniec miejsca na skrypty zewnetrzne
};
setTimeout(delayscript, 1000);

//Changing window for recipe view
const widgetRecipe = document.getElementById("widget_recipe");
const desktopActive = document.querySelector(".container__pulpit");
const recipeWindow = document.querySelector(".container__recipe");

widgetRecipe.addEventListener("click", function () {
    recipeWindow.classList.add("active");
});

//Changing window for plan view
const widgetPlan = document.getElementById("widget_plan");
const planWindow = document.querySelector(".container__addSchedule");

widgetPlan.addEventListener("click", function () {
    // desktopActive.classList.remove("active");
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
        this.id = null;
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
        this.id = null;
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
    localStorage.setItem("lastUsedRecipeId", JSON.stringify(0));
})

function addScheduleTableSelectOptions() {
    let userName = document.getElementById("name").innerText;
    if (userName === "Imie") {
        console.log("New user, nothing to do")
    } else {
        let currentUser = JSON.parse(localStorage.getItem(userName));
        let recipNameList = [];

        for (const element of currentUser.recipList) {
            recipNameList.push(element.name);
        }
        console.log(recipNameList);
        const selectList = document.querySelectorAll(".scheduleCard tbody select");
        console.log(selectList);
        for (const selectListElement of selectList) {
            selectListElement.innerHTML = "<option>wybierz danie</option>";
            for (const element of recipNameList) {
                let meal = document.createElement("option");
                selectListElement.appendChild(meal);
                meal.innerText = element;
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", addScheduleTableSelectOptions);
widgetPlan.addEventListener("click", addScheduleTableSelectOptions)

//Zmienne pomocnicze pamietajace wprowadzane dane
let recipeInstructions = [];
let recipeIngredients = [];
let recipeIndex = null;
let recipeId = null;

//Event dla przycisku Zapisz i zamknij z obszaru dodaj przepis
document.getElementById("btnNewRecipe").addEventListener("click", function () {

//Pobierz dane z formularza nowego przepisu
    let recipeName = document.getElementById("recipe__name").value;


    if (!recipeName) {
        alert(`Nie masz wpisanej nazwy przepisu :)`)
    } else {
        //Wylacz contener AddRecipe
        recipeWindow.classList.remove("active");
        //Pobierz klucz uzytkownika
        let userName = document.getElementById("name").innerText;
        //Zaciagnij dane uzytkownika
        let currentUser = JSON.parse(localStorage.getItem(userName));
        //Sprawdzenie wersji okna
        let windowVer = document.getElementById("newRecipeTitle").innerText;
        //Pobierz dane z formularza nowego przepisu
        let recipeName = document.getElementById("recipe__name").value;
        let recipeDesc = document.getElementById("recipe__description").value;

        if (windowVer === "Nowy przepis") {
            console.log("New recip active");
            let lastRecipeId = JSON.parse(localStorage.getItem("lastUsedRecipeId"))
            //Stworz obiekt z nowym przepisem
            let newRecip = new Recipe(recipeName, recipeDesc);
            newRecip.id = lastRecipeId;
            newRecip.instructions.push(recipeInstructions)
            newRecip.ingredients.push(recipeIngredients)
            //Wyslij nowy przepis na liste html
            currentUser.recipList.push(newRecip);
            //dodaj nowy przepis uzytkownikowi
            console.log(newRecip.id)
            addRecipe(recipeName, recipeDesc, newRecip.id);
            // zaktualizuj uzytkownika

            lastRecipeId++;
            localStorage.setItem("lastUsedRecipeId", JSON.stringify(lastRecipeId));
            alert(`Dodano nowy przepis`);

        } else {
            console.log("Edit recip active")
            currentUser.recipList[recipeIndex].name = recipeName;
            document.getElementById(`recipeTrId${ recipeId }`).children[1].innerHTML = recipeName;
            currentUser.recipList[recipeIndex].desc = recipeDesc;
            document.getElementById(`recipeTrId${ recipeId }`).children[2].innerHTML = recipeDesc;
            currentUser.recipList[recipeIndex].instructions[0] = [];
            for (let i = 0; i < document.getElementById("instructionList").children.length; i++) {
                currentUser.recipList[recipeIndex].instructions[0].push(document.getElementById("instructionList").children[i].innerText)
            }
            currentUser.recipList[recipeIndex].ingredients[0] = [];
            for (let i = 0; i < document.getElementById("ingredientList").children.length; i++) {
                currentUser.recipList[recipeIndex].ingredients[0].push(document.getElementById("ingredientList").children[i].innerText)
            }
            alert(`Z edytowano przepis`);

        }
        console.log("obiekt uzytkownika: ")
        console.log(currentUser)
        localStorage.setItem(userName, JSON.stringify(currentUser));
        //Odswiez ilosc przepisow na stronie
        recipeQuantity();


        schuldeQuantity()

        //wyzeruj dane
        document.getElementById("recipe__name").value = null;
        document.getElementById("recipe__description").value = null;
        document.getElementById('instructionList').innerHTML = "";
        document.getElementById('ingredientList').innerHTML = "";
        recipeInstructions = []
        recipeIngredients = []

        document.getElementById("newRecipeTitle").innerText = "Nowy przepis"

    }

})

function editRecipButton(trRecipeId) {
    document.getElementById("newRecipeTitle").innerText = "Edytuj przepis"
    recipeWindow.classList.add("active");
    let userName = document.getElementById("name").innerText;
    let currentUser = JSON.parse(localStorage.getItem(userName));
    recipeId = trRecipeId.id.replace(/^\D+/g, '');
    recipeIndex = null;
    for (let i = 0; i < currentUser.recipList.length; i++) {
        if (currentUser.recipList[i].id === parseInt(recipeId)) {
            recipeIndex = i;
        }
    }
    let userDB = currentUser.recipList[recipeIndex];
    document.getElementById("recipe__name").value = userDB.name;
    document.getElementById("recipe__description").value = userDB.desc;
    for (let i = 0; i < userDB.instructions[0].length; i++) {
        let btn = "<i class=\"far fa-edit\" onclick='editInstructionBtn()' ></i><i class=\"fas fa-trash-alt\"  onclick='delInstructionBtn()' ></i>";
        const list = document.getElementById('instructionList');
        const entry = document.createElement('li');
        entry.classList.add("instruction__list")
        entry.appendChild(document.createTextNode(userDB.instructions[0][i]));
        list.appendChild(entry);
        list.lastElementChild.innerHTML = `${ userDB.instructions[0][i] } ${ btn }`
    }
    for (let i = 0; i < userDB.ingredients[0].length; i++) {
        let btn = "<i class=\"far fa-edit\"  onclick='editIngredientBtn()' ></i><i class=\"fas fa-trash-alt\" onclick='delIngredientBtn()'></i>";
        const list = document.getElementById('ingredientList');
        const entry = document.createElement('li');
        entry.classList.add("ingredient__list")
        entry.appendChild(document.createTextNode(userDB.ingredients[0][i]));
        list.appendChild(entry);
        list.lastElementChild.innerHTML = `${ userDB.ingredients[0][i] } ${ btn }`
    }
}

let scheduleListIndex = null;

function editScheduleButton(scheduleId) {
    document.getElementById("newScheduleTitle").innerText = "Edytuj plan";
    planWindow.classList.add("active");
    let userName = document.getElementById("name").innerText;
    let currentUser = JSON.parse(localStorage.getItem(userName));
    for (let i = 0; i < currentUser.schedulesList.length; i++) {
        if (parseInt(currentUser.schedulesList[i].id) === scheduleId) {
            scheduleListIndex = i;
        }
    }
    document.getElementById("schedule__name").value = currentUser.schedulesList[scheduleListIndex].planName;
    document.getElementById("schedule__description").value = currentUser.schedulesList[scheduleListIndex].planDesc;
    document.getElementById("schedule__nr").value = currentUser.schedulesList[scheduleListIndex].weekNr;
    //Poniedzialek
    document.querySelectorAll(".sniadanie")[0].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.pon[0];
    document.querySelectorAll(".drugieSnadanie")[0].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.pon[1];
    document.querySelectorAll(".zupa")[0].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.pon[2];
    document.querySelectorAll(".drugieDanie")[0].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.pon[3];
    document.querySelectorAll(".kolacja")[0].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.pon[4];
    //Wtorek
    document.querySelectorAll(".sniadanie")[1].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.wt[0];
    document.querySelectorAll(".drugieSnadanie")[1].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.wt[1];
    document.querySelectorAll(".zupa")[1].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.wt[2];
    document.querySelectorAll(".drugieDanie")[1].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.wt[3];
    document.querySelectorAll(".kolacja")[1].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.wt[4];
    //Sierota
    document.querySelectorAll(".sniadanie")[2].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.sr[0];
    document.querySelectorAll(".drugieSnadanie")[2].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.sr[1];
    document.querySelectorAll(".zupa")[2].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.sr[2];
    document.querySelectorAll(".drugieDanie")[2].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.sr[3];
    document.querySelectorAll(".kolacja")[2].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.sr[4];
    //Czwartek
    document.querySelectorAll(".sniadanie")[3].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.czw[0];
    document.querySelectorAll(".drugieSnadanie")[3].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.czw[1];
    document.querySelectorAll(".zupa")[3].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.czw[2];
    document.querySelectorAll(".drugieDanie")[3].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.czw[3];
    document.querySelectorAll(".kolacja")[3].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.czw[4];
    //Piatek
    document.querySelectorAll(".sniadanie")[4].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.pt[0];
    document.querySelectorAll(".drugieSnadanie")[4].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.pt[1];
    document.querySelectorAll(".zupa")[4].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.pt[2];
    document.querySelectorAll(".drugieDanie")[4].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.pt[3];
    document.querySelectorAll(".kolacja")[4].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.pt[4];
    //Sobota
    document.querySelectorAll(".sniadanie")[5].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.sb[0];
    document.querySelectorAll(".drugieSnadanie")[5].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.sb[1];
    document.querySelectorAll(".zupa")[5].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.sb[2];
    document.querySelectorAll(".drugieDanie")[5].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.sb[3];
    document.querySelectorAll(".kolacja")[5].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.sb[4];
    //Niedziela
    document.querySelectorAll(".sniadanie")[6].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.nd[0];
    document.querySelectorAll(".drugieSnadanie")[6].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.nd[1];
    document.querySelectorAll(".zupa")[6].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.nd[2];
    document.querySelectorAll(".drugieDanie")[6].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.nd[3];
    document.querySelectorAll(".kolacja")[6].value = currentUser.schedulesList[scheduleListIndex].scheduleObj.nd[4];


}

//tablica z nr tygodni

let weekNumbersList = [];

function getScheuldeArray() {
    let userName = document.getElementById("name").innerText;
    //Zaciagnij dane uzytkownika
    let arr = []
    let currentUser = JSON.parse(localStorage.getItem(userName));
    for (let i = 0; i < currentUser.schedulesList.length; i++) {
        arr.push(currentUser.schedulesList[i].weekNr)
    }
    return arr
}

// console.log(NowaTablicaLiczb)
let validationWeekNr = 0;

document.getElementById("schedule__nr").addEventListener("change", () => {
    validationWeekNr = 0;
    let userName = document.getElementById("name").innerText;
    //Zaciagnij dane uzytkownika
    let currentUser = JSON.parse(localStorage.getItem(userName));

    let fieldNrWeek = document.getElementById("schedule__nr");
    let weekValue = fieldNrWeek.value;
    let uniqeWeekNr = 0;
    for (let i = 0; i < currentUser.schedulesList.length; i++) {
        if (parseInt(currentUser.schedulesList[i].weekNr) === parseInt(weekValue)) {
            uniqeWeekNr = 1;
            console.log("nok")
        }
    }
    console.log(uniqeWeekNr)
    if (weekValue > 0 && weekValue <= 52 && uniqeWeekNr === 0) {
        fieldNrWeek.style.border = "1px solid black"
        validationWeekNr = 0;
    } else {
        fieldNrWeek.style.border = "1px solid red"
        validationWeekNr = 1;
    }
})

//Event dla przycisku Zapisz i zamknij z obszaru dodaj plan
document.querySelector(".newSchedule__btn").addEventListener("click", function () {

    let plaName = String(document.getElementById("schedule__name").value);
    let nrTygodnia = document.getElementById("schedule__nr").value;

    if (!plaName) {
        alert(`Brak nazwy planu! :)`)

    } else if (!nrTygodnia) {
        alert(`Wpisz numer tygodnia! :)`)
    } else if (validationWeekNr === 1) {
        alert(`Wpisz poprawny unikatowy numer tygodnia! :)`)
    } else if (getScheuldeArray().includes(`${ plaName }`)) {
        alert(`Masz już taki plan! :)`)


    } else {
        //Wylacz contener addschedule
        planWindow.classList.remove("active");
        // desktopActive.classList.add("active");
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
        const dayNames = ["pon", "wt", "sr", "czw", "pt", "sb", "nd"];

        if (document.getElementById("newScheduleTitle").innerText === "Nowy plan") {
            //Stworz obiekt z nowym planem
            let newPlan = new Schedule(nrTygodnia, plaName, plaDesc);
            for (let i = 0; i < dayNames.length; i++) {
                console.log(newPlan.scheduleObj[dayNames[i]]);
                newPlan.scheduleObj[dayNames[i]] = [sniadania[i].value, dSniadania[i].value, zupy[i].value, dDania[i].value, kolacje[i].value];
            }
            newPlan.id = Date.now();
            //newPlan.scheduleObj.pon = [sniadania[0].value, dSniadania[0].value, zupy[0].value, dDania[0].value, kolacje[0].value]
            currentUser.schedulesList.push(newPlan);
            weekNumbersList.push(nrTygodnia);
            console.log(weekNumbersList);
            //Wyslij nowy plan na liste html
            addScheduleHTML(plaName, plaDesc, nrTygodnia, newPlan.id)
            //dodaj nowy plan uzytkownikowi
            alert(`Dodano nowy plan`)

        } else {
            let htmlContent = document.getElementById(`scheduleTrId${ currentUser.schedulesList[scheduleListIndex].id }`);
            htmlContent.children[1].innerHTML = plaName;
            htmlContent.children[2].innerHTML = plaDesc;
            htmlContent.children[3].innerHTML = nrTygodnia;

            currentUser.schedulesList[scheduleListIndex].planName = plaName;
            currentUser.schedulesList[scheduleListIndex].planDesc = plaDesc;
            currentUser.schedulesList[scheduleListIndex].weekNr = nrTygodnia;
            for (let i = 0; i < dayNames.length; i++) {
                currentUser.schedulesList[scheduleListIndex].scheduleObj[dayNames[i]] = [sniadania[i].value, dSniadania[i].value, zupy[i].value, dDania[i].value, kolacje[i].value];
            }
            alert(`Plan został zmodyfikowany`)
        }


        // zaktualizuj uzytkownika
        console.log("Uzytkownik nazwa: " + userName)
        console.log("obiekt uzytkownika: ")
        console.log(currentUser)
        localStorage.setItem(userName, JSON.stringify(currentUser));
        //wyzeruj dane
        document.getElementById("schedule__name").value = "";
        document.getElementById("schedule__description").value = "";
        document.getElementById("schedule__nr").value = "";
        const selectList = document.querySelectorAll(".scheduleCard tbody select");
        for (const selectListElement of selectList) {
            selectListElement.value = "wybierz danie";
        }

        document.getElementById("newScheduleTitle").innerText = "Nowy plan";
        window.location.reload(true);
    }


})

let editMemory = 0;
//Event dla przycisku Dodaj Instrukcje z obszaru dodaj przepis
document.getElementById("instruction__btn").addEventListener("click", function () {
    if (editMemory === 0) {
        //Pobierz dane z pola tekstowego
        let instructionField = document.getElementById("instructionField").value;
        //Wypchnij dane do tablicy tymczasowej
        recipeInstructions.push(instructionField);
        //Wyzeruj pole tekstowe
        document.getElementById("instructionField").value = null;
        //Wypisz dodana instrukcje w liscie
        let buttons = "<i class=\"far fa-edit\" onclick='editInstructionBtn()'></i><i class=\"fas fa-trash-alt\" onclick='delInstructionBtn()'></i>"
        const list = document.getElementById('instructionList');
        const entry = document.createElement('li');
        entry.classList.add("instruction__list");
        entry.appendChild(document.createTextNode(instructionField));
        list.appendChild(entry);
        list.lastElementChild.innerHTML = `${ instructionField } ${ buttons }`
    } else {
        //zapis po edycji uzytkownika
        let instructionFieldEdited = document.getElementById("instructionField").value;
        //Wypchnij dane do tablicy tymczasowej
        recipeInstructions.push(instructionFieldEdited);
        //Wyzeruj pole tekstowe
        document.getElementById("instructionField").value = null;
        //Nadpisz dodana instrukcje w liscie
        let buttons = "<i class=\"far fa-edit\" onclick='editInstructionBtn()'></i><i class=\"fas fa-trash-alt\" onclick='delInstructionBtn()'></i>"
        instructionToBeEdited.style.fontStyle = "normal"
        instructionToBeEdited.innerHTML = instructionFieldEdited + buttons;
        editMemory = 0;
    }
})

//Edycja poszczególnych instrukcji przepisow w trybie edycji okna przepisów
let instructionToBeEdited = 0;

function editInstructionBtn() {
    editMemory = 1;
    const editInstructions = document.getElementsByClassName("instruction__list");
    for (let editInstruction of editInstructions) {
        editInstruction.addEventListener("click", function () {
            instructionToBeEdited = editInstruction;
            //zmien na kursywe edytowany tekst
            instructionToBeEdited.style.fontStyle = "italic";
            //Pobierz wartośc wpisu
            //przypisz wartość do pola teksowego
            let edittextArea = document.getElementById("instructionField");
            edittextArea.value = instructionToBeEdited.innerText;
        })
    }
}

//Usuwanie poszczególnych instrukcji przepisow w trybie edycji okna przepisów
function delInstructionBtn() {
    const delInstructions = document.getElementsByClassName("instruction__list");
    for (let delInstruction of delInstructions) {
        delInstruction.addEventListener("click", function () {
            //Usun wpis
            delInstruction.remove();
            document.getElementById("instructionField").value = null;
        })
    }
}

let editMemoryIngredient = 0;
//Event dla przycisku Dodaj Skladnik z obszaru dodaj przepis
document.getElementById("ingredient__btn").addEventListener("click", function () {
    if (editMemoryIngredient === 0) {
        //Pobierz dane z pola tekstowego
        let ingredientField = document.getElementById("ingredientField").value;
        //Wypchnij dane do tablicy tymczasowej
        recipeIngredients.push(ingredientField);
        //Wyzeruj pole tekstowe
        document.getElementById("ingredientField").value = null;
        //Wypisz dodany skladnik w liscie
        let buttons = "<i class=\"far fa-edit\" onclick='editIngredientBtn()'></i><i class=\"fas fa-trash-alt\" onclick='delIngredientBtn()'></i>"
        const list = document.getElementById('ingredientList');
        const entry = document.createElement('li');
        entry.classList.add("ingredient__list")
        entry.appendChild(document.createTextNode(ingredientField));
        list.appendChild(entry);
        list.lastElementChild.innerHTML = `${ ingredientField } ${ buttons }`
    } else {
        //zapis po edycji uzytkownika
        let ingredientFieldEdited = document.getElementById("ingredientField").value;
        //Wypchnij dane do tablicy tymczasowej
        recipeIngredients.push(ingredientFieldEdited);
        //Wyzeruj pole tekstowe
        document.getElementById("ingredientField").value = null;
        //Nadpisz dodana instrukcje w liscie
        let buttons = "<i class=\"far fa-edit\" onclick='editIngredientBtn()'></i><i class=\"fas fa-trash-alt\" onclick='delIngredientBtn()'></i>"
        ingredientToBeEdited.style.fontStyle = "normal"
        ingredientToBeEdited.innerHTML = ingredientFieldEdited + buttons;
        editMemoryIngredient = 0;
    }
})

//Edycja poszczególnych instrukcji skłądników w trybie edycji okna przepisów
let ingredientToBeEdited = 0;

function editIngredientBtn() {
    editMemoryIngredient = 1;
    const editIngredients = document.getElementsByClassName("ingredient__list");
    for (let editIngredient of editIngredients) {
        editIngredient.addEventListener("click", function () {
            ingredientToBeEdited = editIngredient;
            //zmien na kursywe edytowany tekst
            ingredientToBeEdited.style.fontStyle = "italic";
            //Pobierz wartośc wpisu
            //przypisz wartość do pola teksowego
            let edittextArea = document.getElementById("ingredientField");
            edittextArea.value = ingredientToBeEdited.innerText;
        })
    }
}

//Usuwanie poszczególnych składników w trybie edycji okna przepisów
function delIngredientBtn() {
    const delIngredients = document.getElementsByClassName("ingredient__list");
    for (let delIngredient of delIngredients) {
        delIngredient.addEventListener("click", function () {
            //Usun składnik
            delIngredient.remove();
            document.getElementById("ingredientField").value = null;
        })
    }
}

//Uzupelnienie recipes i schedules HTML z pamieci localStorage
function loadHtmlContentFromLocalStorage() {
    let userName = document.getElementById("name").innerText;
    if (userName === "Imie") {
        console.log("New user, nothing to do")
    } else {
        let currentUser = JSON.parse(localStorage.getItem(userName));
        //recipes Html
        for (let i = 0; i < currentUser.recipList.length; i++) {
            addRecipe(currentUser.recipList[i].name, currentUser.recipList[i].desc, currentUser.recipList[i].id)
        }
        //schedules html
        currentUser.schedulesList.sort((firstEl, secondEl) => firstEl.weekNr - secondEl.weekNr)
        for (let i = 0; i < currentUser.schedulesList.length; i++) {
            addScheduleHTML(currentUser.schedulesList[i].planName, currentUser.schedulesList[i].planDesc,
                currentUser.schedulesList[i].weekNr, currentUser.schedulesList[i].id)
        }
        console.log("Pobrano dane uzytkownika")
        console.log(currentUser);
    }
}

//USUŃ PRZEPIS Z LISTY PLANÓW
function delRecipButton(trRecipeId) {
    //Pobierz klucz uzytkownika
    let userName = document.getElementById("name").innerText;
    //Zaciagnij dane uzytkownika
    let currentUser = JSON.parse(localStorage.getItem(userName));
    let deleteRecipe = document.getElementById(`${ trRecipeId.id }`);
    //Usun z HTML
    deleteRecipe.parentElement.removeChild(deleteRecipe);
    //Wyciagnij czyste id
    let recipeId = trRecipeId.id.replace(/^\D+/g, '');
    let recipeIndex = null;
    //Szukanie indexu po id
    for (let i = 0; i < currentUser.recipList.length; i++) {
        if (currentUser.recipList[i].id === parseInt(recipeId)) {
            recipeIndex = i;
        }
    }
    // usuniecie z tablicy elementu o odszukanym index
    currentUser.recipList.splice(recipeIndex, 1);
    // aktualizacja localStorage uzytkownika
    localStorage.setItem(userName, JSON.stringify(currentUser));
}

// SKRYPT DLA ZMIEN PLAN
const previousSchedule = document.querySelector('.schedule__previous ')
const nextSchedule = document.querySelector('.schedule__next')

function returnActualWeek() {
    let userName = document.getElementById("name").innerText;
    //Zaciagnij dane uzytkownika
    let currentUser = JSON.parse(localStorage.getItem(userName));
    let arrayWeeks = []
    let newSortedArray = arrayWeeks.sort((a, b) => a - b)
    for (const item of currentUser.schedulesList) {
        arrayWeeks.push(item.weekNr)
    }
    let counts = newSortedArray
    goal = currentWeekNumber;

    let closest = counts.reduce(function (prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });
    arrayWeeks.sort((a, b) => a - b)

    return closest
}


Date.prototype.getWeek = function () {
    let onejan = new Date(this.getFullYear(), 0, 1);
    let today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    let dayOfYear = ((today - onejan + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7)
};
let today = new Date();
let currentWeekNumber = today.getWeek();
document.querySelector(".week_number").innerHTML = currentWeekNumber;


window.addEventListener('DOMContentLoaded', () => {
    let userName = document.getElementById("name").innerText;
    //Zaciagnij dane uzytkownika
    let currentUser = JSON.parse(localStorage.getItem(userName));

    currentUser.schedulesList.sort((a, b) => a.weekNr - b.weekNr)

    let arrayWeeks = []

    for (const item of currentUser.schedulesList) {

        arrayWeeks.push(item.weekNr)

    }
    let newSortedArray = arrayWeeks.sort((a, b) => a - b);
    let activeSlide = newSortedArray.indexOf(returnActualWeek());


    previousSchedule.addEventListener('click', () => {
        activeSlide--
        if (activeSlide < 0) {
            activeSlide = String(newSortedArray.length - 1)
        }
        schuldeSlider(`${ newSortedArray[activeSlide] }`)
        console.log('działa wstecz')
    })


    nextSchedule.addEventListener('click', () => {
        activeSlide++
        if (activeSlide > newSortedArray.length - 1) {
            activeSlide = '0'
        }
        schuldeSlider(`${ newSortedArray[activeSlide] }`)
    })
    schuldeSlider(`${ returnActualWeek() }`)
})

//USUŃ PLAN Z TABLICY PLANÓW
function delScheduleButton(scheduleId) {
    //Pobierz klucz uzytkownika
    let userName = document.getElementById("name").innerText;
    //Zaciagnij dane uzytkownika
    let currentUser = JSON.parse(localStorage.getItem(userName));
    let deleteSchedule = document.getElementById(`scheduleTrId${ scheduleId }`);
    //Usun z HTML
    deleteSchedule.parentElement.removeChild(deleteSchedule);
    //Szukanie indexu po id
    for (let i = 0; i < currentUser.schedulesList.length; i++) {
        if (parseInt(currentUser.schedulesList[i].id) === scheduleId) {
            scheduleListIndex = i;
        }
    }
    // usuniecie z tablicy elementu o odszukanym index
    currentUser.schedulesList.splice(scheduleListIndex, 1);
    // aktualizacja localStorage uzytkownika
    localStorage.setItem(userName, JSON.stringify(currentUser));
}

//Aktualizacji ilosci przepisow na stronie glownej
function recipeQuantity() {
    let spanRecipeQuantity = document.querySelector(".widget__info__text");
    let currentUser = getUserData();
    if (currentUser.recipList.length === 1) {
        spanRecipeQuantity.textContent = `Masz ${ currentUser.recipList.length } przepis, nieźle!`;
    } else if (currentUser.recipList.length === 0 ) {
        spanRecipeQuantity.textContent = `Pamietaj, aby dodac przepis!`;
    }
    else if (currentUser.recipList.length > 1 && currentUser.recipList.length < 5) {
        spanRecipeQuantity.textContent = `Masz już ${ currentUser.recipList.length } przepisy, nieźle!`;
    } else {
        spanRecipeQuantity.textContent = `Masz już${ currentUser.recipList.length } przepisów, nieźle!`;
    }


}

//Aktualizacji ilosci planów na stronie glownej
function schuldeQuantity() {
    let spanSchuldeQuantity = document.querySelector(".widget__warning__text");
    let currentUser1 = getUserData();
    if (currentUser1.schedulesList.length === 0) {
        spanSchuldeQuantity.textContent = `Pamiętaj, aby dodać plan!`;
    } else if (currentUser1.schedulesList.length === 1) {
        spanSchuldeQuantity.textContent = `Masz już ${ currentUser1.schedulesList.length } plan. Świetnie!`;
    }
    else if (currentUser1.schedulesList.length > 1 && currentUser1.schedulesList.length < 5) {
        spanSchuldeQuantity.textContent = `Masz już ${ currentUser1.schedulesList.length } plany. Świetnie!`;
    }
    else {
        spanSchuldeQuantity.textContent = `Masz już ${ currentUser1.schedulesList.length } planów. Świetnie!`;
    }
}

document.addEventListener('DOMContentLoaded', recipeQuantity)
document.addEventListener('DOMContentLoaded', schuldeQuantity)


function getUserData() {
    let userName = document.getElementById("name").innerText;
    return JSON.parse(localStorage.getItem(userName));

}