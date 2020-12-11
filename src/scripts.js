/* eslint-disable */
import $ from 'jquery';
import '@fancyapps/fancybox';
import 'jquery-mask-plugin';
import AOS from 'aos';
import Swiper from 'swiper';
import 'jquery-parallax.js';
import Typed from 'typed.js';
import { CountUp } from 'countup.js/dist/countUp';

window.$ = $;
window.jQuery = $;

AOS.init({
	offset: 50
});

// scrollto and menu
$(() => {
	$('.header__menu__links a, .footer__menu__links a, a.links_scroll').on('click', function () {
		$('#headerMenu').removeClass('open').addClass('hide');
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 130
		}, 2000);
	});

	$('[scrollto]').on('click', function (e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $($(this).attr('scrollto')).offset().top - 130
		}, 2000);

		return;
	});
});

// fix header
$(() => {
	if(window.matchMedia("max-width: 991px").matches) {
		$(window).on('scroll', function (e) {
			if (window.pageYOffset !== 0) {
				$('.header').addClass('fixed');
			} else {
				$('.header').removeClass('fixed');
			}
			
		});
	}
});

$(() => {
	$('#openMenu').on('click', function (e) {
		e.preventDefault();
		$('#headerMenu').removeClass('hide').addClass('open');
	})
	$('#cross').on('click', function (e) {
		e.preventDefault();
		$('#headerMenu').removeClass('open').addClass('hide');
	})
});

// cards
$(() => {
	$(window).on('scroll', function (e) {
		if (window.pageYOffset !== 0) {
			const coff = window.pageYOffset * 0.001;
			$('.block-start_advantagers li a').removeClass('active');
			$('.block-start_advantagers li:nth-child(1) a').addClass('active');
			$('.card.top').css({transform: `translateZ(calc(var(--cardZInc)*${(5 + coff) * 1.4}))`}).addClass('animating');
			$('.card.mid-top').css({transform: `translateZ(calc(var(--cardZInc)*${(4 + coff) * 1.3}))`}).addClass('animating');
			$('.card.mid-mid').css({transform: `translateZ(calc(var(--cardZInc)*${(3 + coff) * 1.2}))`}).addClass('animating');
			$('.card.mid-bottom').css({transform: `translateZ(calc(var(--cardZInc)*${(2 + coff * 1.1)}))`}).addClass('animating');
			$('.card.bottom').addClass('animating');
		} else {
			$('.card.top').css({transform: `translateZ(calc(var(--cardZInc)*5))`}).removeClass('animating');
			$('.card.mid-top').css({transform: `translateZ(calc(var(--cardZInc)*4))`}).removeClass('animating');
			$('.card.mid-mid').css({transform: `translateZ(calc(var(--cardZInc)*3))`}).removeClass('animating');
			$('.card.mid-bottom').css({transform: `translateZ(calc(var(--cardZInc)*2))`}).removeClass('animating');
			$('.card.bottom').removeClass('animating');
		}
		
	});

	function getIndexCardElem(index) {
		const cardElems = $('.block-start .cards .card');
		let cardIndex = null;

		if ($(cardElems[index]).hasClass('top')) cardIndex = 4;
		if ($(cardElems[index]).hasClass('mid-top')) cardIndex = 3;
		if ($(cardElems[index]).hasClass('mid-mid')) cardIndex = 2;
		if ($(cardElems[index]).hasClass('mid-bottom')) cardIndex = 1;
		if ($(cardElems[index]).hasClass('bottom')) cardIndex = 0;

		return cardIndex;
	}

	const intervalAutoplay = setInterval(() => {
		const curActive = $('.block-start_advantagers a.active').parents('li');
		const nextActive = curActive.next();
		const count = $('.block-start_advantagers li').length;

		if (curActive.index() !== count - 1) {
			nextActive.find('a').trigger('click', { autoplay: true });
		} else {
			$('.block-start_advantagers li:first-child a').trigger('click', { autoplay: true });
		}
	}, 3000);
	
	$('.block-start_advantagers a').on('click', function(e, params) {
		if (params === undefined) {
			clearInterval(intervalAutoplay);
		}
		e.preventDefault();
		$('.block-start_advantagers a').removeClass('active');
		$(this).addClass('active');
		const cardElems = $('.block-start .cards .card');
		const index = $(this).parent('li').index();
		const cardIndex = getIndexCardElem(index);

		cardElems.removeAttr('style');
		$(cardElems[index]).css('transform', `translateZ(calc(var(--cardZInc) * ${cardIndex + 1})) translateY(415px)`);
		setTimeout(() => { $(cardElems[index]).css('transform', `translateZ(calc(var(--cardZInc) * 5)) translateY(415px)`); }, 300);
		setTimeout(() => {
			cardElems.each(function(i, elem) {
				if(i !== index && !$(elem).hasClass('shadow')) {
					if(i > index) {
						$(elem).css('transform', `translateZ(calc(var(--cardZInc) * ${getIndexCardElem(i) + 1}))`);
					} else {
						$(elem).css('transform', `translateZ(calc(var(--cardZInc) * ${getIndexCardElem(i)}))`);
					}
				}
			});
		}, 600);
		setTimeout(() => { $(cardElems[index]).css('transform', `translateZ(calc(var(--cardZInc) * 5))`); }, 900);

		return;
	});
});

