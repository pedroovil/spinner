bola = function (x, y, offset, img, splash, particles = ['red', 'blue', 'white', 'yellow']) {

	this.emitter = JOGO.game.add.emitter(x, y, 400);
	this.emitter.makeParticles( particles );
    this.emitter.gravity = 200;
	this.emitter.setAlpha(1, 0, 500);
	this.emitter.setScale(0.8, 0, 0.8, 0, 65);
	this.emitter.start(false, 250, 5);
	this.emitter.fixedToCamera = true;

	this.offset = offset;
	this.movimento = false;


	this.b = JOGO.game.add.sprite(x, y, img);
    this.b.anchor.set(0.5);
   	JOGO.game.physics.arcade.enable(this.b);
    this.b.body.setSize(20, 20);
	//this.b.body.bounce.set(0.3, 0.3);

	this.b.fixedToCamera = true;
	this.b.anchor.setTo(0.5);
    this.b.pivot.x = this.offset;
    this.b.splash = splash;

}

bola.prototype = {
	update : function () {
		var px = 0, py = 200;
		if(this.movimento) {
			px = this.offset * 0.5 * Math.cos(this.b.rotation);
			py = this.offset * 0.5 * Math.sin(this.b.rotation);

			px *= -1;
		}

		this.emitter.minParticleSpeed.set(px, py);
	    this.emitter.maxParticleSpeed.set(px, py);

	    this.emitter.emitX = this.b.x + this.offset * Math.cos(this.b.rotation);
	    this.emitter.emitY = this.b.y + this.offset * Math.sin(this.b.rotation);

	    JOGO.game.world.bringToTop(this.b);
	},
	rotate : function (alfa) {
		this.b.rotation += alfa;
	}
}