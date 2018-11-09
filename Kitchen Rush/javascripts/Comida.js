function Comida(ruta, idSobreZero, pos) {
    var elementosRuta = ruta.split("/");
    this.rutaOrigen = "./assets/images/Alimentos/" + elementosRuta[elementosRuta.length-1];
    this.idSobreZero = idSobreZero;
    this.idSobreUno = idSobreZero+1;
    this.pos = pos;
}

Comida.prototype.dibujarEnCanvas = function() {
    var canvas = document.getElementById("gameCanvas");
}