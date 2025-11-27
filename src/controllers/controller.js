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