"use strict";

/**
 * Get data from the server and render the new tab
 * Получение данных с сервера и рендер вкладки
 *
 */
var changeTab = (function () {
    var arrNavLinks = document.querySelectorAll('.nav__btn');
    var nav = document.querySelector('.nav');
    var arrTab = document.querySelectorAll('.tab');
    var top = document.querySelector('main').offsetTop;
    var footerList = document.querySelector('.footer__list');

    return {
        'init': function () {
            this.quadroBtn();
            this.footerBtn();
            this.navBtn();
        },
        // Toggle of the tab if client clicks the nav panel
        'navBtn': function () {
            nav.addEventListener('mouseup', function (e) {
                changeTab.removeActiveClass();

                if (e.target.closest('.nav__btn')) {
                    var target = '.' + e.target.getAttribute('attr-tab');
                    e.target.classList.add('nav__btn--active');
                    document.querySelector(target).classList.add('tab--active');
                    var attr = e.target.getAttribute('attr-tab');
                    changeTab.hideSlider();
                    // Get AJAX request for the data
                    sendAJAX.init(attr, true);

                    scrollTo(e.target, document.querySelector('main'), 800)
                }
            })
        },

        // Toggle of the tab if client clicks the nav panel
        'footerBtn': function () {
            footerList.addEventListener('mouseup', function (e) {
                if (e.target.closest('.footer__link')) {
                    changeTab.removeActiveClass();
                    var name = '.' + e.target.closest('.footer__link').getAttribute('data-tab');
                    var attr = e.target.closest('.footer__link').getAttribute('data-tab');
                    console.log(document.querySelector('[attr-tab=' + attr + ']'));
                    for (var i = 0; i < arrTab.length; i++) {
                        arrTab[i].classList.remove('tab--active');
                    }
                    document.querySelector('[attr-tab=' + attr + ']').classList.add('nav__btn--active');
                    document.querySelector(name).classList.add('tab--active');
                    changeTab.hideSlider();
                    sendAJAX.init(attr, true);
                    scrollTo(e.target, document.querySelector('header'), 700)
                }
            })
        },
        'quadroBtn': function () {
            var flavoursLink = document.querySelector('#quadro__flavours');
            var flowersLink = document.querySelector('#quadro__flowers');

            flavoursLink.addEventListener('mouseup', function () {
                for (var i = 0; i < arrTab.length; i++) {
                    arrTab[i].classList.remove('tab--active');
                }
                flavoursLink.classList.add('tab--active');
                window.scrollTo(0, top)
            })
            flowersLink.addEventListener('mouseup', function () {
                let toFlowers = document.querySelector('#about').offsetTop;
                window.scrollTo(0, toFlowers)
            })
        },
        removeActiveClass: function () {
            for (var i = 0; i < arrTab.length; i++) {
                arrTab[i].classList.remove('tab--active');
            }

            for (var i = 0; i < arrNavLinks.length; i++) {
                arrNavLinks[i].classList.remove('nav__btn--active');
            }
        },
        hideSlider: function () {
            document.querySelector('.slider').classList.add('slider--hidden');
        }
    }
})();

/**
 * Send AJAX and get data from the server
 * @gen - if gen === true, generate new items for the grid from data
 */

var sendAJAX = (function () {
    return {
        'init': function (dest, gen) {
            if (dest === 'about') return;

            var xhr = new XMLHttpRequest();
            xhr.open('get', '/index/get' + dest, true);
            xhr.send();
            xhr.onload = function () {
                if (xhr.readyState != 4) return;
                if (xhr.status !== 200) {
                    console.log('Ответ не получен!');
                    var error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                } else {
                    if (gen) {
                        generateItem.init(xhr.response, dest);
                    }
                    return xhr;
                }
            }
            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };
        }
    }
})();

/**
 * Generate new item for the grid:
 * li.grid__item
 * * a(href=item[2]).grid__wrap
 * * * p.grid__title #{item.title}
 * * * a(href=item.link).btn.grid__more Смотреть
 */

