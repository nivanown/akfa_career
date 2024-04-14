$(document).ready(function(){

	/*- header -*/
	$nav = $('.header');
	$window = $(window);
	$h = $nav.offset().top;
	$window.scroll(function(){
		if ($window.scrollTop() > $h) {
			$nav.addClass('fixed');
		} else {
			$nav.removeClass('fixed');
		}
	});
 	
	/*- menu-btn -*/
	var siteToggle = $('.menu-btn'),
		siteMenu= $('.header__right-col');

	siteToggle.on('click', function(){
		$(this).toggleClass("collapsed");
		  siteMenu.toggleClass("show");
		$('body').toggleClass('overflow-hd');
	});

	/*- main-navi -*/
	var last_id;
	var $top_menu = $('.main-navi');
	var menu_height = $top_menu.outerHeight(true);
	var $menu_items = $top_menu.find('a');
	var $scroll_items = $menu_items.map(function(){
		var item = $($(this).attr('href'));
		if (item.length){
			return item;
		}
	});
 
	$menu_items.click(function(e){
		var href = $(this).attr('href'),
		offset_top = href === '#' ? 0 : $(href).offset().top - menu_height;
		$('html, body').stop().animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 700);
		e.preventDefault();
	});

	$(window).scroll(function(){
		var from_top = $(this).scrollTop() + menu_height;
		var mar = parseInt($top_menu.css('margin-bottom'));
		var cur = $scroll_items.map(function(){
			if ($(this).offset().top < from_top + mar){
				return this;
			}
		});
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : '';
		if (last_id !== id){
			last_id = id;
			$menu_items.parent()
				.removeClass('active')
				.end()
				.filter("[href='#" + id + "']")
				.parent()
				.addClass('active');
		}
	});

	/*- select-directions -*/
    $('.select-directions__text').click(function(e) {
        
        if($(this).parent().hasClass('open')) {
            $(this).parent().removeClass('open');
        } else {
            $(this).parent().addClass('open');
        }
    });

	/*- down scroll -*/
	var $page = $('html, body');
		$('.down-arrow, .scroll-down').click(function() {
	    $page.animate({
	        scrollTop: $($.attr(this, 'href')).offset().top
	    }, 700);
	    return false;
	});

	/*- values-slider -*/
	$('.values-slider').slick({
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		fade: true,
  		cssEase: 'linear',
		infinite: true
	});

	/*- advantages-slider -*/
	$('.advantages-slider').slick({
		autoplay: true,
		autoplaySpeed: 4000,
		arrows: false,
		dots: true,
		infinite: true,
		slidesToShow: 3,
		speed: 500,
		responsive: [
			{
			breakpoint: 1199,
			settings: {
				slidesToShow: 2
				}
	    	},
	    	{
			breakpoint: 767,
			settings: {
				slidesToShow: 1
				}
	    	},
	    	{
			breakpoint: 580,
			settings: {
				slidesToShow: 1
				}
	    	}
	  	]
	});

	/*- reviews-slider -*/
	$('.reviews__slider').slick({
		autoplay: false,
		adaptiveHeight: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		fade: true,
		cssEase: 'linear',
		infinite: true
	});

	/*- modal -*/
	const myModal = new HystModal({
        catchFocus: true,
        closeOnEsc: true,
        backscroll: true,
        beforeOpen: function(modal){
            console.log('Message before opening the modal');
            console.log(modal);
        },
        afterClose: function(modal){
            console.log('Message after modal has closed');
            console.log(modal);

            let videoframe = modal.openedWindow.querySelector('iframe');
            if(videoframe){
                videoframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
            }
        },
    });

    /*- modal -*/
    $('.vacancy__list__in').infiniteslide({
		speed: 100,
		direction: 'up'
	});

    /*- statistics -*/
	function custom_count(){
	    var flag = true;
	    $('#statistics').each(function() {
	        if ($(this).isInViewport()) {
	            if (flag) {

	                var arr = [],
	                i = 0;
	                $('.statistics__item .odometer').each(function() {
	                    arr[i++] = $(this).attr('data-count');
	                    odometer.innerText = arr[0];
	                    odometer1.innerText = arr[1];
	                    odometer2.innerText = arr[2];
	                    odometer3.innerText = arr[3];
	                });
	                flag = false;
	            }
	        } else {}
	    });
	}

	$.fn.isInViewport = function() {
	    var elementTop = $(this).offset().top;
	    var elementBottom = elementTop + $(this).outerHeight();

	    var viewportTop = $(window).scrollTop();
	    var viewportBottom = viewportTop + $(window).height();

	    return elementBottom > viewportTop && elementTop < viewportBottom;
	    console.log(elementBottom > viewportTop && elementTop < viewportBottom);
	};

	$(document).ready(function() {

	    custom_count();

	    $(window).resize(function() {
	        custom_count();
	    });
	    
	    $(window).on("scroll",function(){
	      custom_count();
	    });
	});

	/*- phone -*/
	$.mask.definitions['9'] = false;
	$.mask.definitions['5'] = "[0-9]";
	$("#phone").mask("998(55) 555-55-55");

	/*- presentation-product__promo type-file -*/
	$('.type-file__input').change(function() {
	    if ($(this).val() != '') $(this).prev().text('Выбрано файлов: ' + $(this)[0].files.length);
	    else $(this).prev().text('Выберите файлы');
	});

});