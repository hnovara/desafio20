class Usuario {
    constructor(id, nombre, correo, contraseña) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
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

    validarContraseña(contraseña) {
        const contraseñaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return contraseñaRegex.test(contraseña);
    }
        
    registrarUsuario(nombre, correo, contraseña) {
        const id = this.usuariosRegistrados.length + 1;
        const usuario = new Usuario(id, nombre, correo, contraseña);
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

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    if (formulario.validarNombre(nombre) && formulario.validarCorreo(correo) && formulario.validarContraseña(contraseña)) {
        formulario.registrarUsuario(nombre, correo, contraseña);
        tablaUsuarios.render();
        document.getElementById('registroForm').reset();
    } else {
        alert('Completar los campos correctamente.');
    }
});

tablaUsuarios.render();