var generateItem = (function () {
    if (!document.querySelector('.grid__list')) return;

    return {
        'init': function (xhr, target) {
            var currentList = document.querySelectorAll('.grid__list');
            for (var i = 0; i < currentList.length; i++) {
                if (currentList[i].closest('.tab--active')) {
                    currentList = currentList[i];
                }
            }
            if (currentList.firstChild) return;
            var resp = JSON.parse(xhr);
            var arrImg = [];
            for (var i = 0; i < resp.length; i++) {

                var current = resp[i];
                var gridList = document.querySelector('.' + target + ' .grid__list');
                var gridItem = document.createElement('li');
                var gridTitle = document.createElement('p');
                var gridWrap = document.createElement('button');
                var gridBtn = document.createElement('button');

                gridWrap.type = 'button';
                gridWrap.setAttribute('data-name', current.name);
                gridBtn.type = 'button'

                gridItem.classList.add('grid__item');
                gridWrap.classList.add('grid__wrap');
                gridTitle.classList.add('grid__title');
                gridBtn.classList.add('grid__more');
                gridBtn.classList.add('btn');

                gridItem.style.backgroundImage = 'url(' + current.ava + ')';

                gridTitle.innerHTML = current.title;
                gridBtn.innerHTML = 'Смотреть';

                gridItem.appendChild(gridWrap);
                gridWrap.appendChild(gridTitle);
                gridWrap.appendChild(gridBtn);
                gridList.appendChild(gridItem);

                // Create preloader from data
                arrImg.push(current.ava)

                // Create items for address section from data
                if (document.querySelector('.address__list').closest('.tab--active')) {
                    var addressLi = document.createElement('li');
                    var addressLink = document.createElement('a');

                    addressLi.classList.add('address__item');
                    addressLink.classList.add('address__link')

                    addressLink.href = current.link;
                    addressLink.innerHTML = current.address;
                    addressLink.setAttribute('data-name', current.name);
                    addressLi.appendChild(addressLink);
                    document.querySelector('.address__list').appendChild(addressLi);

                }
            }
            preloaderIMG.init(arrImg);
        },
    }
})();

/**
 * Preloader for images
 */

var preloaderIMG = (function () {
    var divArr = document.querySelectorAll('.grid__item');
    return {
        'init': function (args) {
            (!args) ? this.index(divArr) : this.other(args);
        },
        'index': function (args) {
            var countLoad = 0;
            var countDiv = 0;
            var div = document.createElement('div');
            div.innerHTML = '0%'
            div.classList.add('preloader');
            document.querySelector('.tab--active').appendChild(div);

            for (var i = 0; i < args.length; i++) {
                if (args[i].style.backgroundImage) {
                    countDiv++;
                    var img = new Image;
                    img.src = args[i].style.backgroundImage.slice(5, -2);

                    img.addEventListener('load', function () {
                        countLoad++;
                        div.innerHTML = Math.floor(100 / countDiv * countLoad) + "%..."
                        div.style.opacity = 1.3 - countLoad / countDiv;
                        if (countLoad === countDiv) {
                            div.remove();
                        }
                    })
                }
            }
        },
        'other': function (args) {
            var count = 0;
            var div = document.createElement('div');
            div.classList.add('preloader');
            document.querySelector('.tab--active').appendChild(div);
            div.innerHTML = '0%'
            setTimeout(function () {
                div.remove();
            }, 10000)

            for (var i = 0; i < args.length; i++) {
                var img = new Image;
                img.src = args[i]
                img.addEventListener('load', function () {
                    count++;
                    div.innerHTML = Math.floor(100 / args.length * count) + "%..."
                    div.style.opacity = 1.3 - count / args.length;
                    if (count === args.length) {
                        div.remove();
                    }
                })
            }
        }
    }
})();
preloaderIMG.init()
/**
 * Fix the navigation panel
 *
 */


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

/**
 * Slider in the main page
 *
 */
var sliderRun = (function () {
    if (!document.querySelector('.slider')) {
        return
    }

    return {
        "init": function () {
            var slider = document.querySelector(".slider");
            var left = document.querySelector(".left");
            var right = document.querySelector(".right");
            var img = document.querySelectorAll(".slider__img");
            var list = document.querySelector('.slider__list');
            var body = document.querySelector("body");
            var count = 0;

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
                var percent = count * -100;
                list.style.transform = 'translate(' + percent + 'vw, 0)';
            })
        }
    }
})();
//
// if (document.querySelector('.slider')) {
//     slider.init();
// }

/**
 * Render the map on the page
 */
var mapShow = (function () {
    if (document.querySelector('.shop_map')) return;
    return {
        'init': function (title) {
            var map;
            var myPlacemark;
            var x = document.querySelector('.shop__map').getAttribute('data-loc-x');
            var y = document.querySelector('.shop__map').getAttribute('data-loc-y');
            ymaps.ready(function () {
                var map = new ymaps.Map("map", {
                    center: [x, y],
                    zoom: 15
                });
                myPlacemark = new ymaps.Placemark([x, y], {
                    hintContent: title,
                    balloonContent: title
                }, {
                    preset: 'islands#governmentCircleIcon',
                    iconColor: 'red'

                });
                map.geoObjects.add(myPlacemark);
            })
        }
    }
})()

if (document.querySelector('.nav')) {
    changeTab.init();
    fixNav.init();
}
/**
 * The function for admin panel
 *
 */

