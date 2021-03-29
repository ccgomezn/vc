let capture;
let button;

function setup() {
  createCanvas(320, 240);
  button = createButton('Start!');
}

function draw() {
  if (capture) {
    image(capture, 0, 0, 320, 240);
    button.hide();
    filter(INVERT);
  } else {
    button.position(150, 220);
    button.mousePressed(startCapture); 
  }
}

function startCapture() {
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
}