var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, gameover, gameoverimage;
var FoodGroup, obstacleGroup, bananaGroup;
var ground;
var survivalTime, score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 gameoverimage = loadImage("32847539f3d1e018a00145a3848f67e8.jpg");
}



function setup() {
  createCanvas(400, 400);
  monkey = createSprite(50, 330, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.12;
  
  ground = createSprite(200, 370, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  
  gameover = createSprite(200, 200, 10, 10);
  gameover.addImage("uydeghdi32", gameoverimage);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  survivalTime = 0;
  score = 0;
}



function draw() {
  background(1000);
  text("Survival Time: "+ survivalTime, 15,15);
  text("Score: "+ score, 15,30);
  
  if (gameState === PLAY){
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    gameover.visible = false;
    if(keyDown("space")&& monkey.y >= 328.16) {
        monkey.velocityY = -15;
    }
  
    if(keyDown("up")&& monkey.y >= 328.16) {
        monkey.velocityY = -15;
    }
  if(keyDown("p")){
    monkey.velocityY = 13;
  }
  if (keyDown("o")){
    monkey.velocityY = -1;
  }
  monkey.velocityY = monkey.velocityY + 0.55;
  monkey.collide(ground);
  banana();
  obstacle();
  }
  
  if(obstacleGroup.isTouching(monkey)) {
    gameState = END;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  if(gameState === END){
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    gameover.visible = true;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    if(keyDown("space")){
      gameState = PLAY;
      survivalTime = 0;
      score = 0;
    }
    if(keyDown("up")){
      gameState = PLAY;
      survivalTime = 0;
      score = 0;
    }
  }
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
  //console.log(World.mouseY);
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score+1;
    }
  
  drawSprites();
}


function banana(){
 if(World.frameCount%80===0){
   banana1 = createSprite(410, 300, 10, 10);
   banana1.y = Math.round(random(150, 250));
   banana1.addImage("banana222", bananaImage);
   banana1.scale = 0.1;
   banana1.velocityX = -5;
   banana1.setlifeTime = 82;
   bananaGroup.add(banana1);
   banana1.debug = false;
 }
}

function obstacle(){
 if(World.frameCount%100===0){
   obstacle1 = createSprite(410, 340, 10, 10);
   obstacle1.addImage("trollolol", obstacleImage);
   obstacle1.scale = 0.2;
   obstacle1.velocityX = -7;
   obstacle1.setlifeTime = 82;
   obstacleGroup.add(obstacle1);
   obstacle1.debug = false;
   obstacle1.setCollider("circle", 0, 0, 250);
   obstacle1.velocityX = -(4 + 1*survivalTime/50);
 }
}

