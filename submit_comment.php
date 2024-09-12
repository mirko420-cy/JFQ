<?php
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'mi_base_de_datos';
$user = 'tu_usuario';
$password = 'tu_contraseña';

// Crear una conexión a la base de datos
$conn = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);

// Verificar si la conexión fue exitosa
if (!$conn) {
    die("No se pudo conectar a la base de datos.");
}

// Obtener los datos del formulario
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$comentario = $_POST['comentario'];

// Insertar los datos en la base de datos
$sql = "INSERT INTO comentarios (nombre, email, comentario) VALUES (:nombre, :email, :comentario)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':nombre', $nombre);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':comentario', $comentario);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo "Comentario enviado con éxito.";
} else {
    echo "Error al enviar el comentario.";
}

// Cerrar la conexión
$conn = null;
?>
