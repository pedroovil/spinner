JOGO.fim = function(game) {};

JOGO.fim.prototype = {
    
	init: function (time, nivel, best, map) {
		self = this;
		
		this.nextLVL = false;
		this.best = best;
		this.level = nivel;
		this.map = map;

		this.stars = '0-stars';
		this.time = time;

		var stars = 0;
		if(time <= 60)  { stars = 3; this.stars = '3-stars'; }
		else if(time <= 120) { stars = 2; this.stars = '2-stars'; }
		else if(time <= 180) { stars = 1; this.stars = '1-stars'; }

	},
  	create: function() {
  		self = this;
  		this.levelComplete = this.game.add.audio('level-complete');
		setTimeout(function () { self.levelComplete.play(); }, 250);

        var bg = this.game.add.sprite(this.game.width/2, this.game.height/2, 'fim-bg');
        bg.anchor.set(0.5);

        var style = { font: "40px Finger Paint", fill: "#ffffff", wordWrap: true, wordWrapWidth : this.game.width - 50, align: "center" };
        var title = this.game.add.text(this.game.width / 2, this.game.height/4, "FIM DE NIVEL!", style);
        title.anchor.set(0.5);

        var stars = this.game.add.sprite(this.game.width/2, this.game.height/2.5, this.stars);
        stars.anchor.set(0.5);
        stars.scale.set(0);

        this.game.add.tween(stars.scale)
				.to({ x: 1.0, y: 1.0 }, 500, Phaser.Easing.Linear.None)
				.to({ x: 1.15, y: 1.15 }, 100, Phaser.Easing.Linear.None)
				.to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.None)
				.to({ x: 0.85, y: 0.85 }, 100, Phaser.Easing.Linear.None)
				.to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.None)
				.to({ x: 1.15, y: 1.15 }, 100, Phaser.Easing.Linear.None)
				.to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.None)
				.to({ x: 0.85, y: 0.85 }, 100, Phaser.Easing.Linear.None)
				.to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.None)
				.to({ x: 1.15, y: 1.15 }, 100, Phaser.Easing.Linear.None)
				.to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.None)
				.to({ x: 0.85, y: 0.85 }, 100, Phaser.Easing.Linear.None)
				.to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.None).start();

        var points = this.game.add.text(this.game.width / 2 , this.game.height/2 + 50, "Tempo: " + this.time + " s \nMelhor Tempo: " + this.best + " s", { font: "22px Audiowide", fill: "#ed1212", align: "center" });
        points.anchor.set(0.5);

        menuGroup = this.game.add.group();

        var menu = this.game.add.button(this.game.width / 3.5, this.game.height - 125, "fim-back", this.menu);
        menu.anchor.set(0.5);
        menu.events.onInputOver.add(this.onSpriteOver, this);
        menuGroup.add(menu);

        var reload = this.game.add.button(this.game.width / 2, this.game.height - 125, "fim-reload", this.reload);
        reload.anchor.set(0.5);
        reload.events.onInputOver.add(this.onSpriteOver, this);
        menuGroup.add(reload);

        var next = this.game.add.button(this.game.width/2 + this.game.width / 4.75, this.game.height - 125, "fim-next", this.next);
        next.anchor.set(0.5);
        next.events.onInputOver.add(this.onSpriteOver, this);
        menuGroup.add(next);

    },
	menu : function () {
		this.game.state.start('menu', true, false);
	},
	reload : function() {
		this.game.state.start('jogo', true, false, self.level, self.map, self.best);
	},
	next : function () {
		if(self.nextLVL){
			this.game.state.start('jogo', true, false, self.nextNivel, self.nextMap, self.nextBest);
		}
		else {
			if(!popup) {
				popup = new POPUP(self.game.width - 250, self.game.height - 100, 'chat-box', "Não existem mais niveis para carregar!", 
																	{ font: "18px Finger Paint", fill: "#ffffff", wordWrap: true, align: "center" },
																	true, '\n');	
				popup.openWindow();
				popup.nextPhrase();
			}
		}
	},
	onSpriteOver : function (sprite, pointer) {
        JOGO.somButton.play();
        var xpos = sprite.x;
        var tween = this.game.add.tween(sprite)
                .to({ x: xpos + 6 }, 100, Phaser.Easing.Linear.None)
                .to({ x: xpos - 5 }, 100, Phaser.Easing.Linear.None)
                .to({ x: xpos + 4 }, 100, Phaser.Easing.Linear.None)
                .to({ x: xpos - 3 }, 100, Phaser.Easing.Linear.None)
                .to({ x: xpos }, 100, Phaser.Easing.Linear.None)
                .start();
    }
}

