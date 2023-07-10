
const fs = require("fs");


function verificarUsuario(username, password) {

	const data = fs.readFileSync("db.json");
  	const usuarios = JSON.parse(data);
  	const usuarioEncontrado = usuarios.usuarios.find(
    user => user.username === username && user.password === password
  );

    if (usuarioEncontrado) {
      if (usuarioEncontrado.password === password) {
        // Contraseña correcta, redirigir al usuario a la página de inicio
        window.location.href = "alta-producto.html";
      } else {
        // Contraseña incorrecta
        alert("Contraseña incorrecta. Inténtalo de nuevo.");
      }
    } else {
      // Usuario no encontrado
      alert("El usuario no existe. Inténtalo de nuevo o regístrate.");
    }
  }

  
  verificarUsuario(usernameInput, passwordInput);
  
  const loginButton = document.getElementById("login-button");

  // Agregar evento de escucha de clic al botón
  loginButton.addEventListener("click", function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del botón (envío de formulario)

    // Obtener valores de los campos de entrada
    const emailInput = document.querySelector(".login__input__email").value;
    const passwordInput = document.querySelector(".login__input__password").value;

    verificarUsuario(emailInput, passwordInput);
  });

  const fs = require("fs");

// Leer el archivo JSON
const data = fs.readFileSync("db.json");
const baseDeDatos = JSON.parse(data);	

// Obtener referencia al formulario
const formulario = document.querySelector("form");

// Obtener referencia al contenedor de productos
const productosContainer = document.getElementById("productos-container");

// Agregar evento de escucha de envío al formulario
formulario.addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar el comportamiento por defecto del formulario

  // Obtener los valores ingresados por el usuario
  const imagenUrl = document.querySelector("input[name='imagen-url']").value;
  const categoria = document.querySelector("input[name='categoria']").value;
  const nombre = document.querySelector("input[name='nombre-producto']").value;
  const precio = document.querySelector("input[name='precio-producto']").value;
  const descripcion = document.querySelector("input[name='descripcion']").value;

  // Crear el objeto del producto
  const producto = {
    imagenUrl,
    categoria,
    nombre,
    precio,
    descripcion
  };

  // Agregar el producto al array de productos
  baseDeDatos.productos.push(producto);

  // Escribir los productos actualizados en el archivo JSON
  const newData = JSON.stringify(baseDeDatos, null, 2);
  fs.writeFileSync("productos.json", newData);

  // Agregar el código HTML del producto al contenedor de productos
  const productoHTML = `
    <div class="producto">
      <img src="${imagenUrl}" alt="" class="img__producto">
      <div class="producto__contenido">
        <p class="producto__nombre">${nombre}</p>
        <p class="producto__precio">$ ${precio}</p>
        <button type="submit" class="contact-button submit-button">
          <div>
            <span class="bg"></span>
            <span class="base"></span>
            <span class="text">
              Ver producto
            </span>
          </div>
        </button>
      </div>
    </div>
  `;

  productosContainer.insertAdjacentHTML("beforeend", productoHTML);

  console.log("Producto agregado correctamente a la base de datos JSON y al HTML.");
});
