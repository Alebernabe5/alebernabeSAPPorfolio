/* =========================================================
   ALEJANDRO BERNABE GUERRERO — SAP-FIRST PORTFOLIO JS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initMobileMenu();
  initActiveNav();
});


/* ---------------------------------------------------------
   ANIMACIONES DE ENTRADA AL HACER SCROLL
   --------------------------------------------------------- */

function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  // Si el navegador no soporta IntersectionObserver,
  // mostramos directamente todos los elementos.
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Dejamos de observarlo una vez que aparece.
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -35px 0px'
  });

  elements.forEach(el => observer.observe(el));
}


/* ---------------------------------------------------------
   MENÚ RESPONSIVE PARA MÓVIL
   --------------------------------------------------------- */

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');

  // Si no existen los elementos, no hacemos nada.
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {

    // Abrir / cerrar menú
    const open = links.classList.toggle('open');

    // Actualizar accesibilidad
    toggle.setAttribute(
      'aria-expanded',
      String(open)
    );

    // Cambiar icono hamburguesa / X
    toggle.innerHTML = open
      ? '<i class="ti ti-x"></i>'
      : '<i class="ti ti-menu-2"></i>';
  });


  // Cuando pulsamos un enlace del menú,
  // cerramos automáticamente el menú móvil.
  links.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      links.classList.remove('open');

      toggle.setAttribute(
        'aria-expanded',
        'false'
      );

      toggle.innerHTML =
        '<i class="ti ti-menu-2"></i>';
    });

  });
}


/* ---------------------------------------------------------
   NAVEGACIÓN ACTIVA
   --------------------------------------------------------- */

function initActiveNav() {

  const sections = [
    ...document.querySelectorAll('main section[id]')
  ];

  const links = [
    ...document.querySelectorAll('.nav-links a')
  ];

  if (!sections.length || !links.length) return;


  function setActive() {

    // Compensamos la altura del navbar.
    const position = window.scrollY + 155;

    let current = sections[0].id;


    // Buscamos la última sección que hemos alcanzado.
    sections.forEach(section => {

      if (position >= section.offsetTop) {
        current = section.id;
      }

    });


    // Marcamos el enlace correspondiente.
    links.forEach(link => {

      const active =
        link.getAttribute('href') === `#${current}`;

      link.classList.toggle(
        'active',
        active
      );

    });
  }


  // Actualizamos mientras hacemos scroll.
  window.addEventListener(
    'scroll',
    setActive,
    { passive: true }
  );


  // Ejecutamos una primera vez al cargar.
  setActive();
}