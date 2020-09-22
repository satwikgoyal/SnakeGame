let rows = 20; //total boxes = 20*20 = 400
let boxD; //box dimensions
let snake;
let apple;
let poisons = [];
let buttonX;
let buttonY;
let gameOver;
let resultP;


function setup() {
  frameRate(10);
  createCanvas(600, 600);
  info();
  boxD = width/rows;
  snake = new Snake();
  apple = new Fruit();
  for(let i = 0; i < 3; i++){
    poison = new Poison();
    poison.newLocation();
    poisons.push(poison);
  }
  gameOver = false;
  var button = createButton("Reset");
  button.style('background-color', color(250,128,114));
  buttonX = windowWidth/2;
  buttonY = 60+600;
  button.position(buttonX, buttonY);
  button.mousePressed(resetSketch);
}

function draw() {
  if(!gameOver){
    background(60);
    noFill()
    strokeWeight(5);
    stroke(0);
    rect(0, 0, width, height);
    // drawGrid();
    snake.show();
    apple.show();
    for(let i = 0; i < 3; i++){
      poisons[i].show();
    }
    snake.eat();
    for(let i = 0; i < 3; i++){
      if(snake.score%(i+3) === 0 && snake.increase[i]>(i+2)){
        poisons[i].newLocation();
        snake.increase[i] = 0;
      }
    }
    snake.checkDeath();
    snake.update();
  }
}

function info(){
  let infoText = createP('');
  infoText.style('font-size', '24pt');
  infoText.style('text-align', 'center');
  infoText.html("This is the Snake Game. Red box is the apple. Purple boxes are poison.");
}

let Snake = function() {
  this.body = [];
  this.x = 30;
  this.y = 30;
  this.xDirection = 1;
  this.yDirection = 0;
  this.score = 0;
  this.increase = [0, 0, 0];
  
  this.changeDirection = function(dirX, dirY){
    this.xDirection = dirX;
    this.yDirection = dirY;
  }
  
  this.show = function() {
    for(let i = 0; i < this.body.length; i++){
      fill(93, 187, 99);
      // stroke(300);
      stroke(93, 187, 99);
      strokeWeight(0.5);
      rect(this.body[i].x, this.body[i].y, boxD, boxD);
    }
      fill(93, 187, 99);
      // stroke(300);
      stroke(93, 187, 99);
      strokeWeight(2.5);
      rect(this.x, this.y, boxD, boxD);
  }
  
  this.update = function() {
    for(let i = 0; i < this.body.length-1; i++){
      this.body[i] = this.body[i+1];
    }
    if(this.score >= 1){
      this.body[this.score-1] = createVector(this.x, this.y);
    }
    
    this.x += this.xDirection*boxD;
    this.y += this.yDirection*boxD;
    
    // this.x = constrain(this.x, 0, width-boxD);
    // this.y = constrain(this.y, 0, height-boxD); 
    
    if(this.xDirection == -1 && this.x<0){
      this.x = (rows-1)*boxD;
    }
    else if(this.xDirection == 1 && this.x>19*boxD){
      this.x = 0;
    }
    else if(this.yDirection == -1 && this.y<0){
      this.y = (rows-1)*boxD;
    }
    else if(this.yDirection == 1 && this.y>19*boxD){
      this.y = 0;
    }
  }

  this.eat = function(){
    if(dist(this.x, this.y, apple.x, apple.y) < 1){
      newVector = createVector(apple.x, apple.y);
      this.body.push(newVector);
      apple.newLocation();
      this.score++;
      this.increase[0]++;
      this.increase[1]++;
      this.increase[2]++;
    }
  }
  
  this.checkDeath = function(){
    for(let i = 0; i < this.body.length-1; i++){
      if(dist(this.x, this.y, this.body[i].x, this.body[i].y) < 1){
        resultP = createP('');
        resultP.style('font-size', '32pt');
        resultP.style('text-align', 'center');
        resultP.html("Game Over. Your Score: " + this.score);
        gameOver = true;
      }
    }
    for(i = 0; i<3; i++){
      if(dist(this.x, this.y, poisons[i].x, poisons[i].y) < boxD){
        resultP = createP('');
        resultP.style('font-size', '32pt');
        resultP.style('text-align', 'center');
        resultP.html("Game Over. Your Score: " + this.score);
        this.show();
        poisons[i].smallShow();
        gameOver = true;
      }
    }
  }
}

let Fruit = function() {
  this.x = floor(random(19))*boxD;
  this.y = floor(random(19))*boxD;
  
  this.show = function() {
    fill(250,128,114);
    // fill(128, 0, 0);
    // stroke(300);
    stroke(250,128,114);
    strokeWeight(0);
    rect(this.x, this.y, boxD, boxD);
  }
  
  this.newLocation = function() {
    this.x = floor(random(19))*boxD;
    this.y = floor(random(19))*boxD;
    
    for(let i = 0; i < snake.body.length; i++){
      if(snake.body[i].x === this.x && snake.body[i].y === this.y){
        this.newLocation();
      }
    }
    if(snake.x === this.x && snake.y === this.y){
      this.newLocation();
    }
    for(let i = 0; i < 3; i++){
      if(poisons[i].x === this.x && poisons[i].y === this.y){
        this.newLocation();
      }
    }
  }
}

let Poison = function(){
  // this.x = floor(random(19))*boxD;
  // this.y = floor(random(19))*boxD;
  this.x = 0;
  this.y = 0;
  
  if(apple.x === this.x && apple.y === this.y){
      this.newLocation();
  }
  
  this.show = function() {
      fill(169, 90, 236);
      // stroke(300);
      stroke(169, 90, 236);
      strokeWeight(0);
      rect(this.x, this.y, boxD, boxD);
  }
  
  this.newLocation = function() {
    this.x = floor(random(19))*boxD;
    this.y = floor(random(19))*boxD;
    
    for(let i = 0; i < snake.body.length; i++){
      if(snake.body[i].x === this.x && snake.body[i].y === this.y){
        this.newLocation();
      }
    }
    if(snake.x === this.x || snake.y === this.y){
      this.newLocation();
    }
    else if(apple.x === this.x && apple.y === this.y){
      this.newLocation();
    }
  }
  
  this.smallShow = function(){
      fill(169, 90, 236);
      // stroke(300);
      stroke(169, 90, 236);
      strokeWeight(0);
      rect(this.x+(boxD/4), this.y+(boxD/4), boxD/2, boxD/2);
  }
}

function drawGrid(){
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < rows; j++){
	  stroke(300);
	  strokeWeight(1);
      line(i*boxD, 0, i*boxD, width);
      line(0, j*boxD, height, j*boxD);
    }
  }
}

function keyPressed(){
  if(keyCode === UP_ARROW && snake.xDirection != 0){
    snake.changeDirection(0, -1);
  }
  else if(keyCode === DOWN_ARROW && snake.xDirection != 0){
    snake.changeDirection(0, 1);
  }
  else if(keyCode === RIGHT_ARROW && snake.yDirection != 0){
    snake.changeDirection(1, 0);
  }
  else if(keyCode === LEFT_ARROW && snake.yDirection != 0){
    snake.changeDirection(-1, 0);
  }
}

function resetSketch(){
  resultP.hide();
  snake = new Snake();
  apple = new Fruit();
  poisons = [];
  for(let i = 0; i < 3; i++){
    poison = new Poison();
    poison.newLocation();
    poisons.push(poison);
  }
  gameOver = false;
  
}