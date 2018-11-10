function Sprite(ruta, idSobreZero, posicion) {
    var elementosRuta = ruta.split("/");
    this.rutaOrigen = "./assets/images/Alimentos/" + elementosRuta[elementosRuta.length-1];
    this.idSobreZero = idSobreZero;
    this.idSobreUno = idSobreZero + 1;
    this.posicion = posicion;
}