var adminDeleteImg = (function () {
    if (!document.querySelector('.admin')) {
        return;
    }
    var preview = document.querySelector('.preview');

    return {
        init: function () {

            preview.addEventListener('mouseup', function (e) {
                if (e.target.closest('.box__delete')) {
                    var link = e.target.closest('.box__delete').getAttribute('data-link');
                    var category = e.target.closest('.box__delete').getAttribute('data-category');
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', '/admin/remove?link=' + link + '&category=' + category, false);
                    xhr.send();
                    xhr.onload = function () {
                        if (xhr.status === 4) return;
                        if (xhr.status != 200) {
                            console.log('Ответ не получен!');
                            var error = new Error(this.statusText);
                            error.code = this.status;
                            reject(error);
                        } else {
                            console.log(xhr.responseText);
                        }
                    }

                    xhr.onerror = function () {
                        reject(new Error("Network Error"));
                    };
                }
            })
        }
    }
})()
if (document.querySelector('.admin')) {
    adminDeleteImg.init()
}


/**
 *  Generate slider from data
 *
 */

var sliderRender = (function () {
    if (!document.querySelector('.slider--hidden')) return;
    if (document.querySelector('.shops').className === 'tab--active' || document.querySelector('.about').className === 'tab--active') {
        return;
    }
    var slider = document.querySelector('.slider--hidden');
    var main = document.querySelector('main');
    return {
        'init': function () {
            main.addEventListener('mouseup', function (e) {
                if (e.target.closest('.grid__wrap') && e.target.closest('.tab--active').getAttribute('data-title') !== 'shops') {
                    var current = e.target.closest('.grid__wrap').getAttribute('data-name');
                    var title = e.target.closest('.tab--active').getAttribute('data-title');
                    sliderRender.getData(current, title);
                }
            })
        },
        'getData': function (name, title) {
            new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('get', '/index/get' + title, true);
                xhr.send();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState != 4) return;
                    if (xhr.status !== 200) {
                        console.log('Ответ не получен!');
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    } else {
                        var result = [xhr.response, name, title];
                        resolve(result);
                    }
                }
                xhr.onerror = function () {
                    reject(new Error("Network Error"));
                };
            }).then(function (res) {
                for (var item of JSON.parse(res[0])) {
                    if (item.name === res[1]) {
                        sliderRender.render(item);
                    }
                }
            })
        },
        'render': function (item) {
            if (document.querySelector('.slider__list')) {
                document.querySelector('.slider__list').remove();
            }
            slider.classList.remove('slider--hidden');
            slider.classList.add('slider');
            var list = document.createElement('ul');
            list.classList.add('slider__list');

            for (var i = 0; i < item.list.length; i++) {
                var li = document.createElement('li');
                var img = document.createElement('img');

                li.classList.add('slider__item');
                img.classList.add('slider__img');

                img.src = item.list[i];

                li.appendChild(img);
                list.appendChild(li);
            }
            document.querySelector('.slider__wrap').appendChild(list);
            scrollTo(document.body, document.querySelector('.slider').offsetTop - 100, 700)
            sliderRun.init();
        }
    }
})();
if (document.querySelector('.slider--hidden')) {
    sliderRender.init();
}

