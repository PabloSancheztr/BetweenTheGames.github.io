function Plato(nombre, rutas, receta, lista, derecha) {
    this.nombre = nombre;
    this.sprite = new Image(40, 15);
    this.rutas = rutas;
    this.sprite.src = this.rutas[0];
    this.receta = receta;
    this.lista = lista;
    this.listaImg = new Image(40, 40);
    this.ingredienteActual = 0;
    this.numIngredientes = receta.length;
    this.derecha = derecha;

    if(this.derecha) {
        this.posX = 215
        this.posY = 105;
    }
    else {
        this.posX = 60,
        this.posY = 105;
    }
    
    //this.insertarEnArray();
}

Plato.prototype.insertarEnArray = function() {
    Game.platos.push(this);
}

Plato.prototype.sacarDeArray = function() {
    let indice = Game.platos.indexOf(this);
    Game.platos.splice(indice, 1);
}

Plato.prototype.dibujarEnCanvas = function() {
    context.drawImage(this.sprite, this.posX, this.posY, 40, 15);

    if(this.derecha) {
        context.drawImage(this.listaImg, 215, 10, 40, 40);
    }
    else {
        context.drawImage(this.listaImg, 60, 10, 40, 40);
    }
}

Plato.prototype.comprobarIngrediente = function(nombreIngrediente) {
    if(nombreIngrediente == this.receta[this.ingredienteActual]) {
        this.ingredienteActual++;
        this.sprite.src = this.rutas[this.ingredienteActual];
        this.listaImg.src = this.lista[this.ingredienteActual];

        return true;
    }
    else {
        return false;
    }
}

Plato.prototype.destruirse = function() {
    let indice = Game.platos.indexOf(this);
    GameLoop.platosCompletados.splice(indice, 1);
}

Plato.prototype.platoCompletado = function(plato) {
    GameLoop.platosCompletados.push(plato);
}

Plato.prototype.moverLado = function() {
    if(this.derecha) {
        this.posX += 4;
    }
    else {
        this.posX -= 4;
    }
}