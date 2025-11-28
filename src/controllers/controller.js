function iniciarSesion() {
    const correo = document.getElementById('correo_input').value;
    const contrasena = document.getElementById('contrasena_input').value;

    if (!correo) {
        alert('Por favor, ingrese su correo electrónico.');
        return;
    }

    if (!contrasena) {
        alert('Por favor, ingrese su contraseña.');
        return;
    }

    // Validar según correo y contraseña predefinidos
    if (correo.includes('est')) {
        if (contrasena === 'estudiante123') {
            window.location.href = 'vista_estudiante.html';
        }
    } else if (correo.includes('prof')) {
        if (contrasena === 'profesor123') {
            window.location.href = 'vista_prof.html';
        }
    } else if (correo.includes('admin')) {
        if (contrasena === 'admin123') {
            window.location.href = 'vista_admin.html';
        }
    } else {
        alert('Correo o contraseña incorrectos.');
    }
}

function limpiarCampos() {
    document.getElementById('correo_input').value = '';
    document.getElementById('contrasena_input').value = '';
}

function subirArchivo(event) {
    const archivo = event.target.files[0];
    if (archivo) {
        document.getElementById("archivoNombre").textContent ="Archivo: " + archivo.name;
    }
}

function descargarArchivo() {
    const contenido =
        "Este es un archivo de ejemplo.\nPuedes reemplazar este texto por el contenido real.";
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tarea_ejemplo.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}