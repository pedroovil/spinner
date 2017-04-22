SPEAKER = function (bg, person) {

	x = JOGO.game.cache.getImage(bg).width / 2 + 20;
	y = JOGO.game.height - JOGO.game.cache.getImage(bg).height / 2 - 20; 
	this.sprite = JOGO.game.add.sprite(x, y, bg);
	this.sprite.anchor.set(0.5);
	this.sprite.inputEnabled = true;
	this.sprite.alfa = 0.3;
	this.sprite.fixedToCamera = true;

	this.person = person;

	var pw = (this.sprite.width / 2) - 30;
	var ph = (this.sprite.height / 2) - 8;

	this.closeButton = JOGO.game.make.sprite(pw, -ph, 'close');
	this.closeButton.inputEnabled = true;
	this.closeButton.input.priorityID = 1;
	this.closeButton.input.useHandCursor = true;
	this.closeButton.events.onInputDown.add(this.closeWindow, this);

	this.sprite.addChild(this.closeButton);

	this.message = JOGO.game.add.inputField(x - (this.sprite.width) / 2 + 10, y - (this.sprite.height)/5, {
					    font: '18px Arial',
					    backgroundColor : "#cccccc",
					    fill: '#ffffff',
					    fillAlpha : 0,
					    fontWeight: 'bold',
					    width: this.sprite.width - 50,
					    padding: 8,
					    cursorColor : "#f00",
					    borderColor: '#ffffff',
					    borderWidth: 3,
					    borderRadius: 2,
					    placeHolder: 'escreva aqui a sua mensagem ... '
					});
	this.sprite.scale.set(0);
	this.message.fixedToCamera = true;

	this.tween = null;
	this.openWindow(x, y);
};

SPEAKER.prototype = {
	getMessage : function () {
		return this.message.value;
	},
	openWindow : function (x, y) {
		if ((this.tween !== null && this.tween.isRunning) || this.sprite.scale.x === 1) { return; }
    
	    this.tween = JOGO.game.add.tween(this.sprite.scale).to( { x: 1, y: 1 }, 1500, Phaser.Easing.Elastic.Out, true);
	    var self = this;
	    //this.update();

	},
	closeWindow : function () {
		if (this.tween && this.tween.isRunning || this.sprite.scale.x === 0) { return; }

	    this.tween = JOGO.game.add.tween(this.sprite.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
	    this.delete();
	},
	update : function () {
		this.message.x = Math.floor(this.sprite.x - this.sprite.width / 2);
    	this.message.y = Math.floor(this.sprite.y - this.sprite.height / 2);
	},
	delete : function () {
		this.message.destroy();
		this.sprite.destroy();
	}
}
