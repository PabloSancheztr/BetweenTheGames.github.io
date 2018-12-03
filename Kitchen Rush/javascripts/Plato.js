function Plato(nombre, rutas, receta, lista, derecha) {
    this.nombre = nombre;
    this.sprite = new Image();
    this.rutas = rutas;
    this.sprite.src = this.rutas[0];
    this.receta = receta;
    this.lista = lista;
    this.listaImg = new Image();
    this.listaImg.src = this.lista[0];
    this.ingredienteActual = 0;
    this.numIngredientes = receta.length;
    this.derecha = derecha;
    this.posX = 0;
    this.posY = 0;
    this.listaPosX = 0;
    this.listaPosY = 0;

    if(screen.width < 500) {
        if(this.derecha) {
            this.posX = (canvas.width/2)+75;
            this.posY = (canvas.height/2)+80;

            this.listaPosX = (canvas.width/2)+70;
            this.listaPosY = 60;
        }
        else {
            this.posX = (canvas.width/2)-145;
            this.posY = (canvas.height/2)+80;

            this.listaPosX = (canvas.width/2)-110;
            this.listaPosY = 60;
        }
    }
    else if(screen.width < 1100) {
        if(this.derecha) {
            this.posX = (canvas.width/2)+140;
            this.posY = (canvas.height/2)+160;

            this.listaPosX = (canvas.width/2)+180;
            this.listaPosY = 110;
        }
        else {
            this.posX = (canvas.width/2)-220;
            this.posY = (canvas.height/2)+160;

            this.listaPosX = (canvas.width/2)-290;
            this.listaPosY = 110;
        }
    }
    else {
        if(this.derecha) {
            this.posX = (canvas.width/2)+190;
            this.posY = (canvas.height/2)+130;

            this.listaPosX = (canvas.width/2)+250;
            this.listaPosY = 100;
        }
        else {
            this.posX = (canvas.width/2)-270;
            this.posY = (canvas.height/2)+130;

            this.listaPosX = (canvas.width/2)-420;
            this.listaPosY = 100;
        }
    }
    
    this.insertarEnArray();
}

Plato.prototype.insertarEnArray = function() {
    if(this.derecha) {
        Game.platos.push(this);
    }
    else {
        Game.platos.unshift(this);
    }
}

Plato.prototype.sacarDeArray = function() {
    let indice = Game.platos.indexOf(this);
    Game.platos.splice(indice, 1);
}

Plato.prototype.dibujarEnCanvas = function(emplatado) {
    if(screen.width < 500) {
        context.drawImage(this.sprite, this.posX, this.posY, 70, 60);

        if(!emplatado) {
            if(this.derecha) {
                context.drawImage(this.listaImg, this.listaPosX, this.listaPosY, 40, 180);
            }
            else {
                context.drawImage(this.listaImg, this.listaPosX, this.listaPosY, 40, 180);
            }
        }
    }
    else if(screen.width < 1100) {
        context.drawImage(this.sprite, this.posX, this.posY, 120, 90);

        if(!emplatado) {
            if(this.derecha) {
                context.drawImage(this.listaImg, this.listaPosX, this.listaPosY, 120, 300);
            }
            else {
                context.drawImage(this.listaImg, this.listaPosX, this.listaPosY, 120, 300);
            }   
        }
    }
    else {
        context.drawImage(this.sprite, this.posX, this.posY, 130, 100);

        if(!emplatado) {
            if(this.derecha) {
                context.drawImage(this.listaImg, this.listaPosX, this.listaPosY, 160, 300);
            }
            else {
                context.drawImage(this.listaImg, this.listaPosX, this.listaPosY, 160, 300);
            }
        }
    }    
}

Plato.prototype.comprobarIngrediente = function(nombreIngrediente) {
    if(nombreIngrediente == this.receta[this.ingredienteActual]) {
        this.ingredienteActual++;
        this.sprite.src = this.rutas[this.ingredienteActual];
        this.listaImg.src = this.lista[this.ingredienteActual];

        return true;
    }
    else {
        return false;
    }
}

Plato.prototype.destruirse = function() {
    let indice = Game.platos.indexOf(this);
    GameLoop.platosCompletados.splice(indice, 1);
}

Plato.prototype.platoCompletado = function(plato) {
    GameLoop.platosCompletados.push(plato);
}

Plato.prototype.moverLado = function() {
    if(this.derecha) {
        this.posX += 8;
    }
    else {
        this.posX -= 8;
    }
}