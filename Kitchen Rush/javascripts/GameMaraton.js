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
    debug: true,
    minutos: 2,
    segundos: 0,
    nivelEnfado: null,
    enfadoImg: null,
    contrareloj: false,
    maraton: true,
    dificultad: null,
    platosCompletados: 0,
    
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

        // Colisiones
        Game.triggers = new Array();
        new TriggerRect((canvas.width/2)-15, canvas.height-30, 40, 15, "#A00C0C"); // [0] - Area seleccion de ingredientes
        new TriggerRect(65, 120, 40, 20, "#12A7E8"); // [1] - Plato izquierdo
        new TriggerRect(205, 120, 40, 20, "#12A7E8"); // [2] - Plato derecho

        console.log("Ancho canvas: " + canvas.width + " | Alto canvas: " + canvas.height);
    },
    
    iniciarJuego: function() {
        console.log("Juego iniciado");
        GameLoop.iterar();
    },
};