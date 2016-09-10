<?php
// Check for empty fields
if(empty($_POST['email']) 
  
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
echo(email);
$email_address = $_POST['email'];

// Create the email and send the message
$to = 'email'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Someone just answered your question";
$email_body = "Hi there!\n\n"."someone has just relied to your comment";
$headers = "From: indiancreativeforum.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To:";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>