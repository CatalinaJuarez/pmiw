class Interfaz {
  constructor() {
    this.posicionCreditos = 295;
  }

  inicio() {
    background(35, 40, 48);

    fill(240, 195, 90);
    textAlign(CENTER);
    textSize(14);
    text("OPERACIÓN YATE — ESCAPE CON EL CHIP", 400, 65);

    fill(255);
    textSize(32);
    text("RUMBO A LA CABINA", 400, 105);

    textSize(16);
    fill(215, 222, 230);
    text("Ya tenés el chip en tu bandeja. Esquivá los grupos de invitados", 400, 155);
    text("y llegá a la cabina antes de que te cierren la puerta.", 400, 182);

    fill(255);
    textSize(16);
    text("◀  FLECHAS IZQUIERDA / DERECHA  ▶", 400, 250);

    fill(0, 220, 255);
    textSize(18);
    text("Presioná ENTER para escapar", 400, 315);
  }

  mostrarHUD(tiempoFloat, posYCamarero, yInicio) {
    let segundos = ceil(tiempoFloat);

    if (segundos <= 6 && frameCount % 20 < 10) {
      noFill();
      stroke(220, 40, 40, 150);
      strokeWeight(12);
      rect(0, 0, 800, 400);
    }

    fill(35, 40, 48, 235);
    noStroke();
    rect(0, 0, 800, 44);

    fill(segundos <= 6 ? color(255, 85, 85) : 255);
    textAlign(LEFT, CENTER);
    textSize(18);
    text("Cierre de cabina: " + segundos + "s", 25, 22);

    let progreso = map(posYCamarero, yInicio, 80, 0, 1, true);
    fill(75, 85, 95);
    rect(520, 15, 240, 14, 7);
    fill(0, 210, 245);
    rect(520, 15, 240 * progreso, 14, 7);

    fill(255);
    textAlign(RIGHT, CENTER);
    textSize(13);
    text("Cabina", 510, 22);
  }

  botonCreditos() {
    push();
    rectMode(CENTER);

    noFill();
    stroke(255);
    strokeWeight(1.5);
    rect(400, 285, 190, 42, 6);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("VER CRÉDITOS", 400, 285);
    pop();
  }

  ganaste() {
    background(35, 90, 75);

    fill(0, 230, 255);
    textAlign(CENTER);
    textSize(15);
    text("TRANSMISIÓN COMPLETADA", 400, 110);

    fill(255);
    textSize(32);
    text("¡LOGRASTE ENVIAR LA INFORMACIÓN!", 400, 155);

    textSize(17);
    fill(220, 240, 235);
    text("Entraste a la cabina a tiempo y pusiste a salvo los datos del chip.", 400, 205);

    this.botonCreditos();
  }

  perdiste() {
    background(100, 40, 42);

    fill(255, 175, 175);
    textAlign(CENTER);
    textSize(15);
    text("MISIÓN FALLIDA", 400, 110);

    fill(255);
    textSize(32);
    text("¡TE CERRARON LA PUERTA EN LA CARA!", 400, 155);

    textSize(17);
    fill(240, 215, 215);
    text("Te atraparon antes de poder transmitir la información del chip.", 400, 205);

    this.botonCreditos();
  }

  creditos() {
    push();
    background(20, 22, 27);

    fill(255);
    textAlign(CENTER, TOP);
    textSize(28);
    text("CRÉDITOS", 400, this.posicionCreditos);

    textSize(18);
    textLeading(28);

    text(
      "Video Juego Web\n" +
      "Trabajo Final — Parte 2\n\n" +
      "Creado por\n" +
      "Catalina Constanza Juarez\n" +
      "Julieta Martinez Santichi\n\n" +
      "Comisión 3\n\n" +
      "Programación para Medios Interactivos\n" +
      "orientada a las Tecnologías Web\n\n" +
      "¡Gracias por jugar!",
      400, this.posicionCreditos + 45
    );

    this.posicionCreditos = this.posicionCreditos - 1;

    if (this.posicionCreditos < -430) {
      this.posicionCreditos = 295;
    }

    noStroke();
    fill(20, 22, 27);
    rect(0, 365, 800, 35);

    stroke(230, 220, 190, 150);
    strokeWeight(1);
    line(25, 365, 775, 365);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(15);
    text("Presioná R para volver a jugar", 400, 383);

    pop();
  }
}
