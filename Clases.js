class Camarero {
  constructor(carriles, yInicial) {
    this.carriles = carriles;
    this.carrilActual = 1;
    this.posX = this.carriles[this.carrilActual];
    this.posY = yInicial;
    this.yMaxima = yInicial + 50;

    this.velAvance = 4.5;
    this.aturdido = 0;
  }

  cambiarCarril(direccion) {
    this.carrilActual = constrain(this.carrilActual + direccion, 0, 2);
  }

  mover() {
    let destinoX = this.carriles[this.carrilActual];
    this.posX = lerp(this.posX, destinoX, 0.25);

    if (this.aturdido > 0) {
      this.aturdido--;
      this.posY += 1.5;
    } else {
      this.posY -= this.velAvance;
    }

    this.posY = constrain(this.posY, 80, this.yMaxima);
  }

  recibirChoque() {
    if (this.aturdido === 0) {
      this.aturdido = 35;
      this.posY += 45;
    }
  }

  dibujar() {
    push();
    translate(this.posX, this.posY);

    if (this.aturdido > 0) {
      fill(255, 110, 110);
      textAlign(CENTER);
      textSize(14);
      text("¡Perdón!", 0, -34);

      if (frameCount % 6 < 3) {
        pop();
        return;
      }
    }

    let diferenciaX = this.carriles[this.carrilActual] - this.posX;
    rotate(diferenciaX * 0.004);

    noStroke();

    fill(0, 0, 0, 75);
    ellipse(4, 6, 44, 44);

    fill(238, 240, 245);
    ellipse(0, 0, 46, 30);

    fill(235, 190, 160);
    ellipse(0, 0, 24, 24);

    fill(215, 220, 225);
    stroke(100);
    strokeWeight(2);
    ellipse(20, -14, 24, 24);

    noStroke();
    fill(250, 230, 150);
    ellipse(16, -17, 7, 7);
    ellipse(24, -11, 7, 7);

    fill(0, 220, 255);
    rectMode(CENTER);
    rect(20, -14, 6, 6, 1);
    pop();
  }
}


class Persona {
  constructor(xInicial, yInicial) {
    this.posX = xInicial;
    this.posY = yInicial;

    let paleta = [
      color(210, 75, 85),
      color(85, 145, 205),
      color(185, 115, 195),
      color(105, 180, 130),
      color(230, 165, 75)
    ];
    this.colorRopa = random(paleta);
    this.angulo = random(TWO_PI);
  }

  dibujar() {
    push();
    translate(this.posX, this.posY);
    rotate(this.angulo);
    noStroke();

    fill(0, 0, 0, 70);
    ellipse(3, 5, 38, 38);

    fill(this.colorRopa);
    ellipse(0, 0, 38, 28);

    fill(235, 190, 160);
    ellipse(0, 0, 18, 18);
    pop();
  }

  colisiona(camarero) {
    let distancia = dist(this.posX, this.posY, camarero.posX, camarero.posY);
    return distancia < 36;
  }
}


class Puerta {
  constructor(xInicial, yInicial) {
    this.posX = xInicial;
    this.posY = yInicial;
  }

  dibujar(proporcionTiempo) {
    push();
    rectMode(CENTER);

    noStroke();
    fill(165, 45, 45);
    rect(this.posX, this.posY + 55, 140, 100);

    fill(55, 65, 75);
    stroke(30, 35, 40);
    strokeWeight(3);
    rect(this.posX, this.posY, 140, 56, 4);

    noStroke();
    fill(40, 180, 210);
    rect(this.posX, this.posY, 124, 42);

    let anchoHoja = map(proporcionTiempo, 1, 0, 12, 62, true);
    fill(100, 65, 45);
    stroke(45, 30, 20);
    strokeWeight(2);
    rect(this.posX - 62 + anchoHoja / 2, this.posY, anchoHoja, 44);
    rect(this.posX + 62 - anchoHoja / 2, this.posY, anchoHoja, 44);

    noStroke();
    fill(proporcionTiempo > 0.3 ? color(40, 150, 80) : color(200, 50, 50));
    rect(this.posX, this.posY - 40, 85, 20, 3);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(11);
    text("CABINA", this.posX, this.posY - 40);
    pop();
  }
}
