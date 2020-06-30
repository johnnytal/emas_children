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

        game.load.image('bg', 'assets/toy/images/bg.png');
        
        game.load.image('box0', 'assets/toy/images/box1.png');
        game.load.image('box1', 'assets/toy/images/box2.png');
        game.load.image('box2', 'assets/toy/images/box3.png');
        game.load.image('box3', 'assets/toy/images/box4.png');
        game.load.image('box4', 'assets/toy/images/box5.png');
        game.load.image('box5', 'assets/toy/images/box6.png');
        
        game.load.image('boxBg', 'assets/toy/images/boxBg.png');
        
        game.load.image('ball', 'assets/toy/images/ball.png');
        game.load.image('helicopter', 'assets/toy/images/helicopter.png');
        game.load.image('drum', 'assets/toy/images/drum.png');
        game.load.image('car', 'assets/toy/images/car.png');
        game.load.image('horse', 'assets/toy/images/horse.png');
        game.load.image('plane', 'assets/toy/images/plane.png');
        game.load.image('trumpet', 'assets/toy/images/trumpet.png');
        game.load.image('train', 'assets/toy/images/train.png');
        
        game.load.image('alarm_clock', 'assets/toy/images/alarm_clock.png');
        game.load.image('helicopter', 'assets/toy/images/helicopter.png');
        game.load.image('cookoo', 'assets/toy/images/cookoo.png');
        
        game.load.image('tempo', 'assets/toy/images/metronome.png');
        game.load.image('play', 'assets/toy/images/play.png');
        
        game.load.image('power_reset', 'assets/toy/images/power_reset.png');

		game.load.audio('ball', 'assets/toy/audio/ball.mp3');
		game.load.audio('drum', 'assets/toy/audio/drum.mp3');
		game.load.audio('car', 'assets/toy/audio/car.mp3');
        game.load.audio('horse', 'assets/toy/audio/horse.mp3');
        game.load.audio('plane', 'assets/toy/audio/plane.mp3');
        game.load.audio('trumpet', 'assets/toy/audio/trumpet.mp3');
        game.load.audio('train', 'assets/toy/audio/train.mp3');
        game.load.audio('alarm_clock', 'assets/toy/audio/alarm_clock.mp3');
        game.load.audio('helicopter', 'assets/toy/audio/helicopter.mp3');
        game.load.audio('cookoo', 'assets/toy/audio/cookoo.mp3');
        
        game.load.audio('music', 'assets/toy/audio/music1.mp3');
        game.load.audio('music2', 'assets/toy/audio/music2.mp3');
        game.load.audio('music3', 'assets/toy/audio/music3.mp3');

        game.load.audio('clock', 'assets/toy/audio/clock.mp3');
    },
    
    create: function(){
       game.state.start("Game");
    },
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text ="";
};
