


function addDate() {
    /* https://www.youtube.com/watch?v=TdurrvcOHgQ */
    function addLeadingZero(d) {// подставляет 0 перед одиночной цифрой
        return (d < 10) ? '0' + d : d;
    }

	function gettingDay() {
		let day;
		if (document.documentElement.lang === 'ru') {//получение html lahg
			const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];	
			day = days[new Date().getDay() - 1]
		} else {
			const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];	
			day = days[new Date().getDay()]
		}
		return day;	
	}

	function gettingMonth() {
		let month;
	
		if (document.documentElement.lang === 'ru') {
			const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Май', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];	
			month = months[new Date().getMonth()];
		} else {
			const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];	
			month = months[new Date().getMonth()];
		}	
		return month;
	}

    function getUserTime(t = new Date()) {
        let Y = t.getFullYear(),
            //M = addLeadingZero(t.getMonth() + 1),//для отображения в числовом формате
			M = gettingMonth(),
            D = addLeadingZero(t.getDate()),
			d = gettingDay(),
            h = addLeadingZero(t.getHours()),
            m = addLeadingZero(t.getMinutes()),
            s = addLeadingZero(t.getSeconds());

		if (document.documentElement.lang === 'ru') {
			return `Дата: ${D} ${M} ${Y} ${h}:${m}:${s} ${d}`;
		} else {
			return `Date: ${D} ${M} ${Y} ${h}:${m}:${s} ${d}`; 
		}         
    }

    document.querySelector('.date').innerHTML = getUserTime();//вставить класс блока, куда должна выводиться сегоднящняя дата <div class="date"></div>
    //==========================================================================
}

export default addDate;

