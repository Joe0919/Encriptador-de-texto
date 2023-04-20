$(document).ready(function () {
  //código a ejecutar cuando el DOM está listo para recibir instrucciones.
  $(function () {
    $("#txIngreso").blur(function () {
      var $input = $(this);
      if ($input.val() === "") { 
        $input.removeClass("text");
        $input.addClass("text-error");
        $("#warning").text("*Este campo no debe estar vacio");
        $("#warning").removeClass("advertencia");
        $("#warning").addClass("advertencia-error");
      } else {
        $input.removeClass("text-error");
        $input.addClass("text");
        $("#warning").text("*Solo letras minúsculas y sin caracteres especiales");
        $("#warning").removeClass("advertencia-error");
        $("#warning").addClass("advertencia");
      }
    });
  });
});

function alerta(titulo, texto, tipo, icono, posicion) {
  VanillaToasts.create({
    // notification title
    title: titulo,
    // notification message
    text: texto,
    // success, info, warning, error   / optional parameter
    type: tipo,
    // path to notification icon
    icon: icono,
    // topRight, topLeft, topCenter, bottomRight, bottomLeft, bottomCenter
    positionClass: posicion,
    // auto dismiss after 5000ms
    timeout: 3000,
    // hide any other toasts, keeping only the latest visible
    single: true,
  });
}

function Encriptar() {
  let texto = document.getElementById("txIngreso").value;
  if (texto == "") {
    alerta(
      "¡Error!",
      "El campo no debe estar vacio",
      "error",
      "./images/error.png",
      "topCenter"
    );
  } else {
    let msjEncriptado = "";

    // Uso de la funcion replace para reemplazar las letras segun sea el caso
    // (i-> Ignora mays y mins,m->Reemplaza en todas las lineas ,g->Analiza toda la frase u oración)

    msjEncriptado = texto.replace(/e/gim, "enter");
    msjEncriptado = msjEncriptado.replace(/i/gim, "imes");
    msjEncriptado = msjEncriptado.replace(/a/gim, "ai");
    msjEncriptado = msjEncriptado.replace(/o/gim, "ober");
    msjEncriptado = msjEncriptado.replace(/u/gim, "ufat");

    document.getElementById("txSalida").innerHTML = msjEncriptado;
    var elementDiv1 = document.querySelector("#dv1");
    elementDiv1.scrollIntoView();
    alerta(
      "¡Hecho!",
      "Se Encriptó correctamente",
      "success",
      "./images/success.png",
      "bottomCenter"
    );
  }
}
function Desencriptar() {
  let texto = document.getElementById("txIngreso").value;
  if (texto == "") {
    alerta(
      "¡Error!",
      "El campo no debe estar vacio",
      "error",
      "./images/error.png",
      "topCenter"
    );
  } else {
    let msjEncriptado = "";

    msjEncriptado = texto.replace(/enter/gim, "e");
    msjEncriptado = msjEncriptado.replace(/imes/gim, "i");
    msjEncriptado = msjEncriptado.replace(/ai/gim, "a");
    msjEncriptado = msjEncriptado.replace(/ober/gim, "o");
    msjEncriptado = msjEncriptado.replace(/ufat/gim, "u");

    document.getElementById("txSalida").innerHTML = msjEncriptado;
    alerta(
      "¡Hecho!",
      "Se Desencriptó correctamente",
      "success",
      "./images/success.png",
      "bottomCenter"
    );
  }
}

function Copiar() {
  let texto = document.querySelector("#txSalida");
  document.getElementById("txSalida").value.length == 0
    ? alerta(
        "Nada que copiar!",
        "El campo esta vacio",
        "info",
        "./images/info.png",
        "bottomCenter"
      )
    : (texto.select(),
      document.execCommand("copy"),
      alerta(
        "¡Hecho!",
        "Texto Copiado",
        "success",
        "./images/success.png",
        "bottomCenter"
      ));
}
function Limpiar() {
  document.getElementById("txIngreso").value = "";
  document.getElementById("txSalida").value = "";
}

function check(e) {
  tecla = document.all ? e.keyCode : e.which;

  //Tecla de retroceso para borrar, siempre la permite
  if (tecla == 8) {
    alerta(
      "¡No disponible!",
      "Solo se permiten minúsculas",
      "info",
      "./images/info.png",
      "topCenter"
    );
    return true;
  }

  // Patrón de entrada, en este caso solo acepta numeros y letras
  patron = /[a-z \s]/;
  tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
}

let btnEnc = document.querySelector("#btnEnc");
btnEnc.onclick = Encriptar;
let btnDes = document.querySelector("#btnDes");
btnDes.onclick = Desencriptar;
let btnCopiar = document.querySelector("#btnCopiar");
btnCopiar.onclick = Copiar;
let btnLimpiar = document.querySelector("#btnLimpiar");
btnLimpiar.onclick = Limpiar;
