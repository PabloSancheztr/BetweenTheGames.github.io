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

        // Controlador de teclado
        document.onkeydown = GameLoop.controladorTeclado;

        // Movimiento de los elementos
        Game.ingredientes.forEach(function(elemento, indice, array) {
            elemento.mover();
            if(elemento.posY > canvas.height) {
                elemento.autodestruccion(elemento);
            }
        });

        // Control de colisiones
        if(Game.triggers[0].intersects(Game.ingredientes[2])) {
            console.log("Tocandose");
        }
    },

    // Pintado del canvas
    pintar: function(registroTemporal) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        GameLoop.fps++;

        // DEBUG visual
        if(Game.debug) {
            Game.triggers.forEach(function(elemento, indice, array) {
                elemento.drawGizmo();
            });
        }        

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
    },

    // Controlador del teclado
    controladorTeclado: function(e) {
        // Derecha: D || ->
        if(e.keyCode == 68 || e.keyCode == 39) {
            Game.ingredientes[0].llevarAPlato(true);
            console.log("Derecha");
        }

        // Izquierda: A || <-
        if(e.keyCode == 65 || e.keyCode == 37) {
            Game.ingredientes[0].llevarAPlato(false);
            console.log("Izquierda");
        }

        // Cambio modo debug/modo normal: f7
        if(e.keyCode == 118) {
            if(Game.debug) {
                Game.debug = false;
            }
            else {
                Game.debug = true;
            }
        }
    }
};