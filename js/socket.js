var socket;
var playersList = [];
var teacherList = [];
var playerSprites;
var numLevels = 3;

var niveis = [];

var JOGO = {
	area : {
		largura : 480,
		altura : 720
	},
	name : {
		title : "SPINNER",
		subtitle : "Spin to Win"
	}
}

JOGO.joystick = null;
/*
window.onload = function() {
    var windowRatio = window.innerWidth / window.innerHeight;
    if(windowRatio < JOGO.area.largura / JOGO.area.altura){
        JOGO.area.altura = JOGO.area.largura / windowRatio;
    }
}*/