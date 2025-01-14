import headerFon from "./module/headerFon.js";
import menuInit from "./module/burger.js";
import addDate from "./module/addDate.js";
import timer from "./module/timer.js";
import initCountdown from "./module/countdown.js";






//'use strict';
 
window.addEventListener('DOMContentLoaded', () => {
    //headerFon();
    menuInit();
    addDate();
    timer(86400000);//(3 600 000мс = час, 86 400 000мс = сутки)
    //initCountdown('.countdown', '14 Jun 2025 11:00');
});