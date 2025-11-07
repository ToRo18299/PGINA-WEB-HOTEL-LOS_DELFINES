const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',  // O usa '127.0.0.1' si localhost no funciona
    user: 'root',       // Tu usuario de MySQL
    password: '190101',       // Si tienes contraseña, agrégala aquí
    database: 'hotel_los_delfines', // Nombre de la base de datos
    port: 3305 // Cambia al puerto correcto
});

// Verificar conexión
db.connect(err => {
    if (err) {
        console.error(' Error al conectar a MySQL:', err);
    } else {
    console.log('Conectado a MySQL en el puerto 3305');
    }
});

module.exports = db;
