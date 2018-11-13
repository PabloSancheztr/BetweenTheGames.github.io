function Plato(nombre, ruta, receta, derecha) {
    this.nombre = nombre;
    this.ruta = ruta;
    this.receta = receta;
    this.derecha = derecha;
    if(derecha) {
        this.posX = 65;
        this.posY = 120;
    }
    else {
        this.posX = 205,
        this.posY = 120;
    }
    
    this.insertarEnArray();
}

Plato.prototype.insertarEnArray = function() {
    Game.platos.push(this);
}

Plato.prototype.sacarDeArray = function() {
    let indice = Game.platos.indexOf(this);
    Game.platos.splice(indice, 1);
}