/**
 * Control del juego
 * namespace: game
*/

// Variables globales a todo el juego
var div = document.getElementById('botones');
var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
var request = new XMLHttpRequest();

// Documento cargado
document.addEventListener('DOMContentLoaded', function() {
    Game.iniciarVariables();
    Game.iniciarJuego();
}, false);

var Game = {
    ingredientes: null,
    platos: null,
    triggers: null,
    ingredientesJSON: null,
    platosJSON: null,
    listaJSON: null,
    minutos: 2,
    segundos: 0,
    nivelEnfado: null,
    enfadoImg: null,
    contrareloj: false,
    maraton: true,
    dificultad: null,
    platosCompletados: 0,
    fondo: null,
    botonDer: null,
    botonIzq: null,

    iniciarVariables: function() {
        // Botones
        // Boton izquierda
        Game.botonIzq = document.createElement("button");
        Game.botonIzq.type = "button";
        let ancho = canvas.clientWidth/2;
        Game.botonIzq.style = "height: 60px; width: " + ancho + "px";
        Game.botonIzq.addEventListener('click', GameLoop.pulsarIzquierda, false);
        div.appendChild(Game.botonIzq);

        // Boton derecha
        Game.botonDer = document.createElement("button");
        Game.botonDer.type = "button";
        Game.botonDer.style = "height: 60px; width: " + ancho + "px";
        Game.botonDer.addEventListener('click', GameLoop.pulsarDerecha, false);
        div.appendChild(Game.botonDer);

        // Obtener los elementos del JSON
        request.open('GET', 'javascripts/sprites.json', true);
        request.responseText = 'json';
        request.send();
        request.onload = function() {
            //console.log(this.responseText);
            Game.ingredientesJSON = JSON.parse(this.responseText).ingredientes;            
            Game.platosJSON = JSON.parse(this.responseText).platos;
        }
        
        Game.ingredientes = new Array();
        Game.platos = new Array();

        // Imagenes de nivel de enfado
        Game.nivelEnfado = new Array();
        Game.enfadoImg = new Image();
        Game.enfadoImg.src = "assets/images/Emotes/nivelEnfado.png";

        // Imagenes dificultad
        Game.dificultad = new Image();
        Game.dificultad.src = "assets/images/Emotes/tenedor.png";

        // Versiones: Movil - Tablet - PC
        Game.triggers = new Array();
        if(screen.width < 500) {
            Game.fondo = new Image();
            Game.fondo.src = "assets/images/Backgrounds/Fondo_juego_movil.png";

            let imagenBtnIzq = new Image();
            imagenBtnIzq.width = canvas.clientWidth/2;
            imagenBtnIzq.height = 60;
            imagenBtnIzq.src = "assets/images/Botones/BotonIzquierda.png";
            this.botonIzq.appendChild(imagenBtnIzq);

            let imagenBtnDer = new Image();
            imagenBtnDer.width = canvas.clientWidth/2;
            imagenBtnDer.height = 60;
            imagenBtnDer.src = "assets/images/Botones/BotonDerecha.png";
            this.botonDer.appendChild(imagenBtnDer);

            new TriggerRect((canvas.width/2)-40, (canvas.height/2)+60, 80, 100, "#A00C0C"); // [0] - Area seleccion de ingredientes
            new TriggerRect((canvas.width/2)-150, (canvas.height/2)+60, 80, 100, "#12A7E8"); // [1] - Plato izquierdo
            new TriggerRect((canvas.width/2)+70, (canvas.height/2)+60, 80, 100, "#12A7E8"); // [2] - Plato derecho
        }
        else if(screen.width < 1100) {
            Game.fondo = new Image();
            Game.fondo.src = "assets/images/Backgrounds/Fondo_juego.png";

            let imagenBtnIzq = new Image();
            imagenBtnIzq.width = canvas.clientWidth/2;
            imagenBtnIzq.height = 60;
            imagenBtnIzq.src = "assets/images/Botones/BotonIzquierda.png";
            this.botonIzq.appendChild(imagenBtnIzq);

            let imagenBtnDer = new Image();
            imagenBtnDer.width = canvas.clientWidth/2;
            imagenBtnDer.height = 60;
            imagenBtnDer.src = "assets/images/Botones/BotonDerecha.png";
            this.botonDer.appendChild(imagenBtnDer);

            new TriggerRect((canvas.width/2)-40, (canvas.height/2)+110, 120, 150, "#A00C0C"); // [0] - Area seleccion de ingredientes
            new TriggerRect((canvas.width/2)-220, (canvas.height/2)+110, 120, 150, "#12A7E8"); // [1] - Plato izquierdo
            new TriggerRect((canvas.width/2)+140, (canvas.height/2)+110, 120, 150, "#12A7E8"); // [2] - Plato derecho
        }
        else {
            Game.fondo = new Image();
            Game.fondo.src = "assets/images/Backgrounds/Fondo_juego.png";

            let imagenBtnIzq = new Image();
            imagenBtnIzq.src = "assets/images/Botones/BotonIzquierda.png";
            this.botonIzq.appendChild(imagenBtnIzq);

            let imagenBtnDer = new Image();
            imagenBtnDer.src = "assets/images/Botones/BotonDerecha.png";
            this.botonDer.appendChild(imagenBtnDer);

            new TriggerRect((canvas.width/2)-50, (canvas.height/2)+100, 150, 140, "#A00C0C"); // [0] - Area seleccion de ingredientes
            new TriggerRect((canvas.width/2)-280, (canvas.height/2)+120, 150, 120, "#12A7E8"); // [1] - Plato izquierdo
            new TriggerRect((canvas.width/2)+180, (canvas.height/2)+120, 150, 120, "#12A7E8"); // [2] - Plato derecho
        }

        console.log("Ancho canvas: " + canvas.width + " | Alto canvas: " + canvas.height);
    },
    
    iniciarJuego: function() {
        console.log("Juego iniciado");
        GameLoop.iterar();
    },

    pulsarBoton: function() {
        console.log("Has pulsado el boton");
    }
};