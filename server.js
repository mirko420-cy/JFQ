const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();

// Configura la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sistema_comentarios',
    password: 'f3b4g85',
    port: 5432,
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.post('/comentarios', async (req, res) => {
    const { nombre, mensaje } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO comentarios (nombre, mensaje) VALUES ($1, $2) RETURNING *',
            [nombre, mensaje]
        );
        res.status(200).send('Comentario guardado con éxito');
    } catch (err) {
        res.status(500).send('Error al guardar el comentario');
    }
});

app.get('/comentarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM comentarios ORDER BY fecha DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send('Error al obtener los comentarios');
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
