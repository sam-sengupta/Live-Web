var capture;
var canvas;
var socket;
var rbutton, gbutton, bbutton;
var colorNum;
var slider;
function setup() {
  canvas = createCanvas(450, 350);
  socket = io.connect("http://localhost:3000");
  background(0);

  socket.on('pattern', newDrawing);

  capture = createCapture(VIDEO);
  capture.hide();

  colorNum = 0;
  rbutton = select('#r');
  gbutton = select('#g');
  bbutton = select('#b');

  rbutton.mousePressed(colR);
  gbutton.mousePressed(colG);
  bbutton.mousePressed(colB);

  slider = select('#sslider');
}

function colR(){
  colorNum = 1;
}
    
function colG(){
  colorNum = 2;
}
    
function colB(){
  colorNum = 3;
}
  
function newDrawing(data){
  if(colorNum == 1) {
    noStroke(); 
    fill(random(255), random(0), random(0));
    ellipse(data.x, data.y, data.size);
  }
  else if(colorNum == 2) {
    noStroke(); 
    fill(random(0), random(255), random(0));
    ellipse(data.x, data.y, data.size);
  }
  else if(colorNum == 3) {
    noStroke(); 
    fill(random(0), random(0), random(255));
    ellipse(data.x, data.y, data.size);
  }
}

function draw() {
  image(capture, 0, 0, canvas.width, width);
  filter(THRESHOLD, 0.4);
}

function mouseDragged(){
  var data = {
    x: mouseX,
    y: mouseY,
    size: slider.value()
  };
  socket.emit('pattern', data);
}
  
function keyPressed() {
  if (keyCode === ENTER) {
    console.log(canvas.elt.toDataURL());
    document.body.style.backgroundImage = "url(" + canvas.elt.toDataURL() + ")";
    document.body.style.paddingLeft = "850px";
  }
}