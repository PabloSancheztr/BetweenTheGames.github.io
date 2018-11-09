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

    actualizar: function(registroTemporal) {
        GameLoop.ups++;
    },

    pintar: function(registroTemporal) {
        GameLoop.fps++;
    }
};