function Ingrediente(nombre, ruta, posX, posY, velocidad) {
    this.nombre = nombre;
    this.sprite = new Image(20, 20);
    this.sprite.src = ruta;
    this.posX = posX;
    this.posY = posY;
    this.velocidad = velocidad;
    this.ancho = 8;
    this.alto = 5;

    this.insertarEnArray();
}

Ingrediente.prototype.insertarEnArray = function() {
    Game.ingredientes.push(this);
}

Ingrediente.prototype.dibujarEnCanvas = function() { // 20x17 maximo
    context.drawImage(this.sprite, this.posX, this.posY, this.ancho, this.alto);
    
    if(this.ancho < 20 && this.alto < 17) {
        this.ancho += 0.08;
        this.alto += 0.08;
    }
    else {
        //console.log("Ancho: " + this.sprite.naturalWidth + " | Alto: " + this.sprite.naturalHeight);
    }
}

Ingrediente.prototype.mover = function() {
    this.posY += this.velocidad;
}

Ingrediente.prototype.moverLados = function() {
    if(this.derecha) {
        this.posX += 4;
    }
    else {
        this.posX -= 4;
    }
}

Ingrediente.prototype.llevarAPlato = function(derecha) {
    let indice = Game.ingredientes.indexOf(this);
    let ingredienteEmplatado = Game.ingredientes[indice];
    Game.ingredientes.splice(indice, 1);

    if(derecha) {
        ingredienteEmplatado.derecha = true;
    }
    else{
        ingredienteEmplatado.derecha = false;
    }
    
    GameLoop.ingredientesEmplatados.push(ingredienteEmplatado);
}

Ingrediente.prototype.autodestruccion = function() {
    let indice = Game.ingredientes.indexOf(this);
    Game.ingredientes.splice(indice, 1);
}

Ingrediente.prototype.emplatado = function() {
    let indice = GameLoop.ingredientesEmplatados.indexOf(this);
    GameLoop.ingredientesEmplatados.splice(indice, 1);
}