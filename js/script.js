'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // header
    function menuBurger() {
        const menu = document.querySelector('.menu__body'),
        menuBtn = document.querySelector('.icon-menu');
    
        if (menu && menuBtn) {
            menuBtn.addEventListener('click', () => {
                menu.classList.toggle('menu-open');
                menuBtn.classList.toggle('menu-open');
                document.body.classList.toggle('lock');
            });
    
            menu.addEventListener('click', event => {
                if (event.target.classList.contains('menu__body')) {
                    menu.classList.remove('menu-open');
                    menuBtn.classList.remove('menu-open');
                    document.body.classList.remove('lock');
                }
            });
    
            menu.querySelectorAll('.menu__link').forEach(link => {
                link.addEventListener('click', () => {//скролл к секциям
                    menu.classList.remove('menu-open');
                    menuBtn.classList.remove('menu-open');
                    document.body.classList.remove('lock');
                });
            });
        }
    }

    function pageNavigation() {
        //============== плавный скролл к якорям =========================
        const anchors = document.querySelectorAll('a[href*="#"]');//в атрибуте ссылки href указать Id секции, к которой нужно перейти
    
        anchors.forEach(anchor => {
            anchor.addEventListener('click', event => {
                event.preventDefault();
    
                const blockId = anchor.getAttribute('href').substring(1);
    
                document.getElementById(blockId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            });    
        });
    }

    function headerFon() {//появление подложки под header при скролле для лучшей читаимости 
        window.addEventListener('scroll', function () {//
            if (scrollY > 0) {
                document.querySelector('.header').classList.add('scroll');        
            } else {
                document.querySelector('.header').classList.remove('scroll');
            }
        });
    }

    menuBurger();
    pageNavigation();
    headerFon();
    //=======================================================================================

    //==================== TABS ==========================
    function tabs() {
        const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

        function hideTabContent() {
            tabsContent.forEach(item => {//скрытие всех табов (контента)
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });

            tabs.forEach(item => {//убираем класс активности у кнопок табов
                item.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent(i = 0) {//i = 0 === параметр по умолчанию => передаем первый слайд (функция показа таба)
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (e.target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    }
     tabs();
    //=======================================================================================

    // add date
    function addDate() {
        function addLeadingZero(d) {
            return (d < 10) ? '0' + d : d;
        }
    
        function gettingDay() {
            let day;
            if (document.documentElement.lang === 'ru') {
                const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
                day = days[new Date().getDay() - 1];
            } else {
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                day = days[new Date().getDay()];
            }
            return day;
        }
    
        function gettingMonth() {
            let month;
    
            if (document.documentElement.lang === 'ru') {
                const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
                month = months[new Date().getMonth()];
            } else {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                month = months[new Date().getMonth()];
            }
            return month;
        }
    
        function getUserTime(t = new Date()) {
            let Y = t.getFullYear(),
                //M = addLeadingZero(t.getMonth() + 1),//to display in numeric format
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
    
        function updateDate() {
            document.querySelector('.date').innerHTML = getUserTime();//insert the block class where today's date should be displayed <div class="date"></div>
        }
    
        updateDate();
        setInterval(updateDate, 1000);
    }
    
    addDate();
    //=======================================================================================

    // to top button
    function scrollUp() {
        const offset = 100,
              scrollUp = document.querySelector('.scroll-up'),
              scrollUpSvgPath = document.querySelector('.scroll-up__path'),
              pathLength = scrollUpSvgPath.getTotalLength();
    
        scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';
    
        const getTop = () => window.scrollY || document.documentElement.scrollTop;//считает количество пикселей от верха    
        
        //просчитывает заливку svg (по мере скролла заливается больший процент иконки)
        const updateDashOffset = () => {
            const height = document.documentElement.scrollHeight - window.innerHeight;//разница между высотой скролла и высотой окна
            const dashOffset = pathLength - (getTop() * pathLength / height);
            scrollUpSvgPath.style.strokeDashoffset = dashOffset;
        };
    
        //on scroll (отвечает за появление кнопки на странице)
        window.addEventListener('scroll', () => {
            updateDashOffset();
    
            if (getTop() > offset) {
                scrollUp.classList.add('scroll-up--active');
            } else {
                scrollUp.classList.remove('scroll-up--active');
            }        
        }); 
 
        //нажатие на кнопку и плавный скролл вверх
        scrollUp.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    } 

    scrollUp();
    //=======================================================================================
    
    // countDown    
    function initCountdown(parent, to, timerEndMessage) {

        let decCache = [], //функция для склонения имен, склонять как 1 день, три дня, пять дней (склонение числительных в javaScript, функция в поиске гугл declOfNum)
            decCases = [2, 0, 1, 1, 1, 2];
        function decOfNum(number, titles) {
            if (!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
            return titles[decCache[number]];
        }

        function addLeadingZero(d) {// подставляет 0 перед одиночной цифрой
            return d < 10 ? '0' + d : d;
        }

        let timer;
        parent && to ? timer = setInterval(countdown, 1000) : null;//если таймер закончился, выдаст null

        let toCountDate; // конечная дата

        // Определяем конечную дату
        if (typeof to === 'string') {
            toCountDate = new Date(to); // если передана строка (дата)
        } else if (typeof to === 'number') {
            toCountDate = new Date(Date.now() + to * 1000);// если передано количество секунд
        } else {
            console.error('Countdown error: invalid "to" argument');
        }

        function countdown() {
            let currentDate = new Date();// сегодня
            let totalSeconds = Math.floor((toCountDate - currentDate) / 1000);//разница дат в секундах

            const seconds = totalSeconds % 60;
            const minutes = Math.floor((totalSeconds / 60) % 60);
            const hours = Math.floor((totalSeconds / 3600) % 24);
            const days = Math.floor(totalSeconds / 86400);
            // Math.floor округляет в нижнюю сторону
            const rootElements = document.querySelectorAll(parent);//класс родителя таймера

            if (rootElements.length > 0) {
                rootElements.forEach(root => {
                    if (days > 0 && root.querySelector('.days')) {//проверка на наличие класса в html и если дней < 0, то блок с днями удаляется из разметки
                        root.querySelector('.days .num').textContent = addLeadingZero(days);
                        root.querySelector('.days .name').textContent = decOfNum(days, ['день', 'дня', 'дней']);
                    } else {
                        root.querySelector('.days').style.display = 'none';
                    }

                    if (root.querySelector('.hours')) {
                        root.querySelector('.hours .num').textContent = addLeadingZero(hours);
                        root.querySelector('.hours .name').textContent = decOfNum(hours, ['час', 'часа', 'часов']);
                    }

                    if (root.querySelector('.minutes')) {
                        root.querySelector('.minutes .num').textContent = addLeadingZero(minutes);
                        root.querySelector('.minutes .name').textContent = decOfNum(minutes, ['минута', 'минуты', 'минут']);
                    }

                    if (root.querySelector('.seconds')) {
                        root.querySelector('.seconds .num').textContent = addLeadingZero(seconds);
                        root.querySelector('.seconds .name').textContent = decOfNum(seconds, ['секунда', 'секунды', 'секунд']);
                    }

                    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {//если таймер закончился, удаляем таймер и выводим сообщение, которое предаем третьим аргументом при вызове
                        clearInterval(timer);
                        root.textContent = timerEndMessage;
                    }
                });
            } else {
                console.error('Countdown error: no parent mentioned');//не передали родителя при вызове
            }
        }

        countdown();
    }
    // Передача конечной даты
    // initCountdown('.countdown', '27 Jun 2025 12:30', 'The timer is over');
    // для каждого нового вызова передавать класс таймера, конечную дату в формате '29 Jun 2025 17:28' и сообщение об окончании таймера 'The timer is over'
    // Передача количества секунд (сутки = 86400с) (1 час = 3600секунд)
    initCountdown('.countdown', 86445, 'The timer is over'); // Таймер на 1 день (86400 секунд)
    //=======================================================================================


    


    




    




    //=======================================================================================















     

});













