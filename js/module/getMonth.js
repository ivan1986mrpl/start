//---Месяц

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

export default gettingMonth;