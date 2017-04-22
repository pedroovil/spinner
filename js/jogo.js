var text = null;
JOGO.jogo = function(game) {
	this.level;
	this.map;
};

JOGO.jogo.prototype = {
	init : function (level, map, time) {
		this.level = level;
		this.map = map;
		this.bestTime = time;
		this.vel =  2 + this.level * 0.5;
		this.modo = level - 1;
	},
	preload : function () {    
		this.game.stage.backgroundColor = "#000000";
		JOGO.game = this.game;
	},
	create: function() {

		this.opacity = 0.1;

		if(!this.game.device.desktop) {
			this.opacity = 0.4;
			this.vel *= 2;
		}

		this.obstacles = null;

		this.reset = false;

		//this.game.time.advancedTiming = true;
	   	//this.game.time.desiredFps = 60;

		this.topbar = this.game.add.group();
		this.game.forceSingleUpdate = true;
		this.panel = this.add.sprite(0, 0, 'painel-superior');
		this.panel.fixedToCamera = true;
		this.topbar.add(this.panel);

		this.animation = true;

		
	   	this.bgImages = this.game.add.group();
		rotation = 0;


		bmd = this.game.add.bitmapData(50, 50);
	   	bmd.ctx.beginPath();

	   	switch(this.modo) {

		   	case 0:
		   		bmd.ctx.rect(0, 0, 50, 50);
		   		bmd.ctx.lineWidth = 10;
		   		bmd.ctx.strokeStyle = "#aaaaaa";
		   		bmd.ctx.stroke();
		   		
		   		this.background();
				this.time.events.loop(Phaser.Timer.SECOND/2, this.background, this);
		   	
		   	break;

		   	case 1: 
		   		bmd.ctx.rect(0, 0, 50, 50);
			   	bmd.ctx.fillStyle = "#aaaaaa";
			   	bmd.ctx.fill();


			   	this.big = true;
				this.background2();
				this.time.events.loop(Phaser.Timer.SECOND/2, this.updateBackground, this);

		   	break;

		   	case 2:
		   		
		   		bmd.ctx.rect(0, 0, 50, 50);
			   	bmd.ctx.fillStyle = "#aaaaaa";
			   	bmd.ctx.fill();

		   		this.background3();
		   	break;

		   	default :
		   		bmd.ctx.rect(0, 0, 50, 50);
		   		bmd.ctx.lineWidth = 10;
		   		bmd.ctx.strokeStyle = "#aaaaaa";
		   		bmd.ctx.stroke();
		   		
		   		this.background();
					this.time.events.loop(Phaser.Timer.SECOND/2, this.background, this);
		   	break;
	  	}
	

		map = this.game.add.tilemap(this.map);
		this.game.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		
		this.checkpoint = {
			x : 0,
			y : map.heightInPixels
		};

		this.game.camera.setBoundsToWorld();
		this.game.camera.setPosition(this.checkpoint.x, this.checkpoint.y);

		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.createObstacles();
		this.createCheckpoints();

		this.audioOnOff = true;
		this.somColisao = this.game.add.audio('somColisao');
		this.somCheckpoint = this.game.add.audio('checkpoint');

		this.somGame = this.game.add.audio('game-theme');

		this.somGame.play();
		this.somGame.loop = true;
		
		this.time.events.loop(Phaser.Timer.SECOND, this.atualizaTimer, this);
		
		this.nivel     = 1;

		this.pointBG = this.game.add.sprite(JOGO.area.largura / 3, 26, "points", this.menu);
		this.pointBG.fixedToCamera = true;
		this.pointBG.anchor.set(0.5);
		this.topbar.add(this.pointBG);
		
		this.textoTempo = this.game.add.text(JOGO.area.largura / 3, 30, 0, { font: "20px Audiowide", fill: "#ed1212", align: "center" });
		this.textoNivel = this.game.add.text(this.game.width/2, 30, "Nível: " + this.level, { font: "22px Finger Paint", fill: "#ffffff", align: "center" });
		this.textoTempo.fixedToCamera = true;
		this.textoNivel.fixedToCamera = true;
		this.textoTempo.anchor.set(0.5);
		this.textoNivel.anchor.set(0.5);

		this.back = this.game.add.button(25, 25, "botao-voltar", this.menu);
		this.back.anchor.set(0.5);
		this.back.input.priorityID = 1;
		this.back.fixedToCamera = true;
		this.topbar.add(this.back);

		self = this;
		this.soundOn = this.game.add.button(this.game.width - 65, 25, "soundOn");
		this.soundOn.anchor.set(0.5);
		this.soundOn.fixedToCamera = true;
		this.soundOn.events.onInputDown.add(function (s, p) {
			s.visible = false;
			this.soundOff.visible = true;
			self.sound.mute = true;
		}, this);
		this.topbar.add(this.soundOn);

		this.soundOff = this.game.add.button(this.game.width - 65, 25, "soundOff");
		this.soundOff.anchor.set(0.5);
		this.soundOff.visible = false;
		this.soundOff.fixedToCamera = true;
		this.soundOff.events.onInputDown.add(function (s, p) {
			s.visible = false;
			this.soundOn.visible = true;
			self.sound.mute = false;

		}, this);
		this.topbar.add(this.soundOff);


		this.btnPausa = this.game.add.button(this.game.width - 25, 25, "botao-pausa");
		this.btnPausa.anchor.set(0.5);
		this.btnPausa.fixedToCamera = true;
		this.btnPausa.events.onInputDown.add(function (s, p) {
			s.visible = false;
			this.btnContinuar.visible = true;
			this.pausaGame();
		}, this);
		this.btnPausa.events.onInputUp.add(function () { 
			self.game.paused = true;
			this.input.onDown.add(function(){
				sprite_pausa.kill();
				text_pausa.kill();
				self.btnPausa.visible = true;
				self.btnContinuar.visible = false;
				self.game.paused = false;
			}, this);
		}, this);
		this.topbar.add(this.btnPausa);

		this.btnContinuar = this.game.add.button(this.game.width - 25, 25, "botao-continuar");
		this.btnContinuar.anchor.set(0.5);
		this.btnContinuar.visible = false;
		
		JOGO.JOGADOR = new player(1, JOGO.area.largura / 2, JOGO.area.altura - 75 - 15, 'b1', 'b2');
		if(!JOGO.game.device.desktop) {
			JOGO.JOGADOR.vel = 0.175;
		}

		setTimeout(function () { self.animation = false; }, 1000);

		this.topbar.add(this.btnContinuar);

	},
	hit : function (bola, obstaculo) {
		this.reset = true;
		this.somColisao.play();
		if ( "vibrate" in window.navigator ) window.navigator.vibrate(100);
		
		var px = bola.world.x + 15;
		var py = bola.world.y + 15;

		if(obstaculo.world.x < bola.world.x) px = bola.world.x - 15;
		if(obstaculo.world.y < bola.world.y) py = bola.world.y - 15;

		var s = obstaculo.splash.create(px, py, bola.splash);
		s.anchor.set(0.5);
		s.alpha = 0.75;
		s.original = {x : px, y : py };

		this.game.add.tween(s.scale)
	   		.to({ x: 0.90, y: 0.90 }, 250, Phaser.Easing.Linear.None)
				.to({ x: 1.0, y: 1.0 }, 250, Phaser.Easing.Linear.None).start().loop(true);

		/*this.game.paused = true;
		setTimeout(function () { self.game.paused = false }, 500);*/
	},
	hitCheckpoint : function (bola, check) {
		if(check.checked) return;

		this.checkpoint.y = check.y - 200;

		this.animation = true;
		setTimeout(function () { self.animation = false; }, 1000);

		var textoCheckpoint = this.game.add.text(JOGO.area.largura / 2, JOGO.area.altura/2, check.texto, { font: "26px Finger Paint", fill: "#ffffff", align: "center" });
		textoCheckpoint.fixedToCamera = true;
		textoCheckpoint.anchor.set(0.5);
		textoCheckpoint.alpha = this.opacity * 2;
		this.somCheckpoint.play();
		check.checked = true;

		setTimeout(function () { textoCheckpoint.kill(); }, 1500);
	},
	atualizaTimer: function() {
		if(!this.reset)
			JOGO.JOGADOR.updateTempo(1, this.textoTempo);
	},
	background : function () {
		this.bgImages.forEach(function (e) { 
			e.escala *=2;
			e.tween = self.game.add.tween(e.scale)
	   		.to({ x: e.escala*2, y: e.escala*2 }, 1000, Phaser.Easing.Linear.None).start().loop(true);

			if(e.escala > 16) {
				e.tween.stop();
				e.kill();
			}
		});

		var sprite = this.bgImages.create(this.game.world.centerX, JOGO.area.altura/2, bmd);
		sprite.anchor.set(0.5);
		sprite.fixedToCamera = true;
		sprite.alpha = this.opacity;
		sprite.rotation = this.rotation
		sprite.escala = 0.5;
		sprite.scale.set(0.5);
	},
	background2 : function () {
		for(var i = 0; i < 5; i++) {
			for(var j = 0; j < 4; j++) {
				var xpos = this.game.width/1.5 - (128*2) + (j * 128);
				var ypos = this.game.height/1.8 - (128*2) + (i * 128);

				var sprite = this.bgImages.create(xpos, ypos, bmd);
				sprite.anchor.set(0.5);
				sprite.fixedToCamera = true;
				sprite.alpha = this.opacity;
				sprite.rotation = this.rotation;
				sprite.escala = 1;
				sprite.big = this.big;

				if(this.big){ 
					sprite.scale.set(1.5);
					sprite.escala = 1.5;
				}
				this.game.add.tween(sprite.scale)
	   		.to({ x: sprite.escala - 0.15, y: sprite.escala - 0.15 }, 250, Phaser.Easing.Linear.None)
				.to({ x: sprite.escala, y: sprite.escala }, 250, Phaser.Easing.Linear.None).start().loop(true);

				this.big = !this.big;
			}
			this.big = !this.big;
		}

	},
	background3 : function () {
		
		var emitter = this.game.add.emitter(JOGO.area.largura/2, JOGO.area.altura/2, 200);
	    emitter.width = JOGO.area.largura * 2;
	    emitter.fixedToCamera = true;

	    emitter.makeParticles(bmd);

	    emitter.minParticleSpeed.set(0, 300);
	    emitter.maxParticleSpeed.set(0, 400);

	    emitter.setRotation(0, 0);
	    emitter.setAlpha(this.opacity / 10, this.opacity);
	    emitter.setScale(0.5, 0.5, 1, 1);
	    emitter.gravity = -200;

	    emitter.start(false, 5000, 100);
	},
	updateBackground : function () {
		var angle = this.big ? '+45' : '-45';
		this.bgImages.forEach(function (e) { 
			if(e.big == self.big) {
				e.tween = self.add.tween(e).to( { angle: angle }, 250, Phaser.Easing.Linear.None).start();
			}
		});
		this.big = !this.big;
	},
	orientaMobile: function(e) {

	},
	pausaGame: function() {

		sprite_pausa = this.game.add.sprite(this.game.width/2, this.game.height/2, 'chat-box');
		sprite_pausa.anchor.set(0.5);
		sprite_pausa.fixedToCamera = true;
		var style = { font: "18px Finger Paint", fill: "#ffffff", wordWrap: true, align: "center" }
		style.wordWrapWidth = sprite_pausa.width;

		text_pausa = this.game.add.text(this.game.width/2, this.game.height/2, 'PAUSA!\nPressione a área de jogo para continuar!', style);
		text_pausa.anchor.set(0.5);
		text_pausa.fixedToCamera = true;
	},
	update: function() {
		if(this.modo == 0 ) {
			rotation += 0.01;
			this.bgImages.forEach(function (e) { e.rotation = rotation; });
		}
		
		
		var self = this;

		if(this.reset) {
			JOGO.JOGADOR.b1.rotate(-JOGO.JOGADOR.vel);
			JOGO.JOGADOR.b1.update();
			JOGO.JOGADOR.b2.rotate(-JOGO.JOGADOR.vel);
			JOGO.JOGADOR.b2.update();

			this.obstacles.forEach(function (e) { 
				if(e.rotate) { e.rotation -= e.rotate * 3; } 
				//DIMINIR TAMANHO
				if(e.movimento && e.movimentou && (self.game.camera.y + self.game.height/2  >  e.y)) {
					e.tween = self.game.add.tween(e).to({ y : e.original.y }, 350, Phaser.Easing.Linear.None).start();
					self.game.add.tween(e.shadow).to({ y : e.original.y - e.height/2 - 10 }, 350, Phaser.Easing.Linear.None).start();
					e.splash.forEach(function (i) {
						self.game.add.tween(i).to({y : i.original.y - (i.original.y - e.original.y) }, 350, Phaser.Easing.Linear.None).start();
					});
					e.movimentou = false;
				}
			});

			this.game.camera.y += this.vel * 3;
			if(this.game.camera.y + JOGO.area.altura >= this.checkpoint.y) {
				this.reset = false;
			}
		}
		else {
			if(this.animation) JOGO.JOGADOR.animation();
			else JOGO.JOGADOR.update();

			this.game.camera.y -= this.vel;
			this.obstacles.forEach(function (e) { 
					
				if(e.rotate) { 
					e.rotation += e.rotate;
				}
				if(e.movimento && !e.movimentou && (self.game.camera.y <  e.y - self.game.height/4)) {
						e.tween = self.game.add.tween(e).to({ y : e.y + e.movimento }, 500, Phaser.Easing.Linear.None).start();
						self.game.add.tween(e.shadow).to({ y : e.shadow.y + e.movimento }, 500, Phaser.Easing.Linear.None).start();
						e.splash.forEach(function (i) {
							self.game.add.tween(i).to({y : i.original.y }, 500, Phaser.Easing.Linear.None).start();
						});
						e.movimentou = true;
				}
			});

			//console.log(JOGO.JOGADOR.spriteCenter);
			this.game.physics.arcade.overlap(JOGO.JOGADOR.b1.b, this.obstacles, this.hit, null, this);
			this.game.physics.arcade.overlap(JOGO.JOGADOR.b2.b, this.obstacles, this.hit, null, this);
			this.game.physics.arcade.overlap(JOGO.JOGADOR.spriteCenter.b, this.checkpoints, this.hitCheckpoint, null, this);
			//this.game.physics.arcade.overlap(JOGO.JOGADOR.b2.b, this.checkpoints, this.hitCheckpoint, null, this);
		}

		this.game.world.bringToTop(this.topbar);
		this.game.world.bringToTop(this.textoTempo);
		this.game.world.bringToTop(this.textoNivel);

		if(this.game.camera.y  == 0) {
			this.fimNivel();
		}
	},
	fimNivel : function() {
		this.somGame.destroy();
		this.game.stage.backgroundColor = "#0d1011";
		this.game.state.start('fim', true, false, JOGO.JOGADOR.pontos, this.level, this.bestTime, this.map);
	},
	menu : function () {
		self.somGame.destroy();
		self.game.stage.backgroundColor = "#0d1011";
		this.game.state.start('menu', true, false);
	},
	findObjectsByType: function(type, map, layer) {
	   var result = new Array();
	   map.objects[layer].forEach(function (e){
	    	if(e.type === type) {
	        	e.y -= map.tileHeight;
	        	result.push(e);
	    	}     
	   });
	   return result;
	},
	createObstacles : function() {
	   this.obstacles = this.game.add.group();
	   this.obstacles.enableBody = true;

	   result = this.findObjectsByType('obstacle', map, 'obstacles');
	   result.forEach(function (e){
	    	this.createFromTiledObject(e, this.obstacles);
	   }, this);
	},
	createCheckpoints : function () {
		this.checkpoints = this.game.add.group();
		this.checkpoints.enableBody = true;

		result = this.findObjectsByType('checkpoint', map, 'obstacles');
		result.forEach(function (e) {
			this.createFromTiledObject(e, this.checkpoints);
		}, this);
	},
	createFromTiledObject: function(e, group) {

		var bmd = this.game.add.bitmapData(e.width, e.height);
	   bmd.ctx.beginPath();
	   bmd.ctx.rect(0, 0, e.width, e.height);
	   bmd.ctx.fillStyle = e.properties.color;
	   bmd.ctx.fill();

	   var sprite = group.create(e.x + e.width/2, e.y, bmd);
	   sprite.anchor.set(0.5);
	   sprite.rotation = e.rotation;
	   sprite.rotate = e.properties.rotation || null;
	   sprite.original = {x : e.x, y : e.y, width : e.width, height : e.height };
	   sprite.texto = e.properties.texto || null;
	   if(sprite.texto) { sprite.alpha = 0; }

	   sprite.splash = this.game.add.group();
	   if(e.properties.movimento) {
	   	sprite.movimento = e.properties.movimento;
	   	sprite.movimentou = false;
	   }
	   else sprite.movimento = null;


	   this.game.add.tween(sprite.scale)
	   		.to({ x: 0.95, y: 0.95 }, 250, Phaser.Easing.Linear.None)
				.to({ x: 1.0, y: 1.0 }, 250, Phaser.Easing.Linear.None).start().loop(true);
	  	this.game.physics.arcade.enable(sprite);
	  	sprite.body.allowRotation = true;


	   if(!sprite.texto && !sprite.rotate) {
	   	sprite.shadow = this.game.add.sprite(e.x + e.width/2, e.y - e.height/2  - 10, 'smoke');
	    	sprite.shadow.anchor.set(0.5);
	    	sprite.shadow.rotation = e.rotation;
	    	var cropRect = new Phaser.Rectangle(0, 0, e.width, e.height);
	    	sprite.shadow.crop(cropRect);
	    	sprite.shadow.alpha = 0.4 + self.opacity;

	    	this.game.add.tween(sprite.shadow.scale)
	   		.to({ x: 0.95, y: 0.95 }, 250, Phaser.Easing.Linear.None)
				.to({ x: 1.0, y: 1.0 }, 250, Phaser.Easing.Linear.None).start().loop(true);
	   }
	},
	collision : function (ball, obstacle) {
		var rx = obstacle.original.x + obstacle.original.width/2;
		var ry = obstacle.original.y + obstacle.original.height/2;

		var x = obstacle.original.x - rx;
		var y = obstacle.original.y - ry;

		var angle = obstacle.rotation;
		
		var ptx = (x * Math.cos(angle) - y * Math.sin(angle)) + rx;
		var pty = (x * Math.sin(angle) + y * Math.cos(angle)) + ry;
		if(!text){
			alert("escreve texto");
			text = this.game.add.text(ptx, pty, "x");
		}
		else text.x = ptx; text.y = pty;
	}
};

