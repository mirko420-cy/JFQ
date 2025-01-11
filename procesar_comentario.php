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

// Procesar formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = isset($_POST['nombre']) ? $conn->real_escape_string($_POST['nombre']) : null;
    $correo = isset($_POST['correo']) ? $conn->real_escape_string($_POST['correo']) : null;
    $mensaje = isset($_POST['mensaje']) ? $conn->real_escape_string($_POST['mensaje']) : null;

    if ($nombre && $correo && $mensaje) {
        $fecha = date('Y-m-d'); // Fecha actual

        // Insertar datos en la base de datos
        $sql = "INSERT INTO comentarios (nombreCompleto, correo, mensaje, fecha) VALUES ('$nombre', '$correo', '$mensaje', '$fecha')";

        if ($conn->query($sql) === TRUE) {
            echo "Comentario enviado correctamente.";
        } else {
            echo "Error al guardar el comentario: " . $conn->error;
        }
    } else {
        echo "Error: Todos los campos son obligatorios.";
    }
} else {
    echo "No se recibió ningún formulario.";
}


// Mostrar todos los comentarios debajo del formulario
// Mostrar comentarios
if (isset($_GET['action']) && $_GET['action'] === 'mostrar') {
    $sql = "SELECT nombreCompleto, mensaje FROM comentarios ORDER BY id DESC";
    $resultado = $conn->query($sql);

    if ($resultado->num_rows > 0) {
        echo "<ul>";
        while ($fila = $resultado->fetch_assoc()) {
            echo "<li><strong>" . htmlspecialchars($fila['nombreCompleto']) . ":</strong> " . htmlspecialchars($fila['mensaje']) . "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>No hay comentarios todavía.</p>";
    }
    $conn->close();
    exit();
}
// Cerrar conexión
$conn->close();
?>