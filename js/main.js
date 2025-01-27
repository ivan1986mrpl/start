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

    // Передача конечной даты
    // initCountdown('.countdown', '27 Jun 2025 12:30', 'The timer is over');

    // Передача количества секунд (сутки = 86400с) (1 час = 3600секунд)
     initCountdown('.countdown', 3610, 'The timer is over'); // Таймер на 1 час

    // gettingDay();
    // gettingMonth();
    modal();
    scrollUp();

});