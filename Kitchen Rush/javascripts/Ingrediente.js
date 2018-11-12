function Ingrediente(nombre, ruta, posX, posY, velocidad) {
    this.nombre = nombre;
    this.sprite = new Image(10, 10);
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
    context.drawImage(this.sprite, this.posX, this.posY, 20, 10);
}

Ingrediente.prototype.mover = function() {
    this.posY += this.velocidad;
}

Ingrediente.prototype.llevarAPlato = function(derecha) {
    if(derecha) {
        this.posX += 50;
    }
    else{
        this.posX -= 50;
    }

    /*setTimeout(function() {
        let indice = Game.ingredientes.indexOf(this);
        Game.ingredientes.splice(indice, 1);
    }, 500);*/
}

Ingrediente.prototype.autodestruccion = function() {
    let indice = Game.ingredientes.indexOf(this);
    Game.ingredientes.splice(indice, 1);
}