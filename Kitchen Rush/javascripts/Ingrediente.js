function Ingrediente(posX, posY, velocidad) {
    this.sprite = new Image();
    this.sprite.src = "./assets/images/Alimentos/Aguacate.png";
    this.posX = posX;
    this.posY = posY;
    this.velocidad = velocidad;
}

Ingrediente.prototype.dibujarEnCanvas = function() {
    context.drawImage(this.sprite, this.posX, this.posY, 20, 20);
    //context.fillStyle = '#871287';
    //context.fillRect(20, 30, 100, 50);
    console.log("Dibujar en canvas");
}