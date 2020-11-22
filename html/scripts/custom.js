/*

Template name: Me
Author: Magna Themes
Support: http://www.magna-themes.com/support

Table of contents:
------------------
                  1. Cufon font replacement
                  2. Page scroll
                  3. Flexslider for the home
                  5. Portfolio: show hidden details
                  6. Portfolio: load and show item page
                  7. Portfolio: filtering elements
                  8. Animate social icons
                  9. Show/hide the secondary menu
                  10. Notifiaction boxes
                  11. Validate contact form
                  12. Tool tip settings

*/
     
$(window).load(function() {

     /*  2. Page scroll
     ==========================================*/
     $('ul.menu li a, div#hidden_items ul li a, a.scroll_down, a.scroll_top').click(function(){
               var id = $(this).attr("href");
               $('html,body').stop().animate({scrollTop: $("div"+id).offset().top},'slow', function(){
                         if ( navigator.userAgent.indexOf('iPad') != -1 ) {
                                   var yPos = window.pageYOffset;
                                   var $fixedElement = $('div#secondary_nav');
                                   $fixedElement.css({ "position": "relative" });
                                   window.scroll(0,yPos);
                                   $fixedElement.css({ "position": "fixed" });
                         }
               });

     return false;
     });
     
     $('select#mobile_menu, div#hidden_items select#hidden_mobile_menu').change(function(){
               var id = $(this).attr("value");
               $('html,body').animate({scrollTop: $("div"+id).offset().top},'slow');

     return false;
     });

     /*  3. Flexslider for the home
     ==========================================*/
     $('#slider').flexslider({
               animation: "slide",              //String: Select your animation type, "fade" or "slide"
               slideDirection: "horizontal",   //String: Select the sliding direction, "horizontal" or "vertical"
               slideshow: true,                //Boolean: Animate slider automatically
               slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
               animationDuration: 600,         //Integer: Set the speed of animations, in milliseconds
               directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
               controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
               keyboardNav: true,              //Boolean: Allow slider navigating via keyboard left/right keys
               mousewheel: false,              //Boolean: Allow slider navigating via mousewheel
               prevText: "<",                   //String: Set the text for the "previous" directionNav item
               nextText: ">",                   //String: Set the text for the "next" directionNav item
               pausePlay: false,               //Boolean: Create pause/play dynamic element
               pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
               playText: 'Play',               //String: Set the text for the "play" pausePlay item
               randomize: false,               //Boolean: Randomize slide order
               slideToStart: 0,                //Integer: The slide that the slider should start on. Array notation (0 = first slide)
               animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
               pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
               pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
               manualControls: "",             //Selector: Declare custom control navigation. Example would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
               start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
               before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
               after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
               end: function(){}
     });
     

     /*  5. Portfolio: show/hide details
     ==========================================*/
     var show_effect = 'clip'; //select the animation type: 'blind', 'clip', 'drop','explode','fade','fold','scale','slide'
     var hide_effect = 'clip'; //select the animation type: 'blind', 'clip', 'drop','explode','fade','fold','scale','slide'
     $('ul.sortablePortfolio li .item_content ').hoverIntent(
               function(){ $(this).find('div.hidden').stop().show(show_effect, 200); return false; },
               function(){ $(this).find('div.hidden').stop().hide(hide_effect, 100); return false; }
     );


     /*  6. Portfolio: load and show item page
     ==========================================*/
     $("ul.sortablePortfolio li a.information").click( function(){
               var source = $(this).attr("href");
               $("div#filter_wrapper").slideUp(300, function(){
                          $('div.item_container').append('<div id="loading"></div>');
                          $('div.item_container').load(source, function(){
                                    $('div#loading').css("display","none");
                                    $('div.item').slideDown(500,function(){
                                              $('.slideshow').flexslider({controlNav: false});
                                              $('html,body').animate({scrollTop: $("div#portfolio").offset().top},'slow');
                                              $('div.item a.close').click( function(){
                                                        $(this).parent('div.item').slideUp(300, function(){
                                                                 $('div.item_container').empty();
                                                                 $("div#filter_wrapper").slideDown(300);
                                                        });
                                              return false;
                                              });
                                    });

                          });
               });
     return false;
     });


     /*  7. Portfolio: filtering elements
     ==========================================*/
     var $filterType = $('#filterOptions li.active a').attr('class');
     var $holder = $('ul.sortablePortfolio');
     var $data = $holder.clone();

     $('#portfolioFilter li a').click(function(e) {

               $('#portfolioFilter li').removeClass('active');
               var $filterType = $(this).attr('class');
               $(this).parent().addClass('active');

               if ($filterType == 'all') {
                         var $filteredData = $data.find('li');
               } else {
                      var $filteredData = $data.find('li[data-type=' + $filterType + ']');
                      }

               $holder.quicksand($filteredData, {
                         duration: 800,
                         adjustHeight: 'auto'
               }, function() {
                              $('ul.sortablePortfolio li .item_content ').hoverIntent(
                                        function(){ $(this).find('div.hidden').stop().show(show_effect, 200); return false; },
                                        function(){ $(this).find('div.hidden').stop().hide(hide_effect, 100); return false; }
                              );
                              var information = "Click here for more information!";
                              var visit = "Visit the site!"
                              $("a.information").tipTip({ delay: 100, content: information });
                              $("a.link").tipTip({ delay: 100, content: visit });

                              $('ul.sortablePortfolio li a.information').click( function(){
                                        var source = $(this).attr("href");
                                        $("div#filter_wrapper").slideUp(300, function(){
                                                  $('div.item_container').load(source, function(){
                                                            $('div.item').slideDown(500,function(){
                                                                      $('.slideshow').flexslider({controlNav: false});
                                                                      $('html,body').animate({scrollTop: $("div#portfolio").offset().top},'slow');
                                                                      $('div.item a.close').click( function(){
                                                                                $(this).parent('div.item').slideUp(300, function(){
                                                                                          $('div.item_container').empty();
                                                                                          $("div#filter_wrapper").slideDown(300);
                                                                                });
                                                                      return false;
                                                                      });
                                                            });
                                                  });
                                        });
                              return false;
                             });
                             }

               );
               return false;
     });
     
     /*  Load services
     ==========================================*/
     $('a.read_more').click(function(){
               var source = $(this).attr('href');
               $('div#service_item').append('<div id="loading"></div>');
               $('html,body').animate({scrollTop: $('div#services').offset().top},'slow', function(){
                         $('div#service_item div#loading').slideDown(300, function(){
                                   $('div#service_item').load(source, function(){
                                             $('div#loading').css("display","none");
                                             $('div#service_content').slideDown(300, function(){
                                                       $('div#service_content a#close_service').click(function(){
                                                                 $(this).parent('div#service_content').slideUp(300, function(){
                                                                           $('div#service_item').empty();
                                                                 });
                                                       return false;
                                                       });//End: click();
                                             });//End: slideDown()
                                   });//End: load()
                         });//End: slideDown()
               });//End: animate()

     return false;
     });
     
     /*  8. Animate social icons
     ==========================================*/
     $('#contact_info ul.social_icons li').hover(
               
               function(){
               $(this).find('a').stop().animate({marginTop: "-7px"},600);
               return false;
               },
               
               function(){
               $(this).find('a').stop().animate({marginTop: "0px"},600);
               return false;
               }
     );

});

