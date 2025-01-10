const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();

// Configura la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',        // Usuario de PostgreSQL
    host: 'localhost',       // Dirección del servidor de base de datos
    database: 'sistema_comentarios', // Nombre de la base de datos
    password: 'f3b4g85',     // Contraseña de la base de datos
    port: 5050,              // Puerto de PostgreSQL (por defecto es 5432)  
});

// Middleware para procesar cuerpos JSON y formularios URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para insertar un comentario
app.post('/comentarios', async (req, res) => {
    const { nombre, mensaje } = req.body;

    // Validación simple (puedes agregar más validaciones)
    if (!nombre || !mensaje) {
        return res.status(400).send('Nombre y mensaje son requeridos');
    }

    try {
        const result = await pool.query(
            'INSERT INTO comentarios (nombre, mensaje) VALUES ($1, $2) RETURNING *',
            [nombre, mensaje]
        );
        
        // Puedes devolver el comentario insertado si lo deseas
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error al guardar el comentario:', err);
        res.status(500).send('Error al guardar el comentario');
    }
});

// Ruta para obtener todos los comentarios
app.get('/comentarios', async (req, res) => {
    const page = parseInt(req.query.page) || 1;  // Página solicitada, por defecto 1
    const limit = 10;  // Número de comentarios por página
    const offset = (page - 1) * limit;  // Desplazamiento

    try {
        const result = await pool.query(
            'SELECT * FROM comentarios ORDER BY fecha DESC LIMIT $1 OFFSET $2',
            [limit, offset]
        );

        res.status(200).json(result.rows);  // Devuelve los comentarios como JSON
    } catch (err) {
        console.error('Error al obtener los comentarios:', err);
        res.status(500).send('Error al obtener los comentarios');
    }
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


















app.post('/comentarios', async (req, res) => {
    console.log('Solicitud recibida en /comentarios');
    console.log('Cuerpo de la solicitud:', req.body); // Muestra los datos recibidos del cliente

    const { nombre, mensaje } = req.body;

    // Validación de datos
    if (!nombre || !mensaje) {
        console.log('Validación fallida: Nombre o mensaje faltantes');
        return res.status(400).send('Nombre y mensaje son requeridos');
    }

    try {
        console.log('Intentando guardar el comentario en la base de datos...');
        const result = await pool.query(
            'INSERT INTO comentarios (nombre, mensaje) VALUES ($1, $2) RETURNING *',
            [nombre, mensaje]
        );
        console.log('Comentario guardado correctamente:', result.rows[0]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error al guardar el comentario:', err); // Muestra detalles del error
        res.status(500).send('Error al guardar el comentario');
    }
});
