let capture;
let button;
let size;
let button2;
function setup() {
  createCanvas(320, 700);
  button = createButton('Start!');

  input = createInput();
  input.position(20, 300);

  button2 = createButton('submit');
  button2.position(150, 300);
  button2.mousePressed(convMatrix);

  greeting = createElement('h3', 'Length and Width of the matrix');
  greeting.position(20, 245);

  textAlign(CENTER);
  textSize(50);
}

function draw() {
  if (capture) {
    image(capture, 0, 0, 320, 240);
    button.hide();
    filter(GRAY);
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

function convMatrix() {

}