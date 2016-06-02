$(function() {

	var $window = $(window),
		$body = $('body'),
		$accueil = $('#accueil');
		$menu = $('.menu'),
		$menuToggle = $('.menu-toggle'),
		$menuList = $('.menu-list'),
		$menuLink = $('.menu-link');

	var scroll = $window.scrollTop(),
		savedScroll = scroll,
		savedIsDesktop = isDesktop(),
		menuHeight = $menu.outerHeight(true);
		menuPosition = $accueil.height(),
		clickedOnMenu = false;

	// Au clique sur le bouton toggle

	$menuToggle.on('click', function() {

		clickedOnMenu = true;

		$(this).toggleClass('on');

		if (isDesktop()) {
			var leftPosition = $(this).hasClass('on') ? 0 : "-560px";
			TweenMax.to($menuList, .5, {left: leftPosition, ease: Quad.easeOut});
		} else {
			$menuList.slideToggle();
		}

	});

	$window.on({

		scroll : function() {
			scroll = $(this).scrollTop();
			menuHeight = $menu.outerHeight(true);

			activeCurrentLink(scroll);
			manageMenu(scroll, savedScroll);

			// On stocke la dernière position du scroll
			savedScroll = scroll;
		},

		resize : function() {
			scroll = $(this).scrollTop();
			menuHeight = $menu.outerHeight(true);
			menuPosition = $accueil.height();

			if (!isDesktop() && savedIsDesktop) {
				$menuToggle.removeClass('on');
				$menuList.slideUp();
			} else if (isDesktop() && !savedIsDesktop) {
				clickedOnMenu = false;
				$menuToggle.addClass('on');
				$menuList.slideDown();
				TweenMax.to($menuList, .5, {left: 0, ease: Quad.easeOut});
			}

			manageMenu(scroll, savedScroll);

			savedIsDesktop = isDesktop();

		}
	});

	function isDesktop() {
		return $window.width() > 1024
	}


	function activeCurrentLink(scroll) {

		$menuLink.each(function () {

	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));

	        if ( (refElement.position().top - menuHeight < scroll + 100) && (refElement.position().top + refElement.height() > scroll)) {

	            $menuLink.removeClass("is-active");
	            currLink.addClass("is-active");

	        } else {
	            currLink.removeClass("is-active");
	        }
	    });

	}

	function manageMenu(scroll, savedScroll) {

		// Si on scroll vers le bas et que l'on a dépassé le menu

		if (!isDesktop()) {
			$menu.addClass('sticky');
			if ($body.hasClass('home')) $body.css('padding-top', '90px');
		} else {

			if (scroll < (menuPosition - 20) ) {

				$body.css('padding-top', 0);

				$menu.removeClass('sticky');

				if (!clickedOnMenu) {
					$menuToggle.addClass('on');
					TweenMax.to($menuList, .5, {left: 0, ease: Quad.easeOut});
				}

				$('.accueil-foret').css('top', '10px');

			} else {

				$body.css('padding-top', menuHeight);

				$menu.addClass('sticky');
				$menuToggle.removeClass('on');
				TweenMax.to($menuList, .5, {left: -560, ease: Quad.easeOut});

				var topValue = 10 - parseInt(menuHeight) + 'px';
				$('.accueil-foret').css('top', topValue);

			}

		}


	}

	$menuLink.on('click', function(e) {

		e.preventDefault();

		$menuLink.removeClass('is-active'); // On enlève la classe "is-active" de tous les liens du menu
		$(this).addClass('is-active'); // On l'ajoute au lien cliqué

		var ancre = $('.menu-link.is-active').attr('href'); // On récupère l'ancre vers lequel redirige le lien

		// if (ancre !== '#accueil') clickedMenuLink = true; // si le lien ne renvoie pas vers la page d'accueil, alors on garde en mémoire que le scroll est déclenché par un clic sur un lien

		// L'écran scroll vers la section correspondante
		$('body, html').stop().animate( {scrollTop : $(ancre).offset().top - menuHeight }, function() {
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
		var message = $("#sendForm textarea[name='message']").val();

		var dataForm = {
			'nom' : nom,
			'prenom' : prenom,
			'email' : email,
			'societe' : societe,
			'message' : message,
			encode: true
		}

		$.ajax({
			url: "php/send_mail.php",
			method: "POST",
			data: dataForm,
			dataType: "json"
		})
		.done(function(data) {
			$(".popinForm .msg").text(data.response);
			$(".popinForm").fadeIn("slow");
		})
		.fail(function(err) {
			console.log('FORM AJAX FAILED');
			console.log(err);
			$(".popinForm .msg").text('Une erreur est survenue. Veuillez nous excuser pour la gêne occasionnée. Si ce problème persiste, merci de nous contacter directement à l\'adresse <a href="mailto:vertues_contact@gmail.com">vertues_contact@gmail.com</a>.');
			$(".popinForm").fadeIn("slow");
		});
	});

	/* Popin when form sent */
	$(".popinForm .close").bind("click", function() {
		$(".popinForm").fadeOut("slow");
	});
	$(".popinForm").bind("click", function() {
		$(".popinForm").fadeOut("slow");
	});

	$(".popinForm .in_popin").bind("click", function(e) {
		e.stopPropagation();
		e.preventDefault();
	});

	$window.trigger('scroll');

	if (!isDesktop()) {
		$menuList.slideUp();
		$menuToggle.removeClass('on');
	}

	function includeHTML() {
	  var z, i, a, file, xhttp;
	  z = document.getElementsByTagName("*");
	  for (i = 0; i < z.length; i++) {
	    if (z[i].getAttribute("include-html")) {
	      a = z[i].cloneNode(false);
	      file = z[i].getAttribute("include-html");
	      var xhttp = new XMLHttpRequest();
	      xhttp.onreadystatechange = function() {
	        if (xhttp.readyState == 4 && xhttp.status == 200) {
	          a.removeAttribute("include-html");
	          a.innerHTML = xhttp.responseText;
	          z[i].parentNode.replaceChild(a, z[i]);
	          includeHTML();
	        }
	      }
	      xhttp.open("GET", file, true);
	      xhttp.send();
	      return;
	    }
	  }
	}

	includeHTML();
});