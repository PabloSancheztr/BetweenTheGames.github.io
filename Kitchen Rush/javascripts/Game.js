/**
 * Control del juego
 * namespace: game
*/

// Variables globales a todo el juego
var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

// Documento cargado
document.addEventListener('DOMContentLoaded', function() {
    Game.iniciarVariables();
    Game.iniciarJuego();
}, false);

var Game = {
    ingredientes: null,
    platos: null,
    idIngrediente: 0,

    iniciarVariables: function() {
        Game.ingredientes = [];
        Game.platos = [];

        new Ingrediente(canvas.width/2, canvas.height/2, 0.3);
    },

    iniciarJuego: function() {
        console.log("Juego iniciado");
    
        GameLoop.iterar();
    }
};