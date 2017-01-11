//burgers-slider
var slides = document.querySelectorAll('.burgers-slider .burgers-slider__item');
var currentSlide = 0;
var next = document.getElementById('next');
var previous = document.getElementById('prev');

function nextSlide() {
    goToSlide(currentSlide+1);
}

function previousSlide() {
    goToSlide(currentSlide-1);
}

function goToSlide(n) {
    slides[currentSlide].className = 'burgers-slider__item';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'burgers-slider__item showing';
}

next.onclick = function(event) {
    event.preventDefault();
    nextSlide();
};
previous.onclick = function(event) {
    event.preventDefault();
    previousSlide();
};


//one page scroll
$(function() {
  $('.maincontent').fullpage ({
    verticalCentered: false,
    anchors: ['1', '2', '3', '4', '5', '6', '7', '8'],
    menu: '.fixed-menu',
    scrollingSpeed: 900
    });

  $('.down-arrow').on('click', function(e){
    	e.preventDefault();
    	$.fn.fullpage.moveSectionDown();
  });


  $('.nav__link, .fixed-menu__link, .order-link, .burgers-slider__buy').on('click', function(e){
    	e.preventDefault();

    var $this = $(this),
        href = parseInt($this.attr('href'));

  $.fn.fullpage.moveTo(href);

  });
});

//vertical acco
$(function () {
	$('.team-acco__trigger').on('click', function(e){
	    e.preventDefault();

	    var $this = $(this),
		    item = $this.closest('.team-acco__item'),
		    container = $this.closest('.team-acco'),
		    items = container.find('.team-acco__item'),
		    content = item.find('.team-acco__content'),
		    otherContent = container.find('.team-acco__content');

		if (!item.hasClass('active')) {
			items.removeClass('active');
			item.addClass('active');
			otherContent.stop(true, true).slideUp();
			content.stop(true, true).slideDown();
		} else {
			item.removeClass('active');
			content.slideUp();
		}
	});
});

//modal windows
$(function () {
	$('.review__view').fancybox({
		type: 'inline',
		maxWidth : 460,
		fitToView : false,
		padding : 0
	});

	$('.full-review__close').on('click', function(e){
	    e.preventDefault();
		$.fancybox.close();
	});
});

//phone input mask
$(function(){
	$('.phone-mask').inputmask('+7 (999) 999 99 99');
});

//zaccordion
$(function(){
	$('.menu-acco__trigger').on('click', function(e){
	    e.preventDefault();

		var $this = $(this),
			container = $this.closest('.menu-acco'),
			item = $this.closest('.menu-acco__item'),
			items = container.find('.menu-acco__item'),
			activeItem = items.filter('.active'),
			content = item.find('.menu-acco__content'),
			activeContent = activeItem.find('.menu-acco__content');

		if (!item.hasClass('active')) {
			items.removeClass('active');
			item.addClass('active');
			activeContent.animate({
				'width' : '0px'
			});
			content.animate({
				'width' : '550px'
			});
		} else {
			item.removeClass('active');
			content.animate({
				'width' : '0px'
			});
		}
	});


	$(document).on('click', function (e) {
		var $this = $(e.target);

		if (!$this.closest('.menu-acco').length) {
			$('.menu-acco__content').animate({
				'width' : '0px'
			});

			$('.menu-acco__item').removeClass('active');
		}
	});
});

//form submit
$(function () {
	  $('#order-form').on('submit', function (e) {
	    e.preventDefault();

			var
					form = $(this),
					formData = form.serialize();


			$.ajax({
					url: '../mail.php',
					type: 'POST',
					data: formData,
					success: function (data) {

							var popup = data.status ? '#success' : "#error";

									$.fancybox.open([
											{href : popup}
									], {
											type: 'inline',
											maxWidth: 250,
											fitToView: false,
											padding: 0,
											afterClose : function () {
													form.trigger('reset');
											}
									});
					}
	    })
	  });

		$('.status-popup__close').on('click', function(e) {
				e.preventDefault();
				$.fancybox.close();
		});
});


//yandex map
$(function () {
	ymaps.ready(init);
	var myMap;

	function init(){
		myMap = new ymaps.Map("map", {
			center: [59.93916998692174,30.309015096732622],
			zoom: 11,
			controls : [],
		});

		var coords = [
				[59.94554327989287,30.38935262114668],
				[59.91142323563909,30.50024587065841],
				[59.88693161784606,30.319658102103713],
				[59.97033574821672,30.315194906302924],
			],
			myCollection = new ymaps.GeoObjectCollection({}, {
				draggable: false,
				iconLayout: 'default#image',
				iconImageHref: '../img/icons/map-marker.svg',
				iconImageSize: [46, 57],
				iconImageOffset: [-26, -52]
			});

		for (var i = 0; i < coords.length; i++) {
			myCollection.add(new ymaps.Placemark(coords[i]));
		}

		myMap.geoObjects.add(myCollection);

		myMap.behaviors.disable('scrollZoom');
	}
});
