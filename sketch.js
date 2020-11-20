var PLAY = 0;
var END = 1;
var gameState;
var ok;
var survivalTime;
var restart, restart1;
var monkey , monkey_running, skya, skyb, sky1;
var ground, groundi, ground1a, ground1b, ground1c, ground1d, ground2, sky;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var sound;

function preload(){
  
  monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  ground2 = loadImage("ground2.0.jpg");
  noMonkey = loadImage("sprite_5.png");
  sky1 = loadImage("images.jpg");
  restart1 = loadImage("012_restart-2-512.webp");
  
  sound = loadSound("chocolate outline.mp3");
 
}

function setup() {
  
createCanvas(500, 350);
  
  sound.loop();
  
  ok = "go";
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  gameState = PLAY;
  
  groundi = createSprite(400,340,900,60);
  ground = createSprite(400,340,900,20);
  
  skya = createSprite(800,165,10,10);
  skya.velocityX=-5;
  skya.addImage(sky1);
  skya.scale=2;
  
  skyb = createSprite(250,165,10,10);
  skyb.velocityX=-5;
  skyb.addImage(sky1);
  skyb.scale=2;
  
  ground1a = createSprite(90,360,900,20);
  ground1a.velocityX=-6;
  ground1a.addImage(ground2);
  ground1a.scale=0.2;
  
  ground1b = createSprite(270,360,900,20);
  ground1b.velocityX=-6;
  ground1b.addImage(ground2);
  ground1b.scale=0.2;
  
  ground1c = createSprite(450,360,900,20);
  ground1c.velocityX=-6;
  ground1c.addImage(ground2);
  ground1c.scale=0.2;
  
  ground1d = createSprite(630,360,900,20);
  ground1d.velocityX=-6;
  ground1d.addImage(ground2);
  ground1d.scale=0.2;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  
  monkey.setCollider("circle",0,0,230);
  monkey.debug = false;
  
  restart = createSprite(250,180,20,20);
  restart.addImage(restart1);
  restart.scale = 0.1;
  restart.visible = false;
  
  score = 0;
  
}


function draw() {
  
background("200");
  
  if(gameState === PLAY){
    
    if(ground1a.x<-90) {
    ground1a.x = 630;
  }
  if(ground1b.x<-90) {
    ground1b.x =  630;
  }
  if(ground1c.x<-90) {
    ground1c.x = 630;
  }
  if(ground1d.x<-90) {
    ground1d.x = 630;
  }
  if(skya.x<-250) {
    skya.x = 800;
  }
  if(skyb.x<-250) {
    skyb.x = 800;
  }
    
    if(keyDown("space") && ok === "go") {
      monkey.velocityY = -17;
      ok = "stop";
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  }
    
    if(monkey.isTouching(groundi) && ok === "stop"){
    ok = "go";
    }
    
    if(obstaclesGroup.isTouching(monkey)){
        ground1a.velocityX = 0;
        ground1b.velocityX = 0;
        ground1c.velocityX = 0;
        ground1d.velocityX = 0;
        monkey.velocityY = 0;
        monkey.velocityX = 0;
        skya.velocityX = 0;
        skyb.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        gameState = END;
      
    }
  spawnFood();
  spawnObstacles();
  }
  
  if(gameState === END){
    
    restart.visible = true;
    
    if(mousePressedOver(restart)){
      gameState = PLAY;
      obstaclesGroup.destroyEach();
      FoodGroup.destroyEach();
      restart.visible = false;
      ground1a.velocityX = -6;
      ground1b.velocityX = -6;
      ground1c.velocityX = -6;
      ground1d.velocityX = -6;
    }
    
  }
 
  drawSprites();        
  
  monkey.collide(ground);   
  monkey.collide(obstaclesGroup);  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50);   
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
}



function spawnFood() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(590,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    
    banana.addImage(bananaImage);
    banana.scale=0.08;
    
    banana.rotation = -30;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(600,310,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.12;
      
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}





