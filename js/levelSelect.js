JOGO.levelSelect = function(game){ this.holdicons = []; };

JOGO.levelSelect.prototype = {

	create: function() {
		var style = { font: "36px Finger Paint", fill: "#ffffff", wordWrap: false, align: "center" };

		var select = this.game.add.text(this.game.width / 2, this.game.height / 3 - 50, "Selecione um nivel !!", style);
		select.anchor.set(0.5);

		this.createLevelIcons();
		this.animateLevelIcons();

		var back = this.game.add.button(this.game.width/6, this.game.height - 50, "back", this.menu);
		back.scale.set(0.75);
        back.anchor.set(0.5);

        var self = this;
        var soundOn = this.game.add.button(this.game.width - 50, 35, "soundOn");
        soundOn.anchor.set(0.5);
        soundOn.events.onInputDown.add(function (s, p) {
            s.visible = false;
            soundOff.visible = true;
            self.sound.mute = true;
        }, this);

        var soundOff = this.game.add.button(this.game.width - 50, 35, "soundOff");
        soundOff.anchor.set(0.5);
        soundOff.visible = false;
        soundOff.events.onInputDown.add(function (s, p) {
            s.visible = false;
            soundOn.visible = true;
            self.sound.mute = false;

        }, this);
	},
	createLevelIcons: function() {
		var level = "level";
			var x = 0;
			var y = 0;
			var n = 0;
			for(var l of niveis) {
				var stars = 0;
				var tempo = -1;
				var isLocked = false


				var xpos = this.game.width/1.5 - (128*2) + (x * 128);
				var ypos = this.game.height/2.75 + (y * 128);

				this.holdicons[n] = this.createLevelIcon(xpos, ypos, l.nivel, isLocked, stars);
				var backicon = this.holdicons[n].getAt(0);
				backicon.number = n;
				backicon.nivel = l.nivel;
				backicon.tempo = tempo;
				backicon.locked = isLocked;
				backicon.level = l.name;

				backicon.inputEnabled = true;
				backicon.input.useHandCursor = true;
				backicon.events.onInputDown.add(this.onSpriteDown, this);
				x++;
				n++;
				if(x%3 == 0) {
					x = 0;
					y++;
				}
			}
	},
	createLevelIcon: function(xpos, ypos, n, isLocked, stars) {

		var IconGroup = this.game.add.group();
		IconGroup.x = xpos;
		IconGroup.y = ypos;

		IconGroup.xOrg = xpos;
		IconGroup.yOrg = ypos;

		var frame = 0;
		if (isLocked == false) {frame = 1};
		
		var icon1 = this.game.add.sprite(0, 0, 'levelselecticons', frame);
		IconGroup.add(icon1);

		var style = { font: "30px Finger Paint", fill: "#ffffff", wordWrap: true, align: "center" };
		
		if (isLocked == false) {
			var txt = this.game.add.text(24 * 1.5, 16 * 1.5, ''+n, style);
			var icon2 = this.game.add.sprite(0, 0, 'levelselecticons', (2+stars));
			
			IconGroup.add(txt);
			IconGroup.add(icon2);
		};
		
		return IconGroup;
	},
	onSpriteDown: function(sprite, pointer) {

		var x = sprite.number;

		if (sprite.locked) {
			var IconGroup = this.holdicons[x];
			var xpos = IconGroup.xOrg;

			var tween = this.game.add.tween(IconGroup)
				.to({ x: xpos+6 }, 20, Phaser.Easing.Linear.None)
				.to({ x: xpos-5 }, 20, Phaser.Easing.Linear.None)
				.to({ x: xpos+4 }, 20, Phaser.Easing.Linear.None)
				.to({ x: xpos-3 }, 20, Phaser.Easing.Linear.None)
				.to({ x: xpos+2 }, 20, Phaser.Easing.Linear.None)
				.to({ x: xpos }, 20, Phaser.Easing.Linear.None)
				.start();
		} else {
			var IconGroup = this.holdicons[x];
			var tween = this.game.add.tween(IconGroup.scale)
				.to({ x: 0.9, y: 0.9}, 100, Phaser.Easing.Linear.None)
				.to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.None)
				.start();

			tween.onComplete.add(function(){this.onLevelSelected(sprite.nivel, sprite.level, sprite.tempo);}, this);
		};
	},
	animateLevelIcons: function() {

		for (var i=0; i < this.holdicons.length; i++) {
			var IconGroup = this.holdicons[i];
			IconGroup.y = IconGroup.y + 600;
			var y = IconGroup.y;
			this.game.add.tween(IconGroup).to( {y: y-600}, 500, Phaser.Easing.Back.Out, true, (i*40));
		};
	},
	menu : function () {
		self.game.state.states['menu'].somMenu.stop();
		this.game.state.start('menu');
	},
	onLevelSelected: function(lvl, map, tempo) {
		this.game.state.start('jogo', true, false, lvl, map, tempo);
	}
};