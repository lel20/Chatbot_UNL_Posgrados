function ocultar(){
    document.getElementById('uno').style.display='none'
}
function mostrar(){
    document.getElementById('uno').style.display=null
}
// function borrarDoc(){
//     document.getElementById('doc').style.display=null
// }
class Chatbox {
    constructor() {
        this.args = {
            
            openButton: document.querySelector('.chatbox__button'),
            cerrarButton:document.querySelector('.cerra'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            // openButton1: document.querySelector('.boton__articulos'),
            openButton2:document.querySelector('.cerrar_encabezado'),
            tex: document.querySelector('.articulos'),
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton2, tex,cerrarButton,openButton, chatBox, sendButton } = this.args;
        // openButton1.addEventListener('click', () => this.toggleState(tex))
        openButton2.addEventListener('click', () => this.toggleState(tex))
        openButton.addEventListener('click', () => this.toggleState(chatBox))
        cerrarButton.addEventListener('click', () => this.toggleState(chatBox))
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))
        

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;
        // permite ocultar o mostra el chabot cuado se da clik sobre el icono principal
        if (this.state) {
            chatbox.classList.add('chatbox--active')
           
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }
    toggleState(chatbox1) {
        this.state = !this.state;
        // permite ocultar o mostra el chabot cuado se da clik sobre el icono principal
        if (this.state) {
            chatbox1.classList.add('articulos--active')
           
        } else {
            chatbox1.classList.remove('articulos--active')
        }
    }
    //proceso de interacion entre el chatbot, el usuario y la red neuronal
    onSendButton(chatbox) {
        //permite acceder a la caja de texto donde el usuario hace la pregunta
        var textField = chatbox.querySelector('input');
        //extrae el valor(pregunta) ingresada por el usuario
        let text1 = textField.value
        let numeros = ["0", "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21",
                        "22","23","24","25"]
        let palabras=["Empezar","Requisitos de inscripción","Matrículas","Tipos de posgrados","Listado de posgrados",
                      "Posgrados de la Carrera de Computación","Formas de pago","Duración de los posgrados",
                      "Modalidades de estudio","Calendario académico","Homologaciones","Requisitos para la maestría de Ingeniería en Software",
                      "Requisitos para matricularse","Coste de los programas de posgrado","Coste de la maestría en Ingeniería de Software","Duración de la maestría en Ingeniería en Software",
                    "Modalidad presencial","Modalidad semipresencial","Modalidad en línea","Modalidad a distancia","Modalidad dual",
                    "Modalidad en híbrida","Mecanismos de homologacón","Horarios","Horarios de la Maestría de Ingeniería en Software",
                    "Lugar de pago de las maestrías"]
        if (text1 === "") {
            return;
        }
        let msg1
        //se identifica que la persona que ingrasa la pregunta es el ususario
        for( var i =0; i<numeros.length;i++){
            if(text1==numeros[i]){
                msg1 = { name: "Usuario", message: palabras[i] }
                break
            }else{
                msg1 = { name: "Usuario", message: text1 }
            }   
        }
        this.messages.push(msg1);
        //se envia la pregunta con la solicitud POST
        fetch('213.168.250.82:80/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }) // Se envita la respuesta que predijo el moledo a la interfaz
            .then(r => r.json())
            .then(r => {
                //se identifica que sea el chabot quien respoda
                let msg2 = { name: "UNL", number:r.number, message:r.answer };
                this.messages.push(msg2);
                this.updateChatText(chatbox)
                textField.value = ''
            
            }).catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox)
                textField.value = ''
            });
    }
    //función que permite que los mensaje aparescan de forma contigua sin que se borren
    //cada vez que el usuario haga una pregunta
    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function (item, index) {
            //respueta realizada por el chat
            var numero=""
            if (item.name === "UNL") {
               var mensaje="&#128075&#128075 Hola &#128075&#128075. Soy un Asistente Virtual que está a su disposición "+
               "para responder inquietudes relacionadas con matrículas, homologaciones y otros temas relacionados "+
               "como:  costes, formas de pago, modalidades de estudio, entre otros &#129299."+
               "Para interactuar conmigo digite el número de cada una de las opciones que se le presentan en el menu siguiente o en su "+
               "defecto realize una pregunta bien redactada en el campo de texto ."
               var error="&#128532 Lo siento!! &#128532 No he podido encontrar información a su solicitud. Por favor "+
               "ingrese el comando <b>ayuda</b> para que visualize todos los temas en los que puedo ayudarle "
               var dato=item.message
               var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig; 
               numero=item.number               
               if(numero==0){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + mensaje+
                    '<ul class="ul1"><li class="li1"> 1 - Requisitos de inscripción</li><li class="li1"> 2 - Matrículas</li> <li class="li1">3 - Tipos de posgrados</li><li class="li1">4 - Listado de posgrados</li>'+
                    '<li class="li1">5 - Posgrados de la Carrera de Computación</li><li class="li1">6 - Formas de pago</li><li class="li1">7 - Duración de los posgrados</li><li class="li1">8 - Modalidades de estudio</li>'+
                    '<li class="li1">9 - Calendario académico</li><li class="li1">10 - Homologaciones</li></ul>' +'</div>'+'</div>'+'</div>'
               }
               if(numero==1){
                var arr=dato.split(',')
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' +
                    'Tema relacionado:'+
                    '<ul class="ul1"><li class="li1"> 11 - Requisitos para inscripción de la maestría de Ingeniería en Software</li> </ul>' +'</div>'+'</div>'+'</div>'
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' +
                    '<ul><li>' +arr[0]+'</li><li>' +arr[1]+'</li><li>' +arr[2]+'</li><li>' +arr[3]+'</li><li>' +arr[4]+
                    '</li><li>' +arr[5]+'</li><li>' +arr[6]+'</li><li>' +arr[7]+'</li></ul>'+
                    '</div>'+'</div>'+'</div>'
                
               }
               if(numero==2){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' +
                    'Temas realacionados:'+
                    '<ul class="ul1">'+
                    '<li class="li1"> 12 - Requisitos para matricularse</li>' +
                    '<li class="li1">13 - Coste de los programas de posgrado</li>'+
                    '<li class="li1">14 - Coste de la maestría de Ingeniería en Software</li>'+
                    '</ul>' +'</div>'+'</div>'+'</div>'
            
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + dato.replace(exp,
                    '<a href="$1">$1</a>')+'</div>'+'</div>'+'</div>'

               }if(numero==3){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    'Tema relacionado:'+
                    '<ul class="ul1"><li class="li1"> 4 - Listado de posgrados</li></ul>' +'</div>'+'</div>'+'</div>'
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + dato.replace(exp,
                    '<a href="$1">$1</a>')+'</div>'+'</div>'+'</div>'
               }
               if(numero==4){
                var arr=dato.split(',')
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' +'Especializaciones:'+ 
                    '<ul><li> <a href="https://n9.cl/4c8gb" target="_black">' +arr[0]+'</a></li></ul>'+'Maestrías con trayectoria profesional:'+
                    '<ul><li><a href="https://n9.cl/kg01l" target="_black">' +arr[1]+'</a></li>'+
                    '<li><a href="https://n9.cl/1zlnl" target="_black">' +arr[2]+'</a></li>'+
                    '<li><a href="https://n9.cl/ym9w1" target="_black">' +arr[3]+'</a></li>'+
                    '<li><a href="https://n9.cl/mxwwv" target="_black">' +arr[4]+'</a></li>'+
                    '<li><a href="https://n9.cl/qi7gg" target="_black">' +arr[5]+'</a></li>'+
                    '<li><a href="https://n9.cl/drjvze" target="_black">' +arr[6]+'</a></li>'+
                    '<li><a href="https://n9.cl/nn21c" target="_black">' +arr[7]+'</a></li>'+
                    '<li><a href="https://n9.cl/ez816" target="_black">' +arr[8]+'</a></li>'+
                    '<li><a href="https://n9.cl/l5ikf" target="_black">' +arr[9]+'</a></li>'+
                    '<li><a href="https://n9.cl/gxuxo" target="_black">' +arr[10]+'</a></li>'+
                    '<li><a href="https://n9.cl/4gijj" target="_black">' +arr[11]+'</a></li>'+
                    '<li><a href="https://n9.cl/2idht" target="_black">' +arr[12]+'</a></li>'+
                    '<li><a href="https://n9.cl/snwxd" target="_black">' +arr[13]+'</a></li>'+
                    '<li><a href="https://n9.cl/ao9ze" target="_black">' +arr[14]+'</a></li>'+
                    '<li><a href="https://n9.cl/85q6i" target="_black">' +arr[15]+'</a></li>'+
                    '<li><a href="https://n9.cl/t1ofh" target="_black">' +arr[18]+'</a></li>'+
                    '<li><a href="https://n9.cl/tl4z9" target="_black">' +arr[19]+'</a></li>'+
                    '<li><a href="https://n9.cl/4c06j" target="_black">' +arr[20]+'</a></li>'+
                    '<li><a href="https://n9.cl/q93e2" target="_black">' +arr[21]+'</a></li>'+
                    '<li><a href="https://n9.cl/k0esv" target="_black">' +arr[23]+'</a></li>'+
                    '<li><a href="https://n9.cl/kz2kw" target="_black">' +arr[24]+'</a></li>'+
                    '<li><a href="https://n9.cl/szrkvh" target="_black">' +arr[25]+'</a></li>'+
                    '<li><a href="https://n9.cl/x72a4" target="_black">' +arr[27]+'</a></li>'+
                    '<li><a href="https://n9.cl/l93bo" target="_black">' +arr[28]+'</a></li>'+
                    '<li><a href="https://n9.cl/x4i87" target="_black">' +arr[30]+'</a></li></ul>'+
                    '</ul>' +'Maestrías con trayectoria de investigción'+
                    '<ul><li><a href="https://n9.cl/e48f5" target="_black">' + arr[16]+'</a></li>'+
                    '<li><a href="https://n9.cl/7k6j0" target="_black">' +arr[17]+'</a></li>'+
                    '<li><a href="https://n9.cl/y3l9f" target="_black">' +arr[22]+'</a></li>'+
                    '<li><a href="https://n9.cl/e7yte" target="_black">' +arr[26]+'</a></li>'+
                    '<li><a href="https://n9.cl/1n5on" target="_black">' +arr[29]+'</a></li></ul>'+
                    '</div>'+'</div>'+'</div>'

               }
               
               if(numero==5){
                var arr=dato.split(',')
                
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">'+
                    'Temas relacionados:'+
                    '<ul class="ul1"><li class="li1">12 - Requisitos para matricularse</li>'+
                    '<li class="li1">14 - Coste de la maestría de Ingeniería en Software</li>'+
                    '<li class="li1">15 - Duración de la maestría de Ingeniería en Software</li></ul>'+
                    '</div>'+'</div>'+'</div>'

                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">'+
                     arr[0]+'<a href="https://unl.edu.ec/posgrados/maestria-en-ingenieria-en-software">' +arr[1]+'</a>'+
                    '</div>'+'</div>'+'</div>'

               }
               if(numero==6){
                var arr=dato.split(',')
                html += '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    'Tema relacionado:'+
                    '<ul class="ul1"><li class="li1">25 - Lugar de pago de las maestrías</li></ul>'+
                    '</div>'+'</div>'+'</div>'
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 'Las formas de pago que acepta la UNL son los siguientes:'+
                    '<ul><li>' +arr[0]+'</li><li>' +arr[1]+'</li><li>' +arr[2]+'</li><li>' +arr[3]+'</li><li>' +arr[4]+'</li><li>' +arr[5]+'</li></ul>'+
                    '</div>'+'</div>'+'</div>'

               }
               if(numero==7){
                var arr=dato.split(';')
                html += '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                'Tema relacionado:'+
                '<ul class="ul1"><li class="li1">15 - Duración de la maestría de Ingeniería en Software</li></ul>'+
                '</div>'+'</div>'+'</div>'

                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">'+
                     arr[0]+':'+'<ul><li>' +arr[1]+'</li><li>' +arr[2]+'</li><li>' +arr[3]+
                    '</div>'+'</div>'+'</div>'

               }
               if(numero==8){
                var arr=dato.split(',')
                html +='<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">'+
                     arr[0]+':'+'<ul><li>' +arr[1]+'</li><li>' +arr[2]+'</li><li>' +arr[3]+'</li>'+
                     '<li>'+arr[4]+'</li><li>' +arr[5]+'</li><li>' +arr[6]+'</li></ul>'+ 'Sin embargo,'+
                     'la UNL solo contempla las tres primeras modalidades para los posgrados '+
                    '</div>'+'</div>'+'</div>'

               }
               if(numero==9){
                var arr=dato.split(';')
                html +='<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">'+
                     arr[0]+':'+ '<a href='+arr[1]+' target="_black">Calendario</a>'+
                    '</div>'+'</div>'+'</div>'

               }
               if(numero==10){
                var arr=dato.split(';')

                html += '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                'Tema relacionado:'+
                '<ul class="ul1"><li class="li1">22 - Mecanismos de homologación</li></ul>'+
                '</div>'+'</div>'+'</div>'

                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' +'Hasta la fecha la UNL no '  +
                    'ha realizado procesos de homologación para los posgrados. Sin embargo, de acuerdo a lo estipulado en le artículo '+
                    '210 "Requisitos y procedimientos para la homologación" se establece lo siguiente para homologar. ' +
                     arr[0]+':'+'<ul><li>' +arr[1]+'</li><li>' +arr[2]+'</li><li>' +arr[3]+'</li><li>' +arr[4]+
                    '</div>'+'</div>'+'</div>'

               }
               if(numero==11){
                var arr=dato.split(',')
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' +
                    '<ul><li>' +arr[0]+'</li><li>' +arr[1]+'</li><li>' +arr[2]+'</li><li>' +arr[3]+'</li><li>' +arr[4]+
                    '</li><li>' +arr[5]+'</li><li>' +arr[6]+'</li></ul>'+'</div>'+'</div>'+'</div>'

               }
               if(numero==12){
                var arr=dato.split(',')
                html += '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                'Temas relacionados:'+
                '<ul class="ul1"><li class="li1"> 13 - Coste de los programas de posgrado</li><li class="li1"> 14 - Coste de '+ 
                'la maestría de Ingeniería en Software</li></ul>'+
                '</div>'+'</div>'+'</div>'

                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    '<ul><li>' +arr[0]+'</li><li>' +arr[1]+'</li><li>' +arr[2]+'</li><li>' +arr[3]+'</li><li>' +arr[4]+'</li></ul>'+
                     'Una vez solicite su matrícula, se le generarán dos procesos, uno para el pago de la matrícula del posgrado '+ 
                     'y otro para el pago de los aranceles del posgrado. Ambos procesos los podrá encontrar en el  '+
                     '<a href="https://tramites.unl.edu.ec/" target="_black">Módulo de Gestión de Trámites </a>'+' una vez registre su matrícula en'+
                     ' el SGA - Estudiantes </div>'+'</div>'+'</div>'

               }
               if(numero==13){
                html += '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                'Tema relacionado:'+
                '<ul class="ul1"><li class="li1"> 14 - Coste de '+ 
                'la maestría de Ingeniería en Software</li></ul>'+
                '</div>'+'</div>'+'</div>'

                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    dato+'<ul class="ul1"><li class="li1"> </li></ul></div></div></div>'

               }
               if(numero==14){
                var arr=dato.split(',')
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    '<ul><li>' +arr[0]+'</li><li>' +arr[1]+'</li><li>' +arr[2]+'</li></ul>'+
                    '</div>'+'</div>'+'</div>'

               }
               if(numero==15){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    dato+'</div>'+'</div>'+'</div>'

               }
               if(numero==16){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    dato+'</div>'+'</div>'+'</div>'

               }
               if(numero==17){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    dato+'</div>'+'</div>'+'</div>'

               }
               if(numero==18){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    dato+'</div>'+'</div>'+'</div>'

               }
               if(numero==19 || numero==20 ||numero==21){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    dato+'</div>'+'</div>'+'</div>'

               }
               if(numero==22){
                var arr=dato.split(';')
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    '<ul><li>'+ arr[0] +'</li>'+'<li>'+ arr[1] +'</li></ul>'+'</div>'+'</div>'+'</div>'

               }
               if(numero==23){
                var arr=dato.split(';')
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    arr[0].replace(exp,'<a href="$1">$1</a>') +'</div>'+'</div>'+'</div>'

               }
               if(numero==24){
                var arr=dato.split(';')
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    arr[0]+':' +'<ul><li>'+ arr[1] +'</li></ul>'+ arr[2]+
                    '<a href='+arr[5]+' target="_black">'+arr[3]+'</a>'+
                    arr[4]+'</div></div></div>'

               }
               if(numero==25){
                var arr=dato.split(';')
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                    '<ul><li>'+arr[0]+'<li>'+ arr[1] +'</li></ul>' +'A continuación se le proporciona el manual para el proceso de pago, el cual debe seguir al pie de la letra  a partir de la página 50 sección FORMAS DE PAGO: '+
                    '<a href="https://drive.google.com/u/0/uc?id=15gLwc_v_oOXr0oAYF8QHQ_fxx1PyHC2r&export=download">Manual  para el proceso de pago</a>'+'</div></div></div>'

               }
               if(numero==26){
                console.log(numero)
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 'Sugerencias:'+
                    '<ul class="ul1"><li class="li1"> 1 - Requisitos de inscripción</li>'+
                    '<li class="li1"> 2 - Matrículas</li>'+
                    '<li class="li1">3 - Tipos de posgrados</li>'+
                    '<li class="li1">4 - Listado de posgrados</li>'+
                    '<li class="li1">5 - Posgrados de la Carrera de Computación</li>'+
                    '<li class="li1">6 - Formas de pago</li>'+
                    '<li class="li1">7 - Duración de los posgrados</li>'+
                    '<li class="li1">8 - Modalidades de estudio</li>'+
                    '<li class="li1">9 - Calendario académico</li>'+
                    '<li class="li1">10 - Homologaciones</li>'+
                    '<li class="li1">11 - Requisitos para inscripción de la maestría de Ingeniería en Software</li>'+
                    '<li class="li1">12 - Requisitos para matricularse</li>'+
                    '<li class="li1">13 - Coste de los programas de posgrado</li>'+
                    '<li class="li1">14 - Coste de la maestría de Ingeniería en Software</li>'+
                    '<li class="li1">15 - Duración de la maestría de Ingeniería en Software</li>'+
                    '<li class="li1">16 - Modalidad presencial</li>'+
                    '<li class="li1">17 - Modalidad semipresencial</li>'+
                    '<li class="li1">18 - Modalidad en línea</li>'+
                    '<li class="li1">19 - Modalidad a distancia</li>'+
                    '<li class="li1">20 - Modalidad dual</li>'+
                    '<li class="li1">21 - Modalidad en híbrida</li>'+
                    '<li class="li1">22 - Mecanismos de homologación</li>'+
                    '<li class="li1">23 - Horarios</li>'+
                    '<li class="li1">24 - Horarios de la Maestría de Ingeniería en Software</li>'+
                    '<li class="li1">25 - Lugar de pago de las maestrías</li>'+
                    
                    '</ul>' +'</div>'+'</div>'+'</div>'


               }
               if(numero==27){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 'Sugerencias:'+
                    '<ul><li class="li1">11 - Requisitos para inscripción de la maestría de Ingeniería en Software</li>'+
                    '<li class="li1">12 - Requisitos para matricularse</li>'+
                    '<li class="li1">14 - Coste de la maestría de Ingeniería en Software</li>'+
                    '<li class="li1">15 - Duración de la maestría de Ingeniería en Software</li>'+                 
                    '</ul>' +'</div>'+'</div>'+'</div>'

               }
               if(numero==28){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 'Sugerencias:'+
                '<ul class="ul1"><li class="li1"> 1 - Requisitos de inscripción</li>'+                             
                '<li class="li1">10 - Homologaciones</li>'+
                '<li class="li1">11 - Requisitos para inscripción de la maestría de Ingeniería en Software</li>'+
                '<li class="li1">12 - Requisitos para matricularse</li>'+   
                '</ul>' +'</div>'+'</div>'+'</div>'

               }
               if(numero==29){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 'Sugerencias:'+
                '<ul class="ul1"><li class="li1">11 - Requisitos para inscripción de la maestría de Ingeniería en Software</li>'+
                '<li class="li1">12 - Requisitos para matricularse</li>'+   
                '</ul>' +'</div>'+'</div>'+'</div>'

               }
               if(numero==30){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' +
                'Los estudiantes que deseen conocer los docentes que imparten las materias o asignaturas de un '+
                'posgrado, deberán consultarlo con el Director de la Maestría o la Dirección de Posgrado'+
                '</div>'+'</div>'+'</div>'
               }
               if(numero==31){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                'Los estudiantes que deseen postular o inscribirse en una maestría deberán hacerlo en'+ 
                '<a href="https://inscripciones.unl.edu.ec/categoria/detalle/2" target="_black"> Sistema de Getión de Inscripciones </a>' +
                'o acceder al <a href="https://inscripciones.unl.edu.ec/categoria/detalle/2" target="_black"> posgrado </a>'+
                'en concreto y dar en la opción Pre-inscripción'+
                '</div>'+'</div>'+'</div>'
               }
               if(numero==32){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                'Los interesados pueden encontrar la malla curricular en los brochure publicados en nuestra página '+
                '<a href="https://www.unl.edu.ec/posgrados" target="_blank">https://www.unl.edu.ec/posgrados</a>'+', o contactándose a los número telefónicos publicados en las redes '+
                'sociales y afiches publicitarios. '+ 
                '</div>'+'</div>'+'</div>'
               }
               if(numero==33){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                'Los interesados que quieran conocer la malla curricular de la maestría de Ingeniería en Software' +
                'lo pueden hacerlo en el siguiente enlace'+
                '<a href="https://acortar.link/DormTv" target="_blank">https://acortar.link/DormTv</a>'+ 
                '</div>'+'</div>'+'</div>'
               }
                if(numero==34){
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + 
                'La maestría de <a href="https://www.unl.edu.ec/posgrados/maestria-en-ingenieria-en-software" target="_blank">Ingeniería en Software</a>'+
                ' presenta su modalidad de aprendizaje en línea' + 
                '</div>'+'</div>'+'</div>'
               }
               if(numero==100){
                console.log(numero)
                html +=  '<div class="row">'+'<div class="col-md-1">'+'</div>'+
                    '<div class="col-md-11">'+'<div class="messages__item messages__item--visitor">' + error+
                    '</div>'+'</div>'+'</div>'

               }
              
            } 
               
           
            //pregunta realizada por el usuario
             
             else {
                    
                    html += '<div class="messages__item messages__item--operator">' + item.message +'</div>'
                }
            
        });
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();
