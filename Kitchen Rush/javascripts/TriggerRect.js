function TriggerRect(x, y, ancho, alto, color) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.color = color;

    this.insertarEnArray();
}

TriggerRect.prototype.insertarEnArray = function() {
    Game.triggers.push(this);
}

TriggerRect.prototype.intersectsArea = function(ingrediente) {
    let posIngrediente = ingrediente.posY + (ingrediente.sprite.height/2);
    //console.log("posIngrediente: " + posIngrediente);
    return (posIngrediente > this.y && posIngrediente < (this.y+this.alto)) ? true : false;
}

TriggerRect.prototype.intersectsPlato = function(ingrediente) {
    let posIngrediente = ingrediente.posX + (ingrediente.sprite.width/2);
    
    if(ingrediente.derecha) {
        return (posIngrediente > (this.x+(this.ancho/2))) ? true : false;
    }
    else {
        return (posIngrediente < (this.x+(this.ancho/2))) ? true : false;
    }
}

TriggerRect.prototype.drawGizmo = function() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.ancho, this.alto);
}