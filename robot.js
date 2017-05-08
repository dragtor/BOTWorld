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
function readCoinDetails(coin) {
  coinId = JSON.stringify(coin.id);
  rowPosition = parseInt(JSON.stringify(coin.placement.row));
  colPosition = parseInt(JSON.stringify(coin.placement.col));
  return {
    'coinId': coinId,
    'rowPosition': rowPosition,
    'colPosition': colPosition
  };
}
function readRobotDetails(robot) {
  robotId = parseInt(JSON.stringify(robot.id));
  rowPosition = parseInt(JSON.stringify(robot.placement.row));
  colPosition = parseInt(JSON.stringify(robot.placement.col));
  color = parseInt(robot.color);
  memoryCapacity =  parseInt(robot.memoryCapacity);
  return {
    'robotId': robotId,
    'rowPosition': rowPosition,
    'colPosition': colPosition,
    'color': color,
    'memoryCapacity' : memoryCapacity
  };
}
function readPlaneDetails(plane) {
  width = parseInt(JSON.stringify(plane.width));
  height = parseInt(JSON.stringify(plane.height));
  placement_x = parseInt(JSON.stringify(plane.placement.x));
  placement_y = parseInt(JSON.stringify(plane.placement.y));
  placement_z = parseInt(JSON.stringify(plane.placement.z));
  color = parseInt(plane.color);
  // alert(color);
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
function readProgramDetails(program) {
  return program;
}
function init(myObj) {
  var scene = new THREE.Scene();
  var clock = new THREE.Clock();
  var robotProgramDetails = readProgramDetails(myObj.objects.programs);
  var cameraDetails = readCameraDetails(myObj.objects.camera);
 // console.log(robotProgramDetails);
  if (cameraDetails.type == 'perspective') {
    var camera = new THREE.PerspectiveCamera(cameraDetails.field_of_view, cameraDetails.aspect_ratio, cameraDetails.near, cameraDetails.far);
  }
  camera.position.x = cameraDetails.placement_x;
  camera.position.y = cameraDetails.placement_y;
  camera.position.z = cameraDetails.placement_z;
  camera.lookAt(scene.position);
  var flyControls = new THREE.FlyControls(camera);
  flyControls.movementSpeed = 25;
  flyControls.domElement = document.querySelector('#WebGL-output');
  flyControls.rollSpeed = Math.PI / 24;
  flyControls.autoForward = false;
  flyControls.dragToLook = true;
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
  var wallPosition = {
  };
  function include(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == obj) return true;
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
    var rowPos = (wallDetails.rowPosition).toString();
    //console.log(rowPos);
    if (!wallPosition[rowPos]) {
      wallPosition[rowPos] = [
      ];
    }
    wallPosition[rowPos].push(wallDetails.colPosition);
    scene.add(wall);
  }
  // var coinPosition = {
  // };

  var coinInfo = {
  }; //{"c1" :{ "holder" : "grid" , "row":1,"col" :2 ,"geometryId":"coin1"},"c2": {"holder" :"robot","robotId":"r1" ,"geometryId":"coin2"}};
  var gridCoinNameMapper = {
  }; // {"1" :{"2" : "coin1" , "3":"coin2"}};
  var coinNameCoinIdMapper = {
  }; //{"coin1" : "c1"}; // coinNameCoinIdMapper :: (( coin Geometry Name ),coinId )
  console.log(coinInfo);
  numberOfCoins = (myObj.objects.coins).length;
  for (var i = 0; i < numberOfCoins; i++) {
    var coinJson = myObj.objects.coins[i];
    var coinDetails = readCoinDetails(coinJson);
    //console.log(coinDetails);
    var coinGeometry = new THREE.CylinderGeometry(5, 5, 5, 32);
    var coinMaterial = new THREE.MeshBasicMaterial({
      color: 16776960
    });
    var coin = new THREE.Mesh(coinGeometry, coinMaterial);
    coin.name = 'coin' + (i + 1).toString();
    coin.position.z = - ((planeGeometry.parameters.height) / 2) + cellZ / 2 + spacing + (spacing + cellZ) * (coinDetails.rowPosition - 1);
    coin.position.x = - ((planeGeometry.parameters.width) / 2) + cellX / 2 + spacing + (spacing + cellX) * (coinDetails.colPosition - 1);
    coin.position.y = 5; //do not change this
    var rowPos = (coinDetails.rowPosition).toString();
    //console.log(rowPos);
    if (!gridCoinNameMapper[rowPos]) {
      gridCoinNameMapper[rowPos] = {
      };
    }
    var colPos = (coinDetails.colPosition).toString();
    gridCoinNameMapper[rowPos][colPos] = coin.name;
    coinNameCoinIdMapper[coin.name] = coinDetails.coinId;
    coinInfo[coinDetails.coinId] = {
      'holder': 'grid',
      'row': coinDetails.rowPosition,
      'col': coinDetails.colPosition,
      'geometryId': coin.name
    };
    scene.add(coin);
  }
  //console.log(gridCoinNameMapper);
 // console.log(coinNameCoinIdMapper);
  //console.log(coinInfo);
  var frameRate = 1;
  numberOfRobots = (myObj.objects.robots).length;
  var robotPosition = {
  };
  function initializeMemory(memoryCapacity){
    var memory = [];
    for (var i = 0; i < memoryCapacity ; i++){
      memory[i] = undefined;
    }
    return memory
  }
  for (var i = 0; i < numberOfRobots; i++) { //for (var i = 0; i < 1; i++) {  //
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
    var memoryArray = initializeMemory(robotDetails.memoryCapacity);
    var max = 3;
    var min = 0;
    var randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
    robotPosition[robot.name] = {
      'row': robotDetails.rowPosition,
      'col': robotDetails.colPosition,
      direction: randomnumber,
      coins: [
      ],
      'memory': {"capacity" : robotDetails.memoryCapacity , data : memoryArray}
    };
    
    var rotateAngle = Math.PI / 2;
    for (var k = 0; k < randomnumber; k++) {
      robot.rotateOnAxis(new THREE.Vector3(0, 1, 0), - rotateAngle);
    }
    scene.add(robot);
  }
 // console.log("checkl$$$$$$$$$$$$$$$$$");
   // console.log(robotPosition);
  var robotProgramExecutionMetadata = {
  };
  for (var rname in robotProgramDetails) {
    var instrLen = (robotProgramDetails[rname]).length
    robotProgramExecutionMetadata[rname] = {
      'currInstrPtr': 0,
      'maxInstruCount': instrLen
    };
  }
 
 // console.log(robotProgramExecutionMetadata);
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
  function isWall(rowPos, colPos) {
    if (wallPosition[rowPos]) {
      return (include(wallPosition[rowPos], colPos) == true) ? 1 : - 1;
    }
    return - 1;
  }
  function isCoin(rowPos, colPos) {
    if (gridCoinNameMapper[rowPos]) {
      return (gridCoinNameMapper[rowPos][colPos] == undefined) ? - 1 : 1;
      // return (include(gridCoinNameMapper[rowPos], colPos)==true) ? 1:-1;
    }
    return - 1;
  }
  function removeCoin(rowPos, colPos) {
    delete gridCoinNameMapper[rowPos][colPos];
  }
  function isRobot(rowPos, colPos) {
    if (robotPosition[rowPos]) {
      return (include(robotPosition[rowPos], colPos) == true) ? 1 : - 1;
    }
    return - 1;
  }
  function isCoinWithRobot(robotName) {
    var currentCoinStatus = robotPosition[robotName].coins;
    if (currentCoinStatus.length == 0) {
      return - 1;
    }
    return 1;
  }
  var fflag = true;
  var controls = new function () {
    this.perspective = 'Perspective';
    //this.robot_name = 'robot1';
    this.switchCamera = function () {
      if (fflag == true) {
        // console.log(this.perspective + "changing to FollowRobot");
        fflag = false;
        this.perspective = 'FollowRobot'
      } else {
        // console.log(this.perspective + "changing to Perspective ");
        fflag = true;
        this.perspective = 'Perspective';
      }
    };
  };
  var gui = new dat.GUI();
  gui.add(controls, 'switchCamera');
  gui.add(controls, 'perspective').listen();
  function render() {
    var instructionName = robotProgramDetails[rname][IPtr];
    var delta = clock.getDelta();
    var rotateAngle = Math.PI / 2; //*delta;
    robotCam = scene.getObjectByName('robot1');
    if (fflag == true) {
      flyControls.update(delta);
    }
    if (fflag == false) {
      var relativeCameraOffset = new THREE.Vector3(0, 70, 120); //0,20,120
      var cameraOffset = relativeCameraOffset.applyMatrix4(robotCam.matrixWorld);
      camera.position.x = cameraOffset.x;
      camera.position.y = cameraOffset.y;
      camera.position.z = cameraOffset.z;
      camera.lookAt(robotCam.position);
    }
    if (frameRate % frameRate == 0) {
      frameRate = 1;
      r1 = scene.getObjectByName(robotName);
      if (instructionName == 'turn') {
        r1.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotateAngle); // To rotate robot r1 by angle
        rA = 0;
        var robotDir = robotPosition[robotName].direction;
        robotPosition[robotName].direction = ((robotDir - 1) == - 1) ? 3 : (robotDir - 1);
       // console.log('dir' + robotPosition[robotName].direction);
        robotProgramExecutionMetadata[robotName].currInstrPtr = IPtr + 1;
      }
       else if (instructionName == 'move') {
        robotRowPosition = robotPosition[robotName].row;
        robotColPosition = robotPosition[robotName].col;
        robotDir = robotPosition[robotName].direction;
        robotCoin = robotPosition[robotName].coins;
        if (checkIsValidMove(robotRowPosition, robotColPosition, robotDir) == - 1) {
          console.log('next move is Invalid');
          robotProgramExecutionMetadata[robotName].currInstrPtr = IPtr + 1;
        } else {
          console.log('next move is Valid');
          if (robotDir == 0) {
            r1.position.z = - ((planeGeometry.parameters.height) / 2) + cellZ / 2 + spacing + (spacing + cellZ) * ((robotRowPosition - 1) - 1);
            robotPosition[robotName] = {
              'row': (robotRowPosition - 1),
              'col': robotColPosition,
              direction: robotDir,
              coins: robotCoin
            };
          } else if (robotDir == 1) {
            r1.position.x = - ((planeGeometry.parameters.width) / 2) + cellX / 2 + spacing + (spacing + cellX) * (robotColPosition + 1 - 1);
            robotPosition[robotName] = {
              'row': robotRowPosition,
              'col': (robotColPosition + 1),
              direction: robotDir,
              coins: robotCoin
            };
          } else if (robotDir == 2) {
            r1.position.z = - ((planeGeometry.parameters.height) / 2) + cellZ / 2 + spacing + (spacing + cellZ) * ((robotRowPosition + 1) - 1);
            robotPosition[robotName] = {
              'row': (robotRowPosition + 1),
              'col': robotColPosition,
              direction: robotDir,
              coins: robotCoin
            };
          } else if (robotDir == 3) {
            r1.position.x = - ((planeGeometry.parameters.width) / 2) + cellX / 2 + spacing + (spacing + cellX) * ((robotColPosition - 1) - 1);
            robotPosition[robotName] = {
              'row': robotRowPosition,
              'col': (robotColPosition - 1),
              direction: robotDir,
              coins: robotCoin
            };
          }
          robotProgramExecutionMetadata[robotName].currInstrPtr = IPtr + 1;
        }
      } 
      else if (instructionName == 'pick') {
        // Pick coin
        var robotRowPosition = robotPosition[robotName].row;
        var robotColPosition = robotPosition[robotName].col;
        robotDir = robotPosition[robotName].direction;
        var currentCoinStatus = robotPosition[robotName].coins;
        if (isCoin(robotRowPosition, robotColPosition) == - 1) {
          console.log('Coin is not present');
          robotProgramExecutionMetadata[robotName].currInstrPtr = IPtr + 1;
        } else {
          var coinGeometryName = gridCoinNameMapper[robotRowPosition][robotColPosition];
          //console.log(coinGeometryName);
          var coinObj = scene.getObjectByName(coinGeometryName);
          var coinId = coinNameCoinIdMapper[coinObj.name];
          coinInfo[coinId] = {
            'holder': 'robot',
            'robotId': robotName,
            'geometryId': coinObj.name
          };
          currentCoinStatus.push(coinId);
          removeCoin(robotRowPosition, robotColPosition);
          //console.log(robotPosition[robotName]);
          robotProgramExecutionMetadata[robotName].currInstrPtr = IPtr + 1;
          scene.remove(coinObj);
        }
      } 
      else if (instructionName == 'drop') {
        // Pick coin
        var robotRowPosition = robotPosition[robotName].row;
        var robotColPosition = robotPosition[robotName].col;
        robotDir = robotPosition[robotName].direction;
        var currentCoinStatus = robotPosition[robotName].coins;
        if (isCoinWithRobot(robotName) == - 1) {
          console.log('Coin is not in Wallet');
          robotProgramExecutionMetadata[robotName].currInstrPtr = IPtr + 1;
        } else {
          var coinid = currentCoinStatus[0]
          var index = currentCoinStatus.indexOf(coinid)
          if (index > - 1) {
            currentCoinStatus.splice(index, 1);
          }
          //console.log(robotPosition[robotName]);    

          var coinGeometry = new THREE.CylinderGeometry(5, 5, 5, 32);
          var coinMaterial = new THREE.MeshBasicMaterial({
            color: 16776960
          });
          var coin = new THREE.Mesh(coinGeometry, coinMaterial);
          coin.name = coinInfo[coinid].geometryId;
          coin.position.z = - ((planeGeometry.parameters.height) / 2) + cellZ / 2 + spacing + (spacing + cellZ) * (robotRowPosition - 1);
          coin.position.x = - ((planeGeometry.parameters.width) / 2) + cellX / 2 + spacing + (spacing + cellX) * (robotColPosition - 1);
          coin.position.y = 5; //do not change this
          var rowPos = (robotRowPosition).toString();
         // console.log(rowPos);
          if (!gridCoinNameMapper[rowPos]) {
            gridCoinNameMapper[rowPos] = {
            };
          }
          var colPos = (robotColPosition).toString();
          gridCoinNameMapper[rowPos][colPos] = coin.name;
          coinInfo[coinDetails.coinId] = {
            'holder': 'grid',
            'row': robotRowPosition,
            'col': robotColPosition,
            'geometryId': coin.name
          };
          robotProgramExecutionMetadata[robotName].currInstrPtr = IPtr + 1;
          scene.add(coin);
        }
      } 
      else {
        // Memory Instructions
        //setMemory <Location> <value>
        //getMemory <Location>
        //copyMemory <Destination> <source>
        instrParam = instructionName.split(' ');
        if (instrParam[0] == 'setMemory') {
          if(  parseInt(instrParam[1]) < robotPosition[robotName]['memory']['capacity'] ){
            robotPosition[robotName]['memory']['data'][parseInt(instrParam[1])] = parseInt(instrParam[1]);
             robotProgramExecutionMetadata[robotName].currInstrPtr = IPtr + 1;
          }
          else{
            console.log("undefined memory location access");
            robotProgramExecutionMetadata[robotName].currInstrPtr = IPtr + 1;
          }
        }
        if (instrParam[0] == 'getMemory') {
          if(  parseInt(instrParam[1]) < robotPosition[robotName]['memory']['capacity'] ){
             //robotPosition[robotName]['memory']['data'][parseInt(instrParam[1])] = parseInt(instrParam[1]);
             robotProgramExecutionMetadata[robotName].currInstrPtr = IPtr + 1;
          }
          else{
            console.log("undefined memory location access");
            robotProgramExecutionMetadata[robotName].currInstrPtr = IPtr + 1;
          }
        }
        if (instrParam[0] == 'copyMemory') {
          if(  parseInt(instrParam[1]) < robotPosition[robotName]['memory']['capacity'] && parseInt(instrParam[2]) < robotPosition[robotName]['memory']['capacity']){
            robotPosition[robotName]['memory']['data'][parseInt(instrParam[1])] = robotPosition[robotName]['memory']['data'][parseInt(instrParam[2])];
             robotProgramExecutionMetadata[robotName].currInstrPtr = IPtr + 1;
          }
          else{
            console.log("undefined memory location access");
            robotProgramExecutionMetadata[robotName].currInstrPtr = IPtr + 1;
          }
        }
      }
    } 
    else {
      frameRate = frameRate + 1;
    }
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  var robotName = '';
  var IPtr = 0;
  var mem = [undefined,undefined,undefined];

  //console.log(mem);
  animate();
 
  function animate() {
    for (var rname in robotProgramDetails) {
    //  console.log('animate :' + rname);
      var maxInstrcnt = robotProgramExecutionMetadata[rname].maxInstruCount;
      var currentInstrPtr = robotProgramExecutionMetadata[rname].currInstrPtr;
      if (currentInstrPtr < maxInstrcnt) {
        robotName = rname;
        IPtr = currentInstrPtr;
        render();
      }
    }
    requestAnimationFrame(animate);
  }
  function checkIsValidMove(curRowPos, curColPos, dir) {
    if (dir == 0) {
      //console.log(isWall(curRowPos - 1, curColPos));
      return (((curRowPos - 1) - 1) > - 1 && !(isWall(curRowPos - 1, curColPos) == 1)) ? 1 : - 1;
    } else if (dir == 1) {
      //console.log(isWall(curRowPos, curColPos + 1));
      return ((((curColPos + 1) - 1) < numberOfCols) && !(isWall(curRowPos, curColPos + 1) == 1)) ? 1 : - 1
    } else if (dir == 2) {
      //console.log(isWall(curRowPos + 1, curColPos));
      return ((((curRowPos + 1) - 1) < numberOfRows) && !(isWall(curRowPos + 1, curColPos) == 1)) ? 1 : - 1;
    } else if (dir == 3) {
     // console.log(isWall(curRowPos, curColPos - 1));
      return ((((curColPos - 1) - 1) > - 1) && !(isWall(curRowPos, curColPos - 1) == 1)) ? 1 : - 1;
    }
  }
}
