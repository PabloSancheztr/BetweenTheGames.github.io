function Ingrediente(nombre, ruta, velocidad) {
    this.nombre = nombre;
    this.sprite = new Image(20, 20);
    this.sprite.src = ruta;
    this.velocidad = velocidad;
    
    if(screen.width < 500) {
        this.ancho = 10;
        this.alto = 7;

        this.posX = (canvas.width/2)-10;
        this.posY = (canvas.height/2)-160;
    }
    else if(screen.width < 1100) {
        this.ancho = 10;
        this.alto = 7;

        this.posX = (canvas.width/2);
        this.posY = (canvas.height/2)-230;
    }
    else {
        this.ancho = 20;
        this.alto = 18;

        this.posX = (canvas.width/2);
        this.posY = (canvas.height/2)-230;
    }

    this.insertarEnArray();
}

Ingrediente.prototype.insertarEnArray = function() {
    Game.ingredientes.push(this);
}

Ingrediente.prototype.dibujarEnCanvas = function() {
    context.drawImage(this.sprite, this.posX, this.posY, this.ancho, this.alto);
    
    if(this.ancho < 100 && this.alto < 97) {
        this.ancho += 0.35;
        this.alto += 0.35;
    }
}

Ingrediente.prototype.mover = function() {
    this.posY += this.velocidad;
}

Ingrediente.prototype.moverLados = function() {
    if(this.derecha) {
        this.posX += 10;
    }
    else {
        this.posX -= 10;
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