/**
 * Control del juego
 * namespace: game
*/

// Variables globales a todo el juego
var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

document.addEventListener('DOMContentLoaded', function() {
    Game.iniciarVariables();
    Game.iniciarJuego();
}, false);

var Game = {
    ingredientesImgs: null,
    platosImgs: null,
    idIngrediente: 0,

    iniciarVariables: function() {
        Game.ingredientesImgs = [];
        Game.platosImgs = [];
    },

    iniciarJuego: function() {
        console.log("Juego iniciado");
    
        GameLoop.iterar();
    }
};