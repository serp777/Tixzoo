<?php
require_once 'authController.php';
require 'PHPMailer-master/PHPMailerAutoload.php';
class emailControllerClass {
	private function establishConnection(){
		$con = new authControllerClass();
		return $con->getConnection();
	}
	private function executeSqlQuery($sql,$dbconn){
		$result = $dbconn->query($sql);
		return $result;
	}
	private function mailInitializer()
	{
		$mail = new PHPMailer;
		$mail->SMTPDebug = 3;                               // Enable verbose debug output
		$mail->isSMTP();                                      // Set mailer to use SMTP
		$mail->Host = 'smtpout.secureserver.net';  // Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = 'tixzooadmin@mytixzoo.com';                 // SMTP username
		$mail->Password = 'computer123';                           // SMTP password
		//$mail->SMTPSecure = 'ssl';     Disabled because this broke it for some reaso                       // Enable TLS encryption, `ssl` also accepted
		$mail->Port = 80;  
		return $mail;              
	}
	public function sendEmail($email, $message)
	{
		$mail = $this->mailInitializer();
		$mail->From = 'tixzooadmin@mytixzoo.com';
		$mail->FromName = 'Tixzoo Newsletter';
		$mail->addAddress($email, 'newsletter');     // Add a recipient
		$mail->addAddress($email);               // Name is optional
		$mail->addReplyTo('tixzooadmin@mytixzoo.com', 'Newsletter');
		//$mail->addCC('cc@example.com');
		//$mail->addBCC('bcc@example.com');
		$mail->isHTML(true);                                  // Set email format to HTML
		$mail->Subject = 'Newsletter';
		$mail->Body    = $message;
		$mail->AltBody = $message;
		if(!$mail->send()) {
		    echo 'Message could not be sent.';
		    $result = 'Mailer Error: ' . $mail->ErrorInfo;
		} else {
		    $result = 'Message has been sent';
		}
		return $result;
	}
}