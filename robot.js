$(function () {
  $('#upload').bind('click', function () {
    if (typeof (FileReader) != 'undefined') {
      var reader = new FileReader();
      reader.onload = function (e) {
        var content = reader.result;
        var myObj = JSON.parse(content);
        init(myObj);
      }
      reader.readAsText($('#fileUpload') [0].files[0]);
    } else {
      alert('This browser does not support HTML5.');
    }
  });
});
// validate json 
// validation terms : initial wall , robot should not overlap 
// cell should display some number on it
// camera should follow  specific robot
// change robot on key
// robot will follow as languaage
// exception : coin not present still picking coin
// robot collision exception
// camera position should be set according to object and there should be one key bind for changing cam on robot
function readCubeDetails(cube) {
  cube_id = JSON.stringify(cube.id);
  dimention_ab = JSON.stringify(cube.dimention.ab);
  dimention_ad = JSON.stringify(cube.dimention.ad);
  dimention_ae = JSON.stringify(cube.dimention.ae);
  placement_x = JSON.stringify(cube.placement.x);
  placement_y = JSON.stringify(cube.placement.y);
  placement_z = JSON.stringify(cube.placement.z);
  color = parseInt(JSON.stringify(cube.color));
  return {
    'cube_id': cube_id,
    'dimention_ab': dimention_ab,
    'dimention_ad': dimention_ad,
    'dimention_ae': dimention_ae,
    'placement_x': placement_x,
    'placement_y': placement_y,
    'placement_z': placement_z,
    'color': color
  };
}
function readCameraDetails(camera) {
  var camera_type = JSON.stringify(camera.type).slice(1, - 1);
  if (camera_type == 'perspective') {
    field_of_view = JSON.stringify(camera.attribute.fov);
    if (field_of_view.charAt(0) == '"') {
      field_of_view = field_of_view.slice(1, - 1);
    }
    if (field_of_view == 'default') {
      field_of_view = 45;
    } else {
      field_of_view = parseInt(field_of_view);
    }
    aspect_ratio = JSON.stringify(camera.attribute.aspect_ratio);
    if (aspect_ratio.charAt(0) == '"') {
      aspect_ratio = aspect_ratio.slice(1, - 1);
    }
    if (aspect_ratio == 'default') {
      aspect_ratio = window.innerWidth / window.innerHeight;
    } else {
      aspect_ratio = parseInt(aspect_ratio);
    }
    near = JSON.stringify(camera.attribute.near);
    if (near.charAt(0) == '"') {
      near = near.slice(1, - 1);
    }
    if (near == 'default') {
      near = 0.1;
    } else {
      near = parseFloat(near);
    }
    far = JSON.stringify(camera.attribute.far);
    if (far.charAt(0) == '"') {
      far = far.slice(1, - 1);
    }
    if (far == 'default') {
      far = 1000;
    } else {
      far = parseInt(far);
    }
    placement_x = parseInt(JSON.stringify(camera.placement.x));
    placement_y = parseInt(JSON.stringify(camera.placement.y));
    placement_z = parseInt(JSON.stringify(camera.placement.z));
    lookAt = JSON.stringify(camera.lookAt);
    if (lookAt.charAt(0) == '"') {
      lookAt = lookAt.slice(1, - 1);
    }
    if (lookAt == 'default') {
      lookAt_x = 0;
      lookAt_y = 0;
      lookAt_z = 0;
    } else {
      lookAt_x = parseInt(JSON.stringify(camera.lookAt.x));
      lookAt_y = parseInt(JSON.stringify(camera.lookAt.y));
      lookAt_z = parseInt(JSON.stringify(camera.lookAt.z));
    }
  }
  return {
    'type': camera_type,
    'field_of_view': field_of_view,
    'aspect_ratio': aspect_ratio,
    'near': near,
    'far': far,
    'placement_x': placement_x,
    'placement_y': placement_y,
    'placement_z': placement_z,
    'lookAt_x': lookAt_x,
    'lookAt_y': lookAt_y,
    'lookAt_z': lookAt_z
  };
}
function readGridDetails(grid) {
  numberOfRows = parseInt(JSON.stringify(grid.numberOfRows));
  numberOfCols = parseInt(JSON.stringify(grid.numberOfCols));
  cellSpacing = parseInt(JSON.stringify(grid.cellSpacing));
  cellWidth = parseInt(JSON.stringify(grid.cellProperties.width));
  cellHeight = parseInt(JSON.stringify(grid.cellProperties.height));
  cellColor = parseInt(grid.cellColor);
  return {
    'numberOfRows': numberOfRows,
    'numberOfCols': numberOfCols,
    'cellSpacing': cellSpacing,
    'cellWidth': cellWidth,
    'cellHeight': cellHeight,
    'cellColor': cellColor
  };
}
function readWallDetails(wall) {
  wallId = parseInt(JSON.stringify(wall.id));
  rowPosition = parseInt(JSON.stringify(wall.placement.row));
  colPosition = parseInt(JSON.stringify(wall.placement.col));
  return {
    'wallId': wallId,
    'rowPosition': rowPosition,
    'colPosition': colPosition
  };
}
function readRobotDetails(robot) {
  robotId = parseInt(JSON.stringify(robot.id));
  rowPosition = parseInt(JSON.stringify(robot.placement.row));
  colPosition = parseInt(JSON.stringify(robot.placement.col));
  color = parseInt(robot.color);
  return {
    'robotId': robotId,
    'rowPosition': rowPosition,
    'colPosition': colPosition,
    'color': color
  };
}
function readPlaneDetails(plane) {
  width = parseInt(JSON.stringify(plane.width));
  height = parseInt(JSON.stringify(plane.height));
  placement_x = parseInt(JSON.stringify(plane.placement.x));
  placement_y = parseInt(JSON.stringify(plane.placement.y));
  placement_z = parseInt(JSON.stringify(plane.placement.z));
  color = parseInt(plane.color);
  alert(color);
  rotation = JSON.stringify(plane.rotation);
  if (rotation.charAt(0) == '"') {
    rotation = rotation.slice(1, - 1);
  }
  if (rotation == 'default') {
    rotation_x = - 0.5 * Math.PI;
    rotation_y = 0;
    rotation_z = 0;
  } else {
    rotation_x = parseInt(JSON.stringify(plane.rotation.x));
    rotation_y = parseInt(JSON.stringify(plane.rotation.y));
    rotation_z = parseInt(JSON.stringify(plane.rotation.z));
  }
  return {
    'width': width,
    'height': height,
    'placement_x': placement_x,
    'placement_y': placement_y,
    'placement_z': placement_z,
    'color': color,
    'rotation_x': rotation_x,
    'rotation_y': rotation_y,
    'rotation_z': rotation_z
  };
}
function init(myObj) {
  var scene = new THREE.Scene();
  var clock = new THREE.Clock();
  var cameraDetails = readCameraDetails(myObj.objects.camera);
  if (cameraDetails.type == 'perspective') {
    var camera = new THREE.PerspectiveCamera(cameraDetails.field_of_view, cameraDetails.aspect_ratio, cameraDetails.near, cameraDetails.far);
  }
  camera.position.x = cameraDetails.placement_x;
  camera.position.y = cameraDetails.placement_y;
  camera.position.z = cameraDetails.placement_z;
  var flyControls = new THREE.FlyControls(camera);
  flyControls.movementSpeed = 25;
  flyControls.domElement = document.querySelector('#WebGL-output');
  flyControls.rollSpeed = Math.PI / 24;
  flyControls.autoForward = false;
  flyControls.dragToLook = false;
  flyControls.enabled = false;
  var gridDetails = readGridDetails(myObj.objects.grid);
  var cellX = gridDetails.cellWidth; // by user
  var cellY = 4; // do not change this
  var cellZ = gridDetails.cellHeight; // by user
  var numberOfRows = gridDetails.numberOfRows; //by user
  var numberOfCols = gridDetails.numberOfCols; // by user
  var spacing = gridDetails.cellSpacing; //default or by user
  var planeDetails = readPlaneDetails(myObj.objects.plane);
  var planeWidth = (cellX * numberOfCols) + spacing * (numberOfCols + 1);
  var planeHeight = (cellZ * numberOfRows) + spacing * (numberOfRows + 1);
  var planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: planeDetails.color
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = planeDetails.rotation_x;
  plane.position.x = planeDetails.placement_x;
  plane.position.y = planeDetails.placement_y;
  plane.position.z = planeDetails.placement_z;
  scene.add(plane);
  var cellGeometry = new THREE.BoxGeometry(cellX, cellY, cellZ);
  var cellMaterial = new THREE.MeshLambertMaterial({
    color: gridDetails.cellColor
  });
  for (var j = 0; j < numberOfCols; j++) {
    for (var i = 0; i < numberOfRows; i++) {
      var cell = new THREE.Mesh(cellGeometry, cellMaterial);
      cell.position.z = - ((planeGeometry.parameters.height) / 2) + cellZ / 2 + spacing + (spacing + cellZ) * i;
      cell.position.x = - ((planeGeometry.parameters.width) / 2) + cellX / 2 + spacing + (spacing + cellX) * j;
      cell.position.y = 2; //do not change this
      scene.add(cell);
    }
  }
  numberOfWalls = (myObj.objects.walls).length;
  for (var i = 0; i < numberOfWalls; i++) {
    var wallJson = myObj.objects.walls[i];
    var wallDetails = readWallDetails(wallJson);
    var wallGeometry = new THREE.BoxGeometry(cellX, 80, cellZ);
    var wallMaterial = new THREE.MeshLambertMaterial({
      color: 16772642
    });
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.z = - ((planeGeometry.parameters.height) / 2) + cellZ / 2 + spacing + (spacing + cellZ) * (wallDetails.rowPosition - 1);
    wall.position.x = - ((planeGeometry.parameters.width) / 2) + cellX / 2 + spacing + (spacing + cellX) * (wallDetails.colPosition - 1);
    wall.position.y = 43; //do not change this
    scene.add(wall);
  }
  numberOfRobots = (myObj.objects.robots).length;
  var robotPosition = {};
  for (var i = 0; i < numberOfRobots; i++) {
    var robotJson = myObj.objects.robots[i];
    var robotDetails = readRobotDetails(robotJson);
    var robotGeometry = new THREE.BoxGeometry(cellX, 25, cellZ);
    var robotMaterial = new THREE.MeshLambertMaterial({
      color: robotDetails.color
    });
    
    var robot = new THREE.Mesh(robotGeometry, robotMaterial);
    robot.position.z = - ((planeGeometry.parameters.height) / 2) + cellZ / 2 + spacing + (spacing + cellZ) * (robotDetails.rowPosition - 1);
    robot.position.x = - ((planeGeometry.parameters.width) / 2) + cellX / 2 + spacing + (spacing + cellX) * (robotDetails.colPosition - 1);
    robot.position.y = 17; //do not change this
    robot.name = 'robot' + (i + 1).toString();
    var randomnumber = Math.floor(Math.random() * (3- 0 + 1)) + 0;
    robotPosition[robot.name] = {'row':robotDetails.rowPosition , 'col' :robotDetails.colPosition , direction : randomnumber };
     var rotateAngle = Math.PI / 2;
  
    for (var k = 0 ; k< randomnumber ; k++){
      robot.rotateOnAxis(new THREE.Vector3(0, 1, 0), -rotateAngle);
    } 
    scene.add(robot);
  }
  console.log(robotPosition['robot1'].row);
  var ambientLight = new THREE.AmbientLight(2697513);
  scene.add(ambientLight);
  var directionalLight = new THREE.DirectionalLight(16777215, 0.7);
  directionalLight.position.set( - 20, 40, 60);
  scene.add(directionalLight);
  var keyboard = new THREEx.KeyboardState();
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(15658734, 1));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;
  document.getElementById('WebGL-output').appendChild(renderer.domElement);
  render();
  
 // alert(robotPosition['robot1']);
  function render() {
    var delta = clock.getDelta();
    var rotateAngle = Math.PI / 2;
    //var moveDistance = 200; // 200 pixels per second
   // flyControls.update(delta);
    r1 = scene.getObjectByName('robot1');
     
    if (keyboard.pressed('W')) {
        // anticlockwise  //turn left by 90 Degree
      // alert(robotPosition['robot1'].direction);
        r1.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotateAngle);// To rotate robot r1 by angle
        var robotDir = robotPosition['robot1'].direction; 
      robotPosition['robot1'].direction = ((robotDir - 1)== -1) ? 3 : (robotDir-1);

    }
     
    if (keyboard.pressed('E')) {
      // clockwise  //turn left by 90 Degree
     // alert(robotPosition['robot1'].direction);
        r1.rotateOnAxis(new THREE.Vector3(0, 1, 0), -rotateAngle);// To rotate robot r1 by angle
        var robotDir = robotPosition['robot1'].direction; 
        robotPosition['robot1'].direction = ((robotDir + 1)== 4) ? 0 : (robotDir+1);

    }
    if (keyboard.pressed('S')){
     
       robotRowPosition = robotPosition['robot1'].row;
       robotColPosition = robotPosition['robot1'].col;
       robotDir = robotPosition['robot1'].direction;
      alert(robotDir);
      if(robotDir == 0){
       r1.position.z = - ((planeGeometry.parameters.width) / 2) + cellZ/ 2 + spacing + (spacing + cellZ) * ( (robotRowPosition -1) - 1);
       robotPosition['robot1'] = {'row': (robotRowPosition-1)  , 'col' : robotColPosition , direction : robotDir };
      
     }else if(robotDir == 1){
       r1.position.x = - ((planeGeometry.parameters.height) / 2) + cellX / 2 + spacing + (spacing + cellX) * ((robotRowPosition+1) - 1);
       robotPosition['robot1'] = {'row': (robotRowPosition+1)  , 'col' :(robotColPosition) , direction : robotDir };
     
     }else if(robotDir == 2){
       //r1.position.x = - ((planeGeometry.parameters.width) / 2) + cellX / 2 + spacing + (spacing + cellX) * ( (robotRowPosition+1) - 1);
       r1.position.z = - ((planeGeometry.parameters.width) / 2) + cellZ/ 2 + spacing + (spacing + cellZ) * ( (robotRowPosition +1) - 1);
       robotPosition['robot1'] = {'row': (robotRowPosition+1)  , 'col' : robotColPosition , direction : robotDir };
       //r1.position.z = - ((planeGeometry.parameters.width) / 2) + cellZ / 2 + spacing + (spacing + cellZ) * ( (robotRowPosition+1) - 1); //right
       //robotPosition['robot1'] = {'row': (robotRowPosition+1)  , 'col' :robotColPosition , direction : robotDir };
     
     }else if(robotDir == 3){
       r1.position.x = - ((planeGeometry.parameters.height) / 2) + cellX / 2 + spacing + (spacing + cellX) * ((robotRowPosition-1) - 1);
       robotPosition['robot1'] = {'row': (robotRowPosition-1)  , 'col' :(robotColPosition) , direction : robotDir };
     }
    }
   
    if (keyboard.pressed('Z')) {
       alert("cam changes");
       //set initial camera
   /*   var relativeCameraOffset = new THREE.Vector3(0, 20, 120);
    var cameraOffset = relativeCameraOffset.applyMatrix4(r1.matrixWorld);
    camera.position.x = cameraOffset.x;
    camera.position.y = cameraOffset.y;
    camera.position.z = cameraOffset.z;*/
    
        var robotDir = robotPosition['robot1'].direction; 
        if(robotDir == 0){
          alert("yes called0");
          r1.rotation.y =  Math.PI / 2;
          camera.rotation.x = 0;
          
        }else if(robotDir == 1){
          alert("yes called1");
          camera.rotation.x = 90 * Math.PI / 180 ;
         /* */
        }else if(robotDir == 2){
          r1.rotation.y =  Math.PI / 2;
          alert("yes called2");
          camera.rotation.y = 90*2 * Math.PI / 180 ;
        }else if(robotDir == 3){
          alert("yes called3");
          camera.rotation.x = 90*3 * Math.PI / 180 ;
        }
      
     }
    
    var relativeCameraOffset = new THREE.Vector3(0, 20, 120);//0,20,120
    var cameraOffset = relativeCameraOffset.applyMatrix4(r1.matrixWorld);
    camera.position.x = cameraOffset.x;
    camera.position.y = cameraOffset.y;
    camera.position.z = cameraOffset.z;
    camera.lookAt(r1.position);
    
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
 
}
