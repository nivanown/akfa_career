<?php
// Файлы phpmailer
require 'form/class.phpmailer.php';
require 'form/class.smtp.php';

$name = $_POST['name'];
$number = $_POST['number'];
$email = $_POST['email'];

// Настройки
$mail = new PHPMailer;

$mail->isSMTP();                                           
$mail->Host        = 'office.akfagroup.com';                                               
$mail->Username    = 'res\hr';                     
$mail->Password    = '6SrmkGVNfnoCUj';                               
$mail->SMTPAuth    = false;
$mail->SMTPAutoTLS = false; 
$mail->Port        = 25;   
$mail->setFrom('HR@akfagroup.com');
$mail->addAddress('HR@akfagroup.com');

// Прикрепление файлов
for ($ct = 0; $ct < count($_FILES['userfile']['tmp_name']); $ct++) {
    $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['userfile']['name'][$ct]));
    $filename = $_FILES['userfile']['name'][$ct];
    if (move_uploaded_file($_FILES['userfile']['tmp_name'][$ct], $uploadfile)) {
        $mail->addAttachment($uploadfile, $filename);
    } else {
        $msg .= 'Failed to move file to ' . $uploadfile;
    }
}   
                                 
// Письмо
$mail->isHTML(true); 
$mail->Subject = "Akfagroup"; // Заголовок письма
$mail->Body    = getMessageBody('Вакансии'); // Текст письма
$mail->CharSet = 'UTF-8';

// Результат
if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'ok';
}

// Сортировка текста
function getMessageBody() {
    $name    = $_POST['name'];
    $phone   = $_POST['phone'];
    $email   = $_POST['email'];
    $comment = $_POST['comment'];

    $result = '';

    if (isset($name) && !empty($name)) {
        $result .= "<p>Имя: {$name}</p>";
    }

    if (isset($phone) && !empty($phone)) {
        $result .= "<p>Номер телефона: {$phone}</p>";
    }

    if (isset($email) && !empty($email)) {
        $result .= "<p>E-mail: {$email}</p>";
    }

    if (isset($comment) && !empty($comment)) {
        $result .= "<p>Сообщение: {$comment}</p>";
    }

    return $result;
}

?>