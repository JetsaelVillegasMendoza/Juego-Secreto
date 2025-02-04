// let titulo = document.querySelector('h1'); //=> 'h1' no es un texto, sino un objeto.
// titulo.innerHTML = 'Juego del número secreto';

// let parrafo = document.querySelector('p');
// parrafo.innerHTML = 'Indica un número del 1 al 10:';

let numeroSecreto = 0;
let intentos = 0;
let numeroMaximoIntentos = 3;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento); //=> 'h1' no es un texto, sino un objeto.
    elementoHTML.innerHTML = texto;
    return;
};

function verificarIntento() {
    let numeroDeUSuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUSuario === numeroSecreto){
        asignarTextoElemento('p', `¡Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        //El usuario no acertó.
        if (numeroDeUSuario > numeroSecreto){
            asignarTextoElemento('p', 'El número secreto es menor.');
        } else{
            asignarTextoElemento('p', 'El número secreto es mayor.');
        }
        intentos++;

        if (intentos > numeroMaximoIntentos) {
            asignarTextoElemento('p', `¡Has alcanzado el máximo de intentos! El número secreto era ${numeroSecreto}.`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        };

        limpiarCaja()
    }
    return;
}; //=>Declarción de la función

function limpiarCaja() {
    // document.querySelector('#valorUsuario');
    // valorCaja.value = '';
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor((Math.random()* numeroMaximo)) +1;

    console.log(numeroGenerado)
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles.');//=>No retorna valor (undefined)
    
    } else{
        //Si el número generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();

        } else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;

        }; 

    };
    
};

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}:`);
    numeroSecreto = generarNumeroSecreto(); //=> Undefined si ya se sortearon todos los números posibles
    intentos = 1;
    
};

function reiniciarJuego(){
    //Limpiar la caja
    limpiarCaja();
    //Indicar condiciones iniciales
    condicionesIniciales();
    //Desabilitar el botón de nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
};

condicionesIniciales();