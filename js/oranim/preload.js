var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '',{
             font: '25px', fill: 'white', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "", {
            font: '18px', fill: 'lightgrey', align: 'center'
        });
        
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
         
        game.load.image('bg', 'assets/oranim/images/bg.png');
        
        game.load.image('box0', 'assets/oranim/images/box1.png');
        game.load.image('box1', 'assets/oranim/images/box2.png');
        game.load.image('box2', 'assets/oranim/images/box3.png');
        game.load.image('box3', 'assets/oranim/images/box4.png');
        game.load.image('box4', 'assets/oranim/images/box5.png');
        game.load.image('box5', 'assets/oranim/images/box6.png');
        
        game.load.image('boxBg', 'assets/oranim/images/boxBg.png');
        
        game.load.image('ball', 'assets/oranim/images/ball.png');
        game.load.image('helicopter', 'assets/oranim/images/helicopter.png');
        game.load.image('drum', 'assets/oranim/images/drum.png');
        game.load.image('car', 'assets/oranim/images/car.png');
        game.load.image('horse', 'assets/oranim/images/horse.png');
        game.load.image('plane', 'assets/oranim/images/plane.png');
        game.load.image('trumpet', 'assets/oranim/images/trumpet.png');
        game.load.image('train', 'assets/oranim/images/train.png');
        
        game.load.image('alarm_clock', 'assets/oranim/images/alarm_clock.png');
        game.load.image('helicopter', 'assets/oranim/images/helicopter.png');
        game.load.image('cookoo', 'assets/oranim/images/cookoo.png');
        
        game.load.image('tempo', 'assets/oranim/images/tempo.png');
        
        game.load.image('power_reset', 'assets/oranim/images/power_reset.png');

		game.load.audio('ball', 'assets/oranim/audio/ball.mp3');
		game.load.audio('drum', 'assets/oranim/audio/drum.mp3');
		game.load.audio('car', 'assets/oranim/audio/car.mp3');
        game.load.audio('horse', 'assets/oranim/audio/horse.mp3');
        game.load.audio('plane', 'assets/oranim/audio/plane.mp3');
        game.load.audio('trumpet', 'assets/oranim/audio/trumpet.mp3');
        game.load.audio('train', 'assets/oranim/audio/train.mp3');
        
        game.load.audio('alarm_clock', 'assets/oranim/audio/alarm_clock.mp3');
        game.load.audio('helicopter', 'assets/oranim/audio/helicopter.mp3');
        game.load.audio('cookoo', 'assets/oranim/audio/cookoo.mp3');
    },
    
    create: function(){
       game.state.start("Game");
    },
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text ="";
};
