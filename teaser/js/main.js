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
		clickedOnMenu = false,
		clickedMenuLink = false;

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

			if($('.home').length) {
				if (!clickedMenuLink) {
					activeCurrentLink(scroll);
				}
				manageMenu(scroll, savedScroll);
			}


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

			if($('.home').length) manageMenu(scroll, savedScroll);

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

	            $menuLink.removeClass("is-active").blur();
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

		clickedMenuLink = true;

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

	/*
	** Photos des membres de l'équipe : clique sur mobile
	*/

	$('.membre-illu-wrapper').on({
		touchstart: function() {
			$(this).mouseenter();
		},
		touchend: function() {
			$(this).mouseout();
		}
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

	/**************************************************

		   				FORMULAIRE

	**************************************************/

	if($('.formulaire').length) {

		var $bodyPart = $('.body-part');
			universName = '',
			smell1 = '',
			smell2 = '',
			univers = [
				{src: 'cascade', name: 'Cascade', description: ['pierre mouillée', 'humidité']}, 
				{src: 'desert', name: 'Désert', description: ['arbres du désert', 'sable']}, 
				{src: 'foret', name: 'Forêt', description: ['sapin', 'eucapalyptus']}, 
				{src: 'ocean', name: 'Océan', description: ['vagues', 'écumes']}, 
				{src: 'campagne', name: 'Campagne', description: ['champs', 'fleurs']}, 
				{src: 'plage', name: 'Plage', description: ['flammes', 'bois brûlé']} 
			];

		/*
		** Gestion du bouton "suivant"
		*/

		$('.question-next').on('click', function(e) {

			// si bouton autre que le dernier permettant de retourner à la page d'accueil
			if(!$(this).hasClass('question-finish'))
				e.preventDefault();

			// si le bouton "next" n'est pas désactivé
			if(!$(this).hasClass('blocked')) {

				var page = $(this).attr('href');
				$('.question:visible').hide("fold", {duration: 600}, function() {
					$('#selected-parfum').addClass('blocked');
					$(page).show("fold", {duration: 800}).addClass('is-active')
				});

			}	
			
		});


		/*
		** Page : question 1 / sélection odeur
		*/

		$('#question-1 .choices-item').on('click', function() {
			$('#question-1 .question-next').removeClass('blocked');

			var selectedUnivers = univers[parseInt($(this).data('univers'))];
			universName = selectedUnivers.name;
			smell1 = selectedUnivers.description[0];
			smell2 = selectedUnivers.description[1];
		});

		/*
		** Page : question 2 / sélection odeur
		*/

		$('#show-small-list').on('click', function() {
			$(this).addClass('button-blue').removeClass('button--transparent');
			$('#hide-small-list').removeClass('button-blue').addClass('button--transparent');
			$('#list-univers').show(200);
			$('#selected-parfum').addClass('blocked');
		});

		$('#hide-small-list').on('click', function() {
			$(this).addClass('button-blue').removeClass('button--transparent');
			$('#show-small-list').removeClass('button-blue').addClass('button--transparent');
			$('#list-univers').hide(200);
			$('#selected-parfum').removeClass('blocked');
		});

		$('#question-2 .choices-item').on('click', function() {
			
			smell1 = univers[parseInt($(this).data('univers'))].description[0];
			smell2 = univers[parseInt($(this).data('univers'))].description[1];

		});

		/*
		** Page : question 3 / sélection parties du corps chauffées
		*/

		$('.choices-description li').on({

			'click': function() {
				$('.choices-description li').removeClass('selected');
				$(this).addClass('selected');

				var listImages = $(this).data('images');

				if (listImages.length > 1) {
					$bodyPart.addClass('is-active');
				} else {
					$('.body-part:not(#body-'+ listImages +')').removeClass('is-active');
					$('#body-'+listImages).addClass('is-active');
				}
			},

			'mouseenter': function() {

				var listImages = $(this).data('images');

				if (listImages.length > 1) {
					$bodyPart.css('opacity', 1);
				} else {
					if (listImages == '0') {
						$bodyPart.css('opacity', 0);
					} else {
						$('.body-part:not(#body-'+ listImages + ')').css('opacity', 0);
						$('#body-'+ listImages).css('opacity', 1);
					}

				}
			},

			'mouseleave': function() {
				var listImages = $(this).data('images');
				$('.body-part:not(.is-active)').css('opacity', 0);
				$('.body-part.is-active').css('opacity', 1);
			}
		});

		/*
		** Page : question 4 / choix allergie
		*/

		$('#question-4 .choices-button').on('click', function() {
			$(this).toggleClass('button--transparent button--blue');
		});

		/* 
		** Sélection d'un univers : maj css univers sélectionné / déselectionnés
		*/

		$('.choices-item').on('click', function() {

			if ($.inArray($(this).closest('section').attr('id'), ['question-3', 'question-4']) > -1) return false;

			var id = $(this).data('univers');
			$('.choices-item').removeClass('is-active');
			$('.choices-item[data-univers=' + id +']').addClass('is-active');

			var src = 'img/univers_'+ univers[id].src +'.jpg',
				name =  univers[id].name,
				description = univers[id].description;

			var $choice = $('#question-2 .choices-item--center');

			$choice.find('.choices-illu').attr('src', src);
			$choice.find('.choices-name').text(name);
 
			var content = '';

			$.each(description, function(index, value){
				content += '<li><p>'+ value + '</p></li>';
			});

			$choice.find('.choices-description').empty().html(content);

			$('#final-univers-name').text(universName);
			$('#final-univers-odeur-1').text(smell1);
			$('#final-univers-odeur-2').text(smell2);

		});

	}

	
});