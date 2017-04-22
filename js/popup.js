POPUP = function (x, y, bg, txt = "", style = {}, del = false, split = "\n") {
	y -= 100;
	this.sprite = JOGO.game.add.sprite(x, y, bg);
	this.sprite.anchor.set(0.5);
	this.sprite.inputEnabled = true;
	//this.sprite.input.enableDrag();
	this.sprite.fixedToCamera = true;
	this.sprite.alfa = 0.5;

	this.txt = txt.split(split);
	this.words = [];
	style.wordWrapWidth = this.sprite.width;

	this.text = JOGO.game.add.text(0, 0, '', style);
	this.text.anchor.set(0.5);

	if(del) {
		var pw = (this.sprite.width / 2) - 30;
		var ph = (this.sprite.height / 2) - 8;

		this.closeButton = JOGO.game.make.sprite(pw, -ph, 'close');
		this.closeButton.inputEnabled = true;
		this.closeButton.input.priorityID = 1;
		this.closeButton.input.useHandCursor = true;
		this.closeButton.events.onInputDown.add(this.closeWindow, this);

		this.sprite.addChild(this.closeButton);
	}

	this.sprite.scale.set(0);

	this.tween = null;

	this.index = 0;
	this.fraseIndex = 0;
 	this.wordDelay = 120;
 	this.fraseDelay = 800;
}

POPUP.prototype = {
	openWindow : function () {
		if ((this.tween !== null && this.tween.isRunning) || this.sprite.scale.x === 1) { return; }
    
	    this.tween = JOGO.game.add.tween(this.sprite.scale).to( { x: 1, y: 1 }, 1500, Phaser.Easing.Elastic.Out, true);
	    var self = this;
	    this.update();

	},
	closeWindow : function () {
		if (this.tween && this.tween.isRunning || this.sprite.scale.x === 0) { return; }

	    this.tween = JOGO.game.add.tween(this.sprite.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
	    this.delete();
	},
	update : function () {
		this.text.x = Math.floor(this.sprite.x - this.sprite.width / 4);
    	this.text.y = Math.floor(this.sprite.y - this.sprite.height / 4);
	},
	delete : function () {
		this.text.destroy();
		this.sprite.destroy();
	},
	nextPhrase : function () {
    	if (this.fraseIndex === this.txt.length) { return false; }
    	this.text.text = "";
	    this.words = this.txt[this.fraseIndex].split(' ');
	    this.index = 0;
	    JOGO.game.time.events.repeat(this.wordDelay, this.words.length, this.nextWord, this);
	    this.fraseIndex++;
	    return true;
	},
	nextWord : function () {
		if(!this.words[this.index]) return;
    	this.text.text = this.text.text.concat(this.words[this.index] + " ");
	    this.index++;
	}
}