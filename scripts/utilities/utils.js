const scrolledNav = () => {
    const navBar = document.querySelector("nav");

    window.addEventListener("scroll", () => {
        if(window.scrollY > 74)
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

export default {
    navigation,
    updateYear,
    updateUserCount
}