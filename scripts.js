// Función para alternar el menú
function toggleMenu() {
  const menu = document.getElementById('menu');
  const menuIcon = document.querySelector('.menu-icon');
  menu.classList.toggle('active');
  menuIcon.classList.toggle('active'); // Agrega/quita la clase 'active'
}

// Cerrar el menú al hacer clic fuera de él
document.addEventListener('click', function(event) {
  const menu = document.getElementById('menu');
  const menuIcon = document.querySelector('.menu-icon');

  // Si el clic no es en el ícono ni en el menú, cierra el menú
  if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
    menu.classList.remove('active');
    menuIcon.classList.remove('active');
  }
});

// Detectar el scroll y aplicar un ligero vaivén
let header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // Scroll hacia abajo
    header.style.transform = 'translateY(2px)'; // Reducimos el movimiento hacia abajo
  } else {
    // Scroll hacia arriba
    header.style.transform = 'translateY(0)';
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
