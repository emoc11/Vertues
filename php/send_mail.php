<?php

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

if(isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['email']) && isset($_POST['message'])){

	$nom = test_input($_POST['nom']);
	$prenom = test_input($_POST['prenom']);
	$email = test_input($_POST['email']);
	$societe = test_input($_POST['societe']);
	$subject = "[Vertues.fr] mail de ".$prenom." ".$nom." de la société ".$societe;
	$message = test_input($_POST['message']);
	$to = "vertues.contact@gmail.com";

	ini_set("SMTP","aspmx.l.google.com");
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
	$headers .= "From: ".$email."". "\r\n";

	if(mail($to, $subject, $message, $headers )){
		$response = 'Message envoyé ! Merci pour votre intérêt.';
	}else{
		$response = 'Une erreur est survenue. Veuillez nous excuser pour la gêne occasionnée. Si ce problème persiste, merci de nous contacter directement à l\'adresse <a href="mailto:vertues_contact@gmail.com">vertues_contact@gmail.com</a>.';
	}

}else{
	$response = 'Tous les champs n\'ont pas été remplis, veuillez les remplir correctement et réessayer.';
}
echo json_encode(['response' => $response]);

?>