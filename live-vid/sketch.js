let myVideo = null;
let r;
let g;
let b;

function setup() {
  createCanvas(400,400);

  myVideo = createCapture(VIDEO, 
    function(stream) {
	  let p5lm = new p5LiveMedia(this, "CAPTURE", stream, "Shawn's Live Web Demo")
  	  p5lm.on('stream', gotStream);
    }
  );
  myVideo.hide();
}

let otherVideo;
function gotStream(stream, id) {
  otherVideo = stream;
  otherVideo.hide();
  //otherVideo.id and id are the same and unique identifier
}

function draw() {
  background(220);
  if (frameCount % 30 == 0) {
  r = random(255);
  g = random(255);
  b = random(255);
  }
  if (otherVideo) {
      tint(r, g, b); // Rainbow filter
      image(otherVideo,0,0);

    
  }
  
}