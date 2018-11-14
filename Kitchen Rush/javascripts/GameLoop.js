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
    primeraEjecucion: false,

    ingredientesEmplatados: new Array(),
    platosCompletados: new Array(),

    iterar: function(registroTemporal) {
        GameLoop.idEjecucion = window.requestAnimationFrame(GameLoop.iterar);

        if(registroTemporal-GameLoop.ultimoRegistro > 999) {
            if(!GameLoop.primeraEjecucion) {
                Game.platos = [GameLoop.creacionPlatos(false), GameLoop.creacionPlatos(true)];
                console.log("Plato izq: " + Game.platos[0].nombre + " | Plato der: " + Game.platos[1].nombre);
                GameLoop.primeraEjecucion = true;
            }
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
        Game.ingredientes.forEach(function(elemento) {
            elemento.mover();
            if(elemento.posY > canvas.height) {
                elemento.autodestruccion();
            }
        });
        GameLoop.ingredientesEmplatados.forEach(function(elemento) {
            elemento.moverLados();

            if(elemento.derecha) { // Plato derecha
                if(Game.triggers[2].intersectsPlato(elemento)) {
                    elemento.emplatado();
                    if(!Game.platos[1].comprobarIngrediente(elemento.nombre)) { // En caso de que el ingrediente seleccionado sea erroneo. Se crea un plato nuevo;
                        Game.platos.pop();
                        Game.platos.push(GameLoop.creacionPlatos(true));
                    }
                    else { // En caso de que el ingrediente seleccionado sea correcto
                        if(Game.platos[1].ingredienteActual >= Game.platos[1].numIngredientes) { // En caso de que el plato ya este completo. Se crea uno nuevo
                            Game.platos[1].platoCompletado(Game.platos[1]);
                            Game.platos.pop();
                            Game.platos.push(GameLoop.creacionPlatos(true));
                        }
                    }
                }
            }
            else { // Plato izquierda
                if(Game.triggers[1].intersectsPlato(elemento)) {
                    elemento.emplatado();
                    if(!Game.platos[0].comprobarIngrediente(elemento.nombre)) { // En caso de que el ingrediente seleccionado sea erroneo
                        Game.platos.shift();
                        Game.platos.unshift(GameLoop.creacionPlatos(false));
                    }
                    else { // En caso de que el ingrediente seleccionado sea correcto
                        if(Game.platos[0].ingredienteActual >= Game.platos[0].numIngredientes) { // En caso de que el plato ya este completo. Se crea uno nuevo
                            Game.platos[0].platoCompletado(Game.platos[0]);
                            Game.platos.shift();
                            Game.platos.unshift(GameLoop.creacionPlatos(false));
                        }
                    }
                }
            }
        });

        GameLoop.platosCompletados.forEach(function (elemento) {
            elemento.moverLado();
            if(elemento.posX < -40 || elemento.posX > canvas.width) {
                elemento.destruirse();
            }
        })
    },

    // Pintado del canvas
    pintar: function(registroTemporal) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        GameLoop.fps++;       

        // DEBUG visual
        if(Game.debug) {
            Game.triggers.forEach(function(elemento) {
                elemento.drawGizmo();
            });
        } 

        // Pintado de los ingredientes
        Game.ingredientes.forEach(function (elemento) {
            elemento.dibujarEnCanvas();
        });        
        GameLoop.ingredientesEmplatados.forEach(function(elemento) {
            elemento.dibujarEnCanvas();
        });

        // Pintado de los platos
        Game.platos.forEach(function (elemento) {
            elemento.dibujarEnCanvas();
        })
        GameLoop.platosCompletados.forEach(function (elemento) {
            elemento.dibujarEnCanvas();
        })
    },

    // Creacion aleatoria de los ingredientes
    creacionIngredientes: function() {
        let randomIngrediente = Math.floor(Math.random() * (Game.ingredientesJSON.length - 0) + 0);
        let ingredienteSeleccionado = Game.ingredientesJSON[randomIngrediente];
        return new Ingrediente(ingredienteSeleccionado.nombre,
                        ingredienteSeleccionado.ruta,
                        canvas.width/2,
                        (canvas.height/2)-50,
                        0.5);
    },

    // Creacion aleatoria de los platos
    creacionPlatos: function(derecha) {
        let randomPlato = Math.floor(Math.random() * (Game.platosJSON.length - 0) + 0);
        let platoSeleccionado = Game.platosJSON[randomPlato];
        return new Plato(platoSeleccionado.nombre,
                  platoSeleccionado.rutas,
                  platoSeleccionado.receta,
                  derecha);
        //console.log("Plato: " + platoSeleccionado.nombre);
    },

    // Controlador del teclado
    controladorTeclado: function(e) {
        // Derecha: D || ->
        if(e.keyCode == 68 || e.keyCode == 39) {
            for(let elemento of Game.ingredientes) {
                if(Game.triggers[0].intersectsArea(elemento)) {
                    elemento.llevarAPlato(true);
                    break;
                }
            }
        }

        // Izquierda: A || <-
        if(e.keyCode == 65 || e.keyCode == 37) {
            for(let elemento of Game.ingredientes) {
                if(Game.triggers[0].intersectsArea(elemento)) {
                    elemento.llevarAPlato(false);
                    break;
                }
            }
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