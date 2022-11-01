
song = "";
objects = [];
Status = "";
Pause = false;

function preload() {
  song = loadSound("1.mp3");
}

function setup() {
  canvas = createCanvas(500, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(500, 380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  Status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 500, 380);
  if (Status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status : Object Detected";

      fill(r, g, b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

      if (objects[i].label == "person") {
        document.getElementById("number_of_objects").innerHTML = "Baby Found";
        console.log("stop");
        song.stop();
        Pause = true;
      }
      else {
        document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
        if (Pause == true) {
          console.log("play");
          song.play();
          Pause = false;
        }
      }
    }

    if (objects.length == 0) {
      document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
      if (Pause == true) {
        console.log("play");
        song.play();
        Pause = false;
      }
    }
  }
}