$(document).ready(function(){


     /*  9. Show/hide the secondary menu
     ==========================================*/
     $(window).scroll(function(){
               var pagetop = $(this).scrollTop();
               if (pagetop >= 450) {
                         $('div#hidden_menu').slideDown();
               }
               if (pagetop <= 450) {
                         $('div#hidden_menu').css("display","none");
               }
     });
     
     /*  10. Notifiaction boxes
     ==========================================*/
     $(".success a").click(function(){ $("div.success").fadeOut("slow"); return false; });
     $(".error a").click(function(){ $("div.error").fadeOut("slow"); return false; });
     $(".alert a").click(function(){ $("div.alert").fadeOut("slow"); return false; });
     $(".remember a").click(function(){ $("div.remember").fadeOut("slow"); return false; });


     /*  11. Validate contact form
     ==========================================*/
     var name_value   = 'YOUR NAME *'; //default placeholder text for the name field
     var mail_value   = 'YOUR EMAIL ADDRESS *'; //default placeholder text for the email field
     var message_value= 'YOUR MESSAGE *'; //default place holder text for the textarea

     var missing_name = 'Please tell us your name!'; //error message, if the name field is empty
     var missing_mail = 'Please let us know your email address!'; //error message, if the mail field is empty
     var invalid_mail = 'Oh no! Invalid email address!'; //error message, if the user's email address is invalid
     var missing_message = 'Please write us something beautiful!'; //error message, if the textarea is empty

     var error_color   = '#990000'; //text color of the error messages
     var default_color = '#333333'; //default text color of the contact form

     $('input#form-name').click(function() {

               var form_name = $('input#form-name').val();

               if (form_name == missing_name)
                  {
                  $('input#form-name').css("color" , default_color);
                  $('input#form-name').val('');
                  }
                  else if (form_name == name_value)
                          {
                          $('input#form-name').val('');
                          $('input#form-name').css("color" , default_color);
                          }

     });

     $('input#form-mail').click(function() {

               var form_mail = $('input#form-mail').val();

               if (form_mail == missing_mail || form_mail == invalid_mail)
               {
               $('input#form-mail').css("color" , default_color);
               $('input#form-mail').val('');
               }
               else if (form_mail == mail_value)
                       {
                       $('input#form-mail').val('');
                       $('input#form-mail').css("color" , default_color);
                       }

     });

     $('textarea#form-message').click(function() {

               var message_content = $('textarea#form-message').val();

               if (message_content == missing_message || message_content == message_value)
                  {
                  $('textarea#form-message').css("color" , default_color);
                  $('textarea#form-message').val('');
                  }
     });

     $('#contact_form button#button').click(function() {

               var name = $('input#form-name').val();
               var email = $('input#form-mail').val();
               var comments = $('textarea#form-message').val();

               if (name == "" || name == missing_name || name == name_value)
                  {
                  $('input#form-name').css("color" , error_color);
                  $('input#form-name').val(missing_name);
                  }

               if (email == "" || email == invalid_mail || email == mail_value)
                  {
                  $('input#form-mail').css("color" , error_color);
                  $('input#form-mail').val(missing_mail);
                  }
                  
               if (email != mail_value && email != missing_mail ) {
                  var atpos=email.indexOf("@");
                  var dotpos=email.lastIndexOf(".");
                  if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length)
                     {
                     $('input#form-mail').css("color" , error_color);
                     $('input#form-mail').val(invalid_mail);
                     return false;
                     }
               }

               if (comments == "" || comments == message_value || comments == missing_message)
                  {
                  $('textarea#form-message').css("color" , error_color);
                  $('textarea#form-message').val(missing_message);
                  }

               if ( name == "" || name == missing_name || name == name_value || email == "" || email == invalid_mail || email == mail_value || email == missing_mail || comments == "" || comments == message_value || comments == missing_message ) { return false; }

               var atpos=email.indexOf("@");
               var dotpos=email.lastIndexOf(".");
               if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length)
                  {
                  $('input#form-mail').css("color" , error_color);
                  $('input#form-mail').val(invalid_mail);
                  return false;
                  }

               $("div#contact_form input[type='text']").remove();
               $('div#contact_form textarea').remove();
               $('div#contact_form button').remove();
               $('div#result').append('<div id="loading"></div>');

               $.ajax({
                         type: 'post',
                         url: 'mail.php',
                         data: 'name=' + name + '&email=' + email + '&comments=' + comments,

                         success: function(results) {
                                   $('div.loading').remove();
                                   $('div#result').html(results);
                                   $(".success a").click(function(){ $("div.success").fadeOut("slow"); return false; });
                                   $(".error a").click(function(){ $("div.error").fadeOut("slow"); return false; });
                         }
               });

        });//send click process ends here


     /*  12. Tool tip settings
     ==========================================*/
     
     var information = "Click here for more information!";
     var visit = "Visit the site!"
     var fb_text = "Like this site!";
     var rss_text = "Subscribe to my rss feeds!";
     var twitter_text = "Follow me on twitter!";
     var skype_text = "Call me on skype!";
     var dribbble_text = "View my dribble profile!";
     var linked_in_text = "LinkedIn!"
     var vimeo_text = "View my Vimeo channel!";
     var youtube_text = "View my Youtube channel!";
     var pinterest_text = "Pin it!";
     var instagramm_text = "Follow me on Instagramm!";
     var google_text = "Find me on Google+!";
     var tumblr_text = "Read my blog on Tumblr!";
     var deviant_text = "Check out my DeviantArt profile!";
     var soundcloud_text = "Check out my SoundCloud profile!";

     $("a.information").tipTip({ delay: 100, content: information });
     $("a.link").tipTip({ delay: 100, content: visit });
     $("#fb").tipTip({ delay: 100, content: fb_text });
     $("#rss").tipTip({ delay: 100, content: rss_text });
     $("#twitter").tipTip({ delay: 100, content: twitter_text });
     $("#skype").tipTip({ delay: 100, content: skype_text });
     $("#dribbble").tipTip({ delay: 100, content: dribbble_text });
     $("#linked").tipTip({ delay: 100, content: linked_in_text });
     $("#vimeo").tipTip({ delay: 100, content: vimeo_text });
     $("#youtube").tipTip({ delay: 100, content: youtube_text });
     $("#pinterest").tipTip({ delay: 100, content: pinterest_text });
     $("#instagramm").tipTip({ delay: 100, content: instagramm_text });
     $("#google").tipTip({ delay: 100, content: google_text });
     $("#tumblr").tipTip({ delay: 100, content: tumblr_text });
     $("#deviantart").tipTip({ delay: 100, content: deviant_text });
     $("#soundcloud").tipTip({ delay: 100, content: soundcloud_text });

});