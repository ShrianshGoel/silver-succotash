var canvas;
var backgroundImage;
var bgImg;
var obsGroup, coinGroup, fuelGroup
var database;
var data
var car1,car2,cars,c1,c2;
var track;
var co1,obs1,obs2,fuel1;
var form, player;
var playerCount;
var allPlayers;
var gameState;
var balloon


function preload() {
  backgroundImage = loadImage("./assets/background.png");
c1 = loadImage("./assets/car1.png");
c2=loadImage("./assets/car2.png");
track = loadImage("./assets/track.jpg");
obs1 = loadImage("./assets/obstacle1.png")
obs2 = loadImage("./assets/obstacle2.png")
co1=loadImage("./assets/goldCoin.png")
balloon = loadImage("./assets/life.png")
fuel1=loadImage("./assets/fuel.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
game.getState()
  game.start();

}

function draw() {
  background(backgroundImage);
  if(playerCount===2){
game.updateState(1);

  }
  

if(gameState===1){
  game.play();
  
}

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}
