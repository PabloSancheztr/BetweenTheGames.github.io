/**
 * Control del juego
 * namespace: game
*/

document.addEventListener('DOMContentLoaded', function() {
    Game.iniciarJuego();
    GameLoop.iterar();
}, false);

 var Game = {
    iniciarJuego: function () {
        console.log("Juego iniciado");
    }
 };