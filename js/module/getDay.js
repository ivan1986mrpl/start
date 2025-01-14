//---День недели

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

export default gettingDay;