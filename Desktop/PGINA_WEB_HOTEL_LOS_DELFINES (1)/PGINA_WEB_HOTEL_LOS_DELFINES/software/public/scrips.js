document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("register-name").value.trim();
            const email = document.getElementById("register-email").value.trim();
            const password = document.getElementById("register-password").value.trim();
            const errorMessage = document.getElementById("register-error");

            errorMessage.innerHTML = ""; // Limpiar errores previos

            if (name.length < 3) {
                errorMessage.innerHTML = "❌ El nombre debe tener al menos 3 caracteres";
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                errorMessage.innerHTML = "❌ El email no es válido";
                return;
            }

            if (password.length < 8) {
                errorMessage.innerHTML = "❌ La contraseña debe tener al menos 8 caracteres";
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/usuarios/registro", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre: name, email, password })
                });

                const data = await response.json();
                console.log("Respuesta del servidor:", data); // Debug

                if (response.ok) {
                    alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");

                    // ✅ Corregir la redirección al login
                    window.location.href = "iniciodesecion.html";
                } else {
                    errorMessage.innerHTML = `❌ ${data.error}`;
                }
            } catch (error) {
                errorMessage.innerHTML = "❌ Error en la conexión con el servidor";
                console.error("Error en la petición:", error);
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // 📌 Manejo del registro (tu código ya existente)
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("register-name").value.trim();
            const email = document.getElementById("register-email").value.trim();
            const password = document.getElementById("register-password").value.trim();
            const errorMessage = document.getElementById("register-error");

            errorMessage.innerHTML = ""; // Limpiar errores previos

            if (name.length < 3) {
                errorMessage.innerHTML = "❌ El nombre debe tener al menos 3 caracteres";
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                errorMessage.innerHTML = "❌ El email no es válido";
                return;
            }

            if (password.length < 8) {
                errorMessage.innerHTML = "❌ La contraseña debe tener al menos 8 caracteres";
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/usuarios/registro", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre: name, email, password })
                });

                const data = await response.json();
                console.log("Respuesta del servidor (Registro):", data); // Debug

                if (response.ok) {
                    alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
                    window.location.href = "iniciodesecion.html"; // Redirección al login
                } else {
                    errorMessage.innerHTML = `❌ ${data.error}`;
                }
            } catch (error) {
                errorMessage.innerHTML = "❌ Error en la conexión con el servidor";
                console.error("Error en la petición:", error);
            }
        });
    }

    // 📌 Manejo del inicio de sesión (Nuevo código)
    const loginForm = document.getElementById("form-validation"); // Asegurar que el ID es correcto

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value.trim();
            const parrafo = document.getElementById("login-error");

            parrafo.innerHTML = "";

            console.log("Enviando solicitud de inicio de sesión con:", { email, password });

            try {
                const response = await fetch("http://localhost:3000/usuarios/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log("Respuesta del servidor (Login):", data);

                if (response.ok) {
                    alert("✅ Inicio de sesión exitoso.");

                    if (data.token) {
                        localStorage.setItem("token", data.token);
                    } else {
                        console.error("❌ No se recibió un token.");
                    }

                    if (data.usuario) {
                        localStorage.setItem("usuario", JSON.stringify(data.usuario));
                    } else {
                        console.error("❌ No se recibieron los datos del usuario.");
                    }

                    setTimeout(() => {
                        window.location.href = "Paginaweb.html"; // Verifica que la página existe
                    }, 1000);
                } else {
                    parrafo.innerHTML = `❌ ${data.error}`;
                }
            } catch (error) {
                parrafo.innerHTML = "❌ Error en la conexión con el servidor";
                console.error("❌ Error en la petición:", error);
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    async function cargarHabitaciones() {
        try {
            console.log("Enviando solicitud para obtener habitaciones...");

            const respuesta = await fetch("http://localhost:3000/habitaciones");

            console.log("Estado de la respuesta:", respuesta.status, respuesta.statusText);
            console.log("Headers:", respuesta.headers);

            if (!respuesta.ok) {
                throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
            }

            const habitaciones = await respuesta.json();
            console.log("Habitaciones recibidas:", habitaciones);

            let habitacionesHTML = "";

            habitaciones.forEach(habitacion => {
                let imagenes = {
                    "individual": "habitacion1.jpg",
                    "doble": "habitacion2.jpg",
                    "suite": "habitacion_3.jpg",
                    "familiar": "habitacion_6.jpg"
                };

                let imagenFinal = imagenes[habitacion.tipo.toLowerCase()] 
                    ? `http://localhost:3000/imagenes/${imagenes[habitacion.tipo.toLowerCase()]}`
                    : "http://localhost:3000/imagenes/default.jpg";

                habitacionesHTML += `
                    <div class="habitacion">
                        <img src="${imagenFinal}" alt="${habitacion.tipo}" class="habitacion-img">
                        <h2>${habitacion.tipo}</h2>
                        <p>${habitacion.descripcion}</p>
                        <p><strong>Precio:</strong> $${parseFloat(habitacion.precio).toFixed(2)}</p>
                        <p><strong>Estado:</strong> ${habitacion.estado}</p>
                    </div>
                `;
            });

            document.getElementById("habitaciones-lista").innerHTML = habitacionesHTML;

        } catch (error) {   
            document.getElementById("habitaciones-lista").innerHTML = 
                `<p style="color: red;">❌ Error al cargar las habitaciones.</p>`;
            console.error("❌ Error en la solicitud:", error);
        }
    }

    if (document.getElementById("habitaciones-lista")) {
        cargarHabitaciones();
    }
});
