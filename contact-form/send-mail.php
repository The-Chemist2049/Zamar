<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$name = htmlspecialchars(trim($_POST['name'] ?? ''));
$email = htmlspecialchars(trim($_POST['email'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

if (!$name || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Please fill all fields correctly."]);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'mail.zamarsolutions.co.ke';
    $mail->SMTPAuth = true;
    $mail->Username = 'marketing@zamarsolutions.co.ke';
    $mail->Password = 'your_password_here';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('marketing@zamarsolutions.co.ke', 'Zamar Website');
    $mail->addAddress('marketing@zamarsolutions.co.ke');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(false);
    $mail->Subject = "New Customer Inquiry Received via Your Website";
    $mail->Body = "Name: $name\nEmail: $email\nMessage:\n$message";

    $mail->send();
    echo json_encode(["status" => "success", "message" => "Email sent successfully."]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Mailer Error: " . $mail->ErrorInfo]);
}
?>
