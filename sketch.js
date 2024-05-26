let imagenFondo
let imagenInicio
let personaje
let obstaculo
let estado = 0  // 0: menú 1: jugando 2: gameOver
let nube
let x = 0
let posY = 200
let dY = 3
let wallX = []
let wallY = []
let puntaje = 0
let puntajeMax = 0
let recordAnterior = 0
let musicaRecord
let musicaJuego

function preload() {
  imagenFondo = loadImage('./images/fondojuego.webp');
  personaje = loadImage('./images/goku.gif');
  nube = loadImage('./images/nube.png');
  imagenInicio = loadImage('./images/fondoinicio.png');
  obstaculo = loadImage('./images/pared.png');
  musicaRecord = loadSound('./sounds/aplauso.wav')
  musicaJuego = loadSound('./sounds/musicafondo.mp3')
}

function setup() {
  createCanvas(1200, 600);
  textSize(34 )
}

function draw() {
  // put drawing code here
  if (estado === 1) {  // Jugando
    imageMode(CORNER)
    background(255,255,255)
    image(imagenFondo, x, 0)
    image(imagenFondo, imagenFondo.width + x, 0)
    x = x - 5
    dY = dY + 1
    posY = posY + dY
    if (x < -imagenFondo.width){
      x = 0
    }

    //Obstaculos
    for (let i=0; i < wallX.length; i++) {
      imageMode(CENTER)
      image(obstaculo, wallX[i], wallY[i]-500)
      image(obstaculo, wallX[i], wallY[i]+500)
      
      if (wallX[i] < 0) {
        wallX[i] = width
        wallY[i] = random(200, 400)
      }
      if (wallX[i] === 100) {
        puntaje = puntaje + 1
        puntajeMax = max(puntaje, puntajeMax)
      }

      wallX[i] = wallX[i] - 5
      //Revisando si el personaje se sale de la pantalla
      if (posY > height+60 || posY < -60 || (abs(wallX[i]-100) < 60 
          && abs(posY - wallY[i])>100 )) {
            musicaJuego.stop()
            estado = 0
      }
    }


 

    //Personaje
    image(personaje, 100, posY, 60,60)
    text("Puntaje: " + puntaje, width/2-60, 30)
    //Nube
    //image(nube, 100, 400, 60,60)
  } else {
    background(0)
    imageMode(CORNER)
    cursor()
    image(imagenInicio, 0, 0)
    textAlign(CENTER,CENTER)
    text("Puntaje máximo: " + puntajeMax, 250, 200)
    if (puntajeMax > recordAnterior) {
      if (!musicaRecord.isPlaying())
      musicaRecord.play()
    }
  }
}

function mousePressed() {
  if (estado === 0) {
    estado = 1
    x = 0
    posY = 200
    dY = 3
    wallX = [500, 800, 1100]
    wallY[0] = random(350,450)
    wallY[1] = random(350,450)
    wallY[2] = random(350,450)
    puntaje = 0
    recordAnterior = puntajeMax
    noCursor()
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
    musicaJuego.loop()
  }
  dY = -15
}