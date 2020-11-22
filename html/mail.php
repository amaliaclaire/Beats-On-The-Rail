<?php

  $name = iconv("UTF-8", "ISO-8859-2", $_POST['name']);
  $email = iconv("UTF-8", "ISO-8859-2", $_POST['email']);
  $comments = iconv("UTF-8", "ISO-8859-2", $_POST['comments']);
  $thank_you = "Message sent!  We've received your email. We'll be in touch as soon as we possibly can!";

  require_once('phpmailer.php'); //call php mailer
  $mail = new PHPMailer();

  //set the parameters
  $mail->From = $email;
  $mail->FromName = $name;
  $mail->Subject = "Write here a subject, what you want to see, when received a message from your site";

  $address = "Write here your email address, for example: john_doe@gmail.com";
  $mail->AddAddress($address, "Your Address");
  $mail->Body = "From: $name\nEmail address: $email\nMessage:\n\n$comments\n";

  $status = $mail->Send(); //send the message

  //write the results
  if (!$status)
   {
   echo "
        <div class=\"error\">
             <p>
             Mailer Error:   $mail->ErrorInfo
             </p>
        </div>";

   }
   else echo "
        <div class=\"success\">
             <p>
             $thank_you
             </p>
        </div>";

  $mail->ClearAddresses();

?>