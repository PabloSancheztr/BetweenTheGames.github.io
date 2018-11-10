function Ingrediente(posX, posY, velocidad) {
    this.sprite = new Image();
    this.sprite.src = "assets/images/Alimentos/Aguacate.png";
    this.sprite.lo
    this.posX = posX;
    this.posY = posY;
    this.velocidad = velocidad;

}

Ingrediente.prototype.dibujarEnCanvas = function() {
    context.drawImage(this.sprite, this.posX, this.posY, 10, 10);
}