var getAuth = (function () {
    if (!document.querySelector('.footer__key')) return;
    var key = document.querySelector('.footer__key');
    var popup = document.querySelector('.auth');
    var exit = document.querySelector('.auth__exit');
    var enter = document.querySelector('.auth__btn');
    var password = document.querySelector('.auth__input');
    return {
        'init': function () {
            key.addEventListener('click', function (e) {
                e.preventDefault();
                popup.style.display = 'block';
                popup.classList.add('auth--show')
                enter.addEventListener('click', function (e) {
                    e.preventDefault();
                    var xhr = new XMLHttpRequest();
                    xhr.open('post', '/getauth', true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    var req = {"pass": password.value}.toJSON;
                    xhr.send(JSON.stringify({"pass": password.value}));
                    xhr.onreadystatechange = function () {
                        if (xhr.status === 4) return;
                        if (xhr.status !== 200) {
                            console.log('Ответ не получен!');
                            var error = new Error(this.statusText);
                            error.code = this.status;
                            reject(error);
                        } else {
                            console.log('success');
                        }
                    }
                    xhr.onerror = function () {
                        reject(new Error("Network Error"));
                    };
                })
            });
            exit.addEventListener('mouseup', function (e) {
                popup.classList.remove('auth--show');
                setTimeout(function () {
                    popup.style.display = 'none';
                }, 1000)
            })
        }
    }
})();

if (document.querySelector('.footer__key')) {
    getAuth.init();
}

var targetShopShow = (function () {
    return {
        'init': function () {
            document.querySelector('main').addEventListener('mouseup', function (e) {
                if (e.target.closest('.shops') && e.target.closest('.grid__item')) {
                    var data = e.target.closest('.grid__item').firstChild.getAttribute('data-name');
                    targetShopShow.getData(data);
                }
            })
            document.querySelector('.address').addEventListener('click', function (e) {
                e.preventDefault();
                if (e.target.closest('.address__link')) {
                    var data = e.target.closest('.address__link').getAttribute('data-name');
                    targetShopShow.getData(data);
                }
            })
        },
        'getData': function (data) {
            new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('get', '/getshops', true);
                xhr.send();
                xhr.onload = function () {
                    if (xhr.status === 4) return;
                    if (xhr.status !== 200) {
                        console.log('Ответ не получен!');
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    } else {
                        var result = [JSON.parse(xhr.response), data]
                        resolve(result);
                    }
                }
                xhr.onerror = function () {
                    reject(new Error("Network Error"));
                };
            }).then(function (data) {
                targetShopShow.findShop(data);
            })
        },
        'findShop': function (data) {
            for (var item of data[0]) {
                // console.log(item)
                if (item.name === data[1]) {
                    targetShopShow.render(item);
                }
            }
        },
        'render': function (shop) {
            var popup = document.querySelector('.target__shop');
            var map = document.querySelector('.shop__map');
            map.remove();

            document.querySelector('.shop__title').innerHTML = shop.title;
            document.querySelector('.shop__img').src = shop.ava;
            document.querySelector('.shop__img').setAttribute('alt', shop.name);
            document.querySelector('.shop__address').innerHTML = 'Мы находимся: ' + shop.address;
            document.querySelector('.shop__phone').innerHTML = 'Наш телефон: ' + shop.phone;
            document.querySelector('.shop__phone').href = shop.phone_link;
            document.querySelector('.shop__time').innerHTML = shop.time;
            document.querySelector('.shop__desc').innerHTML = shop.description;

            map = document.createElement('div');
            map.setAttribute('id', 'map');
            map.classList.add('shop__map');

            var x = map.setAttribute('data-loc-x', shop.coord_x);
            var y = map.setAttribute('data-loc-y', shop.coord_y);

            document.querySelector('.shop__content').appendChild(map);
            var title = shop.title + ', ' + shop.address;
            mapShow.init(title);

            popup.style.display = 'block';
            popup.style.position = 'fixed';

            setTimeout(function () {
                popup.style.opacity = 1;
            }, 500)

            targetShopShow.close();
        },
        'close': function () {
            document.querySelector('.shop__close').addEventListener('click', function (e) {
                var popup = document.querySelector('.target__shop');
                popup.style.opacity = 0;
                setTimeout(function () {
                    popup.style.display = 'none';
                }, 500)
            })
            // document.querySelector('main').addEventListener('mouseup', function (e) {
            //     if (!e.target.closest('.target__shop')) {
            //         var popup = document.querySelector('.target__shop');
            //         popup.style.opacity = 0;
            //         setTimeout(function () {
            //             popup.style.display = 'none';
            //         }, 500)
            //     }
            // })
        }
    }
})();

if (document.querySelector('.shops')) {
    targetShopShow.init();
}

function scrollTo(element, to, duration) {
    if (!element || !to || duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function () {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

var sendMessage = (function () {
    if (!document.querySelector('.contacts__form')) return;
    return {
        'init': function () {
            var btn     = document.querySelector('.contacts__send');
            btn.addEventListener('click', function (e) {
                var form    = document.querySelector('.contacts__form');
                var name    = document.querySelector('.contacts__name').value;
                var mail    = document.querySelector('.contacts__mail').value;
                var message = document.querySelector('.contacts__text').value;
                if (!name || !mail || !message) {
                    sendMessage.createMessage('Заполните все поля!');
                } else {
                    sendMessage.getData(name, mail, message);
                }
            })
        },
        'getData': function (name, mail, message) {
            new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest;
                xhr.open('get', '/sendmessage', true);
                xhr.send();
                xhr.onload = function () {
                    if (xhr.status === 4) return;
                    if (xhr.status !== 200) {
                        console.log('Ответ не получен!');
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    } else {

                        resolve(xhr.responseText);
                    }
                }
                xhr.onerror = function () {
                    reject(new Error("Network Error"));
                };
            }).then(function (text) {
                sendMessage.createMessage(text);
            })
        },
        'createMessage' : function (text) {
            var div = document.createElement('div');
            div.classList.add('message');
            div.innerHTML = text;
            document.querySelector('.contacts__form').appendChild(div);
            setTimeout(function () {
                div.style.opacity = 0;
            }, 1000)
            setTimeout(function () {
                div.remove();
            }, 2000)
        }
    }
})();
if (document.querySelector('.contacts__form')) sendMessage.init();
