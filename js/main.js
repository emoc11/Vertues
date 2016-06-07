<<<<<<< HEAD
$(function(){function e(){return n.width()>1024}function s(e){$menuLink.each(function(){var s=$(this),i=$(s.attr("href"));i.position().top-u<e+100&&i.position().top+i.height()>e?($menuLink.removeClass("is-active").blur(),s.addClass("is-active")):s.removeClass("is-active")})}function i(s,i){if(e())if(s<menuPosition-20)t.css("padding-top",0),$menu.removeClass("sticky"),clickedOnMenu||($menuToggle.addClass("on"),TweenMax.to($menuList,.5,{left:0,ease:Quad.easeOut})),$(".accueil-foret").css("top","10px");else{t.css("padding-top",u),$menu.addClass("sticky"),$menuToggle.removeClass("on"),TweenMax.to($menuList,.5,{left:-560,ease:Quad.easeOut});var n=10-parseInt(u)+"px";$(".accueil-foret").css("top",n)}else $menu.addClass("sticky"),t.hasClass("home")&&t.css("padding-top","90px")}var n=$(window),t=$("body"),o=$("#accueil");$menu=$(".menu"),$menuToggle=$(".menu-toggle"),$menuList=$(".menu-list"),$menuLink=$(".menu-link");var a=n.scrollTop(),l=a,c=e(),u=$menu.outerHeight(!0);if(menuPosition=o.height(),clickedOnMenu=!1,clickedMenuLink=!1,$menuToggle.on("click",function(){if(clickedOnMenu=!0,$(this).toggleClass("on"),e()){var s=$(this).hasClass("on")?0:"-560px";TweenMax.to($menuList,.5,{left:s,ease:Quad.easeOut})}else $menuList.slideToggle()}),n.on({scroll:function(){a=$(this).scrollTop(),u=$menu.outerHeight(!0),$(".home").length&&(clickedMenuLink||s(a),i(a,l)),l=a},resize:function(){a=$(this).scrollTop(),u=$menu.outerHeight(!0),menuPosition=o.height(),!e()&&c?($menuToggle.removeClass("on"),$menuList.slideUp()):e()&&!c&&(clickedOnMenu=!1,$menuToggle.addClass("on"),$menuList.slideDown(),TweenMax.to($menuList,.5,{left:0,ease:Quad.easeOut})),$(".home").length&&i(a,l),c=e()}}),$menuLink.on("click",function(e){clickedMenuLink=!0,e.preventDefault(),$menuLink.removeClass("is-active"),$(this).addClass("is-active");var s=$(".menu-link.is-active").attr("href");$("body, html").stop().animate({scrollTop:$(s).offset().top-u},function(){setTimeout(function(){clickedMenuLink=!1},100)})}),$("#sendForm").submit(function(e){e.preventDefault();var s=$("#sendForm input[name='nom']").val(),i=$("#sendForm input[name='prenom']").val(),n=$("#sendForm input[name='email']").val(),t=$("#sendForm input[name='societe']").val(),o=$("#sendForm textarea[name='message']").val(),a={nom:s,prenom:i,email:n,societe:t,message:o,encode:!0};$.ajax({url:"php/send_mail.php",method:"POST",data:a,dataType:"json"}).done(function(e){console.log(e)}).fail(function(e){console.log("FORM AJAX FAILED"),console.log(e)})}),$(".membre-illu-wrapper").on({touchstart:function(){$(this).mouseenter()},touchend:function(){$(this).mouseout()}}),n.trigger("scroll"),e()||($menuList.slideUp(),$menuToggle.removeClass("on")),$(".formulaire").length){var r=$(".body-part");universName="",smell1="",smell2="",univers=[{src:"cascade",name:"Cascade",description:["pierre mouillée","humidité"]},{src:"desert",name:"Désert",description:["arbres du désert","sable"]},{src:"foret",name:"Forêt",description:["sapin","eucapalyptus"]},{src:"ocean",name:"Océan",description:["vagues","écumes"]},{src:"campagne",name:"Campagne",description:["champs","fleurs"]},{src:"plage",name:"Plage",description:["flammes","bois brûlé"]}],$(".question-next").on("click",function(e){if($(this).hasClass("question-finish")||e.preventDefault(),!$(this).hasClass("blocked")){var s=$(this).attr("href");$(".question:visible").hide("fold",{duration:600},function(){$("#selected-parfum").addClass("blocked"),$(s).show("fold",{duration:800}).addClass("is-active")})}}),$("#question-1 .choices-item").on("click",function(){$("#question-1 .question-next").removeClass("blocked");var e=univers[parseInt($(this).data("univers"))];universName=e.name,smell1=e.description[0],smell2=e.description[1]}),$("#show-small-list").on("click",function(){$(this).addClass("button-blue").removeClass("button--transparent"),$("#hide-small-list").removeClass("button-blue").addClass("button--transparent"),$("#list-univers").show(200),$("#selected-parfum").addClass("blocked")}),$("#hide-small-list").on("click",function(){$(this).addClass("button-blue").removeClass("button--transparent"),$("#show-small-list").removeClass("button-blue").addClass("button--transparent"),$("#list-univers").hide(200),$("#selected-parfum").removeClass("blocked")}),$("#question-2 .choices-item").on("click",function(){smell1=univers[parseInt($(this).data("univers"))].description[0],smell2=univers[parseInt($(this).data("univers"))].description[1]}),$(".choices-description li").on({click:function(){$(".choices-description li").removeClass("selected"),$(this).addClass("selected");var e=$(this).data("images");e.length>1?r.addClass("is-active"):($(".body-part:not(#body-"+e+")").removeClass("is-active"),$("#body-"+e).addClass("is-active"))},mouseenter:function(){var e=$(this).data("images");e.length>1?r.css("opacity",1):"0"==e?r.css("opacity",0):($(".body-part:not(#body-"+e+")").css("opacity",0),$("#body-"+e).css("opacity",1))},mouseleave:function(){$(this).data("images");$(".body-part:not(.is-active)").css("opacity",0),$(".body-part.is-active").css("opacity",1)}}),$("#question-4 .choices-button").on("click",function(){$(this).toggleClass("button--transparent button--blue")}),$(".choices-item").on("click",function(){if($.inArray($(this).closest("section").attr("id"),["question-3","question-4"])>-1)return!1;var e=$(this).data("univers");$(".choices-item").removeClass("is-active"),$(".choices-item[data-univers="+e+"]").addClass("is-active");var s="img/univers_"+univers[e].src+".jpg",i=univers[e].name,n=univers[e].description,t=$("#question-2 .choices-item--center");t.find(".choices-illu").attr("src",s),t.find(".choices-name").text(i);var o="";$.each(n,function(e,s){o+="<li><p>"+s+"</p></li>"}),t.find(".choices-description").empty().html(o),$("#final-univers-name").text(universName),$("#final-univers-odeur-1").text(smell1),$("#final-univers-odeur-2").text(smell2)})}});
=======
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
>>>>>>> 94f14b04b15fe0534a1b5fa7e585940370a8ad96
