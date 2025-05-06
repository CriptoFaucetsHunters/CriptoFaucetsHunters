document.addEventListener("DOMContentLoaded", function(){
  // Cargar los fragmentos del header y footer
  loadHTMLFragment("header", "header.html");
  loadHTMLFragment("footer", "footer.html");
  
  // Manejo del clic fuera del menú para cerrarlo
  document.addEventListener("click", function(e){
    const sidebar = document.getElementById("sidebar");
    const menuButton = document.getElementById("menu-button");
    if (!sidebar) return;
    
    if (sidebar.classList.contains("active") &&
        !sidebar.contains(e.target) &&
        !menuButton.contains(e.target)) {
      toggleSidebar();
    }
  });
  
  // Manejo de submenus
  let submenuParents = document.querySelectorAll('.menu-item.has-submenu > a');
  submenuParents.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault(); // Prevenir navegación
      let submenu = item.nextElementSibling;
      let icon = item.querySelector('.submenu-toggle');
      if (submenu) {
        submenu.classList.toggle('open');
        if (submenu.classList.contains('open')) {
          icon.classList.remove('fa-chevron-right');
          icon.classList.add('fa-chevron-down');
        } else {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-right');
        }
      }
    });
  });
});

// Función para cargar fragmentos HTML (header/footer)
function loadHTMLFragment(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (id === "header") addMenuToggle();
    })
    .catch(error => console.error('Error al cargar ' + file + ':', error));
}

// Agregar el manejador de clic en el botón del menú
function addMenuToggle() {
  const menuButton = document.getElementById("menu-button");
  menuButton.addEventListener("click", function(e){
    e.stopPropagation();
    toggleSidebar();
  });
}

// Función para alternar la visibilidad del menú lateral y la transformación del botón
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const menuButton = document.getElementById("menu-button");
  if (sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    menuButton.classList.remove("open");
  } else {
    sidebar.classList.add("active");
    menuButton.classList.add("open");
  }
}
