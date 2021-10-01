//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImg;
var knifeSwooshSound , gameoverSound;
var bg;
var shoppingPoints=0;
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
  text("Shopping Points : "+shoppingPoints,15,20);
  textSize(30);
  fill("black");
  text("Shop the fruits",200,50);
  
  
  if(gameState===PLAY){
     // Move sword with mouse
    //knife.y=World.mouseY;
    knife.x=World.mouseX;

    fruits();
    //fruit2();
    //fruit3();
    //fruit4();
    Monster();
    
  
    
    
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      //knifeSwooshSound.play();
      shoppingPoints=shoppingPoints+10;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;

        /*if(gameState === END){
        text("Thank you for shopping");
        }*/

        
        //add gameover sound here
       // gameoverSound.play();
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityYEach(0);
        monsterGroup.setVelocityYEach(0);
        
      
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
    monster.velocityY = (8+(shoppingPoints/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%200===0){
    position = Math.round(random(1,2,3,4));
    fruit=createSprite(400,200,20,20);
    // Increase score if sword toching fruit
    if(fruitGroup.isTouching(knife)){
      score=score+2;
    }
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1){
    fruit.y = 600;
    fruit.velocityY=-(7+(shoppingPoints/4));
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
     //fruit.debug=true;
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
   
    
    fruit.setLifetime=-200;
    
    fruitGroup.add(fruit);
  }
}

/*function fruits(){
  if (World.frameCount % 530 == 0) {
    var fruits = createSprite(Math.round(random(50, 350),40, 10, 10));
   fruits.addImage(f)

}
}*/

/*function fruit1() {
  if (World.frameCount % 200 == 0) {
  var fruit1 = createSprite(Math.round(random(50, 350),40, 10, 10));
  fruit1.addImage("fruits",fruit1);
  fruit1.scale=0.12;
  fruit1.velocityY = 3;
  fruit1.lifetime = 150;
  fruitGroup.add(fruit1);
  }
}

function fruit2() {
  if (World.frameCount % 320 == 0) {
  var fruit2 = createSprite(Math.round(random(50, 350),40, 10, 10));
  fruit2.addImage("fruits",fruit2);
  fruit2.scale=0.03;
  fruit2.velocityY = 3;
  fruit2.lifetime = 150;
  fruitGroup.add(fruit2);
}
}



function fruit3() {
  if (World.frameCount % 410 == 0) {
  var fruit3 = createSprite(Math.round(random(50, 350),40, 10, 10));
  fruit3.addImage("fruits",fruit3);
  fruit3.scale=0.13;
  fruit3.velocityY = 3;
  fruit3.lifetime = 150;
  fruitGroup.add(fruit3);
  }
}

function fruit4(){
  if (World.frameCount % 530 == 0) {
  var fruit4 = createSprite(Math.round(random(50, 350),40, 10, 10));
  fruit4.addImage(swordImg);
  fruit4.scale=0.1;
  fruit4.velocityY = 3;
  fruit4.lifetime = 150;
  fruitGroup.add(fruit4);
  }
}
*/
