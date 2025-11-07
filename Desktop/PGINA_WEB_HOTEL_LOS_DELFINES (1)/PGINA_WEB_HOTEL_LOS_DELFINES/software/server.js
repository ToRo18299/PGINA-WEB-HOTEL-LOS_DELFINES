require('dotenv').config();
console.log("Clave JWT cargada:", process.env.JWT_SECRET);


const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors()); // Habilita CORS para permitir peticiones desde el frontend
app.use(express.json()); // Permite recibir datos en formato JSON

// 📂 Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, 'public')));

// 🏠 Ruta principal que carga la página web
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Paginaweb.html')); // Asegúrate de que este archivo existe
});

// Importar y usar las rutas de la API
const usuariosRoutes = require('./routes/usuarios.routes');
const reservasRoutes = require('./routes/reservas.routes');
const habitacionesRoutes = require('./routes/habitaciones.routes');

app.use('/usuarios', usuariosRoutes);
app.use('/reservas', reservasRoutes);
app.use('/habitaciones', habitacionesRoutes);
app.use('/imagenes', express.static(path.join(__dirname, 'public/imagenes')));



// Configurar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
