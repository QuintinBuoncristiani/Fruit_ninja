//create variable for states
var PLAY=1;
var END=0;
var gameState=1;

//create variables for alien, fruits, sword, score, sounds & gameOver
var alien1, alien1Image;
var alien2, alien2Image;

var fruit1, fruit1Image;
var fruit2, fruit2Image;
var fruit3, fruit3Image;
var fruit4, fruit4Image;

var sword, swordImage;

var score;

var gameOverSound, fruitCutSound;

var gameOver, gameOverImage;

function preload(){
  //load Images of aliens
  alien1Image = loadImage("alien1.png");
  alien2Image = loadImage("alien2.png");
  
  //load Images of fruits
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  
  //load Image of sword/Knife
  swordImage = loadImage("Knife.png");
  
  //load Image of game over
  gameOverImage = loadImage("gameover.png");
  
  fruitCutSound = loadSound("fruitCutSound.mp3");
  
  gameOverSound = loadSound("gameoverSound.mp3")
  
}

function setup(){
  createCanvas(600,600);
  
  //create sword Sprite
  sword = createSprite(300,450,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  //create fruits and Enemy Groups
  fruitsFromRightGroup = createGroup();
  fruitsFromLeftGroup = createGroup();
  EnemyFromRightGroup = createGroup();
  EnemyFromLeftGroup = createGroup();
  
  //create Score
  score = 0;
  
  //set collider in a rectangle
  sword.setCollider("rectangle",-10,-10,50,50);
}

function draw(){
  //set background
  background("lightblue");
  
  //create text of score
  textSize(20);
  text("Score: " +score, 250,30);
  
  if(gameState === PLAY){
    
    //create sword to move with the mouse pointer
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    //Spawn fruits and Enemy
    fruitsFromRight();
    fruitsFromLeft();
    EnemyFromRight();
    EnemyFromLeft();
    
    //if sword touches to fruits, fruits will destroy and score             increase with 2
    if(fruitsFromRightGroup.isTouching(sword)){
      fruitsFromRightGroup.destroyEach();
      fruitCutSound.play();
      score = score+2;
    }
    
    if(fruitsFromLeftGroup.isTouching(sword)){
      fruitsFromLeftGroup.destroyEach();
      fruitCutSound.play();
      score = score+3;
    }
    
    //game will move to end
    if(EnemyFromRightGroup.isTouching(sword) ||                                EnemyFromLeftGroup.isTouching(sword)){
      gameOverSound.play();
      gameState = END;
    }
    
  } else if(gameState === END){
    
    //here sword Image change to Game Over Image in the centre
    sword.addImage(gameOverImage);
    sword.x = 300;
    sword.y = 300;
    
    //destroy fruits and enemy
    fruitsFromRightGroup.destroyEach();
    fruitsFromLeftGroup.destroyEach();
    EnemyFromRightGroup.destroyEach();
    EnemyFromLeftGroup.destroyEach();
    
    //set fruits and enemy velocity to 0
    fruitsFromRightGroup.setVelocityXEach(0);
    fruitsFromLeftGroup.setVelocityXEach(0);
    EnemyFromRightGroup.setVelocityXEach(0);
    EnemyFromLeftGroup.setVelocityXEach(0);
    
  }
  
  //to display all sprites
  drawSprites();
  
}

function fruitsFromRight(){
  
  if(frameCount % 60 === 0){
    //create variable for fruits
    var fruit = createSprite(600,300,20,20);
    
    //give scale to fruits
    fruit.scale = 0.2;
    
    //generate random fruits
    var r = Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1Image);
    } else if(r == 2){
      fruit.addImage(fruit2Image);
    } else if(r == 3){
      fruit.addImage(fruit3Image);
    } else if(r == 4){
      fruit.addImage(fruit4Image);
    }
    
    //create fruits Y position randomly
    fruit.y = Math.round(random(50,500));
    
    //assign scale and lifetime to the fruits
    fruit.velocityX = -(6+(score/10));
    fruit.lifetime = 110;
    
    //add each fruits to the group
    fruitsFromRightGroup.add(fruit);
    
    //adjust the depth of sword with fruits
    fruit.depth = sword.depth;
    sword.depth = sword.depth+1;
  }
}

function fruitsFromLeft(){
  
  if(frameCount % 80 === 0){
    //create variable for fruits
    var fruit = createSprite(0,300,20,20);
    
    //give scale to fruits
    fruit.scale = 0.2;
    
    //generate random fruits
    var r = Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1Image);
    } else if(r == 2){
      fruit.addImage(fruit2Image);
    } else if(r == 3){
      fruit.addImage(fruit3Image);
    } else if(r == 4){
      fruit.addImage(fruit4Image);
    }
    
    //create fruits Y position randomly
    fruit.y = Math.round(random(50,500));
    
    //assign scale and lifetime to the fruits
    fruit.velocityX = (6+(score/10));
    fruit.lifetime = 110;
    
    //add each fruits to the group
    fruitsFromLeftGroup.add(fruit);
    
    //adjust the depth of sword with fruits
    fruit.depth = sword.depth;
    sword.depth = sword.depth+1;
  }
}

function EnemyFromRight(){
  
  if(frameCount % 200 === 0){
    
    //create variable for Enemy
    var alien = createSprite(600,300.20,20);
    
    //give scale to Enemy
    alien.scale = 0.8;
    
    //generate random enemy
    var r = Math.round(random(1,2));
    if(r == 1){
      alien.addImage(alien1Image);
    } else if(r == 2){
      alien.addImage(alien2Image);
    }
    
    //create alien's Y position randomly
    alien.y = Math.round(random(100,450));
    
    //assign scale and lifetime to the Enemies
    alien.velocityX = -(6+(score/4));
    alien.lifetime = 110;
    
    //add each Enemy to the group
    EnemyFromRightGroup.add(alien);
    
    //adjust the depth of sword with alien
    alien.depth = sword.depth;
    sword.depth = sword.depth+1;
  }
}

function EnemyFromLeft(){
  
  if(frameCount % 150 === 0){
    
    //create variable for Enemy
    var alien = createSprite(0,300.20,20);
    
    //give scale to Enemy
    alien.scale = 0.8;
    
    //generate random enemy
    var r = Math.round(random(1,2));
    if(r == 1){
      alien.addImage(alien1Image);
    } else if(r == 2){
      alien.addImage(alien2Image);
    }
    
    //create alien's Y position randomly
    alien.y = Math.round(random(100,450));
    
    //assign scale and lifetime to the Enemies
    alien.velocityX = (6+(score/4));
    alien.lifetime = 110;
    
    //add each Enemy to the group
    EnemyFromRightGroup.add(alien);
    
    //adjust the depth of sword with alien
    alien.depth = sword.depth;
    sword.depth = sword.depth+1;
  }
}