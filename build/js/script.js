// const arr = document.querySelector('.arrow');
// const treatment = document.querySelector('.treatment-wrapper').offsetTop;

new WOW().init();

// const smoothScrollTo = (function () {
// 	let timer, start, factor;
//
// 	return function (target, duration) {
// 		let offset = window.pageYOffset,
// 			delta  = target - window.pageYOffset; // Y-offset difference
// 		duration = duration || 1000;              // default 1 sec animation
// 		start = Date.now();                       // get start time
// 		factor = 0;
//
// 		if( timer ) {
// 			clearInterval(timer); // stop any running animation
// 		}
//
// 		function step() {
// 			let y;
// 			factor = (Date.now() - start) / duration; // get interpolation factor
// 			if( factor >= 1 ) {
// 				clearInterval(timer); // stop animation
// 				factor = 1;           // clip to max 1.0
// 			}
// 			y = factor * delta + offset;
// 			window.scrollBy(0, y - window.pageYOffset);
// 		}
//
// 		timer = setInterval(step, 10);
// 		return timer; // return the interval timer, so you can clear it elsewhere
// 	};
// }());
//
// arr.onclick = function() {
// 	smoothScrollTo(treatment)
// };

// const logo2 = document.querySelector('#logo2 path');
// console.log(logo2.getTotalLength());

/**
 * Accordion v1.0.0
 **/

const sliderArr = document.querySelectorAll('.slide');
const arrow = document.querySelector('.arrow');
const text = document.querySelector('.arrow p');
const bg = document.querySelector('.wrapper');

window.addEventListener('scroll', () => {
	if(window.pageYOffset > 50) {
		sliderArr.forEach((el) => {
			el.classList.add('hide');
			arrow.style.fill = '#000';
			text.style.display = 'none';
		})
	} else {
		sliderArr.forEach((el) => {
			el.classList.remove('hide');
			arrow.style.fill = '#fff';
			text.style.display = 'block';
		});
	}
});

window.addEventListener('scroll', () => {
	if (window.pageYOffset > 670) {
		bg.style.background = 'rgba(34, 34, 34, .8)'
	} else {
		bg.style.background = 'rgba(34, 34, 34, 0)'
	}
});

function Accordion (element, newSettings) {
	let accordion = this;
	let settings, classes;
	if (!newSettings) {
		settings = {
			hideAll: false,
			showAll: false,
			showFirst: false,
			panelId: null };
		classes = {
			container: '.accordion-container',
			panel: '.panel'
		}
	} else {
		settings = newSettings;
		classes = {
			container: element,
			panel: '.panel'
		}
	}

	accordion.settings = settings;
	accordion.classes = classes;

	const panels = document.querySelectorAll(accordion.classes.panel);

	panels.forEach(function (panel) {
		panel.addEventListener('click', function () {
			accordion.togglePanel(panel)
		})
	});

	this.togglePanel = function (panel) {
		panel.classList.toggle('active');
		let heading = panel.children[1];
		if (heading.style.maxHeight) {
			heading.style.maxHeight = null
		} else {
			heading.style.maxHeight = heading.scrollHeight + 'px'
		}
	};

	this.togglePanelById = function (id) {
		const panel = document.querySelectorAll('.panel')[id];
		accordion.togglePanel(panel)
	};

	this.showAll = function () {
		panels.forEach(function (panel) {
			panel.classList.add('active');
			let heading = panel.children[1];
			heading.style.maxHeight = heading.scrollHeight + 'px'
		})
	};

	this.hideAll = function () {
		panels.forEach(function (panel) {
			panel.classList.remove('active');
			let heading = panel.children[1];
			heading.style.maxHeight = null
		})
	};

	if (accordion.settings.showAll) accordion.showAll();
	if (accordion.settings.hideAll) accordion.hideAll();
	if (accordion.settings.showFirst) accordion.togglePanelById(parseInt(accordion.settings.panelId))
};

const accordion = new Accordion('.accordion-container');

$(document).ready(function(){
	$('.carousel').slick({
		arrows: false,
		dots: false,
		infinite: true,
		speed: 1500,
		fade: true,
		autoplay: true,
		autoplaySpeed: 5000,
		cssEase: 'linear'
	});
});

// NAVIGATOR

let w = window.innerWidth,
	h = window.innerHeight,
	canvas = document.getElementById('bubble'),
	ctx = canvas.getContext('2d'),
	rate = 60,
	arc = 100,
	time,
	count,
	size = 7,
	speed = 20,
	lights = new Array,
	colors = ['#d59254','#ffffff','#1f2839','#cf7693'];

canvas.setAttribute('width',w);
canvas.setAttribute('height',h);

function init() {
	time = 0;
	count = 0;

	for(let i = 0; i < arc; i++) {
		lights[i] = {
			x: Math.ceil(Math.random() * w),
			y: Math.ceil(Math.random() * h),
			toX: Math.random() * 5 + 1,
			toY: Math.random() * 5 + 1,
			c: colors[Math.floor(Math.random()*colors.length)],
			size: Math.random() * size
		}
	}
}

function bubble() {
	ctx.clearRect(0,0,w,h);

	for(let i = 0; i < arc; i++) {
		let li = lights[i];

		ctx.beginPath();
		ctx.arc(li.x,li.y,li.size,0,Math.PI*2,false);
		ctx.fillStyle = li.c;
		ctx.fill();

		li.x = li.x + li.toX * (time * 0.02);
		li.y = li.y + li.toY * (time * 0.02);

		if(li.x > w) { li.x = 0; }
		if(li.y > h) { li.y = 0; }
		if(li.x < 0) { li.x = w; }
		if(li.y < 0) { li.y = h; }
	}
	if(time < speed) {
		time++;
	}
	timerID = setTimeout(bubble,1000/rate);
}
init();
bubble();

const animation = 'easeOutCubic';
const delay = 60;

$(document)
	.on('click', '.fa-bars', function(){
		let i = 0;
		$('nav').before($('#bubble'));
		$('#bubble').fadeIn();
		$('#mainnav').find('li').each(function(){
			let that = $(this);
			i++;
			(function(i, that){
				setTimeout(function(){
					that
						.animate(
							{ 'left'   : '25px' },
							{ duration : 350,
								easing   : animation })
						.fadeIn({queue: false});
				}, delay * i)
			}(i, that))
		});
		$('.fa-bars').fadeOut(100,function(){
			$(this)
				.removeClass('fa-bars')
				.addClass('fa-times')
				.fadeIn();
		});
	})
	.on('click', '#bubble, .fa-times', function(){
		$('#bubble').fadeOut();
		$('#mainnav').find('li')
			.animate(
				{ 'left'   : '-550px' },
				{ duration : 250 })
			.fadeOut({queue: false});

		$('.hamb').fadeOut(100, function(){
			$(this)
				.find($('i'))
				.removeClass('fa-times')
				.addClass('fa-bars')
				.end()
				.fadeIn();
		});
	});