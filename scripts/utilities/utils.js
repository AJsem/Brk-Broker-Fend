const scrolledNav = () => {
    const navBar = document.querySelector("nav");

    window.addEventListener("scroll", () => {
        if(window.scrollY > 63)
            navBar.classList.add("scrolled");
        else
            navBar.classList.remove("scrolled");
    });
}

const navigation = () => {
    scrolledNav();
    const navBtn = document.querySelector('nav .nav-btn');
    const dropDown = document.querySelector('nav .links');

    navBtn.addEventListener('click', () => {
        // if(navBtn.classList.contains)
        navBtn.classList.toggle('active');
        dropDown.classList.toggle('active');
    });
}

const updateYear = () => {
    const spanYear = document.querySelector("footer span.year");
    const date = new Date();
    
    spanYear.textContent = date.getFullYear();
}

const updateUserCount = () => {
    const tUserSpan = document.querySelector(".total-users");

    setInterval(
        () => {
            let totalUser = Number(localStorage.getItem("tUsers") || tUserSpan.textContent.replace(/,/g, ""));
            const randomNum = Math.floor(Math.random() * ((50-21))) + 20;
            totalUser += randomNum;
            localStorage.setItem("tUsers", totalUser);
            tUserSpan.textContent = totalUser.toLocaleString();
        },
    5000);
}

const scrollToCard = function (cardTagId, btn) {
    const card = document.getElementById(cardTagId);
    const allCards = document.querySelectorAll("section.our-legacy div.legacy-cards div.legacy-card");
    const allCardBtns = document.querySelectorAll("section.our-legacy div.scroll-years button");

    allCardBtns.forEach(btn => {
        btn.classList.remove("active");
    });
    allCards.forEach(card => {
        card.classList.remove("active");
    });

    btn.classList.add("active");
    card.classList.add("active");

    btn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"  
    });

    card.scrollIntoView({ 
        behavior: "smooth",
        block: "nearest",
        inline: "center"  
    });
}

const updateSwiperYear = () => {
    const swiper = document.querySelector("section.our-legacy div.legacy-cards");
    const yearsContainer = document.querySelector("section.our-legacy div.scroll-years");

    const allCards = document.querySelectorAll(
        "section.our-legacy div.legacy-cards div.legacy-card"
    );

    const allCardBtns = document.querySelectorAll(
        "section.our-legacy div.scroll-years button"
    );

    swiper.addEventListener("scroll", () => {
        let currentIndex = Math.round(swiper.scrollLeft / swiper.clientWidth);

        if (currentIndex > allCards.length - 1)
            currentIndex = allCards.length - 1;

        allCardBtns.forEach(btn => btn.classList.remove("active"));
        allCards.forEach(card => card.classList.remove("active"));

        allCardBtns[currentIndex].classList.add("active");
        allCards[currentIndex].classList.add("active");

        yearsContainer.scrollTo({
            left:
                allCardBtns[currentIndex].offsetLeft -
                (yearsContainer.clientWidth / 2) +
                (allCardBtns[currentIndex].clientWidth / 2),
            behavior: "smooth"
        });
    });
}

const initSwiperRandom = () => {
    // Here I want to center a random legacy card on page load, so that the user can see different cards each time they visit the page. But I don't want the page to scroll vertically, that's it should scroll down to the cards section. I am not scrolling the page to the card section, just scrolling the card section horizontally to a random card.

    const btnContainer = document.querySelector("section.our-legacy div.scroll-years");
    const cardContainer = document.querySelector("section.our-legacy div.legacy-cards");    
    const allCards = document.querySelectorAll("section.our-legacy div.legacy-cards div.legacy-card");
    const allCardBtns = document.querySelectorAll("section.our-legacy div.scroll-years button");
    let randomIndex = Math.floor(Math.random() * allCardBtns.length);

    allCardBtns.forEach(btn => {
        btn.classList.remove("active");
    });
    allCards.forEach(card => {
        card.classList.remove("active");
    });

    allCardBtns[randomIndex].classList.add("active");
    allCards[randomIndex].classList.add("active");

    // Note, I am not scrolling into VIEW, just scrolling card section vertically but not into view. that is for the user to do
    btnContainer.scrollLeft =
        allCardBtns[randomIndex].offsetLeft -
        (btnContainer.clientWidth / 2) +
        (allCardBtns[randomIndex].clientWidth / 2);

    cardContainer.scrollLeft =
        allCards[randomIndex].offsetLeft -
        (cardContainer.clientWidth / 2) +
        (allCards[randomIndex].clientWidth / 2);
}

const dropDownEvent = (container) => {
    const parentContainer = container.parentElement;
    const allDropDowns = parentContainer.querySelectorAll(".faq-card");
    allDropDowns.forEach(dropDown => {
        if (dropDown !== container) {
            const p = dropDown.querySelector("p");
            p.style.display = "none";
        }
    });
    
    const p = container.querySelector("p");
    p.style.display = p.style.display === "none" ? "block" : "none";
}

export default {
    navigation,
    updateYear,
    updateUserCount,
    scrollToCard,
    updateSwiperYear,
    initSwiperRandom,
    dropDownEvent
}