<?php
// Configuración de la base de datos
$host = "127.0.0.1:3306";
$usuario = "u509991063_turismouser"; // Cambia esto
$contraseña = "Turismo1337"; // Cambia esto
$baseDatos = "u509991063_turismojfq"; // Cambia esto si es necesario

// Conexión a la base de datos
$conn = new mysqli($host, $usuario, $contraseña, $baseDatos);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos del formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombreCompleto = $conn->real_escape_string($_POST['nombre']);
    $correo = $conn->real_escape_string($_POST['correo']);
    $mensaje = $conn->real_escape_string($_POST['mensaje']);
    $fecha = date('Y-m-d'); // Obtener la fecha actual en formato compatible con MySQL

    // Insertar los datos en la tabla "comentarios"
    $sql = "INSERT INTO comentarios (nombreCompleto, correo, mensaje, fecha) VALUES ('$nombreCompleto', '$correo', '$mensaje', '$fecha')";

    if ($conn->query($sql) === TRUE) {
        echo "Comentario enviado correctamente.";
    } else {
        echo "Error al enviar el comentario: " . $conn->error;
    }
}

// Cerrar conexión
$conn->close();
?>