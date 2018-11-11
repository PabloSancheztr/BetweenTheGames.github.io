function TriggerRect(x, y, ancho, alto) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;

    this.insertarEnArray();
}

TriggerRect.prototype.insertarEnArray = function() {
    Game.triggers.push(this);
}

TriggerRect.prototype.intersects = function(ingrediente) {
    return (this.x < ingrediente.posX  + ingrediente.sprite.width && 
            this.x + this.ancho > ingrediente.posX &&
            this.y < ingrediente.posY + ingrediente.sprite.height &&
            this.alto + this.y > ingrediente.posY) ? false : true;
}

TriggerRect.prototype.drawGizmo = function(color) {
    context.fillStyle = "#A00C0C";
    context.fillRect(this.x, this.y, this.ancho, this.alto);
}