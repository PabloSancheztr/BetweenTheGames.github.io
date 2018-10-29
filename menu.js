ProEvolutionQuidditch.menuState = function(game) {

}

ProEvolutionQuidditch.menuState.prototype = {

    preload: function() {
        game.add.sprite(0,0, "GameoverFondo");
        game.add.sprite(game.world.centerX - 50, 80, "pelota").scale.set(0.8);
        game.add.sprite(game.world.centerX - 280, 100, "titulo").scale.set(0.4);
        game.add.sprite(game.world.centerX - 300, game.world.centerY - 50, "j1").scale.set(0.6);
        game.add.sprite(game.world.centerX + 300, game.world.centerY - 50, "j2").scale.set(x = -0.6, y= 0.6);
        game.add.sprite(game.world.centerX - 150, game.world.centerY + 100, "pulsa1").scale.set(0.4);
        game.add.sprite(game.world.centerX - 150, game.world.centerY + 150 , "pulsa2").scale.set(0.4);

    },

    create: function() {

        console.log("menu");
       
    },

    update: function() {

    }
}