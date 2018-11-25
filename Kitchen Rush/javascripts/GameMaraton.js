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
        Game.botonIzq.style = "background-color: blue; height: 60px; width: " + ancho + "px";
        Game.botonIzq.addEventListener('click', GameLoop.pulsarIzquierda, false);
        div.appendChild(Game.botonIzq);

        // Boton derecha
        Game.botonDer = document.createElement("button");
        Game.botonDer.type = "button";
        Game.botonDer.style = "background-color: red; height: 60px; width: " + ancho + "px";
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

        // Imagen de fondo
        Game.fondo = new Image();
        Game.fondo.src = "assets/images/Backgrounds/Fondo_juego.png";

        // Colisiones
        Game.triggers = new Array();
        new TriggerRect((canvas.width/2)-18, canvas.height-50, 50, 20, "#A00C0C"); // [0] - Area seleccion de ingredientes
        new TriggerRect(60, 100, 40, 20, "#12A7E8"); // [1] - Plato izquierdo
        new TriggerRect(215, 100, 40, 20, "#12A7E8"); // [2] - Plato derecho

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