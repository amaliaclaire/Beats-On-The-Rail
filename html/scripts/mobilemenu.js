jQuery(function() {

     /*-- Mobile menu --*/
     //Set the variables
     var windowWidth = jQuery(window).width();
     var mainMenu = jQuery('div#navigation').clone();
     var hiddenMenu = jQuery('div#hidden_menu').clone();
     var goto_text = "Go to..."

     //Append the <select> into the containers
     jQuery('div#navigation, div#hidden_menu').append('<select class="mobile_menu"></select>');

     var selectMenu = jQuery('select.mobile_menu');
     jQuery(selectMenu).append('<option value="">' + goto_text +'</option>');

     jQuery(mainMenu, hiddenMenu).children('ul').children('li').each(function() {

               var href = jQuery(this).children('a').attr('href');
               var text = jQuery(this).children('a').text();

                         jQuery(selectMenu).append('<option value="'+href+'">'+text+'</option>');

                         //FIRST SUBLEVEL
                         if (jQuery(this).children('ul').length > 0) {

                                   //Select child level items
                                   jQuery(this).children('ul').children('li').each(function() {

                                             //Get the links from the first sublevel
                                             var href2 = jQuery(this).children('a').attr('href');
                                             var text2 = jQuery(this).children('a').text();

                                             //Add the option to the menu
                                             jQuery(selectMenu).append('<option value="'+href2+'" class="mobile_sublevel">-- '+text2+'</option>');
                                             
                                             //SECOND SUBLEVEL
                                             if (jQuery(this).children('ul').length > 0) {

                                                       //Select child level items
                                                       jQuery(this).children('ul').children('li').each(function() {

                                                                 //Get the links from the second sublevel
                                                                 var href3 = jQuery(this).children('a').attr('href');
                                                                 var text3 = jQuery(this).children('a').text();

                                                                 //Add the option to the menu
                                                                 jQuery(selectMenu).append('<option value="'+href3+'" class="mobile_sublevel">------ '+text3+'</option>');
                                                                 
                                                                 //THIRD SUBLEVEL
                                                                 if (jQuery(this).children('ul').length > 0) {

                                                                           //Select child level items
                                                                           jQuery(this).children('ul').children('li').each(function() {

                                                                                     //Get the links from the second sublevel
                                                                                     var href4 = jQuery(this).children('a').attr('href');
                                                                                     var text4 = jQuery(this).children('a').text();

                                                                                     //Add the option to the menu
                                                                                     jQuery(selectMenu).append('<option value="'+href4+'" class="mobile_sublevel">---------- '+text4+'</option>');
                                                                           });
                                                                 }
                                                       });
                                             }
                                   });
                         }
     });

     jQuery('select.mobile_menu').change(function(){
               //location = this.options[this.selectedIndex].value;
               var id = this.options[this.selectedIndex].value;
               $('html,body').stop().animate({scrollTop: $("div"+id).offset().top - 50},'slow', function(){
                         if ( navigator.userAgent.indexOf('iPad') != -1 ) {
                                   var yPos = window.pageYOffset;
                                   var $fixedElement = $('div#hidden_menu');
                                   $fixedElement.css({ "position": "relative" });
                                   window.scroll(0,yPos);
                                   $fixedElement.css({ "position": "fixed" });
                         }
               });
     return false;
     });

});