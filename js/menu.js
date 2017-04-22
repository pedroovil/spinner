JOGO.menu = function (game) { this.holdmenu = []; };
var animate = null;
JOGO.menu.prototype = {
    create : function () {

        this.audioOnOff = true;
        this.somMenu = this.game.add.audio('menu');


        JOGO.game = this;

        var style = { font: "60px Finger Paint", fill: "#ffffff", wordWrap: true, wordWrapWidth : this.game.width - 50, align: "center" };
        var title = this.game.add.text(this.game.width / 2, 60, JOGO.name.title, style);
        title.anchor.set(0.5);

        style.font =  "25px Finger Paint";
        var grid = this.game.add.text(this.game.width / 2, 115, JOGO.name.subtitle, style);
        grid.anchor.set(0.5);
        
        this.animateMenu = new player(0, this.game.width/2, this.game.height/2 - 25, 'b1', 'b2', 20);
        this.animateMenu.graphics.kill();
        //this.animateMenu.b1.emitter.kill();
        //this.animateMenu.b2.emitter.kill();
        var icon = this.game.add.sprite(this.game.width/2, this.game.height/3 - 5, 'icon');
        icon.anchor.set(0.5);

        
        

        style.font =  "45px Audiowide";
        var menu = this.game.add.text(this.game.width / 2, this.game.height / 2 + 55, "MENU", style);
        //this.game.add.bitmapText(160, 100, 'font72', 'game goes here..', 48);
        menu.anchor.set(0.5);

        menuGroup = this.game.add.group();

        var jogar = this.game.add.button(this.game.width / 2, this.game.height - this.game.height/4, "jogar");
        jogar.anchor.set(0.5);
        menuGroup.add(jogar);
        jogar.state = "levelSelect";
        jogar.events.onInputDown.add(this.onSpriteDown, this);
        jogar.events.onInputOver.add(this.onSpriteOver, this);

        this.holdmenu[0] = jogar;
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
    update : function () {
        this.animateMenu.animation();
    },
    onSpriteDown: function(sprite, pointer) {
        JOGO.somButton.play();
        var tween = this.game.add.tween(sprite.scale)
                .to({ x: 0.8, y: 0.8}, 100, Phaser.Easing.Linear.None)
                .to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.None)
                .start();

        tween.onComplete.add(function(){this.clickMenu(sprite.state);}, this);

    },
    onSpriteOver : function (sprite, pointer) {
        JOGO.somButton.play();
        var xpos = sprite.x;
        if(!animate)
        var tween = this.game.add.tween(sprite)
                .to({ x: xpos + 6 }, 100, Phaser.Easing.Linear.None)
                .to({ x: xpos - 5 }, 100, Phaser.Easing.Linear.None)
                .to({ x: xpos + 4 }, 100, Phaser.Easing.Linear.None)
                .to({ x: xpos - 3 }, 100, Phaser.Easing.Linear.None)
                .to({ x: xpos }, 100, Phaser.Easing.Linear.None)
                .start();
    },
    animateMenu: function() {

        for (var i = 0; i < this.holdmenu.length; i++) {
            var sprite = this.holdmenu[i];
            sprite.x = sprite.x - 600;
            var x = sprite.x;
            animate = this.game.add.tween(sprite).to( {x: x + 600}, 600, Phaser.Easing.Back.Out, true, (i * 350));
        };

        animate.onComplete.add(function () {
            animate = null;
        });
    },
    clickMenu : function (state) {
        try {
            if(state == "logout") this.logout();
            else this.game.state.start(state);
        }
        catch(e) { console.log(e); }
        
    },
    logout : function () {
        var self = this;
        $.ajax({
            type : "delete",
            dataType : "json",
            url : "/logout/",
            success : function (result) {
                if(result && !result.errors) {

                    var menuTween = self.game.add.tween(menuGroup).to({
                            y: self.game.height/1.75
                    }, 1000, Phaser.Easing.Bounce.Out, true);

                    menuTween.onComplete.add(function() { self.game.state.start("login"); }, this);     
                }
            },
            error : function () {

            }
        });
    }
}