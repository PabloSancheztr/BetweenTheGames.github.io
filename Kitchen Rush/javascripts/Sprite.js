function Sprite(ruta, idSobreZero, posicionEnHoja) {
    var elementosRuta = ruta.split("/");
    this.rutaOrigen = "./assets/images/Alimentos/" + elementosRuta[elementosRuta.length-1];
}