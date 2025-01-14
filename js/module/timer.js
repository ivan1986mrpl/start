
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

    function declOfNum(number, titles) {// подставляет дня, дней, день  
        let cases = [2, 0, 1, 1, 1, 2];  
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
    }

    const timeCount = () => {
        let now = new Date();
        let leftUntil = endDate - now;
        
        let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
        let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
        let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
        let seconds = Math.floor(leftUntil / 1000) % 60;

        daysVal.textContent = addLeadingZero(days);
        hoursVal.textContent =	addLeadingZero(hours);
        minutesVal.textContent = addLeadingZero(minutes);
        secondsVal.textContent = addLeadingZero(seconds);

        daysText.textContent = declOfNum(days, ['день', 'дня', 'дней']);//поменять значения, если используется английский язык
        hoursText.textContent = declOfNum(hours, ['час', 'часа', 'часов']);
        minutesText.textContent = declOfNum(minutes, ['минута', 'минуты', 'минут']);
        secondsText.textContent = declOfNum(seconds, ['секунда', 'секунды', 'секунд']);
    };

    timeCount();
    setInterval(timeCount, 1000);
}

export default timer;