// slider mockups
$(() => {
	const swiperMockups = new Swiper('.block-solution__slider .swiper-container', {
		direction: 'vertical'
	});

	const autoplayInterval = setInterval(() => {
		const curActive = $('.block-solution_nav li a.active').parents('li');
		const nextActive = curActive.next();
		const countElems = $('.block-solution_nav li').length;

		if (curActive.index() !== countElems - 1) {
			nextActive.find('a').trigger('click', { autoplay: true });
		} else {
			$('.block-solution_nav li:first-child a').trigger('click', { autoplay: true });
		}
	}, 5000);
	
	$('.block-solution_nav a').on('click', function (e, params) {
		if (params === undefined) {
			clearInterval(autoplayInterval);
		}
		e.preventDefault();
		const slide = +$(this).data('slide');
		const text = $(this).data('text');
		$('.block-solution_nav a').removeClass('active');
		$(this).addClass('active');
		swiperMockups.forEach(function (swiperItem) {
			swiperItem.slideTo(slide);
		});
		$('.block-solution_text').text(text);
		return false;
	});
});

// slider results
$(() => {
	const swiperImages = new Swiper('.block-results__slider__image .swiper-container', {
		pagination: {
			el: '.block-results__slider__image .swiper-pagination',
			clickable: true,
		},
		// autoplay: {
		// 	delay: 5000,
		// }
	});
	const swiperMain = new Swiper('.block-results__slider .swiper-container', {
		init: false,
		// autoplay: {
		// 	delay: 5000,
		// }
	});
	
	swiperMain.on('slideChange', function () {
		const active = this.activeIndex;
		const containElem = $('.block-results__slider__slide__statistic__column.after');
		containElem.find('span').each(function () {
			const value = +$(this).data('count');
			const postfix = $(this).data('postfix');
			const widthElem = 100;//value / maxValue * 100;
			const statElem = $(this);
			statElem.css({width: '0%', transition: 'none'});
			const counter = new CountUp(statElem[0], value, {
				duration: 3,
				separator: '',
				suffix: postfix
			});
			counter.start();
			setTimeout(() => {
				$(this).css({width: `${widthElem}%`, transition: 'ease-in .5s'});
			}, 500);
		});
		swiperImages.slideTo(active, 600);
	});
	swiperMain.on('init', function () {
		const active = this.activeIndex;
		const containElemBefore = $('.block-results__slider__slide__statistic__column.before');
		const containElem = $('.block-results__slider__slide__statistic__column.after');
		containElem.find('span').each(function (i) {
			const beforeValue = +$(containElemBefore.find('span')[i]).data('count');
			const value = +$(this).data('count');
			const maxValue = beforeValue < value ? value : beforeValue;
			const postfix = $(this).data('postfix');
			const widthElem = {
				before: beforeValue / maxValue * 100,
				after: value / maxValue * 100
			};
			const statElemBefore = containElemBefore.find('span')[i];
			const statElem = $(this);
			statElemBefore.css({width: '0%', transition: 'none'});
			statElem.css({width: '0%', transition: 'none'});
			const counterBefore = new CountUp(statElemBefore[0], beforeValue, {
				duration: 3,
				separator: '',
				suffix: postfix
			});
			const counter = new CountUp(statElem[0], value, {
				duration: 3,
				separator: '',
				suffix: postfix
			});
			counter.start();
			setTimeout(() => {
				$(this).css({width: `${widthElem}%`, transition: 'ease-in .5s'});
			}, 500);
		});
		swiperImages.slideTo(active, 600);
	});
	
	swiperImages.on('slideChange', function () {
		const active = this.activeIndex;
		swiperMain.slideTo(active, 600);
	});
	
	swiperMain.init();
});

// writing text
$(() => {
	new Typed('.block-start_title-2 span', {
		strings: ['Для любого сайта', 'С любого устройства', 'Из любой точки мира'],
		loop: true,
		typeSpeed: 30,
		backSpeed: 15,
		backDelay: 2000,
		startDelay: 500,
	});
});