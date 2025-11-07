const express = require('express');
const router = express.Router();
const db = require('../db'); // Importamos la conexión a MySQL

// 🔹 CREAR UNA NUEVA RESERVA (POST)
router.post('/crear', (req, res) => {
    const { usuario_id, habitacion_id, fecha_entrada, fecha_salida } = req.body;

    if (!usuario_id || !habitacion_id || !fecha_entrada || !fecha_salida) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    db.query(
        'INSERT INTO reservas (usuario_id, habitacion_id, fecha_entrada, fecha_salida, estado) VALUES (?, ?, ?, ?, "pendiente")',
        [usuario_id, habitacion_id, fecha_entrada, fecha_salida],
        (err, result) => {
            if (err) {
                console.error('❌ Error al crear la reserva:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.status(201).json({ message: '✅ Reserva creada con éxito', reserva_id: result.insertId });
            }
        }
    );
});

// 🔹 OBTENER TODAS LAS RESERVAS (GET)
router.get('/', (req, res) => {
    db.query('SELECT * FROM reservas', (err, results) => {
        if (err) {
            console.error('❌ Error al obtener reservas:', err);
            res.status(500).json({ error: 'Error en el servidor' });
        } else {
            res.json(results);
        }
    });
});

// 🔹 CANCELAR UNA RESERVA (DELETE)
router.delete('/cancelar/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM reservas WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('❌ Error al cancelar la reserva:', err);
            res.status(500).json({ error: 'Error en el servidor' });
        } else {
            res.json({ message: '✅ Reserva cancelada con éxito' });
        }
    });
});

module.exports = router;
