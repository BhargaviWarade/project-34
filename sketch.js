//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImg;
var knifeSwooshSound , gameoverSound;
var bg;
var score=0;
function preload(){
  
  knifeImage = loadImage("bag2.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("apple.png");
  fruit2 = loadImage("banana.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("gamefood17.png");
  gameOverImg = loadImage("gameover.png")
  bg = loadImage("background0.png")

  //load sound here
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
  gameoverSound = loadSound("gameover.mp3");


}



function setup() {
  createCanvas(600, 600);
  
  
  //creating sword
   knife=createSprite(40,450,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.3
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background(bg);
  //Display score
  textSize(22);
  text("Score : "+score,15,20);
  textSize(24);
  fill("black");
  text("HELP TO COLLECT FRUITS IN BAG...",120,50);
  
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    //knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    
    
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      //knifeSwooshSound.play();
      score=score+5;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        
        //add gameover sound here
       // gameoverSound.play();
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityYEach(0);
        monsterGroup.setVelocityYEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImg);
        knife.scale=0.02
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
  
  
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityY = (8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2,3,4));
    fruit=createSprite(400,200,20,20);
    // Increase score if sword toching fruit
    if(fruitGroup.isTouching(knife)){
      score=score+2;
    }
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1){
    fruit.y = 600;
    fruit.velocityY=-(7+(score/4));
    }
    else
    {
      if(position==2){
      fruit.y=0;
      
     //update below give line of code for increase fruitGroup speed by 4
      fruit.velocityY= 6;
      }
    }
    
    fruit.scale=0.2;
     fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=150;
    
    fruitGroup.add(fruit);
  }
}