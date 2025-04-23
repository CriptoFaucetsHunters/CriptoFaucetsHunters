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
