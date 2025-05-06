document.addEventListener("DOMContentLoaded", function(){
  // Cargar fragmentos del header y footer
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
      if(id === "header") addMenuToggle();
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

// Alternar la visibilidad del menú lateral
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const menuButton = document.getElementById("menu-button");
  if (sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    resetHamburger();
  } else {
    sidebar.classList.add("active");
    transformHamburgerToX();
  }
}

// Transforma el ícono de hamburguesa en "X"
function transformHamburgerToX() {
  const hamburger = document.querySelector("#menu-button .hamburger");
  if (hamburger) {
    hamburger.style.transform = "rotate(45deg)";
    hamburger.style.backgroundColor = "#E74C3C";
  }
}

// Restaura el icono a su estado original
function resetHamburger() {
  const hamburger = document.querySelector("#menu-button .hamburger");
  if (hamburger) {
    hamburger.style.transform = "rotate(0deg)";
    hamburger.style.backgroundColor = "#1ABC9C";
  }
}
