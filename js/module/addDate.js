function addDate() {
    /* https://www.youtube.com/watch?v=TdurrvcOHgQ */
    function addLeadingZero(d) {// подставляет 0 перед одиночной цифрой
        return (d < 10) ? '0' + d : d;
    }

    const daysRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Черверг', 'Пятница', 'Суббота'],
        daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    function getUserTime(t = new Date()) {
        let Y = t.getFullYear(),
            M = addLeadingZero(t.getMonth() + 1),
            D = addLeadingZero(t.getDate()),
            d = daysEn[t.getDay()],
            h = addLeadingZero(t.getHours()),
            m = addLeadingZero(t.getMinutes()),
            s = addLeadingZero(t.getSeconds());

        return `Date: ${D}.${M}.${Y} ${h}:${m}:${s} (${d})`;  
    }

    document.querySelector('.date').innerHTML = getUserTime();//вставить класс блока, куда должна выводиться сегоднящняя дата <div class="date"></div>
    //==========================================================================
}

export default addDate;