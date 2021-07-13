const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, train, player_running, player_collided
var ground, groundImage
var snitches, snitchGrp

var enemyGroup, enemy
var cloud, cloudGroup

var score = 0;
var  coins = 0;

var gameOver, restart, restartImg;

function preload(){
playerImg = loadImage("harry.png");

//snitchImg = loadImage("snitche1.png");
snitch2Img = loadImage("snitch33.png")

enemyImg = loadImage("dementor.png");
enemyImg2 = loadImage("dementor2.png");
enemyImg3 = loadImage("dementor3.png");
enemyImg4 = loadImage("dementor4.png");
enemy5 = loadImage("pngegg.png")
enemy6 = loadImage("pngegg1.png")
enemy7 = loadImage("pngegg2.png")

harry = loadImage("harryy.png")

cloudImg = loadImage("cloud11.png")

bgimg = loadImage("backgroundImg.png")

gameoverImg = loadImage("gameover.png")
restartImg = loadImage("restart.png");
restartImg2 = loadImage("restart2.png");

cloudGroup = new Group();
enemyGroup = new Group();
snitchGrp = new Group();
}

function setup(){
    var canvas = createCanvas(600,600);
    engine = Engine.create();
    world = engine.world;


    player = createSprite(300,550,10,10)
    player.addImage("harry1",harry)
    player.scale = 0.25

    score = 0;
    
    gameOver = createSprite(300,300);
    gameOver.addImage("end",gameoverImg);

    restart = createSprite(300,400);
    restart.addImage("reload",restartImg2)
    restart.scale = 0.1
}

function draw(){
    background(bgimg);
    text("Score: "+ score, 500,50);
    text("Snitches "+ coins, 400,50);
    Engine.update(engine);

    if(gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        gameOver.visible = false;
        restart.visible = false;
    if(keyDown(RIGHT_ARROW)){
        player.velocityX = 2;
    }

    if(keyDown(LEFT_ARROW)){
        player.velocityX = -2;
    }

    if(keyDown(UP_ARROW)){
        player.velocityY = -2
    }

    if(keyDown(DOWN_ARROW)){
        player.velocityY = 2
    }

    if (snitchGrp.isTouching(player)){
        coins = coins + 1;
    }

    spawnSnitches();

    spawnClouds();

    spawnObstacles();
    
    

    if (enemyGroup.isTouching(player)){
        gameState = END;
    }
}

    else if (gameState === END){
        player.velocityY = 0
        player.velocityX = 0
        enemyGroup.setVelocityYEach(0);
        snitchGrp.setVelocityYEach(0);
        cloudGroup.setVelocityXEach(0);
        gameOver.visible = true
        restart.visible = true;
        
        enemyGroup.setLifetimeEach(-1);
        cloudGroup.setLifetimeEach(-1);
    }

if(mousePressedOver(restart)){
    reset();
}
    
   
    
    drawSprites();
}


function spawnSnitches(){
    if(frameCount % 60 === 0){
        snitches = createSprite(random(100,400),0,10,10);
        snitches.scale = 0.1

        snitches.velocityY = 3;

        var rand = Math.round(random(1,2))
        switch(rand){
            case 1 : snitches.addImage("snitch1",snitch2Img);
            break;
            default: break;

            
        }
        snitchGrp.lifetime = 300;
        snitchGrp.add(snitches);
    }
}

function spawnObstacles(){
    if (frameCount% 80===0){
        var enemy = createSprite(random(50,600),0,10,10);
        enemy.scale = 0.1;
    
        enemy.velocityY = 3;
    
        var rand = Math.round(random(1,4))
        switch(rand){
            case 1 : enemy.addImage("enemy1",enemy5);
            break;
            case 2 : enemy.addImage("enemy2",enemy6)
            break;
            case 3 : enemy.addImage("enemy3",enemy7);
            break;
            default: break;
        }
        enemyGroup.lifetime = 300;
        enemyGroup.add(enemy);
    }
}

function spawnClouds(){
    if (frameCount % 60 === 0) {
        var cloud = createSprite(250,580,40,10);
        cloud.x = Math.round(random(80,1500));
        cloud.addImage("cloudsss",cloudImg);
        cloud.scale = 0.1;
        cloud.velocityX = -3;
 
        cloudGroup.add(cloud);
      }
}

function reset(){
    gameState = PLAY;
        score = 0;
        coins = 0;
       gameOver.visible = false;
       restart.visible = false;

       cloudGroup.destroyEach();
       enemyGroup.destroyEach();
       snitchGrp.destroyEach();
        
    }

   
    
  
    



