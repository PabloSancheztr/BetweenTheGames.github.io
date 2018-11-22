/**
 * Control del juego
 * namespace: game
*/

// Variables globales a todo el juego
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
    contrareloj: true,
    maraton: false,
    dificultad: null,
    platosCompletados: 0,
    fondo: null,
    
    iniciarVariables: function() {
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

        Game.nivelEnfado = new Array();
        Game.enfadoImg = new Image();
        Game.enfadoImg.src = "assets/images/Emotes/nivelEnfado.png";

        Game.dificultad = new Image();
        Game.dificultad.src = "assets/images/Emotes/tenedor.png";

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

    actualizarCronometro: function() {
        if(Game.segundos == 0) {
            Game.minutos--;
            Game.segundos = 59;
        }
        else {
            Game.segundos--;
        }
    },

    aumentarCronometro: function() {
        let segundosViejos = Game.segundos;
        Game.segundos += 30;

        if(Game.segundos > 60) {
            Game.minutos++;
            Game.segundos = 30-(60-segundosViejos);
        }
    }
};