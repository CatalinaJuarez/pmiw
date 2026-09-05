let framesVuelo = [];
let framesPatada = [];
let fondo;
let dragon;
let frameActual = 0;
let contador = 0;
let velocidad = 8;
let estado = "inicio";
let posicionX = -100;
let fondoX1 = 0;
let fondoX2 = 800;


function preload() {

  for (let i = 0; i < 6; i++) {
    let numero = nf(i + 1, 3);
    framesVuelo[i] = loadImage("data/" + numero + ".png");
  }

  for (let i = 6; i < 11; i++) {
    let numero = nf(i + 1, 3);
    framesPatada[i - 6] = loadImage("data/" + numero + ".png");
  }

  fondo = loadImage("data/fondo.png");
  dragon = loadImage("data/dragon.png");
}


function setup() {
  createCanvas(800, 600);
}


function draw() {

  dibujarFondo(fondoX1, fondoX2);


  if (estado == "inicio") {
    textSize(40);
    text("PLAY", 350, 150);
  }


  if (estado == "volar") {

    image(framesVuelo[frameActual], posicionX, 180);

    if (posicionX < 300) {
      posicionX = posicionX + 2;
    } else {
      estado = "pelea";
    }

    if (avanzarFrame(framesVuelo, velocidad)) {
      frameActual = 0;
    }

    fondoX1 = fondoX1 - 2;
    fondoX2 = fondoX2 - 2;
  }


  if (estado == "pelea") {
    dibujarPelea(posicionX);
  }


  if (estado == "patada") {

    image(framesPatada[frameActual], posicionX, 180);
    image(dragon, 390, -45, 450, 450);

    if (avanzarFrame(framesPatada, velocidad - 2)) {
      estado = "salir";
      frameActual = 0;
      contador = 0;
    }
  }


  if (estado == "salir") {

    dibujarSalida();

    if (posicionX > 800) {
      estado = "inicio";
      posicionX = -100;
      frameActual = 0;
      contador = 0;
      fondoX1 = 0;
      fondoX2 = 800;
    }
  }
}


function mousePressed() {
  if (estado == "inicio") {
    estado = "volar";
  }
  else if (estado == "pelea") {

    if ((mouseX > 200 && mouseX < 430 &&
         mouseY > 170 && mouseY < 300) ||
        (mouseX > 295 && mouseX < 490 &&
         mouseY > 120 && mouseY < 160)) {

      estado = "patada";
      frameActual = 0;
      contador = 0;
    }
  }
}


function dibujarFondo(fondoX1, fondoX2) {
  image(fondo, fondoX1, 0, 800, 600);
  image(fondo, fondoX2, 0, 800, 600);
}


function dibujarPelea(posicionX) {
  image(framesVuelo[5], posicionX, 180);
  image(dragon, 390, -45, 450, 450);

  textSize(16);
  text("CLIC PARA PELEAR", 300, 145);
}


function avanzarFrame(frames, velocidadAnim) {
  contador++;

  if (contador >= velocidadAnim) {
    contador = 0;
    frameActual++;

    if (frameActual >= frames.length) {
      return true;
    }
  }

  return false;
}


function dibujarSalida() {

  image(framesVuelo[frameActual], posicionX, 180);

  posicionX = posicionX + 3;

  if (avanzarFrame(framesVuelo, velocidad)) {
    frameActual = 0;
  }
}
