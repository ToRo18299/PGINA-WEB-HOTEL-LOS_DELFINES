const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); 

require('dotenv').config(); // Agregar esta línea al inicio del archivo
console.log("Clave JWT cargada en login:", process.env.JWT_SECRET);

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log("Intentando iniciar sesión con:", email);

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('❌ Error en la base de datos:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        if (results.length === 0) {
            console.log('Usuario no encontrado en la base de datos.');
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const usuario = results[0];

    console.log("Usuario encontrado:", usuario);

        try {
            let passwordMatch = false;

            // 📌 Verificar si la contraseña almacenada es encriptada o en texto plano
            if (usuario.password.startsWith('$2b$')) {
                // ✅ La contraseña está encriptada, usar bcrypt.compare()
                passwordMatch = await bcrypt.compare(password, usuario.password);
            } else {
                // ✅ La contraseña está en texto plano, comparar directamente
                passwordMatch = password === usuario.password;
            }

            console.log("Contraseña ingresada:", password);
            console.log("Contraseña en base de datos:", usuario.password);
            console.log("Coincide la contraseña?:", passwordMatch);

            if (!passwordMatch) {
                console.log('Contraseña incorrecta.');
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }

            // ✅ Generar token JWT
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email }, 
                process.env.JWT_SECRET, 
                { expiresIn: '2h' }
            );

            console.log('Inicio de sesión exitoso para:', usuario.email);

            return res.json({ 
                message: '✅ Inicio de sesión exitoso', 
                token, 
                usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } 
            });

        } catch (error) {
            console.error('❌ Error en la comparación de contraseñas:', error);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
    });
});


// 🔹 REGISTRO DE USUARIO (POST)
router.post('/registro', async (req, res) => {
    const { nombre, email, password } = req.body;

    // ✅ Verificar si el usuario ya existe
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('❌ Error en la base de datos:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: '❌ El correo ya está registrado' });
        }

        try {
            // ✅ Encriptar la contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // ✅ Insertar usuario en la base de datos
            db.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', 
                [nombre, email, hashedPassword], 
                (err, result) => {
                    if (err) {
                        console.error('❌ Error al registrar usuario:', err);
                        return res.status(500).json({ error: 'Error en el servidor' });
                    }
                    return res.status(201).json({ message: '✅ Usuario registrado exitosamente' });
                }
            );

        } catch (error) {
            console.error('❌ Error en el proceso de registro:', error);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
    });
});


module.exports = router;



