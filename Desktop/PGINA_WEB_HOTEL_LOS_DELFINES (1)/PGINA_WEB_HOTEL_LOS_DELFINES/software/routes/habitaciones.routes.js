const express = require('express');
const db = require('../db'); // Conexión a MySQL

const router = express.Router();

// Obtener todas las habitaciones con sus imágenes
router.get('/', (req, res) => {
    db.query('SELECT * FROM habitaciones', (err, results) => {
        if (err) {
            console.error('❌ Error al obtener habitaciones:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
    console.log("Habitaciones obtenidas:", results); // Verificar datos en la terminal
        res.json(results);
    });
});

module.exports = router;
