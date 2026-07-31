"use strict";
import utils from '../utilities/utils.js';
const page = document.body.dataset.page;
window.scrollToCard = utils.scrollToCard;
window.dropDownEvent = utils.dropDownEvent;

let value = 61;
utils.updateYear();

switch(page) {
    case "index":
        utils.updateUserCount();
        utils.updateSwiperYear();
        utils.initSwiperRandom();
        break;
    case "dashboard":
        value = 0;
        break;
    case "download":
        value = 0;
        break;
    case "login":
        value = 63;
        break;
    case "register":
        value = 94;
        break;
    case "forgot-password":
        value = 0;
        break;
    case "reset-password":
        value = 0;
        break;
    case "about":
        value = 78;
        break;
    case "support":
        value = 78;
        break;
    case "faq": 
        value = 78;
        break;
    case "insights":
        value = 78;
        break;
}

utils.navigation(value);