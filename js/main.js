$(function(){function e(){return i.width()>1024}function n(e){$menuLink.each(function(){var n=$(this),t=$(n.attr("href"));t.position().top-c<e+100&&t.position().top+t.height()>e?($menuLink.removeClass("is-active"),n.addClass("is-active")):n.removeClass("is-active")})}function t(n,t){if(e())if(n<menuPosition-20)s.css("padding-top",0),$menu.removeClass("sticky"),clickedOnMenu||($menuToggle.addClass("on"),TweenMax.to($menuList,.5,{left:0,ease:Quad.easeOut})),$(".accueil-foret").css("top","10px");else{s.css("padding-top",c),$menu.addClass("sticky"),$menuToggle.removeClass("on"),TweenMax.to($menuList,.5,{left:-560,ease:Quad.easeOut});var o=10-parseInt(c)+"px";$(".accueil-foret").css("top",o)}else $menu.addClass("sticky"),s.hasClass("home")&&s.css("padding-top","90px")}function o(){var e,n,t,i,s;for(e=document.getElementsByTagName("*"),n=0;n<e.length;n++)if(e[n].getAttribute("include-html")){t=e[n].cloneNode(!1),i=e[n].getAttribute("include-html");var s=new XMLHttpRequest;return s.onreadystatechange=function(){4==s.readyState&&200==s.status&&(t.removeAttribute("include-html"),t.innerHTML=s.responseText,e[n].parentNode.replaceChild(t,e[n]),o())},s.open("GET",i,!0),void s.send()}}var i=$(window),s=$("body"),a=$("#accueil");$menu=$(".menu"),$menuToggle=$(".menu-toggle"),$menuList=$(".menu-list"),$menuLink=$(".menu-link");var l=i.scrollTop(),u=l,m=e(),c=$menu.outerHeight(!0);menuPosition=a.height(),clickedOnMenu=!1,$menuToggle.on("click",function(){if(clickedOnMenu=!0,$(this).toggleClass("on"),e()){var n=$(this).hasClass("on")?0:"-560px";TweenMax.to($menuList,.5,{left:n,ease:Quad.easeOut})}else $menuList.slideToggle()}),i.on({scroll:function(){l=$(this).scrollTop(),c=$menu.outerHeight(!0),n(l),t(l,u),u=l},resize:function(){l=$(this).scrollTop(),c=$menu.outerHeight(!0),menuPosition=a.height(),!e()&&m?($menuToggle.removeClass("on"),$menuList.slideUp()):e()&&!m&&(clickedOnMenu=!1,$menuToggle.addClass("on"),$menuList.slideDown(),TweenMax.to($menuList,.5,{left:0,ease:Quad.easeOut})),t(l,u),m=e()}}),$menuLink.on("click",function(e){e.preventDefault(),$menuLink.removeClass("is-active"),$(this).addClass("is-active");var n=$(".menu-link.is-active").attr("href");$("body, html").stop().animate({scrollTop:$(n).offset().top-c},function(){setTimeout(function(){clickedMenuLink=!1},100)})}),$("#sendForm").submit(function(e){e.preventDefault();var n=$("#sendForm input[name='nom']").val(),t=$("#sendForm input[name='prenom']").val(),o=$("#sendForm input[name='email']").val(),i=$("#sendForm input[name='societe']").val(),s=$("#sendForm textarea[name='message']").val(),a={nom:n,prenom:t,email:o,societe:i,message:s,encode:!0};$.ajax({url:"php/send_mail.php",method:"POST",data:a,dataType:"json"}).done(function(e){$(".popinForm .msg").text(e.response,function(){$(".popinForm").fadeIn("slow")})}).fail(function(e){console.log("FORM AJAX FAILED"),console.log(e)})}),$(".popinForm .close").bind("click",function(){$(".popinForm").fadeOut("slow")}),$(".popinForm").bind("click",function(){$(".popinForm").fadeOut("slow")}),$(".popinForm .in_popin").bind("click",function(e){e.stopPropagation(),e.preventDefault()}),i.trigger("scroll"),e()||($menuList.slideUp(),$menuToggle.removeClass("on")),o()});