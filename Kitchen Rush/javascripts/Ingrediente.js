function Ingrediente(nombre, ruta, posX, posY, velocidad) {
    this.nombre = nombre;
    this.sprite = new Image();
    this.sprite.src = ruta;
    this.posX = posX;
    this.posY = posY;
    this.velocidad = velocidad;

    this.insertarEnArray();
}

Ingrediente.prototype.insertarEnArray = function() {
    Game.ingredientes.push(this);
}

Ingrediente.prototype.dibujarEnCanvas = function() {
    context.drawImage(this.sprite, this.posX, this.posY, 10, 10);
}

Ingrediente.prototype.mover = function() {
    this.posY += this.velocidad;
}

Ingrediente.prototype.autodestruccion = function(elemento) {
    let indice = Game.ingredientes.indexOf(elemento);
    Game.ingredientes.splice(indice, 1);
    elemento = null;
}