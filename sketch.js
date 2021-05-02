var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var ground;
var survivalTime = 0;
var bgI,bg;
var gameState = "play"
var monkeyState = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgI = loadImage("jungle.jpg");
  
  
 
}



function setup() {
  
  createCanvas(500,500);
  
   bg = createSprite(250,250,500,500)
  bg.addAnimation("bg",bgI); 
  bg.x = width/2;
  bg.velocityX = -5;
  
  monkey = createSprite(100,250,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.14
  
  ground = createSprite(250,450,1000,20);
  ground.x = width/2;
  ground.velocityX = -5;
  ground.visible = false;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {

 camera.position.x = monkey.x+150;
 camera.position.y = 250;

   background("white");
  
    
      foods();
  obstacles();
      
     
  
  if (bg.x < 0)
    {
      bg.x = width/2;
    }
      if (ground.x < camera.position.x)
    {
      ground.x = camera.position.x+width/2;
    }
      
      //switch(score) {
      //case 10: monkey.scale = 0.12;
      //        break;
      //case 20: monkey.scale = 0.14;
      //        break;
      //case 30: monkey.scale = 0.16;
      //        break;
      //case 40: monkey.scale = 0.18;
      //        break;
     // case 50: monkey.scale = 0.20;
      //        break;
      //case 60: monkey.scale = 0.22;
      //        break;
      //default: break;
    
  
  if(keyDown("space")&&monkey.y >200)
    {
      monkey.velocityY = -15;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);

  if(monkeyState>1)
  {
    gameState = "end"
  }
  
      if (obstacleGroup.isTouching(monkey))
        {
         obstacleGroup.destroyEach();
         // monkey.scale = monkey.scale-0.02
         monkeyState = monkeyState+1;
          
        }
        console.log(monkey.scale)
  
  if (FoodGroup.isTouching(monkey))
    {
      score = score+2;
      monkey.scale = monkey.scale+0.02
      FoodGroup.destroyEach();
    }
    if(monkey.scale > 0.22)
  {
    monkey.scale = 0.22
  }
  
console.log(gameState)
    
    textSize(20);
    fill("white");

  

drawSprites(); 

if(gameState === "end")
{
  monkey.destroy();
  score = 0;
  survivalTime === 0;
  bg.velocityX =0
  textSize(20)
  text("GAME OVER",camera.position.x-100,camera.position.y)

}
text("score  "+score,camera.position.x-200,camera.position.y-200);
if(gameState === "play")
{
survivalTime = Math.ceil(frameCount/frameRate());
text("survivalTime "+survivalTime,camera.position.x+50,camera.position.y-200);
}
}
function foods()
{
  if (frameCount%80 === 0)
    {
      banana = createSprite(camera.position.x+200,camera.position.y,20,20);
      banana.scale = 0.1;
      banana.addAnimation("ali",bananaImage);
      banana.y = Math.round(random(camera.position.y,camera.position.y+150));
      banana.setLifetime = 50;
      banana.velocityX = -8   
      FoodGroup.add(banana);
    }
}

function obstacles()
{
  if (frameCount%300 === 0)
    {
      obstacle = createSprite(camera.position.x+200,camera.position.y+175,20,20);
      obstacle.scale = 0.1;
      obstacle.addAnimation("ali",obstacleImage);
      obstacle.setLifetime = 100;
      obstacle.velocityX = -5   
      obstacleGroup.add(obstacle);
    }
}






