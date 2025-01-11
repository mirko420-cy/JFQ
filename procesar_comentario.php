<?php
// Habilitar la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configuración de la base de datos
$host = "127.0.0.1:3306";
$usuario = "u509991063_turismouser"; // Cambia esto
$contraseña = "Turismo1338"; // Cambia esto
$baseDatos = "u509991063_turismojfq"; // Cambia esto si es necesario

$conn = new mysqli($host, $usuario, $contraseña, $baseDatos);

// Verificar conexión
if ($conn->connect_error) {
    error_log("Error de conexión: " . $conn->connect_error);
    die("Conexión fallida: " . $conn->connect_error);
}

// Mostrar comentarios (manejo de acción GET)
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

// Procesar formulario (manejo de acción POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar datos del formulario
    if (!isset($_POST['nombre'], $_POST['correo'], $_POST['mensaje']) || 
        empty($_POST['nombre']) || empty($_POST['correo']) || empty($_POST['mensaje'])) {
        error_log("Datos incompletos en el formulario: " . json_encode($_POST));
        die("Error: Todos los campos son obligatorios.");
    }

    // Limpiar y escapar los datos
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $correo = $conn->real_escape_string($_POST['correo']);
    $mensaje = $conn->real_escape_string($_POST['mensaje']);
    $fecha = date('Y-m-d'); // Fecha actual

    // Construir consulta SQL
    $sql = "INSERT INTO comentarios (nombreCompleto, correo, mensaje, fecha) VALUES ('$nombre', '$correo', '$mensaje', '$fecha')";

    // Depurar consulta SQL
    error_log("Consulta SQL: $sql");

    // Ejecutar consulta
    if ($conn->query($sql) === TRUE) {
        echo "Comentario enviado correctamente.";
    } else {
        error_log("Error en la consulta SQL: " . $conn->error);
        die("Error al guardar el comentario: " . $conn->error);
    }
}

$conn->close();
?>