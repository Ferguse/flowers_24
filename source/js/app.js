"use strict";

var changeTab = (function () {
    var arrNavLinks = document.querySelectorAll('.nav__btn');
    var arrTab = document.querySelectorAll('.tab');
    return {
        'init': function () {
            document.querySelector('.nav').addEventListener('mouseup', function (e) {
                for (var i = 0; i < arrTab.length; i++) {
                    arrTab[i].classList.remove('tab--active');
                }
                for (var i = 0; i < arrNavLinks.length; i++) {
                    arrNavLinks[i].classList.remove('nav__btn--active');
                }
                for (var i = 0; i < arrNavLinks.length; i++) {
                    if (e.target === arrNavLinks[i]) {
                        var target = '.' + e.target.getAttribute('attr-tab');
                        arrNavLinks[i].classList.add('nav__btn--active')
                        document.querySelector(target).classList.add('tab--active');
                        // window.pageYOffset = '0';
                    }
                }
            })
        }
    }
})();


var fixNav = (function () {
    if (!document.querySelector('.nav')) {
        return
    }
    var navTop = +document.querySelector('.nav').offsetTop;
    var nav = document.querySelector('.nav');
    return {
        'init': function () {
            window.onscroll = function () {
                var documentTop = +window.pageYOffset;
                if (documentTop >= navTop) {
                    nav.classList.add('nav--fixed');
                } else {
                    nav.classList.remove('nav--fixed');
                }
            }
        }
    }
})();

//========== SLIDER START ==================
var slider = (function () {
    if (!document.querySelector('.slider')) {
        return
    }
    var slider = document.querySelector(".slider");
    var left = document.querySelector(".left");
    var right = document.querySelector(".right");
    var img = document.querySelectorAll(".slider__img");
    var list = document.querySelector('.slider__list');
    var body = document.querySelector("body");
    var count = 0;
    return {
        "init": function () {
            for (var i = 0; i < img.length; i++) {
                var rand = Math.random() * 10;
                if ((i % 2) === 0) {
                    img[i].style.transform = 'rotate(' + rand + 'deg)';
                } else {
                    img[i].style.transform = 'rotate(-' + rand + 'deg)';
                }
            }
            slider.addEventListener('mouseover', function (e) {
                left.style.left = '5%';
                right.style.right = '5%';
            })
            slider.addEventListener('mouseleave', function (e) {
                left.style.left = '-5%';
                right.style.right = '-5%';
            })
            slider.addEventListener("mouseup", function (e) {
                e.preventDefault();
                if (e.target === left) {
                    count--;
                } else if (e.target === right) {
                    count++;
                }
                if (count >= (img.length)) {
                    count = 0;
                } else if (count < 0) {
                    count = img.length - 1;
                }
                var width = 0;
                console.log(width);
                var percent = count * -100;
                list.style.transform = 'translate(' + percent + 'vw, 0)';
            })
        }
    }
})();

if (document.querySelector('.slider')) {
    slider.init();
}

//========== SLIDER END =======================
//========== HOVER EFFECT START ===============
var hoverItem = (function () {
    if (!document.querySelector('.grid')) {
        return
    }
    var description = document.querySelectorAll('.grid__description');
    var items = document.querySelectorAll('.grid__item');
    var grid = document.querySelector('.grid');
    return {
        'init': function () {
            for (var j = 0; j < description.length; j++) {
                description[j].style.background = 'rgba(0,0,0,.4)';
            }
            document.body.addEventListener('mouseover', function (e) {
                for (var i = 0; i < items.length; i++) {
                    items[i].classList.remove('grid__item__hover');
                }
                if (e.target.closest('.grid__item')) {
                    e.target.closest('.grid__item').classList.add('grid__item__hover');
                    for (var j = 0; j < description.length; j++) {
                        if (e.target.closest('.grid__item') === description[j].closest('.grid__item')) {
                            description[j].style.background = 'linear-gradient(to top, transparent 20%, rgba(0,0,0,.4))';
                            description[j].style.backgroundSize = '120%';
                        } else {
                            description[j].style.background = 'rgba(0,0,0,.4)';
                            description[j].style.backgroundSize = '100%';
                        }
                    }
                }
            })
        }
    }
})()
if (document.querySelector('.grid')) {
    hoverItem.init();
}
//========== HOVER EFFECT END ===============
//========== MAP  START =====================
var mapShow = (function () {
    return {
        'init': function (x, y) {
            var map;
            var myPlacemark;
            var x = document.querySelector('#map').getAttribute('attr-loc-x');
            var y = document.querySelector('#map').getAttribute('attr-loc-y');
            ymaps.ready(function () {
                var map = new ymaps.Map("map", {
                    center: [x, y],
                    zoom: 15
                });
                myPlacemark = new ymaps.Placemark([x, y], {
                    hintContent: 'Цветы 24 на Полежаева',
                    balloonContent: 'Цветы 24, ул. Полежаева, д. 46'
                }, {
                    preset: 'islands#governmentCircleIcon',
                    iconColor: 'red'

                });
                map.geoObjects.add(myPlacemark);
            })
        }
    }
})()
if (document.querySelector('#map')) {
    mapShow.init();
}
//========== MAP END ========================

if (document.querySelector('.nav')) {
    changeTab.init();
    fixNav.init();
}

var adminDeleteImg = (function () {
    if(!document.querySelector('.admin')) { return; }
    var preview     = document.querySelector('.preview');

   return {
       init: function () {

            preview.addEventListener('mouseup', function(e) {
                if (e.target.closest('.box__delete')) {
                    var link = e.target.closest('.box__delete').getAttribute('data-link');
                    var category = e.target.closest('.box__delete').getAttribute('data-category');
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', '/admin/remove?link=' + link + '&category=' + category, false);
                    xhr.send();
                    if (xhr.status != 200) {
                        alert (xhr.status + ':' + xhr.statusText)
                    } else {
                        console.log(xhr.responseText);
                    }

                }
            })
       }
   }
})()
if(document.querySelector('.admin')) { adminDeleteImg.init() }


