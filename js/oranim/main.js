var game_main = function(game){    
    N_ROWS = 12;
    N_COLUMNS = 3;

    bpm = 115;
    box_n = 0;
    row = 0;
    
    boxes = [];
    boxesBgs = [];
    items = [];
    
    OFF_SET = 19;
    HIGHLIGHT_COLOR = 0xff0000;
    HIGHLIGHT_COLOR2 = 0x0000aa;
    
    chosenItem = null;
};   
 
game_main.prototype = {
    create: function(){
    	loadSounds();
    	initAd();
    	plugIns();
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.22;
    	
    	for (x = 0; x < soundsArray.length - 3; x++){
    		boxBg = game.add.sprite(25 + x * 150, 20, 'boxBg');
    		boxBg.scale.set(1.175, 1.175);
    		boxBg.tint = HIGHLIGHT_COLOR2;
			boxBg.alpha = 0.5;
			
    		boxBg.inputEnabled = true;
    		boxBg.events.onInputDown.add(chooseItem, this);
    		
    		boxesBgs.push(boxBg);
    		
    		sprite = game.add.sprite(50 + x * 150, 50, soundsArray[x].key);

    		items.push(sprite);
    	}

        power_reset = game.add.sprite(1325, 25, 'power_reset');
		power_reset.inputEnabled = true;
		power_reset.events.onInputDown.add(function(){
			location.reload();
			if(AdMob) AdMob.showInterstitial();
		}, this);
		power_reset.scale.set(.85, .85);
		power_reset.alpha = 0.8;
    	
    	boxTempo = game.add.sprite(1125, 30, 'boxBg');
    	boxTempo.scale.set(1.21, 0.9);
    	boxTempo.tint = 0xffaaff;
        boxTempo.inputEnabled = true;
    	boxTempo.events.onInputDown.add(changeTempo, this);
    	
    	tempoSprite = game.add.sprite(1150, 57, 'tempo');     
    	tempoSprite.scale.set(.65, .65);      
        tempoText = game.add.text(1210, 60, bpm, {font: '34px ' + FONT, fill: '#6e5443', align: 'center'});

 
        for (n = 0; n < N_ROWS * N_COLUMNS; n++){
            box = game.add.sprite(0, 0, 'box' + Math.floor(Math.random() * 5));
            box.x = box.width * (n % N_ROWS);
            box.y = (Math.floor(Math.random() * OFF_SET) + box.height) * Math.floor(n / N_ROWS) + 
            Math.floor(Math.random() * OFF_SET + box.height / 1.5) + 100;
			
			box.inputEnabled = true;
			box.events.onInputDown.add(addItem, this);
			
            boxes.push(box);
        }

        getBox();  
    }
};

function changeTempo(){
 	resetBpmChange = false;
	
	if (bpm < 240){
		bpm += 25;	
	}
	else{
		bpm = 65;
	}
	
	tempoText.text = bpm;
	
	setTimeout(function(){
		resetBpmChange = true;
	}, 500);
	
	cookooSfx.play();
	
	tempoSprite.tint = 0xff0000;
	setTimeout(function(){ tempoSprite.tint = 0xffffff; }, 500);
}

function chooseItem(_this){
	var indexItem = boxesBgs.indexOf(_this);
	chosenItem = items[indexItem];

	for (x = 0; x < soundsArray.length - 3; x++){
		if (items[x] != chosenItem){
			items[x].tint = 0xffffff;
			boxesBgs[x].tint = HIGHLIGHT_COLOR2;
			items[x].scale.set(1, 1);
			boxesBgs[x].alpha = 0.5;
		}
		else{
			items[x].tint = 0xf0f077;
			boxesBgs[x].tint = 0xffffff * Math.random();
			items[x].scale.set(1.02, 1.02);
			boxesBgs[x].alpha = 1;
		}
	}
}

