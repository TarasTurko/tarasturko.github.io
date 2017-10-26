function startup() {
  var el = document.getElementById("myCanvas");
  el.width = myCanvas.clientWidth;
  el.height = myCanvas.clientWidth;

  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchcancel", handleCancel, false);
  el.addEventListener("touchmove", handleMove, false);
  cPush();
}


var MyColor="#000000";
var size=2;
var slider = document.getElementById("myRange");

var ongoingTouches = new Array();

function handleStart(evt) {
  evt.preventDefault();

  var el = document.getElementById("myCanvas");
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;
        
  for (var i = 0; i < touches.length; i++) {
    //log("touchstart:" + i + "...");
    ongoingTouches.push(copyTouch(touches[i]));
    //var color = colorForTouch(touches[i]);
    ctx.beginPath();
    ctx.arc(touches[i].pageX-myCanvas.offsetLeft, touches[i].pageY-myCanvas.offsetTop, 1, 0, 2 * Math.PI, false);  // a circle at the start
    ctx.fillStyle = MyColor;
    ctx.fill();
    
  }
}

function handleMove(evt) {
  evt.preventDefault();
  var el = document.getElementById("myCanvas");
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    //var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      
      ctx.beginPath();
      
      ctx.moveTo(ongoingTouches[idx].pageX-myCanvas.offsetLeft, ongoingTouches[idx].pageY-myCanvas.offsetTop);
      
      ctx.lineTo(touches[i].pageX-myCanvas.offsetLeft, touches[i].pageY-myCanvas.offsetTop);
      ctx.lineWidth = size;
      ctx.strokeStyle = MyColor;
      ctx.stroke();

      ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
      
    } 
  }
}

function handleEnd(evt) {
  evt.preventDefault();
  
  var el = document.getElementById("myCanvas");
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var color = MyColor;
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      //ctx.lineWidth = 4;
      //ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX-myCanvas.offsetLeft, ongoingTouches[idx].pageY-myCanvas.offsetTop);
      ctx.lineTo(touches[i].pageX-myCanvas.offsetLeft, touches[i].pageY-myCanvas.offsetTop);
      //ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
      ongoingTouches.splice(idx, 1);  // remove it; we're done
    } else {
      
    }
  }
  cPush();
}

function handleCancel(evt) {
  evt.preventDefault();
  
  var touches = evt.changedTouches;
  
  for (var i = 0; i < touches.length; i++) {
    ongoingTouches.splice(i, 1);  // remove it; we're done
  }
}


function copyTouch(touch) {
  return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
}

function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;
    
    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    size = this.value;
}

function setCollor(col){
  if(col=='black')
  {
    MyColor="#000000";
  }
  if(col=='grey')
  {
    MyColor="#696969";
  }
  if(col=='orange')
  {
    MyColor="#FF8C00";
  }
  if (col=='red') {
    MyColor="#DC143C";
  }
  if (col=='blue') {
    MyColor="#0000FF";
  }
  if (col=='yellow') {
    MyColor="#FFFF00";
  }
  if (col=='green') {
    MyColor="#228B22";
  }
  if (col=='brown') {
    MyColor="#8B4513";
  }
  if (col=='purple') {
    MyColor="#9370DB";
  }
  if(col=='white')
  {
    MyColor="#FFFFFF";
  }
}
///////////////////////////////////////////
var cPushArray = new Array();
var cStep = -1;
var car;
 car = document.getElementById('myCanvas').getContext("2d");
//*---------------------------------------------  
function cPush() {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(document.getElementById('myCanvas').toDataURL("image/png",1));
}
function cUndo() {
    if (cStep >= 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        car.clearRect(0,0,myCanvas.width,myCanvas.height);
        canvasPic.onload = function () { car.drawImage(canvasPic, 0, 0); }
         //ctx.drawImage(canvasPic, 0, 0);
    }
}
function cRedo() {
    if (cStep < cPushArray.length-1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { car.drawImage(canvasPic, 0, 0); }
    }
}

