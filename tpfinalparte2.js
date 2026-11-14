//Realizado por Catalina C Juarez y Julieta Martinez Santichi
// link del video explicativo: https://youtu.be/G5kYwNgcidY

let juego;
let musicaFondo;
let imgPiso;

function preload() {
  musicaFondo = loadSound("musica/475592__devern__intense-dark-action-orchestra.wav");
  imgPiso = loadImage("data/Piso.jpeg");
}

function setup() {
  createCanvas(800, 400);
  juego = new Juego();
}

function draw() {
  juego.dibujar();
}

function keyPressed() {
  if (juego) juego.teclaPresionada(keyCode, key);
}

function mousePressed() {
  if (juego) juego.mousePresionado(mouseX, mouseY);
}


class Juego {
  constructor() {
    this.carriles = [190, 400, 610];
    this.largoSalon = 3600;

    this.camarero = new Camarero(this.carriles, this.largoSalon - 200);
    this.personas = [];
    this.crearPersonas();

    this.puerta = new Puerta(400, 80);
    this.interfaz = new Interfaz();

    this.estado = 0; // 0: inicio, 1: jugando, 2: ganaste, 3: perdiste, 4: créditos
    this.tiempoInicio = 0;
    this.duracion = 18;
    this.camaraY = 0;

    this.volumenMusica = 0.3;
    this.volumenFinal = 0.05;
    this.musicaBajando = false;
  }

  crearPersonas() {
    this.personas = [];
    let ultimoCarrilLibre = 1;

    for (let fila = 14; fila >= 0; fila--) {
      let y = 260 + fila * 195;

      let opciones = [0, 1, 2].filter(c => c !== ultimoCarrilLibre);
      let carrilLibre = random(opciones);
      ultimoCarrilLibre = carrilLibre;

      for (let carril = 0; carril < 3; carril++) {
        if (carril !== carrilLibre) {
          let x = this.carriles[carril];

          this.personas.push(new Persona(x - 35, y - 16));
          this.personas.push(new Persona(x + 35, y - 16));
          this.personas.push(new Persona(x - 25, y + 20));
          this.personas.push(new Persona(x + 25, y + 20));
        }
      }
    }
  }

  dibujar() {
    if (this.estado === 0) {
      this.interfaz.inicio();

    } else if (this.estado === 1) {
      this.actualizar();
      this.escena();
      this.interfaz.mostrarHUD(this.tiempoRestante(), this.camarero.posY, this.largoSalon - 200);

      if (this.tiempoRestante() <= 0) {
        this.estado = 3;
        this.bajarMusica();
      }

    } else if (this.estado === 2) {
      this.interfaz.ganaste();

    } else if (this.estado === 3) {
      this.interfaz.perdiste();

    } else if (this.estado === 4) {
      this.interfaz.creditos();
    }

    this.actualizarVolumenMusica();
  }

  iniciar() {
    if (this.estado === 0) {
      this.estado = 1;
      this.tiempoInicio = millis();

      this.musicaBajando = false;
      this.volumenMusica = 0.3;

      userStartAudio();

      musicaFondo.stop();
      musicaFondo.setVolume(this.volumenMusica);
      musicaFondo.loop();
    }
  }

  bajarMusica() {
    this.musicaBajando = true;
  }

  actualizarVolumenMusica() {
    if (this.musicaBajando && musicaFondo.isPlaying()) {
      this.volumenMusica = lerp(this.volumenMusica, this.volumenFinal, 0.02);

      if (this.volumenMusica < this.volumenFinal + 0.002) {
        this.volumenMusica = this.volumenFinal;
      }

      musicaFondo.setVolume(this.volumenMusica);
    }
  }

  reiniciar() {
    musicaFondo.stop();

    this.camarero = new Camarero(this.carriles, this.largoSalon - 200);
    this.crearPersonas();
    this.estado = 0;
    this.camaraY = 0;
    this.interfaz.posicionCreditos = 295;

    this.volumenMusica = 0.3;
    this.musicaBajando = false;
  }

  teclaPresionada(codigoTecla, tecla) {
    if (this.estado === 1) {
      if (codigoTecla === LEFT_ARROW) {
        this.camarero.cambiarCarril(-1);
      } else if (codigoTecla === RIGHT_ARROW) {
        this.camarero.cambiarCarril(1);
      }
    }

    if (codigoTecla === ENTER || codigoTecla === RETURN) {
      this.iniciar();
    }

    if (this.estado === 4 && (tecla === 'r' || tecla === 'R')) {
      this.reiniciar();
    }
  }

  mousePresionado(x, y) {
    if (this.estado === 2 || this.estado === 3) {
      if (x > 305 && x < 495 && y > 264 && y < 306) {
        this.estado = 4;
        this.interfaz.posicionCreditos = 295;
      }
    }
  }

  actualizar() {
    this.camarero.mover();
    this.detectarColisiones();
    this.detectarPuerta();

    this.camaraY = constrain(this.camarero.posY - 280, 0, this.largoSalon - 400);
  }

  detectarColisiones() {
    for (let i = 0; i < this.personas.length; i++) {
      if (this.personas[i].colisiona(this.camarero)) {
        this.camarero.recibirChoque();
        break;
      }
    }
  }

  detectarPuerta() {
    if (dist(this.camarero.posX, this.camarero.posY, this.puerta.posX, this.puerta.posY) < 55) {
      this.estado = 2;
      this.bajarMusica();
    }
  }

  tiempoRestante() {
    let pasado = (millis() - this.tiempoInicio) / 1000;
    return max(0, this.duracion - pasado);
  }

  escena() {
    background(45, 28, 18);

    push();
    translate(0, -this.camaraY);

    this.dibujarSalonYate();

    let proporcionTiempo = this.tiempoRestante() / this.duracion;
    this.puerta.dibujar(proporcionTiempo);

    for (let i = 0; i < this.personas.length; i++) {
      this.personas[i].dibujar();
    }

    this.camarero.dibujar();

    pop();
  }

  dibujarSalonYate() {
    let altoTile = (800 / imgPiso.width) * imgPiso.height;
    let indice = 0;

    for (let y = 0; y < this.largoSalon; y += altoTile) {
      push();
      if (indice % 2 === 1) {
        translate(0, y + altoTile);
        scale(1, -1);
        image(imgPiso, 0, 0, 800, altoTile);
      } else {
        image(imgPiso, 0, y, 800, altoTile);
      }
      pop();
      indice++;
    }

    noStroke();

    fill(65, 40, 26);
    rect(0, 0, 85, this.largoSalon);
    rect(715, 0, 85, this.largoSalon);

    fill(205, 170, 95);
    rect(78, 0, 7, this.largoSalon);
    rect(715, 0, 7, this.largoSalon);

    stroke(235, 220, 190, 110);
    strokeWeight(4);
    for (let y = 120; y < this.largoSalon; y += 60) {
      line(295, y, 295, y + 30);
      line(505, y, 505, y + 30);
    }
  }
}
