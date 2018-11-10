/**
 * Control del juego
 * namespace: game
*/

document.addEventListener('DOMContentLoaded', function() {
    Game.iniciarJuego();
}, false);

 var Game = {
    iniciarJuego: function () {
        console.log("Juego iniciado");
        var comida = new Comida(20, 20, 100, 10, 0.1);
        GameLoop.iterar();
    }
 };