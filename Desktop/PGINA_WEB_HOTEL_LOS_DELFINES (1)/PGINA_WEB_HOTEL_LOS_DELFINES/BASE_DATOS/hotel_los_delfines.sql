CREATE DATABASE hotel_los_delfines;
USE hotel_los_delfines;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'admin') DEFAULT 'cliente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE habitaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    capacidad INT NOT NULL
);
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    habitacion_id INT,
    fecha_entrada DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (habitacion_id) REFERENCES habitaciones(id) ON DELETE CASCADE
);
CREATE TABLE pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reserva_id INT,
    monto DECIMAL(10,2) NOT NULL,
    metodo_pago ENUM('tarjeta', 'efectivo', 'transferencia') NOT NULL,
    estado ENUM('pendiente', 'completado', 'fallido') DEFAULT 'pendiente',
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id) ON DELETE CASCADE
);
CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(255) -- URL de la imagen del servicio
);
CREATE TABLE reservas_servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reserva_id INT,
    servicio_id INT,
    cantidad INT DEFAULT 1,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id) ON DELETE CASCADE,
    FOREIGN KEY (servicio_id) REFERENCES servicios(id) ON DELETE CASCADE
);
CREATE TABLE tienda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    imagen VARCHAR(255) -- URL de la imagen del producto
);
INSERT INTO usuarios (nombre, email, telefono, password, rol) VALUES
('Juan Pérez', 'juan@email.com', '123456789', 'clave123', 'cliente'),
('Admin Hotel', 'admin@hoteldelfines.com', '987654321', 'admin123', 'admin');
INSERT INTO habitaciones (numero_habitacion, tipo, precio, estado, descripcion, imagen) VALUES
(101, 'individual', 50.00, 'disponible', 'Habitación cómoda con vista al mar.', 'img/habitacion1.jpg'),
(102, 'doble', 80.00, 'ocupada', 'Ideal para parejas con desayuno incluido.', 'img/habitacion2.jpg'),
(201, 'suite', 150.00, 'disponible', 'Suite de lujo con jacuzzi y terraza.', 'img/habitacion3.jpg');
INSERT INTO servicios (nombre, descripcion, precio, imagen) VALUES
('Bar y Comida', 'Disfruta de los mejores platillos gourmet.', 20.00, 'img/bar_comida.jpg'),
('Viaje a Islas', 'Excursión a islas paradisíacas.', 100.00, 'img/viaje_isla.jpg');
SHOW TABLES;
SELECT * FROM usuarios;
SELECT * FROM habitaciones;
SELECT * FROM reservas;
SELECT * FROM servicios;
SELECT * FROM tienda;
