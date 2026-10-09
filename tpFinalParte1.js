//Catalina Constanza Juarez, comision 3. Trabajo realizado con Julieta Martinez Santichi
//LINK DEL VIDEO EXPLICATIVO: https://youtu.be/eFRWMP9E3XA

// Estos números los usamos para diferenciar el inicio y los créditos
const PANTALLA_INICIO = -1;
const PANTALLA_CREDITOS = -2;

// Esta variable nos dice en qué pantalla estamos
let estadoActual = PANTALLA_INICIO;
let posicionCreditos = 295;
let textoInicio = "Eres el Agente 00-Camarero. Tu objetivo de hoy es el magnate Richter, quien planea vender un chip con los códigos de un satélite militar a bordo de su yate. Tu misión: infiltrarte como personal de servicio, sustraer el chip y salir con vida.";

let textos = [
 "Cargas una bandeja dorada con copas de champán y te abres paso entre los invitados vestidos de etiqueta. El gran salón está lleno de música y luces. A lo lejos, en la zona VIP, distingues a Richter conversando animadamente.",
 "Llegas a la mesa VIP. Richter guarda el chip en el bolsillo interno de su saco. Un guardaespaldas gigante te vigila. ¿Cómo te acercas?",
 "Te acercas con paso firme y ofreces los bocadillos. Richter toma uno sin prestarte atención, pero el guardaespaldas inclina la cabeza hacia ti, sospechando de tu presencia.",
 "Finges un tropiezo y las copas caen directo sobre el pecho de Richter. El champán baña su traje costoso y Richter se pone de pie maldiciendo enfurecido.",
 "Sacas el chip con la pinza sin hacer ruido. Tienes segundos antes de que Richter se palpe el saco. ¿Dónde escondes el chip?",
 "Richter se sacude la ropa distraído. Intentas manotear el chip en medio del desorden. ¿Cómo procedes?",
 "Deslizas el chip dentro del dobladillo de tu manga izquierda. Das dos pasos atrás con la bandeja vacía.",
 "Introduces el microchip dentro de tu moñito de mozo. Un movimiento arriesgado pero invisible.",
 "Metes la mano en su saco bajo el pretexto de secar la tela, pero el guardaespaldas reacciona y te sujeta la muñeca con fuerza.",
 "Señalas a un mozo cercano provocando una discusión. Logras meter la mano y sacar el chip sin que el matón lo note.",
 "Richter nota la falta del chip y presiona la alarma. El salón se ilumina en rojo y las sirenas ordenan cerrar salidas. ¿Hacia dónde huyes?",
 "Lanzas la bandeja al aire desatando una pelea campal de comida en la fiesta. Todos corren aterrorizados. ¿Cómo aprovechas el caos?",
 "Llegas a la plataforma trasera exterior. Ves una moto de agua amarrada y un helicóptero espía sobrevolando. ¿Cómo escapas?",
 "Corres hacia los pasillos interiores. Tienes la opción de tomar la cabina de mandos o bajar a las máquinas. ¿Adónde vas?",
 "Bajas a la sala de motores, pero Richter activa las compuertas de acero a distancia y te deja encerrado en la oscuridad.",
 "Te le plantas de frente a Richter dispuesto a luchar. Él frena la pelea, sonríe y se saca una máscara: ¡era el Director de tu Agencia en un examen sorpresa!",
 "¡MISIÓN CUMPLIDA! Escapas en la moto de agua a toda velocidad esquivando disparos. Llegas a la costa con la tarjeta física intacta y te nombran Agente del Año.",
 "¡MISIÓN CUMPLIDA! Disparas tu gancho al helicóptero de la Agencia y te elevas por los aires sobre el yate. Recuperas el chip y eres condecorado.",
 "¡MISIÓN CUMPLIDA! Te encierras en la cabina, apagas los motores y envías los datos cifrados a la base central antes de la llegada de los refuerzos.",
 "MISIÓN FALLIDA. Las compuertas blindadas se abren. Richter entra armado, te quita el chip y te encierra en la bodega mientras el yate se pierde en mar abierto.",
 "¡SORPRESA! Todo era una prueba simulada para evaluar tu valentía bajo presión. Aprobaste con honores el examen sorpresa de la Agencia.",
];


// Textos que aparecen en el botón de la opción A
let textosOpcionA = [
  "Aproximarse a la Zona VIP",
  "Servir Canapés",
  "Usar pinza metálica",
  "Aprovechar el revuelo",
  "Guardar en la Manga",
  "Arrodillarse a Limpiar",
  "Dar paso atrás",
  "Avanzar rapido",
  "Tirar la bandeja al aire",
  "Escabullirse",
  "Correr a la Popa",
  "Huir a la Máquinas",
  "Moto de Agua",
  "Transmitir en Cabina",
  "Afrontar destino",
  "Escuchar explicación",
  "VER CRÉDITOS", 
  "VER CRÉDITOS", 
  "VER CRÉDITOS", 
  "VER CRÉDITOS", 
  "VER CRÉDITOS", 
];


