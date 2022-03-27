var capture;
var canvas;
var socket = io.connect("http://localhost:3000");
var rbutton, gbutton, bbutton;
var colorNum;
var slider;

// 4th Step
socket.on('pattern', function(data) {
  debugger
  // New Drawing
    if(data.colorNum == 1) {
      noStroke(); 
      fill(random(255), random(0), random(0));
      ellipse(data.x, data.y, data.size);
    }
    else if(data.colorNum == 2) {
      noStroke(); 
      fill(random(0), random(255), random(0));
      ellipse(data.x, data.y, data.size);
    }
    else if(data.colorNum == 3) {
      noStroke(); 
      fill(random(0), random(0), random(255));
      ellipse(data.x, data.y, data.size);
    }
    console.log(data.x)
});

function setup() {
  debugger;
  canvas = createCanvas(450, 350);
  // background(0);


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
  

function draw() {
  // Drawing the Image
  // image(capture, 0, 0, canvas.width, width);
  // filter(THRESHOLD, 0.4);
  // socket.on('pattern', newDrawing);

}

function mouseDragged(){
  debugger
  var data = {
    x: mouseX,
    y: mouseY,
    colorNum: 1,
    size: slider.value()
  };

  // 1 - Emit to Server
  socket.emit('pattern', data);
}
  
function keyPressed() {
  debugger
  if (keyCode === ENTER) {
    console.log(canvas.elt.toDataURL());
    document.body.style.backgroundImage = "url(" + canvas.elt.toDataURL() + ")";
    document.body.style.paddingLeft = "850px";
  }
}