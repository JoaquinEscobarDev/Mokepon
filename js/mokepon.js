// Elementos HTML que se utilizarán para interactuar con el DOM
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const sectionReiniciarMapa = document.getElementById("reiniciarMapa");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");
const botonReiniciarMapa = document.getElementById("boton-reiniciar-mapa");

const sectionSeleccionarMascota = document.getElementById(
  "seleccionar-mascota"
);
const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");
const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");
const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");



// Variables que almacenan la información de los Mokepones, ataques, y estado del juego
let mokepones = [];
let opcionDeMokepones;
let inputHipodoge, inputCapipepo, inputRatigueya;
let mascotaJugador;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego, botonAgua, botonTierra;
let botones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let iAtaqueJugador, iAtaqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let mascotaJugadorObj;
let lienzo = mapa.getContext("2d"); // Contexto del canvas
let intervalo = setInterval(pintarCanvas, 1000 / 60); // Intervalo para pintar el personaje
let mapaBackground = new Image(); // Imagen de fondo del mapa
mapaBackground.src = "./assets/fondoMapa.jpg"; // Ruta de la imagen de fondo

// Clase Mokepon que define los atributos de cada mascota
class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.x = 20;
    this.y = 30;
    this.ancho = 35;
    this.alto = 35;
    this.mapaFoto = new Image();
    this.mapaFoto.src = foto;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
}

// Creación de instancias de Mokepones
let hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  3
);

let capipepo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  3
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  3
);

// Definición de ataques para cada Mokepon
hipodoge.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);

capipepo.ataques.push(
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" }
);

ratigueya.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🌱", id: "boton-tierra" }
);

// Agregar las instancias de Mokepon a la lista de mokepones
mokepones.push(hipodoge, capipepo, ratigueya);

// Función que inicializa el juego
function iniciarJuego() {
  // Se oculta la sección de selección de ataques al inicio
  sectionSeleccionarAtaque.style.display = "none";
  sectionVerMapa.style.display = "none";

  // Creación de las opciones para elegir Mokepon en el DOM
  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;
  });

  // Obtener las referencias a los inputs de las mascotas
  inputHipodoge = document.getElementById("Hipodoge");
  inputCapipepo = document.getElementById("Capipepo");
  inputRatigueya = document.getElementById("Ratigueya");

  // Agregar event listeners a los botones de mascota y reiniciar
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

// Función que selecciona la mascota del jugador
function seleccionarMascotaJugador() {
  // Oculta la sección de selección de mascota y muestra la sección de ataques
  sectionSeleccionarMascota.style.display = "none";
  // sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "flex";
  

  // Valida que el jugador haya seleccionado una mascota
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert("Selecciona una mascota");
  }

  // Después de seleccionar la mascota, extrae los ataques correspondientes
  extraerAtaques(mascotaJugador);
  iniciarMapa();
  // Selecciona la mascota enemiga de forma aleatoria
  seleccionarMascotaEnemigo();
}

// Función para extraer los ataques del Mokepon seleccionado por el jugador
function extraerAtaques(mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }

  mostrarAtaques(ataques);
}

// Función que muestra los botones de ataque según los ataques del Mokepon
function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });

  // Obtener las referencias a los botones de ataque
  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonTierra = document.getElementById("boton-tierra");
  botones = document.querySelectorAll(".BAtaque");
}

// Función que maneja la secuencia de ataques del jugador y del enemigo
function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      // Registro del ataque del jugador
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("FUEGO");
        boton.style.background = "red";
        boton.disabled = true;
      } else if (e.target.textContent === "💧") {
        ataqueJugador.push("AGUA");
        boton.style.background = "blue";
        boton.disabled = true;
      } else if (e.target.textContent === "🌱") {
        ataqueJugador.push("TIERRA");
        boton.style.background = "green";
        boton.disabled = true;
      }
      ataqueAleatorioEnemigo();
    });
  });
}

// Función que selecciona al Mokepon enemigo de manera aleatoria
function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

  spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
  ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
  secuenciaAtaque();
}

// Función que genera el ataque aleatorio del enemigo
function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

  if (ataqueAleatorio == 0) {
    ataqueEnemigo.push("FUEGO");
  } else if (ataqueAleatorio == 1) {
    ataqueEnemigo.push("AGUA");
  } else {
    ataqueEnemigo.push("TIERRA");
  }
  iniciarPelea();
}

