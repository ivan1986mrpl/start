function headerFon() {
    window.addEventListener('scroll', function () {//появление подложки под header при скролле
        scrollY > 0 ? document.querySelector('.header').classList.add('scroll') : document.querySelector('.header').classList.remove('scroll');
        });
}

export default headerFon;


/* добавить стили

.header::before {
	content: "";
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.4);
	opacity: 0;
	transition: opacity 0.3s;
}
.header.scroll::before {
	opacity: 1;
}

*/