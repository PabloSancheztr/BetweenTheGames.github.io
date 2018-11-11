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

        if(registroTemporal-GameLoop.ultimoRegistro > 999) {
            GameLoop.creacionIngredientes();
        }

        // Final del loop. Actualizacion y pintado
        GameLoop.actualizar(registroTemporal);
        GameLoop.pintar(registroTemporal);

        // Contador de FPS y APS
        if(registroTemporal-GameLoop.ultimoRegistro > 999) {
            GameLoop.ultimoRegistro = registroTemporal;
            
            console.log("APS: " + GameLoop.ups + " | " + "FPS: " + GameLoop.fps);

            GameLoop.ups = 0;
            GameLoop.fps = 0;
        }
    },

    pausar: function() {

    },

    // Actualizacion de los platos e ingredientes y manejo de controles. [999 = 1s]
    actualizar: function(registroTemporal) {
        GameLoop.ups++;

        // Movimiento de los elementos
        Game.ingredientes.forEach(function(elemento, indice, array) {
            elemento.mover();
            if(elemento.posY > canvas.height) {
                elemento.autodestruccion(elemento);
            }
        });

        /* Codigo ejemplo
        if(registroTemporal-GameLoop.ultimoRegistro > 999) {
            let randomAncho = Math.random() * (canvas.width - 0) + 0;
            let randomAlto = Math.random() * (canvas.height - 0) + 0;
            let ingrediente = new Ingrediente(randomAncho, randomAlto, 3);
            
            Game.ingredientes.push(ingrediente);
        }*/
    },

    // Pintado del canvas
    pintar: function(registroTemporal) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        GameLoop.fps++;

        // Pintado de los ingredientes
        Game.ingredientes.forEach(function (elemento, indice, array) {
            elemento.dibujarEnCanvas();
        });
    },

    // Creacion aleatoria de los ingredientes
    creacionIngredientes: function() {
        let randomIngrediente = Math.floor(Math.random() * (Game.ingredientesJSON.length - 0) + 0);
        let ingredienteSeleccionado = Game.ingredientesJSON[randomIngrediente];
        new Ingrediente(ingredienteSeleccionado.nombre,
                        ingredienteSeleccionado.ruta,
                        canvas.width/2,
                        (canvas.height/2)-50,
                        0.5);
    }
};