/** 
 * Bucle principal del juego
 * namespace: GameLoop
 * ups - Actualizaciones por segundo
 * fps - Frames por segundo
*/

var GameLoop = {
    idEjecucion: null,
    ultimoRegistro: 0,
    ups: 0,
    fps: 0,

    iterar: function(registroTemporal) {
        GameLoop.idEjecucion = window.requestAnimationFrame(GameLoop.iterar);

        GameLoop.actualizar(registroTemporal);
        GameLoop.pintar(registroTemporal);

        if(registroTemporal-GameLoop.ultimoRegistro > 999) {
            GameLoop.ultimoRegistro = registroTemporal;
            
            console.log("APS: " + GameLoop.ups + " | " + "FPS: " + GameLoop.fps);

            GameLoop.ups = 0;
            GameLoop.fps = 0;
        }
    },

    pausar: function() {

    },

    // Creacion de los platos, ingredientes y manejo de controles. [999 = 1s]
    actualizar: function(registroTemporal) {
        GameLoop.ups++;

        Game.idIngrediente++;
        
        if(registroTemporal-GameLoop.ultimoRegistro > 999) {
            let randomAncho = Math.random() * (canvas.width - 0) + 0;
            let randomAlto = Math.random() * (canvas.height - 0) + 0;
            let ingrediente = new Ingrediente(randomAncho, randomAlto, 3);
            
            Game.ingredientesImgs.push(ingrediente);
        }
        
    },

    // Pintado del canvas
    pintar: function(registroTemporal) {
        GameLoop.fps++;

        // Pintado de los ingredientes
        Game.ingredientesImgs.forEach(function (elemento, indice, array) {
            elemento.dibujarEnCanvas();
        });
    }
};