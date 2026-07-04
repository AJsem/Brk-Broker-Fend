"use strict";
import utils from '../utilities/utils.js';
const page = document.body.dataset.page;
window.scrollToCard = utils.scrollToCard;
window.dropDownEvent = utils.dropDownEvent;

utils.navigation();
utils.updateYear();

if(page == "index") {
    utils.updateUserCount();
    utils.updateSwiperYear();
    utils.initSwiperRandom();
}