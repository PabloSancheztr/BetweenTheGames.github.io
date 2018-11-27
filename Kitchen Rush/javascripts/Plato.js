function Plato(nombre, rutas, receta, lista, derecha) {
    this.nombre = nombre;
    this.sprite = new Image();
    this.rutas = rutas;
    this.sprite.src = this.rutas[0];
    this.receta = receta;
    this.lista = lista;
    this.listaImg = new Image();
    this.listaImg.src = this.lista[0];
    this.ingredienteActual = 0;
    this.numIngredientes = receta.length;
    this.derecha = derecha;

    if(this.derecha) {
        this.posX = (canvas.width/2)+190;
        this.posY = (canvas.height/2)+130;
    }
    else {
        this.posX = (canvas.width/2)-270;
        this.posY = (canvas.height/2)+130;
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
    context.drawImage(this.sprite, this.posX, this.posY, 130, 100);

    if(this.derecha) {
        context.drawImage(this.listaImg, (canvas.width/2)+250, 100, 180, 250);
    }
    else {
        context.drawImage(this.listaImg, (canvas.width/2)-420, 100, 180, 250);
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