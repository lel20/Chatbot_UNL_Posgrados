var ventana_alto = $(window).height();
$("#loading").height(ventana_alto);
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', () => {
    if (document.getElementById('loading')) {
      document.getElementById('loading').classList.add('hide');
    }
    if (document.getElementById('cuerpo')) {
      document.getElementById('cuerpo').classList.remove("hide");
    }
    var ventana_alto = $(window).height();
    $("#cuerpo").height(ventana_alto);
  });
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    //showCloseButton: true,
    timer: 10000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

$(document).ready(function () {
    $('.scrollspy').scrollSpy();
});

function alertDelete(id, link) {
    Swal.fire({
        title: '¿Estás seguro de eliminar los datos de ' + id + '?',
        text: "Al continuar no podrás recuperar la información",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            window.location.href = link;
        }
    });
}

function alertDefault(icon, title, text) {
    return Swal.fire({
        icon: icon,
        title: title,
        text: text,
    });
    // document.getElementsByClassName('select-wrapper').style.display = 'none';
}

function alertConfirm(icon, title, text, callback) {
    return Swal.fire({
        title: title,
        html: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
    });
}

function alertSuccess(icon, title, text, link) {
    return Swal.fire({
        title: title,
        html: text,
        type: icon,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Continuar',
        allowOutsideClick: false
    }).then((result) => {
            if (result.value) {
                window.location.href = link;
                if (link.indexOf('#') !== -1){
                    location.reload();
                }
            }
        });
}

function alertHTML(icon, title, text, confirmBTNText, cancelBTNText, callback = null) {
    return Swal.fire({
        title: title,
        icon: icon,
        html: text,
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: confirmBTNText,
        confirmButtonAriaLabel: 'botón confirmar',
        cancelButtonText: cancelBTNText,
        cancelButtonAriaLabel: 'botón cancelar'
    }).then(callback);
}

var show_Html = function (txt) {
    txt = txt.replace(/&lt;/g, '<');
    txt = txt.replace(/&gt;/g, '>');
    txt = txt.replace(/&amp;nbsp;/g, ' ');
    txt = txt.replace(/&#34;/g, '');
    txt = txt.replace(/strong/g, 'b');
    return txt;
}

function checkLetras(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) {
        return true;
    }
    onclick = "validar()"
    patron = /[A-Za-z-áÁéÉíÍóÓúÚñÑ ]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

function checkNumeros(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) {
        return true;
    }
    if (tecla == 13) {
        return true;
    }
    patron = /[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

function checkPrecio(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) {
        return true;
    }
    patron = /[0-9.]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

function checkFecha(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) {
        return true;
    }
    patron = /[0-9-]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

function validateFecha(id = "datepicker") {
    var datepicker = document.getElementById(id);
    var test_birthday_user = new Date();
    var fecha = document.getElementById(id).value.split("-");
    test_birthday_user.setFullYear(fecha[0], fecha[1] - 1, fecha[2]);
    var today = new Date();
    var day = fecha[2];
    var month = fecha[1];
    var year = fecha[0];
    var date = new Date(year, month, '0');
    //fecha valida
    if ((day - 0) > (date.getDate() - 0)) {
        datepicker.setCustomValidity("La fecha ingresada es incorrecta");
        datepicker.style.cssText = "box-shadow: 0 0 5px 1px red";
    } else {
        datepicker.setCustomValidity("");
        //            datepicker.style.cssText =
        //                " background-color:  rgba(222, 222, 222, 0.25);border: solid 1px #dddddd; ";
    }
    //fecha no futura
    if (test_birthday_user > today) {
        datepicker.setCustomValidity("La fecha ingresada no es una fecha de nacimiento valida");
        datepicker.style.cssText = "box-shadow: 0 0 5px 1px red";
    } else {
        datepicker.setCustomValidity("");
        //            datepicker.style.cssText =
        //                " background-color:  rgba(222, 222, 222, 0.25);border: solid 1px #dddddd; ";
    }
}

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ";
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
}

function limpiaNombres() {
    var val = document.getElementById("nombre").value;
    var tam = val.length;
    let str = "";
    for (i = 0; i < tam; i++) {
        if (isNaN(val[i]) || val[i] == " ") {
            str += val[i];
        }
    }
    document.getElementById("nombre").value = str;
}

function limpiaApellidos() {
    var val = document.getElementById("apellido").value;
    var tam = document.getElementById("apellido").value.length;
    let str = "";
    for (i = 0; i < tam; i++) {
        if (isNaN(val[i]) || val[i] == " ") {
            str += val[i];
        }
    }
    document.getElementById("apellido").value = str;
}

function comprobarClave() {
    var clave1 = document.getElementById("password_user").value;
    var clave2 = document.getElementById("conf_pass_user").value;
    var inputC2 = document.getElementById("conf_pass_user");
    var btnRegister = document.getElementById("btn_register");
    var tam = clave2.length;
    resultado = document.getElementById("resultadoPass");
    let str = "";
    if (clave1 != clave2) {
        Toast.fire({
            icon: 'warning',
            title: 'Las constraseñas no son iguales'
        });
        inputC2.value = "";
        inputC2.classList.remove('valid');
        inputC2.classList.add('invalid');
        btnRegister.classList.add('disabled');
        resultado.setAttribute('data-error', 'Las contraseñas no son iguales, ingrese nuevamente');
    } else {
        inputC2.classList.remove('invalid');
        inputC2.classList.add('valid');
        btnRegister.classList.remove('disabled');
    }
}

function espaciosBlanco() {
    var p1 = document.getElementById("password_user").value;
    var inputC1 = document.getElementById("password_user");
    var inputC2 = document.getElementById("conf_pass_user");
    var espacios = false;
    var cont = 0;
    var resultado = document.getElementById("resultadoPass1");
    while (!espacios && (cont < p1.length)) {
        if (p1.charAt(cont) == " ")
            espacios = true;
        cont++;
    }
    if (espacios) {
        Toast.fire({
            icon: 'warning',
            title: 'La contraseña no puede contener espacios en blanco'
        });
        inputC1.classList.remove('valid');
        inputC1.classList.add('invalid');
        resultado.setAttribute('data-error', 'La contraseña no puede contener espacios en blanco, ingrese nuevamente');
        inputC2.value = "";
        inputC2.classList.remove('valid');
        return false;
    }

    if (p1.length < 8) {
        inputC1.classList.remove('valid');
        inputC1.classList.add('invalid');
        resultado.setAttribute('data-error', 'La contraseña debe tener mínimo 8 caracteres');
        $('#conf_pass_user').prop("disabled", true);
        inputC2.value = "";
        inputC2.classList.remove('valid');
    } else {
        $('#conf_pass_user').prop("disabled", false);
    }
}