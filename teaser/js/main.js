$(function() {

	var $menu = $('.menu'),
		$menuToggle = $('.menu-toggle'),
		$menuList = $('.menu-list'),
		$window = $(window),
		oldScroll = $(window).scrollTop(),
		clickedMenuLink = false;

	// Au clique sur le bouton toggle 

	$menuToggle.on('click', function() {

		// Si l'on a dépassé le menu et que celui-ci est en position fixe

		if(oldScroll > (menuPosition - 20)) {

			// On ouvre ou ferme celui-ci
			// (dans le cas contraire, il reste toujours ouvert)

			$(this).toggleClass('on');

			var leftPosition = $(this).hasClass('on') ? 0 : "-560px"; 

			$menuList.stop().animate({'left': leftPosition}, 500, "linear");
		}

	});

	var menuPosition = 743;

	$window.on('scroll', function() {

		var scroll = $(this).scrollTop();

		console.log('clickedMenuLink ', clickedMenuLink);

		// Si l'utilisateur n'a pas cliqué un lien du menu

		if (!clickedMenuLink) {

			// Si on scroll vers le bas et que l'on a dépassé le menu
			if (oldScroll <= scroll && scroll >= (menuPosition - 20)) {
				
				// On ferme celui-ci + mise à jour du css pour le bouton toggle

				$menu.addClass('sticky');
				$menuToggle.css('cursor', 'pointer').removeClass('on');
				$menuList.stop().animate({'left': "-560px"}, 500, "linear");

			// Si on scroll vers le haut et que l'on est "avant" le menu
			} else if (scroll <= (menuPosition - 20)) {

				// On ouvre celui-ci + mise à jour du css pour le bouton toggle

				$menu.removeClass('sticky');
				$menuToggle.css('cursor', 'default').addClass('on');
				$menuList.stop().animate({'left': 0}, 500, "linear");

			} 

		} 

		// Si l'utilisateur a cliqué un lien du menu, on laisse celui-ci affiché
		else {
			$menuList.css('left', 0);
		}

		// On stocke la dernière position du scroll
		oldScroll = scroll;

	});


	$window.trigger('scroll');


	$('.menu-link').on('click', function(e) {

		e.preventDefault();

		$('.menu-link').removeClass('is-active'); // On enlève la classe "is-active" de tous les liens du menu
		$(this).addClass('is-active'); // On l'ajoute au lien cliqué

		var ancre = $('.menu-link.is-active').attr('href'); // On récupère l'ancre vers lequel redirige le lien

		if (ancre !== '#accueil') clickedMenuLink = true; // si le lien ne renvoie pas vers la page d'accueil, alors on garde en mémoire que le scroll est déclenché par un clic sur un lien

		// L'écran scroll vers la section correspondante
		$('body, html').stop().animate( {scrollTop : $(ancre).offset().top - 140 }, function() {

			console.log("fin du scroll");

			setTimeout(function() {
				clickedMenuLink = false;
				console.log("setTimeout");
			}, 100);

		});
	});

});