class Game {
  constructor() {
    this.resetTitle=createElement("h2","Reset");
    this.reset = createButton("")
this.keyActive = true;
    this.leaderboardTitle = createElement("h2","Leaderboard")
    this.leader1 = createElement("h2")
    this.leader2= createElement("h2")
  }
  getState(){
    database.ref("gameState").on("value",(data)=>{
      gameState = data.val();
    });
    
      }
    
      updateState(state){
    database.ref("/").update({
     gameState:state
      
    })}
    addSprite(spriteGroup,no_of_sprites,spriteImg,scale,positions=[]){
     for(var i=0;i<no_of_sprites;i++){
    var anything,x,y;
if (positions.length>0) {
x= positions[i].x 
y= positions[i].y
spriteImg = positions[i].image 
     } else{
x = random(width/1.5,width/5)
y= random(-height*4,height/6)
     }
    
     anything = createSprite(x,y)
     anything.addImage("sprite",spriteImg)
     anything.scale = scale
   
     spriteGroup.add(anything);
    }

    }
  start() {
    form = new Form();
    form.display();
    player = new Player();
    player.getCount();

    obsGroup = new Group();
    fuelGroup = new Group();
    coinGroup = new Group();
  this.addSprite(fuelGroup,4,fuel1,0.02)
  this.addSprite(coinGroup,23,co1,0.08)
  var obstaclesPositions = [ { x: width / 2 + 250, y: height - 800, image: obs2 }, { x: width / 2 - 150, y: height - 1300, image: obs1 }, { x: width / 2 + 250, y: height - 1800, image: obs1 }, { x: width / 2 - 180, y: height - 2300, image: obs2 }, { x: width / 2, y: height - 2800, image: obs2 }, { x: width / 2 - 180, y: height - 3300, image: obs1 }, { x: width / 2 + 180, y: height - 3300, image: obs2 }, { x: width / 2 + 250, y: height - 3800, image: obs2 }, { x: width / 2 - 150, y: height - 4300, image: obs1 }, { x: width / 2 + 250, y: height - 4800, image: obs2 }, { x: width / 2, y: height - 5300, image: obs1 }, { x: width / 2 - 180, y: height - 5500, image: obs2 } ];
this.addSprite(obsGroup,obstaclesPositions.length,obs1,0.05,obstaclesPositions)
    car1 = createSprite(width/2.50,height/1.20);
    car1.addImage("first",c1);
    car1.scale=0.1
    car2 = createSprite(width/1.80,height/1.20);
    car2.addImage("second",c2);
car2.scale=0.1

    cars = [car1,car2];
  }
play(){
this.handleElements()
this.handleReset();

Player.getPlayerInfo()
if(car1.isTouching===coinGroup){
player[0].rank=player[0].rank+1
}

if(allPlayers!=undefined){
  image(track,0,-height*8,width,height*9);

  var index =0
  this.showLeaderBoard()
  for (var i in allPlayers){
var x = allPlayers[i].positionX
var y = height-allPlayers[i].positionY
index+=1

cars[index-1].position.x = x
cars[index-1].position.y = y


if(player.index===index){
  fill("cyan")
 ellipse(x,y,90,90)
 this.handleObstacles(index);
 this.handlepowerCoins(index);
 this.handleFuel(index);
 camera.position.y = y
}


}
this.showLifeBar();
this.handleControls();
this.showFuelBar();
}

drawSprites()
}
showLifeBar(){
  push()
  image(balloon,width/1.20,height-player.positionY-21.20,20,20)
  fill("white")
  rect(width/1.40,height-player.positionY-21.20,185,20)
  fill("black")
  
  rect(width/1.40,height-player.positionY-21.20,player.life,20)



  pop()
}
gameOver(){

 alert('game over: Better Luck Next Time');
  swal({
   title: "Game Over ",
   text:"Better Luck Next Time",
    imageURL:"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize:"100x100",
    confirmButtonText:"Thanks For Playing"
 }) 
}
showFuelBar(){
  push()
  image(fuel1,width/1.20,height-player.positionY-19.20,20,20)
  fill("white")
  rect(width/1.40,height-player.positionY-19.20,185,20)
  fill("red")
  
  rect(width/1.40,height-player.positionY-19.20,player.fuel,20)



  pop()
}


handleElements(){
form.hide();
form.title.position(width/6.50,height/16.50);
form.title.class("gameTitle1")

this.resetTitle.position(width/1.20,height/9.30);
this.reset.position(width/1.20,height/5.30);
this.reset.class("reset")
this.leaderboardTitle.position(width/9,height/9.30)
this.leader1.position(width/9,height/7.30);
this.leader2.position(width/9,height/5.30);

}
showLeaderBoard(){
  var leader1
  var leader2
  var player
player = Object.values(allPlayers)
if((player[0].rank===0&&player[1].rank===0)||players[0].rank===1){
leader1=player[0].rank+"&emsp;"+player[0].name+"&emsp;"+player[0].score
leader2=player[1].rank+"&emsp;"+player[1].name+"&emsp;"+player[1].score
}
if(player[1].rank===1){
  leader2=player[0].rank+"&emsp;"+player[0].name+"&emsp;"+player[0].score
  leader1=player[1].rank+"&emsp;"+player[1].name+"&emsp;"+player[1].score 
}
this.leader1.html(leader1)
this.leader2.html(leader2)
}
handleReset(){
this.reset.mousePressed(
  ()=>{
    database.ref("/").set({
      playerCount:0,
      gameState:0

    })
    window.location.reload()
  })}

handleControls(){

if(player.fuel<=4){
gameState = 2
this.gameOver();
}

  if(keyIsDown(UP_ARROW)){
    if(player.fuel>4){
player.fuel = player.fuel - 0.5;
player.updatePosition();
    }
player.positionY = player.positionY + 15;
player.updatePosition();

  }
  if(keyIsDown(LEFT_ARROW)&&player.positionX>width/5){
    this.keyActive = true;
    player.positionX = player.positionX - 15;
    player.updatePosition();
    
      }

if(keyIsDown(RIGHT_ARROW)&&player.positionX<width/1.50){
    this.keyActive = false;
  player.positionX = player.positionX + 15;
  player.updatePosition();
  
    }
}
handleFuel(index){
cars[index-1].overlap(fuelGroup,function(collector,collected){
player.fuel = 185
collected.remove()

})


}
handleObstacles(index){
if(cars[index-1].collide(obsGroup)){
  if(player.life>0){
player.life = player.life - 185/4;


}
if(this.keyActive){
  player.positionX = player.positionX + 100;  
}
else{
  player.positionX = player.positionX - 100;
}
player.updatePosition()
}


}


handlepowerCoins(index){
  cars[index-1].overlap(coinGroup,function(collector,collected){
   player.score = player.score+3;
    collected.remove()
    player.updatePosition();
  })
}
}
