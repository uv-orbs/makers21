var ctx = null;
var player = null;
const speed = 0.01;
const turn = 0.5;
const alttd = 0.1;
let stop = true;

window.GAZE_ORIENTATION = {x: 0, y: 0};

function move(){
  // create a direction vector
  var direction = new THREE.Vector3();
  // get the cameras world direction
  ctx.el.sceneEl.camera.getWorldDirection(direction);  
  // multiply the direction by a "speed" factor
  direction.multiplyScalar(speed);
  // get the current position
  var pos = player.getAttribute("position")
  // add the direction vector
  pos.add(direction)
  // set the new position
  player.setAttribute("position", pos);
  
  // !!! NOTE - it would be more efficient to do the
  // position change on the players THREE.Object:
  // `player.object3D.position.add(direction)`
  // but it would break "getAttribute("position")
}

// define a custom component
AFRAME.registerComponent("foo", {
  init: function() {
    // grab the camera
    player = document.querySelector("#cam")
    ctx = this;
    //var tid;
    window.addEventListener("keydown", (e) => {
      switch (e.code){
        case "Space":
          stop = !stop;
          if(!stop){
            window.GAZE_ORIENTATION.zeroX = window.GAZE_ORIENTATION.x;
            window.GAZE_ORIENTATION.zeroY = window.GAZE_ORIENTATION.y;
          }
          break;
        case "ArrowRight":
          player.object3D.rotation.y -= turn ;//= THREE.Math.degToRad(45);          
          break
        case "ArrowLeft":
          player.object3D.rotation.y += turn; //= THREE.Math.degToRad(45);          
          break;
        case "ArrowUp":
          player.object3D.position.y += alttd//Math.PI * turn;
          //player.object3D.rotation.x -= turn; //= THREE.Math.degToRad(45);
          //if (player.object3D.rotation.x > Math.PI * 0.25)
          //clearTimeout(tid);
          
          // tid = setTimeout(() => {
          //   player.object3D.rotation.x = 0; // restor horiz flight
          // }, 200);
          break;
        case "ArrowDown":
          player.object3D.position.y -= alttd//Math.PI * turn;
          //clearTimeout(tid);
          //player.object3D.rotation.x += turn; //= THREE.Math.degToRad(45);
          //if (player.object3D.rotation.x < Math.PI * -0.25)
          //player.object3D.rotation.x += Math.PI * -turn;
          // tid = setTimeout(() => {
          //   player.object3D.rotation.x = 0; // restor horiz flight
          // }, 200);
          break;
      
        //player.object3D.rotation.divideScalar(2);
      }
    });

    // setInterval(()=>{
    //   move(player);
    // },10);
    
  },
  tick: function () {
    if(stop)
      return;

    const sideX = window.GAZE_ORIENTATION.x - window.GAZE_ORIENTATION.zeroX;
    const sideY = window.GAZE_ORIENTATION.zeroY - window.GAZE_ORIENTATION.y;

    // sideways
    player.object3D.rotation.y += sideX * turn;

    // downup - altitude
    player.object3D.position.y += sideY ;//* alttd; // alt

    // down up    
    //player.object3D.rotation.x += sideY; 

    move();
    // change rotation with this.el.object3D.rotation
    // change position with this.el.object3D.position
    
    // left right
    // this.rotation.y += window.GAZE_ORIENTATION.x * 0.25;   
    
    // // up down
    // this.rotation.x -= window.GAZE_ORIENTATION.y * 0.25;
    // if (this.rotation.x > Math.PI * 0.25) this.rotation.x  = Math.PI * 0.25;
    // if (this.rotation.x < Math.PI * -0.05) this.rotation.x = Math.PI * -0.05;
    
    // this.el.object3D.rotation.x += this.rotation.x;
    // this.el.object3D.rotation.y += this.rotation.y;
  }
});