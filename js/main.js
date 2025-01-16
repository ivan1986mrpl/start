import headerFon from "./module/headerFon.js";
import menuInit from "./module/burger.js";
import addDate from "./module/addDate.js";
import timer from "./module/timer.js";
import initCountdown from "./module/countdown.js";
import gettingDay from "./module/getDay.js";
import gettingMonth from "./module/getMonth.js";
import modal from "./module/modal.js";
import scrollUp from "./module/scrollUp.js";






//'use strict';
 
window.addEventListener('DOMContentLoaded', () => {
    // headerFon();
    menuInit();
    addDate();
    timer(3600000);//(3 600 000мс = час, 86 400 000мс = сутки)
    initCountdown('.countdown', '30 Jan 2025 11:00');
    // gettingDay();
    // gettingMonth();
    modal();
    scrollUp();

});