// Textos que aparecen en el botón de la opción B, dejamos el espacio para mantener el orden cuando no hay opcion B
let textosOpcionB = [
  "",
  "Simular Tropezón",
  "",
  "",
  "Ocultar en el Moño",
  "Culpar a Otro Mozo",
  "",
  "",
  "",
  "",
  "Ir a la Cabina",
  "Enfrentar a Richter",
  "Lanzaganchos al Helicóptero",
  "Ocultarse en el Motor",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
];

// A qué pantalla lleva cada opción A
let siguienteOpcionA = [
  1,  // Ingreso al salón -> Aproximación
  2,  // Aproximación -> La mesa VIP
  4,  // La mesa VIP -> El escondite
  5,  // El accidente -> El manotazo
  6,  // El escondite -> Manga asegurada
  8,  // El manotazo -> Mano en el saco
  10, // Manga asegurada -> Alarma roja
  10, // Moño espía -> Alarma roja
  11, // Mano en el saco -> Caos en el salón
  11, // Distracción extra -> Caos en el salón
  12, // Alarma roja -> Escape náutico
  14, // Caos en el salón -> Sala de máquinas
  16, // Escape náutico -> Final 1A
  18, // Sabotaje interno -> Final 1C
  19, // Sala de máquinas -> Final 2
  20, // Enfrentamiento -> Final 3
  PANTALLA_CREDITOS,
  PANTALLA_CREDITOS,
  PANTALLA_CREDITOS,
  PANTALLA_CREDITOS,
  PANTALLA_CREDITOS
];

// A qué pantalla lleva cada opción B
let siguienteOpcionB = [
  -1, // Ingreso al salón: no hay opción B
  3,  // Aproximación -> El accidente
  -1, // La mesa VIP: no hay opción B
  -1, // El accidente: no hay opción B
  7,  // El escondite -> Moño espía
  9,  // El manotazo -> Distracción extra
  -1,
  -1,
  -1,
  -1,
  13, // Alarma roja -> Sabotaje interno
  15, // Caos en el salón -> Enfrentamiento
  17, // Escape náutico -> Final 1B
  14, // Sabotaje interno -> Sala de máquinas
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1
];

// Botón de la opción A
let botonOpcionA = {
  x: 145,
  y: 398,
  ancho: 230,
  alto: 34
};


let botonOpcionB = {
  x: 425,
  y: 398,
  ancho: 230,
  alto: 34
}; 

// Botón para empezar la historia
let botonEmpezar = {
  x: 275,
  y: 380,
  ancho: 250,
  alto: 42
};

let musicaFondo;
let imagenes = [];


function preload() {
 imagenes[0] = loadImage("data/pantalla00.jpeg");
 imagenes[1] = loadImage("data/pantalla01.jpeg");
 imagenes[2] = loadImage("data/pantalla02.jpeg");
 imagenes[3] = loadImage("data/pantalla03.jpeg");
 imagenes[4] = loadImage("data/pantalla04.jpeg");
 imagenes[5] = loadImage("data/pantalla05.jpeg");
 imagenes[6] = loadImage("data/pantalla06.jpeg");
 imagenes[7] = loadImage("data/pantalla07.jpeg");
 imagenes[8] = loadImage("data/pantalla08.jpeg");
 imagenes[9] = loadImage("data/pantalla09.jpeg");
 imagenes[10] = loadImage("data/pantalla10.jpeg");
 imagenes[11] = loadImage("data/pantalla11.jpeg");
 imagenes[12] = loadImage("data/pantalla12.jpeg");
 imagenes[13] = loadImage("data/pantalla13.jpeg");
 imagenes[14] = loadImage("data/pantalla14.jpeg");
 imagenes[15] = loadImage("data/pantalla15.jpeg");
 imagenes[16] = loadImage("data/pantalla16.jpeg");
 imagenes[17] = loadImage("data/pantalla17.jpeg");
 imagenes[18] = loadImage("data/pantalla18.jpeg");
 imagenes[19] = loadImage("data/pantalla19.jpeg");
 imagenes[20] = loadImage("data/pantalla20.jpeg");
 imagenes[21] = loadImage("data/pantalla21.jpeg");

musicaFondo = loadSound("musica/867363__matthew_c_wright__classical-piano-never-in-a-hurry.mp3");
}

function setup() {
  createCanvas(800, 450);
  
}

function draw() {
  //todo esto maneja el cambio de pantallas
 if (estadoActual == PANTALLA_INICIO) {

    dibujarInicio();

  } else if (estadoActual == PANTALLA_CREDITOS) {

    dibujarCreditos();

  } else {

    dibujarHistoria();

  }
}


function dibujarInicio() {

  image(imagenes[0], 0, 0, width, height);

  // Rectangulo oscuro transparente en la parte inferior
  noStroke();
  fill(0, 0, 0, 155);
  rect(25, 220, 750, 225, 12);

  // Título
  fill(255);
  textSize(27);
  textAlign(CENTER, CENTER);
  text("OPERACIÓN GALA FLOTANTE", width / 2, 246);

  
  textSize(16);
  textAlign(CENTER, TOP);
  text(textoInicio, 45, 282, 710, 88);

  // Botón para empezar
  dibujarBoton(botonEmpezar, "INICIAR MISIÓN");

}