// Función que verifica si ambos jugadores han atacado y llama a la función de combate
function iniciarPelea() {
  if (ataqueJugador.length === 3) {
    combate();
  }
}

// Función que define los ataques de ambos jugadores para compararlos
function iAmbosOponentes(jugador, enemigo) {
  iAtaqueJugador = ataqueJugador[jugador];
  iAtaqueEnemigo = ataqueEnemigo[enemigo];
}

// Función que realiza la comparación de ataques y actualiza el resultado del combate
function combate() {
  for (let i = 0; i < ataqueJugador.length; i++) {
    // Verifica si los ataques son iguales, lo cual es un empate
    if (ataqueJugador[i] === ataqueEnemigo[i]) {
      iAmbosOponentes(i, i);
      crearMensaje("EMPATE");
      victoriasEnemigo = victoriasEnemigo;
      victoriasJugador = victoriasJugador;
    }
    // Verifica las victorias del jugador
    else if (ataqueJugador[i] === "FUEGO" && ataqueEnemigo[i] === "TIERRA") {
      iAmbosOponentes(i, i);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[i] === "AGUA" && ataqueEnemigo[i] === "FUEGO") {
      iAmbosOponentes(i, i);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[i] === "TIERRA" && ataqueEnemigo[i] === "AGUA") {
      iAmbosOponentes(i, i);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    }
    // Verifica las victorias del enemigo
    else {
      iAmbosOponentes(i, i);
      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }

  // Al finalizar el ciclo, revisa quién ganó
  revisarVidas();
}

function revisarVidas() {
  // Revisa si el jugador ha ganado
  if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("FELICITACIONES! Ganaste :)");
  }
  // Revisa si el enemigo ha ganado
  else if (victoriasEnemigo > victoriasJugador) {
    crearMensajeFinal("Lo siento, perdiste :(");
  }
  // Si hay empate en victorias
  else {
    crearMensajeFinal("Wow, es un empate!");
  }
}

// Función que crea un mensaje para mostrar los resultados de un ataque
function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = iAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = iAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

// Función que muestra el mensaje final cuando termina el juego
function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  sectionReiniciar.style.display = "block";
}

// Función que reinicia el juego al recargar la página
function reiniciarJuego() {
  location.reload();
}

// Función que genera un número aleatorio entre un rango específico
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function pintarCanvas() {
    
    
    botonReiniciarMapa.addEventListener("click", reiniciarJuego);
    mascotaJugadorObj.x += mascotaJugadorObj.velocidadX; // Mueve el personaje en el eje X
    mascotaJugadorObj.y += mascotaJugadorObj.velocidadY; // Mueve el personaje en el eje Y

  lienzo.clearRect(0, 0, mapa.width, mapa.height); // Limpia el canvas
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height); // Dibuja el fondo del mapa
  lienzo.drawImage(
    mascotaJugadorObj.mapaFoto,
    mascotaJugadorObj.x,
    mascotaJugadorObj.y,
    mascotaJugadorObj.ancho,
    mascotaJugadorObj.alto
  ); // Dibuja la imagen en el canvas
}

function obtenerMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}


function presionTecla(e) {
  switch (e.key) {
    case "ArrowRight":
      moverDerecha();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
  }
}

function moverDerecha() {
    
    mascotaJugadorObj.velocidadX = 5;
}
function moverIzquierda() {
    
    mascotaJugadorObj.velocidadX = -5;
}
function moverArriba() {
    
    mascotaJugadorObj.velocidadY = -5;
}
function moverAbajo() {
    
    mascotaJugadorObj.velocidadY = 5;
}

function detener() {
    
    mascotaJugadorObj.velocidadX = 0;
    mascotaJugadorObj.velocidadY = 0;
}

function iniciarMapa() {
  mapa.width = 800;
  mapa.height = 600;
  mascotaJugadorObj = obtenerMascota();

  intervalo = setInterval(pintarCanvas, 1000 / 60);

  window.addEventListener("keydown", presionTecla);
  window.addEventListener("keyup", detener);
}

// Evento que ejecuta la función iniciarJuego cuando la página se carga
window.addEventListener("load", iniciarJuego);
