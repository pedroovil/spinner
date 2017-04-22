JOGO.preload = function (game) {};
var tween20 = null;
var tween21 = null;
JOGO.preload.prototype = {
	preload : function () {

 		this.progress = this.game.add.text(this.game.width/2, this.game.height - this.game.height/4, '0%', {fill: 'white'});    
 		this.progress.anchor.setTo(0.5);
 		var loading = this.game.add.sprite(this.game.width/2, this.game.height - this.game.height/6, 'loading')      
 		var progressBar = this.game.add.sprite(this.game.world.centerX - loading.width/2, this.game.height - this.game.height/6 - loading.height/2, 'loading-bar');
 		loading.anchor.setTo(0.5);
 		this.game.load.setPreloadSprite(progressBar);
 		this.game.load.onFileComplete.add(this.fileComplete, this);

 		this.icon = this.game.add.sprite(this.game.width/2 - 35, this.game.height/2 - 25, 'icon');
        this.icon.anchor.set(0.5);

		try {
			self = this;

			WebFontConfig = {
				active: function() { self.game.time.events.add(Phaser.Timer.SECOND, self.loads, this); },
			    google: {
			      families: ['Finger Paint', 'Audiowide']
			    }
			};

			this.game.load.tilemap('level1', 'levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
			this.game.load.tilemap('level2', 'levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
			this.game.load.tilemap('level3', 'levels/level3.json', null, Phaser.Tilemap.TILED_JSON);


			this.game.load.image("playbutton", "assets/playbutton.png");
		    this.game.load.image("menubutton", "assets/menubutton.png");
		    this.game.load.image("registar", "assets/registar.png");
		    this.game.load.image("thankyou", "assets/thankyou.png");
		    this.game.load.image("jogar", "assets/jogar.png");
		    this.game.load.image("back", "assets/back.png");
		    this.game.load.image("sair", "assets/sair.png");
		    this.game.load.image("settings", "assets/settings.png");
		    this.game.load.image("coOP", "assets/coop.png");

		    this.game.load.image("button-game", "assets/button.png");

		    this.game.load.image('answer-bg', "assets/answer-bg.png");
		    this.game.load.image('quest-number', "assets/quest-number.png");
		    this.game.load.image('quest-time', "assets/quest-time.png");

		    this.game.load.image('background', 'assets/popup.png');
		    this.game.load.image('close', 'assets/orb-red.png');
		    this.game.load.image('chat-box', 'assets/chat-box.png');

		    this.game.load.image('soundOn', 'assets/soundOn.png');
		    this.game.load.image('soundOff', 'assets/soundOff.png');
		    this.game.load.image('game-back', 'assets/back_btn.png');

		    this.game.load.image('seta-esquerda', 'assets/arrow1.png');
		    this.game.load.image('seta-direita', 'assets/arrow2.png');
		    this.game.load.image('confirm', 'assets/stripe.png');

	        this.load.image('red', 'assets/_red.png');
	        this.load.image('red1', 'assets/red1.png');
	        this.load.image('blue', 'assets/_blue.png');
	        this.load.image('yellow', 'assets/_yellow.png');
	        this.load.image('white', 'assets/_white.png');
	        this.load.image('points', 'assets/points.png');

	        this.load.image('splashRED', 'assets/splashRED.png');
	        this.load.image('splashBLUE', 'assets/splashBLUE.png');

	        this.load.image('painel-superior', 'assets/painel-superior.png');
       		this.load.image('botao-pausa', 'assets/botao-pausa.png');
       		this.load.image('botao-continuar', 'assets/botao-continuar.png');
       		this.load.image('botao-voltar', 'assets/botao-back.png');

       		this.load.image('bordo-horizontal', 'assets/bordo-horizontal.png');
			this.load.image('bordo-vertical', 'assets/bordo-vertical.png');

			this.load.image('pontuacoes-top-bar', 'assets/pontuacoes-top-bar.png');
			this.load.image('pontuacoes-bar', 'assets/pontuacoes-bar.png');


			this.load.image('0-stars', 'assets/0-stars.png');
			this.load.image('1-stars', 'assets/1-stars.png');
			this.load.image('2-stars', 'assets/2-stars.png');
			this.load.image('3-stars', 'assets/3-stars.png');

			this.load.image('fim-bg', 'assets/fim-bg.png');
			this.load.image('fim-next', 'assets/fim-botao-next.png');
			this.load.image('fim-back', 'assets/fim-botao-back.png');
			this.load.image('fim-reload', 'assets/fim-botao-reload.png');

	        this.load.image('b1', 'assets/b1.png');
	        this.load.image('b2', 'assets/b2.png');
	        this.load.image('smoke', 'assets/smoke.png');

		    this.load.audio('menu', 'assets/audio/menu-music.mp3');
		    this.load.audio('game-theme', 'assets/audio/game-music.mp3');
		    this.load.audio('button-theme', 'assets/audio/button-music.mp3');

		    this.load.audio('somColisao', ['assets/audio/bounce.ogg', 'assets/audio/bounce.mp3', 'assets/audio/bounce.m4a']);
		    this.load.audio('checkpoint', 'assets/audio/checkpoint.mp3');
		    this.load.audio('level-complete', 'assets/audio/level-complete.mp3');

		    this.game.load.spritesheet('levelselecticons', 'assets/levelselecticons.png', 96, 96);

		    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

		    this.game.plugins.add(Fabrique.Plugins.InputField);
		    this.game.stage.backgroundColor = "#0d1011";
		}
		catch(e) {
			console.log(e);
		}
		//throw 500;
	},
	update : function () {
		if(!tween20) {
			tween20 = this.game.add.tween(this.icon.scale)
                .to({ x: 0.9, y: 0.9}, 400, Phaser.Easing.Linear.None)
                .to({ x: 1.0, y: 1.0}, 400, Phaser.Easing.Linear.None)
                .start();
            tween20.onComplete.add(function () { tween20 = null; });
		}
			
    },
	fileComplete : function (progress, cacheKey, success, totalLoaded, totalFiles) {    
		this.progress.text = progress+" %"; 
	},
	create : function () {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;                      
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		this.audioOnOff = true;
        JOGO.somButton = this.game.add.audio('button-theme');
	},
	loads : function () {

		niveis = [
			{
				name : "level1",
				nivel : 1				
			},
			{
				name : "level2",
				nivel : 2
			},
			{
				name : "level3",
				nivel : 3				
			}
		];

		self.game.state.start("menu");
	}
}