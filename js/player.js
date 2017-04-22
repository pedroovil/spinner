// -- construtor
player = function (id, x, y, img1, img2, offset = 75) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.vel = 0.1;

	this.offset = offset;

	this.graphics = JOGO.game.add.graphics(0, 0);
	this.graphics.lineStyle(0.5, 0xdddddd, 1);
	this.graphics.drawCircle(this.x, this.y, this.offset * 2);

	this.graphics.fixedToCamera = true;

	this.b1 = new bola (this.x, this.y, this.offset, 'b1', 'splashBLUE');
	this.b2 = new bola (this.x, this.y, -this.offset, 'b2', 'splashRED');

	this.spriteCenter = new bola (this.x, this.y, 0, '', 'splashBLUE');
	this.spriteCenter.emitter.kill();
	this.keyboard = JOGO.game.input.keyboard.createCursorKeys();

	this.pontos = 0;

	this.coop = false;
	this.side = '';

	this.esquerda = false;
	this.direita = false;
	this.isInputDown = false;

	JOGO.game.input.onDown.add(function (pointer){
		this.isInputDown = true;
		if(this.coop) {
			/*if(this.side == 'right') {
				this.direita = true;
			}
			else if (this.side == 'left') {
				this.left = true;
			}*/
			socket.emit('action', true);
		}
		else {
			if(pointer.x <= JOGO.game.width / 2) {
	         	this.direita = false;
	         	this.esquerda = true;
	         }
	         else {
	         	this.direita = true;
	         	this.esquerda = false;
	         }
		}
	}, this);

	JOGO.game.input.onUp.add(function (pointer){
        if(this.isInputDown){ 
        	this.isInputDown = false;
        	if(socket) socket.emit('action', false);
        }
	}, this);

}

// -- metodos
player.prototype = {
	joystickDirection : function (data = null) {
		if(data && data.direction){
			this.setArrows(data.angle.radian >= Math.PI / 6 && data.angle.radian <= 5 * Math.PI / 6, 
				data.angle.radian >= 7 * Math.PI / 6 && data.angle.radian <= 11 * Math.PI / 6, 
				data.angle.radian >= 5 * Math.PI / 3 || data.angle.radian <= Math.PI / 3, 
				data.angle.radian >= 2 * Math.PI / 3 && data.angle.radian <= 4 * Math.PI / 3);

			isJoystick = true;
		}
		else {
			this.setArrows(false, false, false, false);
			isJoystick = false;
		}
	},
	setArrows : function (up, down, right, left) {
		this.up = up;
		this.down = down;
		this.left = left;
		this.right = right;
	},
	update : function () {
		if(!this.isInputDown) this.teclas();
		this.movimento();
		this.b1.update();
		this.b2.update();
	},
	teclas : function () {
		if(this.coop) {
			socket.emit('action', this.keyboard.right.isDown || this.keyboard.left.isDown);
		}
		else {
			this.direita = this.keyboard.right.isDown;
			this.esquerda = this.keyboard.left.isDown;
		}
	},
	setCoop : function (id, side) {
		this.coop = true;
		this.id = id;
		this.side = side;
	},
	movimento : function () {
		this.b1.movimento = this.b2.movimento = false;

		if ( this.direita) {
			this.b1.rotate(this.vel);
			this.b2.rotate(this.vel);

			this.b1.movimento = this.b2.movimento = true;
		}
		else if ( this.esquerda) {
			this.b1.rotate(-this.vel);
			this.b2.rotate(-this.vel);

			this.b1.movimento = this.b2.movimento = true;
		}
	},
	updateTempo : function (p, txt) {
		this.pontos += p;
		txt.setText(this.pontos);
	},
	animation : function () {
		this.b1.rotate(this.vel);
		this.b2.rotate(this.vel);
		this.b1.update();
		this.b2.update();
	}
}