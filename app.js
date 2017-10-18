/* MARS ROVER IRONHACK
by Juancho */

// definimos nuestra matriz de 10 x10 en la que vamos a mover el rover
var moonGrid = [];
for(var y = 0; y < 10; y++){
    moonGrid[y] = [];
    for(var x = 0; x < 10; x++){
        moonGrid[y][x] = " ";
    }
}

// definimos nuestra matriz de 10 x10 en la que vamos a mover a guardar las posiciones que ha ido el Rover rover para generar un mapa de calor
var moonGridLog = [];
for(var y = 0; y < 10; y++){
    moonGridLog[y] = [];
    for(var x = 0; x < 10; x++){
        moonGridLog[y][x] = 0;
    }
}
moonGridLog[0][0] = 1;

//creamos la función que emite un beep de control llamando a un elemento sound que está en el html
function beepSound () {
  document.getElementById('play').play();
}

//creamos el objeto que será nuestro Rover y lo posicionamos de origen en 0,0 y mirando al norte
var myRover = {
  position: [0,0],
  direction: '▲',
  positionPrevious: [0,0]
};


//Definimos la función que asigna la posición al Rover en la parrilla
function roverPositioning(){

     moonGrid[myRover.position[0]][myRover.position[1]] = myRover.direction;

     if( !(myRover.position[0] === myRover.positionPrevious[0] && myRover.position[1] === myRover.positionPrevious[1]) ){
     moonGrid[myRover.positionPrevious[0]][myRover.positionPrevious[1]] = " ";
     console.log("borramos posición previa ya que el rover se ha movido")
  }
  else{
     console.log("el rover está en la misma casilla, no se ha movido")
  }

    document.getElementById("test").innerHTML = "Posición del Rover x: " + myRover.position[1] + " y: " + myRover.position[0] + " - Orientación: " + myRover.direction;// esto es solo como elemento de control y visualizar en la web la posición y alineaciónd el rover
}


//Definimos la función que imprime la matriz lunar generada con el rover posicionado y le añadimos color a las casillas para generar el mapa de calor degún el número de veces que ha estado el rover.
var heatMapMax = 1; //Definimos esta variable antes que usaremos en la función movementOk() para ver el rango máx de movimientos
function printingMoonGrid() {
  for(var y = 0; y < 10; y++){
    for(var x = 0; x < 10; x++){
      var n = y +""+ x;
      var p = moonGrid[y][x];
      var count = moonGridLog[y][x];
      var heatColor = 255-Math.round(255/heatMapMax * moonGridLog[y][x]);
  document.getElementById(n).innerHTML = p ;
  document.getElementById(n).style.backgroundColor = "rgb(255," + heatColor + ",50)";
    }
  }
}

//Definimos las funciones que vamos a usar para mover el rover

function turnLeft(){
  switch (myRover.direction) {
    case '▲':
      myRover.direction = "◄";
      break;
    case '►':
      myRover.direction = "▲";
      break;
    case '▼':
      myRover.direction = "►";
      break;
    case '◄':
      myRover.direction = "▼";
      break;
  }
    roverPositioning();
    printingMoonGrid();
}


function turnRight(){
  switch (myRover.direction) {
    case '▲':
      myRover.direction = "►";
      break;
    case '►':
      myRover.direction = "▼";
      break;
    case '▼':
      myRover.direction = "◄";
      break;
    case '◄':
      myRover.direction = "▲";
      break;
      }
  roverPositioning();
  printingMoonGrid();
}


function movementOk(){
  console.log("Movimiento Ok. Ejecutando la función de avance o retroceso ")
  moonGridLog[myRover.position[0]][myRover.position[1]] ++; //incrementamos el contador de veces que ha estado el rover en esa casilla

 if( moonGridLog[myRover.position[0]][myRover.position[1]] > heatMapMax ){
    heatMapMax = moonGridLog[myRover.position[0]][myRover.position[1]];
    console.log("nuevo máximo casilla más visitada =" + heatMapMax);
  }
  roverPositioning();
  printingMoonGrid();

}

function noMovement(){
   beepSound (); //hacemos un beep de aviso de que algo va mal
   console.log("Imposible ejecutar la función de avance o retroceso. Hay un obstáculo o el Rover está en el extremo de la matriz");
}

function goForward(){
  myRover.positionPrevious[0] = myRover.position[0];
  myRover.positionPrevious[1] = myRover.position[1];

  switch (myRover.direction) {
    case '▲':
      if (myRover.position[0]>0){
        myRover.position[0]--;
        movementOk();
      }
      else{noMovement()}
      break;
    case '►':
      if (myRover.position[1]<9){
        myRover.position[1]++;
        movementOk();
      }
      else{noMovement()}
      break;
    case '▼':
       if (myRover.position[0]<9){
        myRover.position[0]++;
         movementOk();
      }
      else{noMovement()}
      break;
    case '◄':
       if (myRover.position[1]>0){
        myRover.position[1]--;
        movementOk();
      }
      else{noMovement()}
      break;
      }
}

function goBackward(){
  myRover.positionPrevious[0] = myRover.position[0];
  myRover.positionPrevious[1] = myRover.position[1];

   switch (myRover.direction) {
    case '▲':
      if (myRover.position[0]<9){
        myRover.position[0]++;
         movementOk();
      }
       else{noMovement()}
      break;
    case '►':
      if (myRover.position[1]>0){
        myRover.position[1]--;
         movementOk();
      }
       else{noMovement()}
       break;
    case '▼':
       if (myRover.position[0]>0){
        myRover.position[0]--;
         movementOk();
      }
       else{noMovement()}
       break;
    case '◄':
       if (myRover.position[1]<9){
        myRover.position[1]++;
         movementOk();
      }
       else{noMovement()}
      break;
      }
}


//Una vez definidas todas las funciones, las matrices de posición y de calor y el rover, ejecutamos una primera vez el posicionamiento y la impresión de la matriz:
console.log ("Esta es nuestra parrilla lunar en la que vamos a mover el Rover");
roverPositioning();
printingMoonGrid();
