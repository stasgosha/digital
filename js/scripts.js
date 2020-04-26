document.addEventListener('DOMContentLoaded', function(){

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-prev" aria-label="Предидущие"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 11"><path d="M5.43 10.66c.47.45 1.23.45 1.7 0 .5-.46.5-1.22 0-1.68l-3.26-3.1-.17-.38.17-.39 3.26-3.09c.5-.46.5-1.22 0-1.68a1.25 1.25 0 00-1.7 0L.87 4.66a1.15 1.15 0 000 1.68l4.56 4.32z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Следующие"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 11"><path d="M2.57 10.66c-.47.45-1.23.45-1.7 0a1.15 1.15 0 010-1.68l3.26-3.1.17-.38-.17-.39L.87 2.02a1.15 1.15 0 010-1.68 1.25 1.25 0 011.7 0l4.56 4.32c.5.46.5 1.22 0 1.68l-4.56 4.32z"/></svg></button>'
	}

	$('.teachers-slider').slick({
		slidesToShow: 3,
		rows: $(window).width() < 992 ? 1 : 2,
		slidesToScroll: 3,
		arrows: true,
		...arrowsButtons,
		dots: true,
		infinite: true,
		speed: 600,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	equalSlideHeight('.teachers-slider');

	$('.reasons-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		...arrowsButtons,
		dots: false,
		infinite: true,
		speed: 600,
		adaptiveHeight: true
	});

	// equalSlideHeight('.reasons-slider');

	// Fancybox
	// $(".fancybox").fancybox();


	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 80
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$(this).toggleClass('active');
		$('.mobile-top-nav').toggleClass('opened');
	});

	// Sticky Header
	window.addEventListener('scroll', function(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 0
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	});

	// Page Nav Highlighting
	// Cache selectors
	let topMenu = $('.top-nav');

	if ($(window).width() < 992) {
		topMenu = $('.mobile-nav')
	}

	let lastId,
		topMenuHeight = 0,
		// All list items
		menuItems = topMenu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function() {
			var item = $($(this).attr("href"));
			if (item.length) {
				return item;
			}
		});

	// $('input, textarea').on('keyup', function(){
	// 	!!$(this).val() 
	// 		? $(this).addClass('not-empty') 
	// 		: $(this).removeClass('not-empty');
	// });


	// Bind to scroll
	$(window).scroll(function() {
		// Get container scroll position
		let fromTop = $(this).scrollTop() + topMenuHeight + 300;

		// Get id of current scroll item
		let cur = scrollItems.map(function() {
			if ($(this).offset().top < fromTop)
				return this;
		});
		// Get the id of the current element
		cur = cur[cur.length - 1];
		let id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
				.removeClass("active").filter("[href='#" + id + "']").addClass("active");
		}
	});

	// $('.js-tilt').tilt({
	// 	glare: false,
	// 	maxGlare: .5,
	// 	scale: 1.03,
	// 	maxTilt: 10
	// })

	// Animate On Scroll (js-aos)
	function getCoords(elem) {
		var box = elem.getBoundingClientRect();

		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		};
	}

	function setItemPosition(item, direction, shift){
		if (direction === 'vertical') {
			item.css({ 'transform': `translateY(${shift}px)` });
		} else if(direction === 'horizontal'){
			item.css({ 'transform': `translateX(${shift}px)` });
		}
	}

	setTimeout(function(){
		// if ($(window).width() >= 992) {
			function jsAOS(){
				var scrollPosition = window.scrollY;
				var screenCenter = scrollPosition + document.documentElement.clientHeight / 2;

				$('.js-aos').each(function(){
					var isDisposable = $(this).data('disposable') && $(this).hasClass('animated');
					var moveDirection = !!$(this).data('direction') ? $(this).data('direction') : 'vertical';
					var moveSpeed = !!$(this).data('speed') ? $(this).data('speed') * 1 : 0.33;

					if ( !isDisposable ) {
						var elemPos = getCoords(this);

						var offset = $(this).data('offset') * 1;

						if (!offset) {
							offset = -150;
						}

						var scrollDiff = elemPos.top - (screenCenter + offset);
						var moveShift = scrollDiff * moveSpeed;

						if ($(this).data('fix') == true) {
							if (
								(moveShift > 0 && moveSpeed < 0) 
								||
								(moveShift < 0 && moveSpeed > 0)
							) {
								moveShift = 0;
							}
						}

						/*if(scrollDiff <= 0){
							$(this).addClass('animated');
						}*/

						setItemPosition($(this), moveDirection, moveShift);
					} else{
						setItemPosition($(this), moveDirection, 0);
					}
				});
			}

			jsAOS();

			$(window).scroll(function(){
				jsAOS();
			});
		// }
	}, 600);

	// Mobile nav
	$('.mobile-top-nav a').click(function(){
		$('.menu-opener').click();
	});


	// $('.video-block').on('click', function () {
	// 	$(this).addClass('playing');

	// 	var $videoId = $(this).find('.play-btn').data('video-id');
	// 	$(this).append('<div class="video-iframe" id="'+$videoId+'"></div>');
	// 	$(this).closest('.first-screen-video-section').addClass('playing');
	// 	createVideo($videoId);
	// });

	// var player;
	// function createVideo(videoId) {
	// 	player = new YT.Player(videoId, {
	// 		videoId: videoId,
	// 		playerVars: {
	// 			'autohide': 1,
	// 			'showinfo' : 0,
	// 			'rel': 0,
	// 			'loop': 1
	// 		},
	// 		events: {
	// 			'onReady': function (e) {
	// 				// e.target.mute();
	// 				e.target.playVideo();
	// 			}
	// 		}
	// 	});
	// }

	// Video
	if ( $('div').is('.video') ) {
		$('.video').click(function(){
			document.getElementById('video-tour').play();

			$(this).addClass('playing');
			$(this).find('.video-preview').hide();
		});

		let isFirstPlay = true;

		$(window).scroll(function(){
			if (isFirstPlay) {
				if ( $(window).scrollTop() + $(window).height() / 2 > $('.video').offset().top ) {
					document.getElementById('video-tour').play();

					$('.video').addClass('playing');
					$('.video .video-preview').hide();

					isFirstPlay = false;
				}
			}
		});
	}


	// Modals
	$('.modal').css('display','block');

	function getScrollWidth(){
		// create element with scroll
		let div = document.createElement('div');

		div.style.overflowY = 'scroll';
		div.style.width = '50px';
		div.style.height = '50px';

		document.body.append(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;

		div.remove();

		return scrollWidth;
	}

	$('.modal-dialog').click(e => e.stopPropagation());
	$('.modal').click(function(e){
		hideModal( $(this) );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('.modal-close').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('[data-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		hideModal('.modal');

		showModal( $(this).data('modal') );
	});

	$('[data-video-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		let videoId = $(this).data('video-modal');
		let videoType = $(this).data('video-type');

		if (videoType == 'youtube') {
			createVideo('modal-video-iframe', videoId);
		} else if(videoType == 'vimeo'){
			$('#modal-video-iframe').html('<iframe src="https://player.vimeo.com/video/'+videoId+'?playsinline=0&autoplay=1&transparent=0&app_id=122963">');
		}

		hideModal('.modal');

		showModal( "#video-modal" );
	});


	// Video
	$('.video-block:not([data-video-modal])').on('click', function () {
		$(this).addClass('playing');

		var $videoId = $(this).find('.play-btn').data('video-id');
		$(this).append('<div class="video-iframe" id="'+$videoId+'"></div>');
		createVideo($videoId, $videoId);
	});

	var player;
	function createVideo(videoBlockId, videoId) {
		player = new YT.Player(videoBlockId, {
			videoId: videoId,
			playerVars: {
				'autohide': 1,
				'showinfo' : 0,
				'rel': 0,
				'loop': 1
			},
			events: {
				'onReady': function (e) {
					// e.target.mute();
					e.target.playVideo();
				}
			}
		});
	}

	$('.modal-btn').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 800);
	});

	let bodyScrolled = 0;
	function showModal(modal){
		$(modal).addClass('visible');
		bodyScrolled = $(window).scrollTop();
		$('body').addClass('modal-visible')
				 .scrollTop(bodyScrolled)
				 .css('padding-right', getScrollWidth());

		$('[data-src]').each( (i, el) => {
			$(el).attr('src', $(el).data('src'));
			el.removeAttribute('data-scr');
		} );
	}

	function hideModal(modal){
		$(modal).removeClass('visible');
		bodyScrolled = $(window).scrollTop();
		$('body').removeClass('modal-visible')
				 .scrollTop(bodyScrolled)
				 .css('padding-right', 0);
	}
});

// Object Fit Polyfill
/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="bfred-it:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();

objectFitImages('.object-fit-cover');
objectFitImages('.object-fit-contain');
objectFitImages('.teacher-card .card-image img');
objectFitImages('.contacts-form .form-body-bg img');
objectFitImages('.form-right-corner img');
objectFitImages('.form-left-corner img');

// SVG use polyfill
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i),k=h.getAttribute("xlink:href")||h.getAttribute("href");if(!k&&g.attributeName&&(k=h.getAttribute(g.attributeName)),j&&k){if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});


svg4everybody();