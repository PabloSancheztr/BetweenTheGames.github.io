function Comida(x, y , ancho, alto, velocidad) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;    
    this.velocidad = velocidad;
    this.rectangulos = 0;

    this.dibujarEnCanvas();
}

Comida.prototype.dibujarEnCanvas = function() {
    context.fillStyle = '#871287';
    var img = new Image('assets/images/Alimentos/Aguacate.png');
    //img.src = 'assets/images/Alimentos/Aguacate.png';
    //var img = document.getElementById("aguacate");
    context.drawImage(img, 10, 10);
}