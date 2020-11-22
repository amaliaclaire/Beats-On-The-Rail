$(document).ready(function(){

     var i = 1;
     $('#closed').click(function(){
               i = i + 1;
               $("#top_toc").slideDown("slow", function(){
                         if ( i == 2 ) { $(this).mCustomScrollbar(); }
               });
               $(this).css("display","none");
               $('#opened').css("display","block");
     });
     
     $('#opened').click(function(){
               $("#top_toc").slideUp("slow");
               $(this).css("display","none");
               $('#closed').css("display","block");

     });
     
     $(window).scroll(function(){
               var start_pos = $('h2#start').offset().top;
               var start_pos = start_pos - 150;
               var pagetop = $(this).scrollTop();
               if (pagetop >= start_pos) {
                         $('div#top_menu').slideDown();
               }
               if (pagetop <= start_pos) {
                         $('div#top_menu').css("display","none");
               }
     });



});