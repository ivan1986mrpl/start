function headerFon() {
    window.addEventListener('scroll', function () {//появление подложки под header при скролле
        scrollY > 0 ? document.querySelector('.header').classList.add('scroll') : document.querySelector('.header').classList.remove('scroll');
        });
}

export default headerFon;
