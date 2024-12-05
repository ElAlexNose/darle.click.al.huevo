// Recuperar los datos guardados en localStorage al cargar la página
let puntos = localStorage.getItem('puntos') ? parseInt(localStorage.getItem('puntos')) : 0;
let puntosClick2 = localStorage.getItem('puntosClick2') ? parseInt(localStorage.getItem('puntosClick2')) : 0;
let puntosClick5 = localStorage.getItem('puntosClick5') ? parseInt(localStorage.getItem('puntosClick5')) : 0;
let autoclicker = localStorage.getItem('autoclicker') === 'true' ? true : false;
let autoclickInterval = null;

// Obtener los elementos del DOM
const scoreDisplay = document.getElementById('score');
const egg = document.getElementById('egg');
const shop = document.getElementById('shop');
const shopMenu = document.getElementById('shop-menu');
const buy2PointsBtn = document.getElementById('buy-2-points');
const buy5PointsBtn = document.getElementById('buy-5-points');
const buyAutoclickerBtn = document.getElementById('buy-autoclicker');
const closeShopBtn = document.getElementById('close-shop');

// Función para actualizar la puntuación en la página y en localStorage
function updateScore() {
    scoreDisplay.textContent = `Puntos: ${puntos}`;
    localStorage.setItem('puntos', puntos); // Guardar puntos
    localStorage.setItem('puntosClick2', puntosClick2); // Guardar puntosClick2
    localStorage.setItem('puntosClick5', puntosClick5); // Guardar puntosClick5
    localStorage.setItem('autoclicker', autoclicker); // Guardar estado del autoclicker
}

// Función para manejar el click en el huevo
egg.addEventListener('click', () => {
    let puntosPorClick = 1 + puntosClick2 + puntosClick5; // Cálculo de los puntos por clic
    puntos += puntosPorClick; // Sumar los puntos
    updateScore(); // Actualizar la puntuación y almacenarlos
});

// Función para abrir la tienda
shop.addEventListener('click', () => {
    shopMenu.style.display = 'block'; // Mostrar el menú de la tienda
});

// Función para cerrar la tienda
closeShopBtn.addEventListener('click', () => {
    shopMenu.style.display = 'none'; // Ocultar el menú de la tienda
});

// Funciones para comprar mejoras
buy2PointsBtn.addEventListener('click', () => {
    if (puntos >= 300) {
        puntos -= 300;
        puntosClick2 = 2;
        updateScore();
    } else {
        alert('No tienes suficientes puntos para esta mejora.');
    }
});

buy5PointsBtn.addEventListener('click', () => {
    if (puntos >= 600) {
        puntos -= 600;
        puntosClick5 = 5;
        updateScore();
    } else {
        alert('No tienes suficientes puntos para esta mejora.');
    }
});

buyAutoclickerBtn.addEventListener('click', () => {
    if (puntos >= 100000 && !autoclicker) {
        puntos -= 100000;
        autoclicker = true;
        updateScore();
        startAutoclicker();
    } else if (autoclicker) {
        alert('Ya tienes un autoclicker.');
    } else {
        alert('No tienes suficientes puntos para el autoclicker.');
    }
});

// Función para activar el autoclicker
function startAutoclicker() {
    if (autoclickInterval === null) {
        autoclickInterval = setInterval(() => {
            let puntosPorClick = 1 + puntosClick2 + puntosClick5;
            puntos += puntosPorClick;
            updateScore();
        }, 1000); // Realiza un click cada 1 segundo
    }
}

// Iniciar el autoclicker si ya está activado al cargar la página
if (autoclicker) {
    startAutoclicker();
}

updateScore(); // Inicializar la puntuación al cargar la página
