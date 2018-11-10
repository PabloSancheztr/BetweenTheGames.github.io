/*function Comida(ruta, idSobreZero, pos) {
    var elementosRuta = ruta.split("/");
    this.rutaOrigen = "./assets/images/Alimentos/" + elementosRuta[elementosRuta.length-1];
    this.idSobreZero = idSobreZero;
    this.idSobreUno = idSobreZero+1;
    this.pos = pos;
}*/

var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext('2d');

function Comida(x, y , ancho, alto, velocidad) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;    
    this.velocidad = velocidad;
    this.rectangulos = 0;

    setInterval(this.dibujarEnCanvas(), 1000);
}

Comida.prototype.dibujarEnCanvas = function() {
    context.fillStyle = '#871287';
    context.fillRect(this.x, this.y, this.ancho, this.alto);
    this.y += this.velocidad;
    console.log("Rectangulos pintados: " + this.rectangulos);
}