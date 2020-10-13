"use-strict";

let cuadro1 = [];
let cuadro2 = [];
let score = 0;

document.querySelector("#boton-empezar").onclick = function () {
	let estadoJugando = document.querySelector("#estado-jugando");
	estadoJugando.classList.remove("oculto");
	let botonEmpezar = document.querySelector("#boton-empezar");
	botonEmpezar.classList.add("oculto");
	asignarColores();
	manejarClick();
};

function asignarColores() {
	let colores = [
		"azul",
		"rojo",
		"verde",
		"rosa",
		"negro",
		"amarillo",
		"azul",
		"rojo",
		"verde",
		"rosa",
		"negro",
		"amarillo",
	];

	document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
		let min = 0;
		let max = colores.length - 1;

		numeroRandom = getRandomInt(min, max);
		$cuadro.classList.add(colores[numeroRandom]);
		colores.splice(numeroRandom, 1);
		$cuadro.classList.add("bloqueado");
	});
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function compararClases(a, b) {
	let clasesCuadro1 = document.querySelector(`#${a}`).classList;
	let clasesCuadro2 = document.querySelector(`#${b}`).classList;
	let primerCuadro = document.querySelector(`#${a}`);
	let segundoCuadro = document.querySelector(`#${b}`);
	if (clasesCuadro1.value === clasesCuadro2.value) {
		setTimeout(function () {
			primerCuadro.id = "resuelto";
			segundoCuadro.id = "resuelto";
		}, 500);
		cuadro1 = [];
		cuadro2 = [];
		score = score + 1;
		progresoDelJuego(score);

		return true;
	} else {
		setTimeout(function () {
			primerCuadro.classList.add("bloqueado");
			segundoCuadro.classList.add("bloqueado");
		}, 750);
		cuadro1 = [];
		cuadro2 = [];
		return false;
	}
}

function progresoDelJuego(score) {
	let barraDeProgreso = document.querySelector("#barra-progreso");
	let tableroDelJuego = document.querySelector("#tablero-del-juego");

	if (score > 0) {
		let porcentajeProgreso = score * 20 - 10;
		barraDeProgreso.innerHTML = `<div class="progress-bar" role="progressbar"
		 style="width: ${porcentajeProgreso}%"
		  aria-valuenow="${porcentajeProgreso}"
		   aria-valuemin="0"
		    aria-valuemax="100"></div>`;
	}

	if (score === 6) {
		setTimeout(function () {
			tableroDelJuego.classList.add("oculto");
			alert("Ganaste!!!");
		}, 500);
		return true;
	}
}
function manejarClick() {
	document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
		$cuadro.onclick = function (e) {
			let cuadroSeleccionado = e.target.id;
			if (cuadroSeleccionado.id !== "resuelto") {
				$cuadro.classList.remove("bloqueado");

				if (cuadro1.length === 0) {
					cuadro1.push(cuadroSeleccionado);
				} else if (cuadro1.length > 0) {
					if (cuadro1[0] === cuadroSeleccionado) {
						return false;
					} else if (cuadro1[0] !== cuadroSeleccionado) {
						cuadro2.push(cuadroSeleccionado);
					}
				}
				if ((cuadro1.length > 0) & (cuadro2.length > 0)) {
					compararClases(cuadro1[0], cuadro2[0]);
				}
			}
		};
	});
}
