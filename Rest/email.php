<?php
require 'PHPMailer-master/PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->SMTPDebug = 3;                               // Enable verbose debug output
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtpout.secureserver.net';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'tixzooadmin@mytixzoo.com';                 // SMTP username
$mail->Password = 'computer123';                           // SMTP password
//$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 80;                                    // TCP port to connect to
$mail->From = 'tixzooadmin@mytixzoo.com';
$mail->FromName = 'AutoMailer';
$mail->addAddress('arusse02@gmail.com', 'Aubs test');     // Add a recipient
$mail->addAddress('arusse02@gmail.com');               // Name is optional
$mail->addReplyTo('tixzooadmin@mytixzoo.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Here is the subject';
$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
