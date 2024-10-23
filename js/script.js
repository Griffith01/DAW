function botonEntrar(){

    var mensaje = "";

    // Eliminar mensajes de error anteriores
    var errorMsgs = document.querySelectorAll("#inicioses p");
    errorMsgs.forEach(function(msg) {
        msg.remove();
    });

    if(document.getElementById("user").value.replaceAll(" ","").replaceAll("\t") == "")
        mensaje+= "Escribe el nombre de usuario\n"

    if(document.getElementById("contra").value.replaceAll(" ","").replaceAll("\t") == "")
        mensaje+= "Escribe la contraseña\n"

    if(mensaje) { 
        //alert("Errores en el formulario: " + mensaje);
        var p = document.createElement("p");
        p.innerHTML = mensaje.replaceAll("\n", "<br>");
        document.getElementById("inicioses").prepend(p);
    }
    else
        document.getElementById("inicioses").submit();
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("user").setAttribute("type", "text");
    document.getElementById("contra").setAttribute("type", "password");

    document.getElementById("entrar").addEventListener("click", botonEntrar);
});