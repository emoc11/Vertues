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

			TweenMax.to($menuList, .5, {left: leftPosition, ease: Quad.easeOut});
		}

	});

	var menuPosition = 743;

	$window.on('scroll', function() {

		var scroll = $(this).scrollTop();



		// Si on scroll vers le bas et que l'on a dépassé le menu
		if (oldScroll <= scroll && scroll >= (menuPosition - 20)) {

			// On ferme celui-ci + mise à jour du css pour le bouton toggle

			$menu.addClass('sticky');
			// Si l'utilisateur n'a pas cliqué un lien du menu
			if (!clickedMenuLink) {
				$menuToggle.css('cursor', 'pointer').removeClass('on');
				TweenMax.to($menuList, .5, {left: -560, ease: Quad.easeOut});
			}

		// Si on scroll vers le haut et que l'on est "avant" le menu
		} else if (scroll <= (menuPosition - 20)) {

			// On ouvre celui-ci + mise à jour du css pour le bouton toggle

			$menu.removeClass('sticky');
			$menuToggle.css('cursor', 'default').addClass('on');
			TweenMax.to($menuList, .5, {left: 0, ease: Quad.easeOut});

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

			setTimeout(function() {
				clickedMenuLink = false;
			}, 100);

		});
	});

	/* Submit Form */
	$("#sendForm").submit(function(e) {
		e.preventDefault();

		var nom = $("#sendForm input[name='nom']").val();
		var prenom = $("#sendForm input[name='prenom']").val();
		var email = $("#sendForm input[name='email']").val();
		var societe = $("#sendForm input[name='societe']").val();
		var message = $("#sendForm input[name='message']").val();

		$.ajax({
			method: "POST",
			url: "php/send_mail.php"
		})
		.done(function(data) {
			console.log(data);
		})
		.fail(function() {
			console.log('FORM AJAX FAILED');
		});
	});

});