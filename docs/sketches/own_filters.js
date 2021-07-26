let video;
let button;
let size;
let button2;
let w;
let start;
let inputs = [];
let info;
function setup() {
  createCanvas(640, 240);
  background(0,0,0);
  input = createInput();
  input.style("padding", "8px");
  input.style("display", "block");
  input.style("border", "none");
  input.style("border-bottom", "1px solid #ccc");
  input.style("font-family","'Roboto',sans-serif");
  input.style("font-weight","300");
  button2 = createButton('submit');
  button2.position(200, 53);
  button2.mousePressed(convMatrix);
  button2.style("display","inline-block");
  button2.style("padding","0.35em 1.2em");
  button2.style("border","0.1em solid #FFFFFF");
  button2.style("margin","0 0.3em 0.3em 0");
  button2.style("border-radius","0.12em");
  button2.style("box-sizing","border-box");
  button2.style("text-decoration","none");
  button2.style("font-family","'Roboto',sans-serif");
  button2.style("font-weight","300");
  button2.style("color","#FFFFFF");
  button2.style("text-align","center");
  button2.style("background","transparent");
  input.position(20, 50);
  head = createElement('h3', 'Length and Width of the matrix');
  head.position(20, 0);
  head.style("font-family","'Roboto',sans-serif");
  head.style("font-weight","300");
  head.style("color","#FFFFFF");

  textAlign(CENTER);
  textSize(50);
  stroke(255);
  line(320, 0, 320, 240)
}

function draw() {
  if (video) {
    image(video, 320, 0, 320, 240);
    let copy = createImage(video.width, video.height);
    video.loadPixels();
    let d = pixelDensity();
    for (let i = 0; i < video.pixels.length; i++) {
      copy.pixels[i] = video.pixels[i];
    }

    for (let y = 0; y < video.height*d; y++) {
      for (let x = 0; x < video.width*d; x++) {
        let result = convolution(copy, x, y, w, size, video.width*d, video.height*d, d);
        let index = (x + y * video.width*d) * 4;
        video.pixels[index + 0] = result[0];
        video.pixels[index + 1] = result[1];
        video.pixels[index + 2] = result[2];
        video.pixels[index + 3] = 255;
      }
    }
    video.updatePixels();
  } 
}

function convolution(image, x, y, kernel, size, width, height, d) {
  let rConv = 0;
  let gConv = 0;
  let bConv = 0;
  let offset = floor(size / 2);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {

      let xpos = x + j - offset;
      let ypos = y + i - offset;

      let index = (xpos + image.width * ypos * d) * 4;

      if (!(width <= xpos || height <= ypos || xpos < 0 || ypos < 0)) {
        rConv += image.pixels[index + 0] * kernel[i][j];
        gConv += image.pixels[index + 1] * kernel[i][j];
        bConv += image.pixels[index + 2] * kernel[i][j];
      } 
      
    }
  }
  return [rConv, gConv, bConv];
}

function startCapture() {
  w = [];
  for (let i = 0; i < size; i++) {
    let row =[];
    for (let j = 0; j < size; j++) {
      let index = j + i*size;
      row.push(inputs[index].value());
    }
    w.push(row);
  }
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
}

function convMatrix() {
  size = input.value();
  inputs.forEach(input => {
    input.remove();
  })
  inputs = [];
  for(let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let aux = createInput();
      aux.style("display", "block");
      aux.style("border", "none");
      aux.style("border-bottom", "1px solid #ccc");
      aux.style("font-family","'Roboto',sans-serif");
      aux.style("font-weight","300");
      aux.position(20 + i*30, 100 + j*20);
      aux.size(20);
      inputs.push(aux)
    }
  }
  let button3 = createButton('start video');
  button3.style("display","inline-block");
  button3.style("padding","0.35em 1.2em");
  button3.style("border","0.1em solid #FFFFFF");
  button3.style("margin","0 0.3em 0.3em 0");
  button3.style("border-radius","0.12em");
  button3.style("box-sizing","border-box");
  button3.style("text-decoration","none");
  button3.style("font-family","'Roboto',sans-serif");
  button3.style("font-weight","300");
  button3.style("color","#FFFFFF");
  button3.style("text-align","center");
  button3.style("background","transparent");
  button3.position(100, 200);
  button3.mousePressed(startCapture);
}