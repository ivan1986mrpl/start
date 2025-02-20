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

    // modal
    function modal() {
        const modalTriggers = document.querySelectorAll('[data-modal]'),
              modal = document.querySelector('.modal');

        function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.classList.add('lock');
            if (modalTimerId) {
                clearInterval(modalTimerId);//если пользователь уже открывал окно, оно не будет открываться по истечению интервала (убрать строку, если не используется открытие по таймеру)
            }
        }

        function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.classList.remove('lock');
        }

        modalTriggers.forEach(btnOpen => {
            btnOpen.addEventListener('click', openModal);
        });

        modal.addEventListener('click', (e) => {//при клике на подложку и на крестик модальное окно закроется
            if (e.target === modal || e.target.getAttribute('data-close') == '') {
                closeModal();
            }        
        });

        document.addEventListener('keydown', (e) => {//закрытие при клике на Escape
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
  
        const modalTimerId = setTimeout(openModal, 4000); //открытие окна после 4 секунд

        //открытие модального окна при пролистывании страницы вниз до конца, сработает обработчик только один раз
        function showModalByScroll() {
            if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);//удаляем обработчик события, если уже 1 раз при скролле до конца страницы окно открывалось
            }
        }
        window.addEventListener('scroll', showModalByScroll);
    } 
    modal();   
    //=======================================================================================

    // Spollers
    /* 
    data-one-spoiler функция акордеона, может быть открыт только один спойлер из всех
    data-spoilers пустой атрибут вешаем на родителя, если надо вывести спойлеры, которые будут работать на любом разрешении экрана
    "button" data-spoiler вешаем пустой атрибут на кнопку заголовок открывания 
    data-spoilers="650,min" чтобы включался на экранах шире 650 
    data-spoilers="800,max" чтобы включался на экранах меньше 650
    */
    function spollers() {
        const spollersArray = document.querySelectorAll('[data-spollers]');
        if (spollersArray.length > 0) {
            // Получение обычных слойлеров
            const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            // Инициализация обычных слойлеров
            if (spollersRegular.length > 0) {
                initSpollers(spollersRegular);
            }

            // Получение слойлеров с медиа запросами
            const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
                return item.dataset.spollers.split(",")[0];
            });

            // Инициализация слойлеров с медиа запросами
            if (spollersMedia.length > 0) {
                const breakpointsArray = [];
                spollersMedia.forEach(item => {
                    const params = item.dataset.spollers;
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                });

            // Получаем уникальные брейкпоинты
            let mediaQueries = breakpointsArray.map(function (item) {
                return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
            });
            mediaQueries = mediaQueries.filter(function (item, index, self) {
                return self.indexOf(item) === index;
            });

            // Работаем с каждым брейкпоинтом
            mediaQueries.forEach(breakpoint => {
                const paramsArray = breakpoint.split(",");
                const mediaBreakpoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const matchMedia = window.matchMedia(paramsArray[0]);

                // Объекты с нужными условиями
                const spollersArray = breakpointsArray.filter(function (item) {
                    if (item.value === mediaBreakpoint && item.type === mediaType) {
                        return true;
                    }
                });
                // Событие
                matchMedia.addListener(function () {
                    initSpollers(spollersArray, matchMedia);
                });
                initSpollers(spollersArray, matchMedia);
            });
        }
        // Инициализация
        function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach(spollersBlock => {
                spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                if (matchMedia.matches || !matchMedia) {
                    spollersBlock.classList.add('init');
                    initSpollerBody(spollersBlock);
                    spollersBlock.addEventListener("click", setSpollerAction);
                } else {
                    spollersBlock.classList.remove('init');
                    initSpollerBody(spollersBlock, false);
                    spollersBlock.removeEventListener("click", setSpollerAction);
                }
            });
        }
        // Работа с контентом
        function initSpollerBody(spollersBlock, hideSpollerBody = true) {
            const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
            if (spollerTitles.length > 0) {
                spollerTitles.forEach(spollerTitle => {
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute('tabindex');
                        if (!spollerTitle.classList.contains('active')) {
                            spollerTitle.nextElementSibling.hidden = true;
                        }
                    } else {
                        spollerTitle.setAttribute('tabindex', '-1');
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                });
            }
        }
        function setSpollerAction(e) {
            const el = e.target;
            if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
                const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
                const spollersBlock = spollerTitle.closest('[data-spollers]');
                const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
                if (!spollersBlock.querySelectorAll('.slide').length) {
                    if (oneSpoller && !spollerTitle.classList.contains('active')) {
                        hideSpollersBody(spollersBlock);
                    }
                    spollerTitle.classList.toggle('active');
                    _slideToggle(spollerTitle.nextElementSibling, 500);
                }
                e.preventDefault();
            }
        }
        function hideSpollersBody(spollersBlock) {
            const spollerActiveTitle = spollersBlock.querySelector('[data-spoller].active');
            if (spollerActiveTitle) {
                spollerActiveTitle.classList.remove('active');
                _slideUp(spollerActiveTitle.nextElementSibling, 500);
            }
        }
        }
    }
    spollers();     
    //=======================================================================================

    // вспомогательные модули плавного открытия и закрытия обЪекта
    let _slideUp = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = true;
                target.style.removeProperty('height');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }
    }
    let _slideDown = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (target.hidden) {
                target.hidden = false;
            }
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            window.setTimeout(() => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }
    }
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) {
            return _slideDown(target, duration);
        } else {
            return _slideUp(target, duration);
        }
    }
    //=======================================================================================

    function popups() {
        const popupLinks = document.querySelectorAll('.popup-link');
          
        if (popupLinks.length > 0) {
            for (let index = 0; index < popupLinks.length; index++) {
                const popupLink = popupLinks[index];
                popupLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    const popupName = popupLink.getAttribute('href').replace('#', '');//убираем хеш и получаем чистое имя
                    const currentPopup = document.getElementById(popupName);
                    popupOpen(currentPopup);
                });
            }
        } 
    
        const popupCloseIcon = document.querySelectorAll('.close-popup');
        if (popupCloseIcon.length > 0) {
            for (let index = 0; index < popupCloseIcon.length; index++) {
                const el = popupCloseIcon[index];
                el.addEventListener('click', function(e) {
                    e.preventDefault();
                    //popupCloseIcon(el.closest('.popup'));
                    popupClose(el.closest('.popup'));//закрываем ближайшего родителя кнопки close-popup
                });
            }
        }
    
        function popupOpen(currentPopup) {
            if (currentPopup && bodyLockStatus) {
                const popupActive = document.querySelector('.popup.open');
                if (popupActive) {
                    popupClose(popupActive, false);
                } else {
                    bodyLock();
                }
                currentPopup.classList.add('open');
                currentPopup.addEventListener('click', (e) => {
                    if (!e.target.closest('.popup__content')) {//все, кроме темной области (если нет в родителях popup__content)
                        popupClose(e.target.closest('.popup'));
                    }
                });
            }
        }
    
        function popupClose(popupActive, doUnlock = true) {//doUnlock = true === чтобы не рахблокировался скролл, если открываем попап сразу после другого попапа
            if (bodyLockStatus) {
                popupActive.classList.remove('open');
                if (doUnlock) {
                    bodyUnlock();
                }
            }
        } 
    
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') {
                const popupActive = document.querySelector('.popup.open');
                popupClose(popupActive);
            }
        });
    }
    popups();
    
    
    //==============
    const body = document.querySelector('body'),
          lockPadding = document.querySelectorAll('.lock-padding');
    let bodyLockStatus = true;
    
    function bodyLock(delay = 500) {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = lockPaddingValue;   
            }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');
        
        bodyLockStatus = false;
        setTimeout(function() {
            bodyLockStatus = true;
        }, delay);
    }
    
    function bodyUnlock(delay = 500) {
        setTimeout(function() {
            if (lockPadding.length > 0) {
                for (let i = 0; i < lockPadding.length; i++) {
                    const el = lockPadding[i];
                    el.style.paddingRight = '0px';
                }
            }
            body.style.paddingRight = '0px';
            body.classList.remove('lock');
        }, delay);
    
        bodyLockStatus = false;
        setTimeout(function() {
            bodyLockStatus = true;
        }, bodyLockStatus);
    }
    


});