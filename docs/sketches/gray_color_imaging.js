function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
  video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
  video.hide();
}

function setup() {
  createCanvas(512, 256);
  video.loop();  
}

function draw() {
  image(img, 0, 0, 256, 256);
  image(video, 256,0,256,256);
  filter(GRAY);
}
