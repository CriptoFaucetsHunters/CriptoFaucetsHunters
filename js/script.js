// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function(){
  // Utiliza window.fragmentBasePath si está definida (en páginas en subcarpetas) o una cadena vacía
  var basePath = window.fragmentBasePath || "";
  
  // Cargar el fragmento del header y el footer usando la ruta base definida
  loadHTMLFragment("header", basePath + "header.html");
  loadHTMLFragment("footer", basePath + "footer.html");
  
  // Cierra el menú lateral al hacer clic fuera de él
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
});

// Función para cargar fragmentos HTML (header/footer)
function loadHTMLFragment(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error " + response.status + " al cargar " + file);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (id === "header") {
        addMenuToggle();
        updateHomeLink();
        attachSubmenuListeners(); // Se agregan los listeners para los submenús
      }
    })
    .catch(error => console.error('Error al cargar ' + file + ':', error));
}

// Función que asigna el manejador para el botón de menú hamburguesa
function addMenuToggle() {
  const menuButton = document.getElementById("menu-button");
  menuButton.addEventListener("click", function(e) {
    e.stopPropagation();
    toggleSidebar();
  });
}

// Función para alternar la visibilidad del menú lateral y la animación del botón
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

// Función para actualizar el enlace "Inicio" usando la variable global basePath
function updateHomeLink() {
  var homeLink = document.getElementById("home-link");
  if (homeLink) {
    // Actualiza el href para que apunte correctamente a la home (index.html en la raíz)
    homeLink.href = (window.fragmentBasePath || "") + "index.html";
  }
}

// Función para asignar los manejadores de los submenús
function attachSubmenuListeners() {
  let submenuParents = document.querySelectorAll('.menu-item.has-submenu > a');
  submenuParents.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault(); // Prevenir la navegación por defecto
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
}
