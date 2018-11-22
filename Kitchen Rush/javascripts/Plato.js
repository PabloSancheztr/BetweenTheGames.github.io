function Plato(nombre, rutas, receta, derecha) {
    this.nombre = nombre;
    this.sprite = new Image(40, 15);
    this.rutas = rutas;
    this.sprite.src = this.rutas[0];
    this.receta = receta;
    this.ingredienteActual = 0;
    this.numIngredientes = receta.length;
    this.derecha = derecha;

    if(this.derecha) {
        this.posX = 205
        this.posY = 120;
    }
    else {
        this.posX = 65,
        this.posY = 120;
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
}

Plato.prototype.comprobarIngrediente = function(nombreIngrediente) {
    if(nombreIngrediente == this.receta[this.ingredienteActual]) {
        this.ingredienteActual++;
        this.sprite.src = this.rutas[this.ingredienteActual];
        
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