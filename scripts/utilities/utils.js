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

export default {
    navigation,
    updateYear
}