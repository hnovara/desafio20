class Usuario {
    constructor(id, nombre, correo, contraseña) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
    }
}


const usuariosIniciales = [
    new Usuario(1, "Hernán Novara", "hnovara@hotmail.com", "Pass1234"),
    new Usuario(2, "Natalia Novara", "nnovara@hotmail.com", "Pass1234"),
    new Usuario(3, "Federico Novara", "fnovara@hotmail.com", "Pass1234")
];


class Formulario {
    constructor() {
        this.usuariosRegistrados = usuariosIniciales;
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
        const tablaBody = document.getElementById('tablaUsuarios').getElementsByTagName('tbody')[0];
        tablaBody.innerHTML = ''; 

        for (let i = 0; i < this.usuarios.length; i++) {
            const usuario = this.usuarios[i];
            const row = document.createElement('tr');
            const nombreCell = document.createElement('td');
            nombreCell.textContent = usuario.nombre;
            const correoCell = document.createElement('td');
            correoCell.textContent = usuario.correo;
            row.appendChild(nombreCell);
            row.appendChild(correoCell);
            tablaBody.appendChild(row);
        }
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
        alert('Debe completar los campos correctamente.');
    }
});


tablaUsuarios.render();