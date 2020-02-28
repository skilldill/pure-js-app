const container = document.getElementById("container");

// Onboarding
const onboarding = container.querySelector("#onboarding");
const btnOnboardingNext = onboarding.querySelector("#btn-onboarding-next");
const boardMap = onboarding.querySelector("#board-map");
const boards = onboarding.querySelectorAll(".board");
const boardMapsPoint = boardMap.querySelectorAll("div");

// Autorization
const authorization = container.querySelector("#authorization");
const authorizationForms = authorization.querySelectorAll("form");
const refsForm = authorization.querySelectorAll("#refs-form a");
const authorizationNavbarContent = authorization.querySelector("#navbar-authorization>span");
const formLogin = authorization.querySelector("#form-login");

// Cabinet
const cabinet = container.querySelector("#cabinet");
const cabinetNavbarContent = cabinet.querySelector("#navbar-cabinet span");
const friendsBlock = cabinet.querySelector("#friends");
const cabinetPanels = cabinet.querySelectorAll(".panel");
const itemsMenuBottom = cabinet.querySelectorAll("#menu-bottom li");
const modal = cabinet.querySelector("#modal");
const navbarBtn = cabinet.querySelector("#navbar-btn");
const btnLogout = cabinet.querySelector("#btn-logout");
const friendsList = cabinet.querySelector("#friends-list");
const formFriend = cabinet.querySelector("#form-friend");
const btnClearAll = cabinet.querySelector("#btn-clear-all");

const isSkipOnboarding = localStorage.getItem("skipOnboarding");

function friendTemplate(friend) {
    return `
    <li class="friends-item">
        <img src="${friend.avatar}" alt="${friend.name}">
        <div class="friend-info">
            <h3>${friend.name}</h3>
            <span class="${friend.status}">${friend.status}</span>
        </div>
    </li>
    `
}

function renderFriends(friends) {
    friendsList.innerHTML = "";

    for (let i = 0; i < friends.length; i++) {
        friendsList.innerHTML += friendTemplate(friends[i]);
    }
}

// initial state authorization
if(isSkipOnboarding) {
    authorization.style.display = "block";
    onboarding.style.display = "none";
} else {
    authorization.style.display = "none";
}

let indexActiveForm = 0;
authorizationForms[1].style.display = "none";
authorizationForms[2].style.display = "none";
refsForm[0].style.display = "none";


let indexActiveBoard = 0;
boards[1].style.display = "none";
boards[2].style.display = "none";

let skipedOnboarding = false;

// initial state cabinet
cabinet.style.display = "none";
cabinetPanels[1].style.display = "none";
cabinetPanels[2].style.display = "none";
let activeIndexPanel = 0;

// user data
const user = {
    login: "Harry Potter"
};
cabinetNavbarContent.innerText = user.login;

function activateBoard(activeIndex) {
    for(let i = 0; i < boards.length; i++) {
        if(i === activeIndex) {
            boards[i].style.display = "block";
            boardMapsPoint[i].classList.add("active");
        }
        else {
            boards[i].style.display = "none";
            boardMapsPoint[i].classList.remove("active");
        }
    }
}

function setAuthorizationNavbarContent(index) {
    switch(index) {
        case 0:
            authorizationNavbarContent.innerText = "Вход";
            break;
        case 1:
            authorizationNavbarContent.innerText = "Регистрация";
            break;
        case 2:
            authorizationNavbarContent.innerText = "Восстановление пароля"
            break;
    }
}

function activateAuhtorizationForm(activeIndex) {
    for(let i = 0; i < authorizationForms.length; i++) {
        if(i === activeIndex) {
            authorizationForms[i].style.display = "block";
            refsForm[i].style.display = "none";
        } 
        else {
            authorizationForms[i].style.display = "none";
            refsForm[i].style.display = "inline";
        }
    }
}

function bindingRefsForms() {
    for(let i = 0; i < refsForm.length; i++) {
        refsForm[i].addEventListener("click", (event) => {
            event.preventDefault();

            activateAuhtorizationForm(i);
            setAuthorizationNavbarContent(i);
        })
    }
}

function switchCabinetPanel(activeIndex) {
    for(let i = 0; i < cabinetPanels.length; i++) {
        if (i === activeIndex) {
            cabinetPanels[i].style.display = "block";
            itemsMenuBottom[i].classList.add("active");
        }
        else {
            cabinetPanels[i].style.display = "none";
            itemsMenuBottom[i].classList.remove("active");
        }
    }
}

function bindItemsMenuBottom() {
    for(let i = 0; i < itemsMenuBottom.length; i++) {
        activeIndexPanel = i;
        itemsMenuBottom[i].addEventListener("click", () => switchCabinetPanel(i))
    }
}

btnOnboardingNext.addEventListener("click", () => {
    if(!skipedOnboarding) {
        if(indexActiveBoard < boards.length - 1) {
            indexActiveBoard++;
            activateBoard(indexActiveBoard);
        }
    
        if(indexActiveBoard === boards.length - 1) {
            btnOnboardingNext.innerText = "Начать";
            skipedOnboarding = true;
            localStorage.setItem("skipOnboarding", true);
        }
    }
    else {
        onboarding.style.display = "none";
        authorization.style.display = "block";
    }
})

formLogin.addEventListener("submit", (event) => {
    event.preventDefault();

    if(formLogin['login'].value.length > 0 && formLogin['password'].value.length > 0) {
        user.login = formLogin['login'].value;
        cabinet.style.display = "block";
        authorization.style.display = "none";
        cabinetNavbarContent.innerText = user.login;

        formLogin['login'].value = "";
        formLogin['password'].value = "";
    }
})

navbarBtn.addEventListener("click", () => {
    modal.style.display = "flex";
})

modal.addEventListener("click", () => {
    modal.style.display = "none";
})

btnLogout.addEventListener("click", (event) => {
    event.stopPropagation();
    cabinet.style.display = "none";
    authorization.style.display = "block";
})

formFriend.addEventListener("submit", (event) => {
    event.preventDefault();

    if(formFriend['friend-name'].value.length > 0 && 
        formFriend['friend-avatar'].value.length) {
        
        friends.push({
            name: formFriend['friend-name'].value,
            avatar: formFriend['friend-avatar'].value,
            status: "offline",
            selected: false
        })

        renderFriends(friends);
        formFriend['friend-name'].value = "";
        formFriend['friend-avatar'].value = "";
    }
})

btnClearAll.addEventListener("click", () => {
    const confiramtion = confirm("Вы действиетельно хотите удалить данные?");

    if(confiramtion){
        localStorage.clear();
    }
})

bindingRefsForms();
bindItemsMenuBottom();
renderFriends(friends);