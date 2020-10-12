"use-strict";

let cuadro1 = [];
let cuadro2 = [];

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

function compararCuadros(a, b) {
	let tableroDelJuego = document.querySelector("#tablero-del-juego");
	let cuadrosNoResueltos = document.querySelectorAll(".bloqueado");
	let clasesCuadro1 = document.querySelector(`#${a}`).classList;
	let clasesCuadro2 = document.querySelector(`#${b}`).classList;
	let primerCuadro = document.querySelector(`#${a}`);
	let segundoCuadro = document.querySelector(`#${b}`);
	if (clasesCuadro1.value === clasesCuadro2.value) {
		setTimeout(function () {
			//primerCuadro.classList.add("resuelto");
			primerCuadro.id = "resuelto";
			//segundoCuadro.classList.add("resuelto");
			segundoCuadro.id = "resuelto";
		}, 500);
		cuadro1 = [];
		cuadro2 = [];
	} else {
		setTimeout(function () {
			primerCuadro.classList.add("bloqueado");
			segundoCuadro.classList.add("bloqueado");
		}, 750);
		cuadro1 = [];
		cuadro2 = [];
	}
	if (cuadrosNoResueltos.length == 0) {
		tableroDelJuego.classList.add("oculto");
		alert("Ganaste!!!");
	}
}

function manejarClick() {
	document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
		$cuadro.onclick = function (e) {
			let cuadroSeleccionado = e.target.id;
			//console.log(cuadroSeleccionado);
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
					compararCuadros(cuadro1[0], cuadro2[0]);
				}
			}
		};
	});
}
