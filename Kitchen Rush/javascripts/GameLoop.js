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
    debug: false,
    primeraEjecucion: true,
    gameOver: false,
    velocidadIngredientes: 0.5,
    incrementar: false,

    nivelDificultad: new Array(),
    ingredientesEmplatados: new Array(),
    platosCompletados: new Array(),

    iterar: function(registroTemporal) {

        if(!GameLoop.gameOver)
            GameLoop.idEjecucion = window.requestAnimationFrame(GameLoop.iterar);

        if(registroTemporal-GameLoop.ultimoRegistro > 999) {

            // Primera ejecucion
            if(GameLoop.primeraEjecucion) {
                Game.platos = [GameLoop.creacionPlatos(false), GameLoop.creacionPlatos(true)];
                

                GameLoop.primeraEjecucion = false;
            }
            GameLoop.creacionIngredientes();
        }

        // Final del loop. Actualizacion y pintado
        GameLoop.actualizar(registroTemporal);
        GameLoop.pintar(registroTemporal);

        // Contador de FPS y APS
        if(registroTemporal-GameLoop.ultimoRegistro > 999) {
            GameLoop.ultimoRegistro = registroTemporal;

            if(Game.contrareloj)
                Game.actualizarCronometro();
            
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

        // Logica de si el ingrediente sirve o no en el plato
        GameLoop.ingredientesEmplatados.forEach(function(elemento) {
            elemento.moverLados();
            GameLoop.anadirIngrediente(elemento);
        });

        // Mover plato al completarse
        GameLoop.platosCompletados.forEach(function(elemento) {
            elemento.moverLado();
            if(elemento.posX < -40 || elemento.posX > canvas.width) {
                elemento.destruirse();
            }
        })

        // Game over por fallos en los platos
        if(Game.maraton) {
            if(Game.nivelEnfado.length >= 3) {
                //console.log("Fin de juego");
                GameLoop.gameOver = true;
                $("#juego").load('./finjuego.html');
            }
        }
    },

    // Pintado del canvas
    pintar: function(registroTemporal) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "black";
        context.font = "800 10px Arial";
        GameLoop.fps++;       

        // Fondo
        context.drawImage(Game.fondo, 0, 0, canvas.width, canvas.height);

        // DEBUG visual
        if(GameLoop.debug) {
            Game.triggers.forEach(function(elemento) {
                elemento.drawGizmo();
            });
        } 

        // Pintado de los ingredientes
        Game.ingredientes.forEach(function(elemento) {
            elemento.dibujarEnCanvas();
        });        
        GameLoop.ingredientesEmplatados.forEach(function(elemento) {
            elemento.dibujarEnCanvas();
        });

        // Pintado de los platos
        Game.platos.forEach(function (elemento) {
            elemento.dibujarEnCanvas();
        })
        GameLoop.platosCompletados.forEach(function(elemento) {
            elemento.dibujarEnCanvas();
        })

        // Cronometro
        if(Game.contrareloj) {
            //context.font = "bold 12px sans-serif";
            if(Game.segundos >= 10 && Game.minutos >= 0) {
                context.fillText(Game.minutos + ":" + Game.segundos, (canvas.width/2)-5, 20);
            }
            else if(Game.minutos < 0) {
                context.fillText("Fin del juego", (canvas.width/2)-20, 20);
                GameLoop.gameOver = true;
                $("#juego").load('./finjuego.html');
            }
            else {
                context.fillText(Game.minutos + ":0" + Game.segundos, (canvas.width/2)-10, 20);
            }
        }

        // Nivel de enfado
        if(Game.maraton) {
            let posImgX = (canvas.width/2)-40;
            Game.nivelEnfado.forEach(function(elemento) {
                context.drawImage(elemento, posImgX+15, 7, 30, 20);
                posImgX += 15;
            })
        }

        // Nivel de dificultad
        let posImgX = canvas.width-90;
        GameLoop.nivelDificultad.forEach(function(elemento) {
            context.drawImage(elemento, posImgX, canvas.height-20, 10, 18);
            posImgX += 15;
        })

        // Platos completados
        context.fillText("Platos servidos: " + Game.platosCompletados, 5, canvas.height-5);
    },

    // Creacion aleatoria de los ingredientes
    creacionIngredientes: function() {
        let randomIngrediente = Math.floor(Math.random() * (Game.ingredientesJSON.length - 0) + 0);
        let ingredienteSeleccionado = Game.ingredientesJSON[randomIngrediente];

        if((Game.platosCompletados%5) == 0 && GameLoop.incrementar) {
            GameLoop.velocidadIngredientes += 0.2;
            GameLoop.nivelDificultad.push(Game.dificultad);
            GameLoop.incrementar = false;

            if(Game.contrareloj) {
                Game.aumentarCronometro();
                console.log("Aumentar");
            }
        }
        if(Game.platosCompletados%5 != 0) {
            GameLoop.incrementar = true;
        }

        return new Ingrediente(ingredienteSeleccionado.nombre,
                        ingredienteSeleccionado.ruta,
                        (canvas.width/2)+3,
                        (canvas.height/2)-45,
                        GameLoop.velocidadIngredientes);
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

    // Logica de si el ingrediente sirve o no en el plato
    anadirIngrediente: function(elemento) {
        // Plato derecha
        if(elemento.derecha) { 
            if(Game.triggers[2].intersectsPlato(elemento)) {
                elemento.emplatado();
                if(!Game.platos[1].comprobarIngrediente(elemento.nombre)) { // En caso de que el ingrediente seleccionado sea erroneo. Se crea un plato nuevo;
                    Game.platos.pop();
                    Game.platos.push(GameLoop.creacionPlatos(true));

                    if(Game.maraton)
                        Game.nivelEnfado.push(Game.enfadoImg);
                }
                else { // En caso de que el ingrediente seleccionado sea correcto
                    if(Game.platos[1].ingredienteActual >= Game.platos[1].numIngredientes) { // En caso de que el plato ya este completo. Se crea uno nuevo
                        Game.platosCompletados++;
                        Game.platos[1].platoCompletado(Game.platos[1]);
                        Game.platos.pop();
                        Game.platos.push(GameLoop.creacionPlatos(true));
                    }
                }
            }
        }
        // Plato izquierda
        else { 
            if(Game.triggers[1].intersectsPlato(elemento)) {
                elemento.emplatado();
                if(!Game.platos[0].comprobarIngrediente(elemento.nombre)) { // En caso de que el ingrediente seleccionado sea erroneo. Se crea un plato nuevo
                    Game.platos.shift();
                    Game.platos.unshift(GameLoop.creacionPlatos(false));

                    if(Game.maraton)
                        Game.nivelEnfado.push(Game.enfadoImg);
                }
                else { // En caso de que el ingrediente seleccionado sea correcto
                    if(Game.platos[0].ingredienteActual >= Game.platos[0].numIngredientes) { // En caso de que el plato ya este completo. Se crea uno nuevo
                        Game.platosCompletados++;
                        Game.platos[0].platoCompletado(Game.platos[0]);
                        Game.platos.shift();
                        Game.platos.unshift(GameLoop.creacionPlatos(false));
                    }
                }
            }
        }
    },

    // Controlador del teclado
    controladorTeclado: function(e) {
        // Derecha: D || ->
        if(e.keyCode == 68 || e.keyCode == 39) {
            GameLoop.pulsarDerecha();
        }

        // Izquierda: A || <-
        if(e.keyCode == 65 || e.keyCode == 37) {
            GameLoop.pulsarIzquierda();
        }

        // Cambio modo debug/modo normal: f7
        if(e.keyCode == 118) {
            if(GameLoop.debug) {
                GameLoop.debug = false;
            }
            else {
                GameLoop.debug = true;
            }
        }
    },

    pulsarDerecha: function() {
        for(let elemento of Game.ingredientes) {
            if(Game.triggers[0].intersectsArea(elemento)) {
                elemento.llevarAPlato(true);
                break;
            }
        }
    },

    pulsarIzquierda: function() {
        for(let elemento of Game.ingredientes) {
            if(Game.triggers[0].intersectsArea(elemento)) {
                elemento.llevarAPlato(false);
                break;
            }
        }
    }
};