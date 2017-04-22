obstaculo = function (x, y, width, height, rotation = 0, color = 0xFFFFFF) {

	this.bmd = JOGO.game.add.bitmapData(width, height);
    this.bmd.ctx.beginPath();
    this.bmd.ctx.rect(0, 0, width, height);
    this.bmd.ctx.fillStyle = '#ffffff';
    this.bmd.ctx.fill();

	this.o = JOGO.game.add.sprite(x, y, this.bmd);
	JOGO.game.physics.arcade.enable(this.o);

	this.rotation = rotation;

}

obstaculo.prototype = {
	rotate : function (alfa) {
		this.o.rotation += alfa;
	},
	movimento : function () {
		this.o.body.velocity.y += 1;
	}
}