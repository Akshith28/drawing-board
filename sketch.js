var database;

var drawing = [];
var currentPath = [];
var isDrawing = false;

var bgColor = 0;
var bg=0;

function setup() {
  canvas = createCanvas(windowWidth-400,windowHeight-350,0,10);

  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

  var text = select('#text');
  text.position(windowWidth/2-200,-7);

  var text1 = select('#text1');
  text1.position(windowWidth-160,5);

  var text2 = select('#text2');
  text2.position(windowWidth-170,120);
 
  var text3 = select('#text3');
  text3.position(windowWidth-170,350);

  var text4 = select('#text4');
  text4.position(windowWidth-10,175);

  var text5 = select('#text5');
  text5.position(windowWidth-10,windowHeight-300);

  var text6 = select('#text6');
  text6.position(windowWidth+30,windowHeight-300);

  var timeButton = select('#time');
  timeButton.position(displayWidth-150,displayHeight-130);

  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);

  var yellowButton = select('#yellowButton');
  yellowButton.position(displayWidth-150,375);
  yellowButton.mousePressed(yellowColor);

  var redButton = select('#redButton');
  redButton.position(displayWidth-150,400);
  redButton.mousePressed(redColor);

  var greenButton = select('#greenButton');
  greenButton.position(displayWidth-150,425);
  greenButton.mousePressed(greenColor);

  var blueButton = select('#blueButton');
  blueButton.position(displayWidth-150,450);
  blueButton.mousePressed(blueColor);
 
  var purpleButton = select('#purpleButton');
  purpleButton.position(displayWidth-150,475);
  purpleButton.mousePressed(purpleColor);

  var violetButton = select('#violetButton');
  violetButton.position(displayWidth-150,500);
  violetButton.mousePressed(violetColor);

  var WhiteButton = select('#whiteButton');
  WhiteButton.position(displayWidth-150,525);
  WhiteButton.mousePressed(whiteColor);

  var BlackButton = select('#blackButton');
  BlackButton.position(displayWidth-150,550);
  BlackButton.mousePressed(blackColor);

  
  var OrangeButton = select('#orangeButton');
  OrangeButton.position(displayWidth-150,575);
  OrangeButton.mousePressed(orangeColor);

  //set canvas color
  var canvasWhiteButton = select('#canvasWhiteButton');
  canvasWhiteButton.position(displayWidth-150,150);
  canvasWhiteButton.mousePressed(whiteButton);

  var canvasBlackButton = select('#canvasBlackButton');
  canvasBlackButton.position(displayWidth-150,175);
  canvasBlackButton.mousePressed(blackButton);

  var canvasOrangeButton = select('#canvasOrangeButton');
  canvasOrangeButton.position(displayWidth-150,200);
  canvasOrangeButton.mousePressed(orangeButton);

  var canvasYellowButton = select('#canvasYellowButton');
  canvasYellowButton.position(displayWidth-150,225);
  canvasYellowButton.mousePressed(YellowButton);

  var canvasRedButton = select('#canvasRedButton');
  canvasRedButton.position(displayWidth-150,250);
  canvasRedButton.mousePressed(RedButton);

  var canvasGreenButton = select('#canvasGreenButton');
  canvasGreenButton.position(displayWidth-150,275);
  canvasGreenButton.mousePressed(GreenButton);

  //set fill
  var fillYellowButton = select('#fillYellowButton');
  fillYellowButton.position(displayWidth-10,200);
  fillYellowButton.mousePressed(fillYellowColor);

  var fillRedButton = select('#fillRedButton');
  fillRedButton.position(displayWidth-10,225);
  fillRedButton.mousePressed(fillRedColor);

  var fillWhiteButton = select('#fillWhiteButton');
  fillWhiteButton.position(displayWidth-10,250);
  fillWhiteButton.mousePressed(fillWhiteColor);

  var fillBlueButton = select('#fillBlueButton');
  fillBlueButton.position(displayWidth-10,275);
  fillBlueButton.mousePressed(fillBlueColor);

  var fillGreenButton = select('#fillGreenButton');
  fillGreenButton.position(displayWidth-10,300);
  fillGreenButton.mousePressed(fillGreenColor);

  var fillVioletButton = select('#fillVioletButton');
  fillVioletButton.position(displayWidth-10,325);
  fillVioletButton.mousePressed(fillVioletColor);

  var fillPurpleButton = select('#fillPurpleButton');
  fillPurpleButton.position(displayWidth-10,350);
  fillPurpleButton.mousePressed(fillPurpleColor);

  var fillOrangeButton = select('#fillOrangeButton');
  fillOrangeButton.position(displayWidth-10,375);
  fillOrangeButton.mousePressed(fillOrangeColor);


  database = firebase.database();


  var ref = database.ref('drawings');
  ref.on('value', gotData, errData);
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}

