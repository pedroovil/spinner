
JOGO.loading = function (game){}

JOGO.loading.prototype = {

	preload : function () {
		this.game.load.image("loading", "assets/loading.png");
		this.game.load.image("loading-bar", "assets/loading-bar.png");
		this.game.load.image('icon', 'assets/icon.png');
		this.game.load.image('icon-bg', "assets/icon-bg.png");

	},
	create : function () {
		this.game.state.start("preload");
	}
}