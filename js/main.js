$(function(){function e(){return o.width()>1024}function n(e){$menuLink.each(function(){var n=$(this),t=$(n.attr("href"));t.position().top-c<e+100&&t.position().top+t.height()>e?($menuLink.removeClass("is-active"),n.addClass("is-active")):n.removeClass("is-active")})}function t(n,t){if(e())if(n<menuPosition-20)i.css("padding-top",0),$menu.removeClass("sticky"),clickedOnMenu||($menuToggle.addClass("on"),TweenMax.to($menuList,.5,{left:0,ease:Quad.easeOut})),$(".accueil-foret").css("top","10px");else{i.css("padding-top",c),$menu.addClass("sticky"),$menuToggle.removeClass("on"),TweenMax.to($menuList,.5,{left:-560,ease:Quad.easeOut});var s=10-parseInt(c)+"px";$(".accueil-foret").css("top",s)}else $menu.addClass("sticky"),i.hasClass("home")&&i.css("padding-top","90px")}function s(){var e,n,t,o,i;for(e=document.getElementsByTagName("*"),n=0;n<e.length;n++)if(e[n].getAttribute("include-html")){t=e[n].cloneNode(!1),o=e[n].getAttribute("include-html");var i=new XMLHttpRequest;return i.onreadystatechange=function(){4==i.readyState&&200==i.status&&(t.removeAttribute("include-html"),t.innerHTML=i.responseText,e[n].parentNode.replaceChild(t,e[n]),s())},i.open("GET",o,!0),void i.send()}}var o=$(window),i=$("body"),a=$("#accueil");$menu=$(".menu"),$menuToggle=$(".menu-toggle"),$menuList=$(".menu-list"),$menuLink=$(".menu-link");var l=o.scrollTop(),u=l,m=e(),c=$menu.outerHeight(!0);menuPosition=a.height(),clickedOnMenu=!1,$menuToggle.on("click",function(){if(clickedOnMenu=!0,$(this).toggleClass("on"),e()){var n=$(this).hasClass("on")?0:"-560px";TweenMax.to($menuList,.5,{left:n,ease:Quad.easeOut})}else $menuList.slideToggle()}),o.on({scroll:function(){l=$(this).scrollTop(),c=$menu.outerHeight(!0),n(l),t(l,u),u=l},resize:function(){l=$(this).scrollTop(),c=$menu.outerHeight(!0),menuPosition=a.height(),!e()&&m?($menuToggle.removeClass("on"),$menuList.slideUp()):e()&&!m&&(clickedOnMenu=!1,$menuToggle.addClass("on"),$menuList.slideDown(),TweenMax.to($menuList,.5,{left:0,ease:Quad.easeOut})),t(l,u),m=e()}}),$menuLink.on("click",function(e){e.preventDefault(),$menuLink.removeClass("is-active"),$(this).addClass("is-active");var n=$(".menu-link.is-active").attr("href");$("body, html").stop().animate({scrollTop:$(n).offset().top-c},function(){setTimeout(function(){clickedMenuLink=!1},100)})}),$("#sendForm").submit(function(e){e.preventDefault();var n=$("#sendForm input[name='nom']").val(),t=$("#sendForm input[name='prenom']").val(),s=$("#sendForm input[name='email']").val(),o=$("#sendForm input[name='societe']").val(),i=$("#sendForm textarea[name='message']").val(),a={nom:n,prenom:t,email:s,societe:o,message:i,encode:!0};$.ajax({url:"php/send_mail.php",method:"POST",data:a,dataType:"json"}).done(function(e){console.log(e)}).fail(function(e){console.log("FORM AJAX FAILED"),console.log(e)})}),o.trigger("scroll"),e()||($menuList.slideUp(),$menuToggle.removeClass("on")),s()});