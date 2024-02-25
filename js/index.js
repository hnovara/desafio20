class Usuario {
    constructor(id, nombre, correo, contrasenia) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.contrasenia = contrasenia;
    }
}

class Formulario {
    constructor() {
        this.usuariosRegistrados = [];
    }

    validarNombre(nombre) {
        return nombre.trim().length >= 3;
    }

    validarCorreo(correo) {
        const correoRegex = /\S+@\S+\.\S+/;
        return correoRegex.test(correo);
    }

    validarContrasenia(contrasenia) {
        // Se requieren al menos 4 caracteres
         return contrasenia.trim().length >= 4;
    }
        
    registrarUsuario(nombre, correo, contrasenia) {
        const id = this.usuariosRegistrados.length + 1;
        const usuario = new Usuario(id, nombre, correo, contrasenia);
        this.usuariosRegistrados.push(usuario);
    }
}

class TablaUsuarios {
    constructor(usuarios) {
        this.usuarios = usuarios;
    }

    render() {
        const tabla = document.getElementById('tablaUsuarios').getElementsByTagName('tbody')[0];
        tabla.innerHTML = '';
        this.usuarios.forEach(usuario => {
            const row = tabla.insertRow();
            row.insertCell(0).textContent = usuario.id;
            row.insertCell(1).textContent = usuario.nombre;
            row.insertCell(2).textContent = usuario.correo;
        });
    }
}

const formulario = new Formulario();
const tablaUsuarios = new TablaUsuarios(formulario.usuariosRegistrados);

// Agregar el formulario al DOM
document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contrasenia = document.getElementById('contrasenia').value;

    if (formulario.validarNombre(nombre) && formulario.validarCorreo(correo) && formulario.validarContrasenia(contrasenia)) {
        formulario.registrarUsuario(nombre, correo, contrasenia);
        tablaUsuarios.render();
        // Limpiar campos después del registro exitoso
        document.getElementById('registroForm').reset();
    } else {
        alert('Por favor, complete los campos correctamente.');
    }
});

// Agregar la tabla de usuarios al DOM
tablaUsuarios.render();