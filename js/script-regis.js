// REGISTRO
function botonRegistrar(){
    var mensaje = "";

    // Eliminar mensajes de error anteriores
    var errorMsgs = document.querySelectorAll("#nuevoes p");
    errorMsgs.forEach(function (msg) {
        msg.remove();
    });

    const usuario = document.getElementById("usuario").value;
    const contra = document.getElementById("contra").value;
    const contra2 = document.getElementById("contra2").value;
    const correo = document.getElementById("correo").value;
    const sexo = document.getElementById("sexo").value;
    const nacimiento = document.getElementById("nacimiento").value;

    // Validaciones
    if (!/^[A-Za-z][A-Za-z0-9]{2,14}$/.test(usuario)) {
        mensaje += "El nombre de usuario debe tener entre 3 y 15 caracteres y no puede comenzar con un número.\n";
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_-]{6,15}$/.test(contra)) {
        mensaje += "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener entre 6 y 15 caracteres.\n";
    }

    if (contra !== contra2) {
        mensaje += "Las contraseñas no coinciden.\n";
    }

    if (!/^(?=.{1,64}@)([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+[A-Za-z0-9!#$%&'*+-/=?^_`{|}~])?@[A-Za-z0-9-]+(\.[A-Za-z0-9-]{1,63})+$/.test(correo)) {
        mensaje += "El correo electrónico no es válido.\n";
    }

    if (sexo === "") {
        mensaje += "Debes seleccionar un sexo.\n";
    }

    if (nacimiento === "" || new Date(nacimiento) > new Date(new Date().setFullYear(new Date().getFullYear() - 18))) {
        mensaje += "Debes tener al menos 18 años.\n";
    }


    if (mensaje) {
        var p = document.createElement("p");
        p.innerHTML = mensaje.replaceAll("\n", "<br>");
        document.getElementById("nuevoes").prepend(p);
    }
    else {
        document.getElementById("nuevoes").submit();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("usuario").setAttribute("type", "text");
    document.getElementById("contra").setAttribute("type", "password");
    document.getElementById("contra2").setAttribute("type", "password");
    document.getElementById("correo").setAttribute("type", "email");
    document.getElementById("nacimiento").setAttribute("type", "date");
    document.getElementById("ciudad").setAttribute("type", "text");
    document.getElementById("pais").setAttribute("type", "text");
    document.getElementById("foto").setAttribute("type", "file");

    document.getElementById("registrarse").addEventListener("click", botonRegistrar);
});