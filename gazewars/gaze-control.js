window.GAZE_ORIENTATION = {x: 0, y: 0};

AFRAME.registerComponent('gaze-control', {
  init: function () {
    this.rotation = new THREE.Vector3(0, 0, 0);
  },
  tick: function () {
    // change rotation with this.el.object3D.rotation
    // change position with this.el.object3D.position
    
    // left right
    this.rotation.y += window.GAZE_ORIENTATION.x * 0.25;
    
    // up down
    this.rotation.x -= window.GAZE_ORIENTATION.y * 0.25;
    if (this.rotation.x > Math.PI * 0.25) this.rotation.x = Math.PI * 0.25;
    if (this.rotation.x < Math.PI * -0.05) this.rotation.x = Math.PI * -0.05;
    
    this.el.object3D.rotation.x += this.rotation.x;
    this.el.object3D.rotation.y += this.rotation.y;
  }
});