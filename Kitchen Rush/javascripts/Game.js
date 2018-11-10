/**
 * Control del juego
 * namespace: game
*/

// Variables globales a todo el juego
var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

document.addEventListener('DOMContentLoaded', function() {
    Game.iniciarJuego();
}, false);

var Game = {
    iniciarJuego: function() {
        console.log("Juego iniciado");
        var ingrediente = new Ingrediente(30, 20, 3);
        ingrediente.dibujarEnCanvas();
        GameLoop.iterar();
    }
};