function dibujarBoton(boton, textoBoton) {

  stroke(230, 220, 190, 230);
  strokeWeight(2);
  fill(15, 18, 22, 215);
  rect(boton.x,boton.y,boton.ancho,boton.alto,8);

  // Texto del botón
  noStroke();
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);

  text(textoBoton,boton.x + boton.ancho / 2,boton.y + boton.alto / 2);

}

function dibujarHistoria() {

  
  image(imagenes[estadoActual + 1], 0, 0, width, height);

  textSize(15);
  let cantidadLineas = Math.ceil(textos[estadoActual].length / 85);
  let altoPanel = cantidadLineas * 20 + 18;
  let yPanel = 365 - altoPanel;

  noStroke();
  fill(0, 0, 0, 140);
  rect(25, yPanel, 750, altoPanel, 12);

  fill(255);
  textSize(15);
  textAlign(CENTER, TOP);
  textLeading(20);
  text(textos[estadoActual],45, yPanel + 9,710,altoPanel - 18);

  // Si hay dos opciones, mostramos los dos botones
  if (textosOpcionB[estadoActual] != "") {

    dibujarBoton(botonOpcionA, textosOpcionA[estadoActual]);
    dibujarBoton(botonOpcionB, textosOpcionB[estadoActual]);

  } else {

    // Si hay una sola opción, mostramos un botón centrado
    dibujarBoton(botonEmpezar, textosOpcionA[estadoActual]);

  }

}

function dibujarCreditos() {
  background(20, 22, 27);

  // Título de los créditos
  fill(255);
  textAlign(CENTER, TOP);
  textSize(28);
  text("CRÉDITOS", width / 2, posicionCreditos);

  textSize(18);
  textLeading(28);

  text(
    "Aventura Gráfica Interactiva Web\n" +
    "Trabajo Final — Parte 1\n\n" +
    "Creado por\n" +
    "Catalina Constanza Juarez\n" +
    "Julieta Martinez Santichi\n\n" +
    "Comisión 3\n\n" +
    "Programación para Medios Interactivos\n" +
    "orientada a las Tecnologías Web\n\n" +
    "¡Gracias por jugar!",
    width / 2,
    posicionCreditos + 45
  );

  // Los créditos suben más rápido
  posicionCreditos = posicionCreditos - 1.05;

  // Cuando terminan, vuelven a empezar
  if (posicionCreditos < -430) {
    posicionCreditos = 295;
  }

  noStroke();
  fill(20, 22, 27);
  rect(0, 365, width, 85);

  stroke(230, 220, 190, 150);
  strokeWeight(1);
  line(25, 365, 775, 365);

  // Botón fijo para volver a jugar
  dibujarBoton(botonEmpezar, "REINICIAR JUEGO");

}

function clicSobre(x, y, ancho, alto) {

  // Nos fijamos si el mouse está dentro de la zona que ocupa el botón.
  return mouseX >= x &&
         mouseX <= x + ancho &&
         mouseY >= y &&
         mouseY <= y + alto;

}

function mousePressed() {

 // Si estamos en el inicio
if (estadoActual == PANTALLA_INICIO) {

  if (clicSobre(
    botonEmpezar.x,
    botonEmpezar.y,
    botonEmpezar.ancho,
    botonEmpezar.alto
  )) {
    estadoActual = 0;
    userStartAudio();
    musicaFondo.setVolume(0.3);
    musicaFondo.loop();
  }

  return;
}

  // Si estamos en los créditos
  if (estadoActual == PANTALLA_CREDITOS) {

    if (clicSobre(
      botonEmpezar.x,
      botonEmpezar.y,
      botonEmpezar.ancho,
      botonEmpezar.alto
    )) {
      estadoActual = PANTALLA_INICIO;
      posicionCreditos = 295;
    }

    return;
  }

  // Si la pantalla tiene una sola opción
  if (textosOpcionB[estadoActual] == "") {

    if (clicSobre(
      botonEmpezar.x,
      botonEmpezar.y,
      botonEmpezar.ancho,
      botonEmpezar.alto
    )) {
      estadoActual = siguienteOpcionA[estadoActual];
    }

  } else {

    // Si hacemos clic en la opción A
    if (clicSobre(
      botonOpcionA.x,
      botonOpcionA.y,
      botonOpcionA.ancho,
      botonOpcionA.alto
    )) {
      estadoActual = siguienteOpcionA[estadoActual];

    // Si hacemos clic en la opción B
    } else if (clicSobre(
      botonOpcionB.x,
      botonOpcionB.y,
      botonOpcionB.ancho,
      botonOpcionB.alto
    )) {
      estadoActual = siguienteOpcionB[estadoActual];
    }

  }

}