function draw() {
  background(bgColor);

  if (isDrawing) {
    var point = {
      x: mouseX,
      y: mouseY
    };
    currentPath.push(point);
    
  }

  strokeWeight(4);
  fill(bg);
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y);
    }
    endShape();
  }
}

function saveDrawing() {
  var ref = database.ref('drawings');
  var data = {
    drawing: drawing
  };
  var result = ref.push(data, dataSent);
  console.log(result.key);
  
  bgColor="lime";
  bg="lime";
  stroke("lime")
  var feedback = createElement('h2');
  feedback.html('Congratulations!! Drawing Published Successfully');
  feedback.position(300,200);
  var button = createButton('Ok');
  button.position(400,400);
  button.mousePressed(Ok);

  function hide() {
    button.hide();
    feedback.hide();
    bgColor=0;
    bg=0;
    stroke("white");
  }

  function Ok() {
    hide();

  }

  function dataSent(err, status) {
    console.log(status);
    
  }

  
}


function yellowColor() {
  stroke("yellow"); 
}

function redColor() {
  stroke("red");
}

function greenColor() {
  stroke("green");
}

function blueColor() {
  stroke("blue");
}

function purpleColor() {
  stroke("purple");
}

function violetColor() {
  stroke("violet");
}

function whiteColor() {
  stroke("white");
}

function blackColor() {
  stroke("black");
}

function orangeColor() {
  stroke("orangered");
}

function whiteButton() {
  bgColor =  255;
}

function blackButton() {
  bgColor = 0;
}

function orangeButton() {
  bgColor = "orangered";
}

function YellowButton() {
  bgColor = "yellow";
}

function RedButton() {
  bgColor = "red";
}

function GreenButton() {
  bgColor = "green";
}

function fillYellowColor() {
  bg = "yellow";
}

function fillRedColor() {
  bg = "red";
}

function fillWhiteColor() {
  bg = "white";
}

function fillBlueColor() {
  bg = "blue";
}

function fillGreenColor() {
  bg = "green";
}

function fillVioletColor() {
  bg = "violet";
}

function fillPurpleColor() {
  bg = "purple";
}

function fillOrangeColor() {
  bg = "orangered";
}

function gotData(data) {
  // clear the listing
  var elts = selectAll('.listing');
  for (var i = 0; i < elts.length; i++) {
    elts[i].remove();
  }
  //bgColor=255;
  //stroke(255);
  
  
  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    //console.log(key);
    var li = createElement('li', '');
    li.class('listing');
    var ahref = createA('#', key);
    ahref.mousePressed(showDrawing);
    ahref.parent(li);

    li.parent('drawinglist');
    drawing=[];
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing(key) {

    key = this.html();

  var ref = database.ref('drawings/' + key);
  ref.once('value', oneDrawing, errData);

  function oneDrawing(data) {
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing;
    //console.log(drawing);
  }
}

function clearDrawing() {
  drawing = [];
  bg=0;
}
