function actualizarPresupuesto() {
    // Obtener los valores seleccionados por el usuario
    const producto = document.getElementById("producto").value;
    const plazo = parseInt(document.getElementById("plazo").value);
    const extras = obtenerExtras();

    // Calcular el presupuesto base
    let presupuestoBase = 0;
    switch (producto) {
        case "opcion1":
            presupuestoBase = 100;
            break;
        case "opcion2":
            presupuestoBase = 150;
            break;
        case "opcion3":
            presupuestoBase = 200;
            break;
        default:
            presupuestoBase = 0;
    }

    // Calcular el costo total incluyendo los extras
    let costoTotal = presupuestoBase;
    for (let extra of extras) {
        switch (extra) {
            case "extra1":
                costoTotal += 50;
                break;
            case "extra2":
                costoTotal += 75;
                break;
            case "extra3":
                costoTotal += 100;
                break;
            default:
                break;
        }
    }

    // Calcular el costo mensual
    let costoMensual = costoTotal / plazo;

    // Mostrar el presupuesto final
    document.getElementById("presupuesto").textContent = `${costoMensual.toFixed(2)}€ al mes`;
}

function obtenerExtras() {
    const extras = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        extras.push(checkbox.value);
    });
    return extras;
}

function validarNombre() {
    var nombre = document.getElementById('nombre').value;
    var regex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]{1,15}$/;
    if (!regex.test(nombre)) {
        alert("El nombre debe contener solo letras y tener hasta 15 caracteres.");
        return false;
    }
    return true;
}

// Función para validar los apellidos
function validarApellidos() {
    var apellidos = document.getElementById('apellidos').value;
    var regex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]{1,40}$/;
    if (!regex.test(apellidos)) {
        alert("Los apellidos deben contener solo letras y tener hasta 40 caracteres.");
        return false;
    }
    return true;
}

// Función para validar el teléfono
function validarTelefono() {
    var telefono = document.getElementById('telefono').value;
    var regex = /^\d{1,9}$/;
    if (!regex.test(telefono)) {
        alert("El teléfono debe contener solo números y tener hasta 9 dígitos.");
        return false;
    }
    return true;
}

// Función para validar el correo electrónico
function validarEmail() {
    var email = document.getElementById('email').value;
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(email)) {
        alert("Ingrese un correo electrónico válido.");
        return false;
    }
    return true;
}

// Función para validar el formulario completo
function validarFormulario() {
    var nombreValido = validarNombre();
    var apellidosValidos = validarApellidos();
    var telefonoValido = validarTelefono();
    var emailValido = validarEmail();

    if (!nombreValido || !apellidosValidos || !telefonoValido || !emailValido) {
        return false; // Evita que se envíe el formulario si hay errores
    }

    return true; // Permite enviar el formulario si no hay errores
}