function addItem(_this){	
	if (chosenItem != null){	
		if (_this.children < 1){ // no children
			sprite = _this.addChild(game.make.sprite(0, 0, chosenItem.key));
			sprite.scale.set(.76, .76);
			
			sprite.alpha = 0;
			game.add.tween(sprite).to( { alpha: 1 }, 240, "Linear", true);
	
			sprite.x = _this.width / 2 - sprite.width / 2;
			sprite.y = _this.height / 2 - sprite.height / 2;
			
			soundsArray[items.indexOf(chosenItem)].play();
		}
		
		else{
			if (_this.children[0].key == soundsArray[items.indexOf(chosenItem)].key){ // same child - delete
				var x = _this.x;
				var y = _this.y;
				var index = boxes.indexOf(_this);
				
				var tween = game.add.tween(_this.children[0]).to( { alpha: 0 }, 240, "Linear", true);
				game.add.tween(_this).to( { alpha: 0 }, 240, "Linear", true);
				
				tween.onComplete.add(function(){
					_this.destroy();
					
					boxes[index] = game.add.sprite(x, y, 'box' + Math.floor(Math.random() * 5));	
					boxes[index].alpha = 0;
					
					boxes[index].inputEnabled = true;
					boxes[index].events.onInputDown.add(addItem, _this);
		
					game.add.tween(boxes[index]).to( { alpha: 1 }, 240, "Linear", true);
				});
			}	
			
			else{ // different child - replace
				var x = _this.x;
				var y = _this.y;
				var index = boxes.indexOf(_this);
				
				var tween = game.add.tween(_this.children[0]).to( { alpha: 0 }, 240, "Linear", true);
				
				tween.onComplete.add(function(){
					_this.children[0].destroy();
					
					sprite = _this.addChild(game.make.sprite(0, 0, chosenItem.key));
					sprite.scale.set(.76, .76);
					
					sprite.alpha = 0;
					game.add.tween(sprite).to( { alpha: 1 }, 240, "Linear", true);
			
					sprite.x = _this.width / 2 - sprite.width / 2;
					sprite.y = _this.height / 2 - sprite.height / 2;
					
					soundsArray[items.indexOf(chosenItem)].play();
				});
			}
		}
	}
}

function getBox(){
	var keyObjects = [];
	
    for (n = 0; n < boxes.length; n++){
        if (n % N_ROWS == box_n){
        	row = n;
            boxes[n].tint = HIGHLIGHT_COLOR;
            boxes[n].scale.set(1.01, 1.01);
            boxes[n].alpha = 1;

            for (x = 0; x < boxes[n].children.length; x++){
                keyObjects.push(boxes[n].children[x].key);
            }
        }
        else{
            boxes[n].tint = 0xffffff;
            boxes[n].scale.set(1, 1);
            boxes[n].alpha = 0.7;
        }
    }
    
    play_sounds(keyObjects);
    
    if (box_n < (N_ROWS - 1)) box_n++;
    else { box_n = 0; }; 
    
    setTimeout(function(){
        getBox();
    }, 60000 / bpm);
}

function play_sounds(_keys){
	for (x = 0; x < _keys.length; x++){
		for (s = 0; s < soundsArray.length; s++){
			if (_keys[x] == soundsArray[s].key){
				soundsArray[s].play();
			}
		}
	}
}

function loadSounds(){
	ballSfx = game.add.audio('ball', 1, false);
	drumSfx = game.add.audio('drum', 1, false);
	carSfx = game.add.audio('car', 1, false);
	horseSfx = game.add.audio('horse', 1, false);
	planeSfx = game.add.audio('plane', 1, false);
	trumpetSfx = game.add.audio('trumpet', 1, false);
	trainSfx = game.add.audio('train', 1, false);
	
	alarm_clockSfx = game.add.audio('alarm_clock', 1, false);
	helicopterSfx = game.add.audio('helicopter', 1, false);

	cookooSfx = game.add.audio('cookoo', 1, false);
        
	soundsArray = [
		ballSfx, drumSfx, carSfx, horseSfx, planeSfx, trumpetSfx, trainSfx, alarm_clockSfx, helicopterSfx, cookooSfx
	];
	
	shuffle(soundsArray);
}

function plugIns(){
	setTimeout(function(){
		try{
            StatusBar.hide;
        } catch(e){} 
        try{
            window.plugins.insomnia.keepAwake();
        } catch(e){}   
	}, 1000);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}

function initAd(){
	admobid = {
    	banner: 'ca-app-pub-9795366520625065/4318048295',
    };
    
    if(AdMob) AdMob.createBanner({
	    adId: admobid.banner,
	    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    	autoShow: true
	});
}