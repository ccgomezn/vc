let imaging;

function setup() {
  createCanvas(300, 300);
  
}

function draw() {
  stroke(0);

  ellipse(150, 150, 150, 150);

  for(let i = -100; i < 30; i++) {
    stroke(126);
    line(10*i,0,10*(i+20),150)
    line(10*i,300,10*(i+20),150)
  }
}
