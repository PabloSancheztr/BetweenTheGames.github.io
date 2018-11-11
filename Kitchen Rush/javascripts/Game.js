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
    debug: false,

    iniciarVariables: function() {
        // Obtener los elementos del JSON
        request.open('GET', 'javascripts/sprites.json', true);
        request.responseText = 'json';
        request.send();
        request.onload = function() {
            //console.log(this.responseText);
            Game.ingredientesJSON = JSON.parse(this.responseText).ingredientes;
            //console.log(Game.ingredientesJSON);
        }
        
        Game.ingredientes = [];
        Game.platos = [];

        // Colisiones
        Game.triggers = [];
        new TriggerRect((canvas.width/2)-15, canvas.height-30, 40, 15);
    },

    iniciarJuego: function() {
        console.log("Juego iniciado");
        GameLoop.iterar();
    }
};