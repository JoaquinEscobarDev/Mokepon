const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");

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

let mokepones = [];
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let iAtaqueJugador;
let iAtaqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let victoriasJugador = 0;
let victoriasEnemigo = 0;

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let hipodoge = new Mokepon(
    "Hipodoge",
    "./assets/mokepons_mokepon_hipodoge_attack.png",
    5
);

let capipepo = new Mokepon(
    "Capipepo",
    "./assets/mokepons_mokepon_capipepo_attack.png",
    5
);

let ratigueya = new Mokepon(
    "Ratigueya",
    "./assets/mokepons_mokepon_ratigueya_attack.png",
    5
);

hipodoge.ataques.push(
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" }
);

capipepo.ataques.push(
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" }
);

ratigueya.ataques.push(
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" }
);

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none";

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `

        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        
        `;

        contenedorTarjetas.innerHTML += opcionDeMokepones;
        inputHipodoge = document.getElementById("Hipodoge");
        inputCapipepo = document.getElementById("Capipepo");
        inputRatigueya = document.getElementById("Ratigueya");
    });

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = "none";
    sectionSeleccionarAtaque.style.display = "flex";

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

    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }

    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `

        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>

        `;

        contenedorAtaques.innerHTML += ataquesMokepon;
    });

    botonFuego = document.getElementById("boton-fuego");
    botonAgua = document.getElementById("boton-agua");
    botonTierra = document.getElementById("boton-tierra");
    botones = document.querySelectorAll(".BAtaque");

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO");
                console.log(ataqueJugador);
                boton.style.background = "red";
            }else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA");
                console.log(ataqueJugador);
                boton.style.background = "blue";
            }else if (e.target.textContent === "🌱") {
                ataqueJugador.push("TIERRA");
                console.log(ataqueJugador);
                boton.style.background = "green";
            }
            ataqueAleatorioEnemigo();
        });
    });
    
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
    secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("FUEGO");
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("AGUA");
    } else {
        ataqueEnemigo.push("TIERRA");
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
}

function iniciarPelea() {
    if(ataqueJugador.length === 5){
        combate();
    };
}

function iAmbosOponentes(jugador, enemigo) {
    iAtaqueJugador = ataqueJugador[jugador];
    iAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
    // Reinicia los contadores en cada combate
    victoriasJugador = 0;
    victoriasEnemigo = 0;

    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            iAmbosOponentes(i, i);
            crearMensaje("EMPATE");
        } else if (
            (ataqueJugador[i] === "FUEGO" && ataqueEnemigo[i] === "TIERRA") ||
            (ataqueJugador[i] === "AGUA" && ataqueEnemigo[i] === "FUEGO") ||
            (ataqueJugador[i] === "TIERRA" && ataqueEnemigo[i] === "AGUA")
        ) {
            iAmbosOponentes(i, i);
            crearMensaje("GANASTE");
            victoriasJugador++;
        } else {
            iAmbosOponentes(i, i);
            crearMensaje("PERDISTE");
            victoriasEnemigo++;
        }
    }

    // Actualiza las vidas después de procesar todos los ataques
    spanVidasJugador.innerHTML = victoriasJugador;
    spanVidasEnemigo.innerHTML = victoriasEnemigo;

    revisarVidas();
}

function revisarVidas() {
    if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)");
    } else if (victoriasJugador < victoriasEnemigo) {
        crearMensajeFinal("Lo siento, perdiste :(");
    } else {
        crearMensajeFinal("Wow, es un empate!");
    }
}


function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p");
    let nuevoAtaqueDelEnemigo = document.createElement("p");

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = iAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = iAtaqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal;

    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;

    sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
