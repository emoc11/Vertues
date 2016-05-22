$(function() {

	var $menu = $('.menu'),
		$menuToggle = $('.menu-toggle'),
		$menuList = $('.menu-list');


	$menuToggle.on('click', function() {

		$(this).toggleClass('on');

		var leftPosition = $(this).hasClass('on') ? 0 : "-560px";

		$menuList.stop().animate({'left': leftPosition}, 500, "linear");
	});

	var menuPosition = 743;

	console.log(menuPosition);

	$(window).on('scroll', function() {

		var scroll = $(this).scrollTop();

		if (scroll >= (menuPosition - 20)) {
			$menu.addClass('sticky');
			$menuToggle.removeClass('on');
			$menuList.stop().animate({'left': "-560px"}, 500, "linear");
		} else {
			$menu.removeClass('sticky');
			$menuToggle.addClass('on');
			$menuList.stop().animate({'left': 0}, 500, "linear");
		}


	});

});