
function timer(to) {
    /* ================ TIMER ================================================== */
    /* https://www.youtube.com/watch?v=9i4LMsjo0DQ&t=4s */
    const endDate = new Date().getTime() + to;// таймер обратного отсчета на 1 час (3 600 000 милисекунд) от теперешней даты (сутки = 86 400 000мс)
        
    const daysVal = document.querySelector('.time-count__days .time-count__val');
    const hoursVal = document.querySelector('.time-count__hours .time-count__val');
    const minutesVal = document.querySelector('.time-count__minutes .time-count__val');
    const secondsVal = document.querySelector('.time-count__seconds .time-count__val');

    const daysText = document.querySelector('.time-count__days .time-count__text');
    const hoursText = document.querySelector('.time-count__hours .time-count__text');
    const minutesText = document.querySelector('.time-count__minutes .time-count__text');
    const secondsText = document.querySelector('.time-count__seconds .time-count__text');

    function addLeadingZero(d) {// подставляет 0 перед одиночной цифрой
        return (d < 10) ? '0' + d : d;
    }

    function declOfNum(number, titles) {// подставляет дня, дней, день (склонение числительных в javaScript, функция в поиске гугл declOfNum) (функция для склонения имен, склонять как 1 день, три дня, пять дней) 
        let cases = [2, 0, 1, 1, 1, 2];  
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
    }

    const timeCount = () => {
        let now = new Date();//сегодня сейчас
        let leftUntil = endDate - now;// осталось милисекунд до 
        
        let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);// Math.floor округляет в нижнюю сторону
        let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
        let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
        let seconds = Math.floor(leftUntil / 1000) % 60;

        daysVal.textContent = addLeadingZero(days);//записываем время в таймер
        hoursVal.textContent =	addLeadingZero(hours);
        minutesVal.textContent = addLeadingZero(minutes);
        secondsVal.textContent = addLeadingZero(seconds);

        daysText.textContent = declOfNum(days, ['день', 'дня', 'дней']);//поменять значения, если используется английский язык
        hoursText.textContent = declOfNum(hours, ['час', 'часа', 'часов']);
        minutesText.textContent = declOfNum(minutes, ['минута', 'минуты', 'минут']);
        secondsText.textContent = declOfNum(seconds, ['секунда', 'секунды', 'секунд']);
    };

    timeCount();//если не вызвать сначала функцию timeCount, то она вызывется через setInterval через секунду и сначала на странице будут нули и только через секунду таймер заработает
    setInterval(timeCount, 1000);
}

export default timer;

/* если таймер закончится, будут бредовые значения. нужно сделать проверку на отрицательные значения и выводить какое-то сообщение */

/* 
<div class="time-count">
    <h2 class="time-count__title">До endDate осталось</h2>
    <div class="time-count__content">
        <div class="time-count__item time-count__days">
            <div class="time-count__val">00</div>
            <span class="time-count__text">дней</span>
        </div>
        <div class="time-count__separator">:</div>
        <div class="time-count__item time-count__hours">
            <div class="time-count__val">00</div>
            <span class="time-count__text">часов</span>
        </div>
        <div class="time-count__separator">:</div>
        <div class="time-count__item time-count__minutes">
            <div class="time-count__val">00</div>
            <span class="time-count__text">минут</span>
        </div>
        <div class="time-count__separator">:</div>
        <div class="time-count__item time-count__seconds">
            <div class="time-count__val">00</div>
            <span class="time-count__text">секунд</span>
        </div>
    </div>
</div>
*/