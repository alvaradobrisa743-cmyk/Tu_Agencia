/* ============================================================ */
/* INICIALIZACIÓN GENERAL                                       */
/* ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

    /* ============================================================ */
    /* MENÚ HAMBURGUESA (MÓVIL)                                     */
    /* ============================================================ */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ============================================================ */
    /* EFECTO SCROLL EN LA NAVBAR                                   */
    /* ============================================================ */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }

    /* ============================================================ */
    /* CARRUSEL (SOLO FUNCIONA SI EXISTE EN LA PÁGINA ACTUAL)       */
    /* ============================================================ */
    const slides = document.querySelectorAll('.slide');

    if (slides.length > 0) {
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.slider-arrow.prev');
        const nextBtn = document.querySelector('.slider-arrow.next');

        let slideActual = 0;
        let intervalo;
        const TIEMPO_AUTOPLAY = 5000; // 5 segundos

        function mostrarSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            if (index >= slides.length) slideActual = 0;
            else if (index < 0) slideActual = slides.length - 1;
            else slideActual = index;

            slides[slideActual].classList.add('active');
            if (dots[slideActual]) dots[slideActual].classList.add('active');
        }

        function siguienteSlide() { mostrarSlide(slideActual + 1); }
        function anteriorSlide()  { mostrarSlide(slideActual - 1); }

        function iniciarAutoplay() { intervalo = setInterval(siguienteSlide, TIEMPO_AUTOPLAY); }
        function detenerAutoplay() { clearInterval(intervalo); }
        function reiniciarAutoplay() { detenerAutoplay(); iniciarAutoplay(); }

        if (nextBtn) nextBtn.addEventListener('click', () => { siguienteSlide(); reiniciarAutoplay(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { anteriorSlide(); reiniciarAutoplay(); });

        dots.forEach(dot => {
            dot.addEventListener('click', function () {
                slideActual = parseInt(this.getAttribute('data-index'));
                mostrarSlide(slideActual);
                reiniciarAutoplay();
            });
        });

        mostrarSlide(0);
        iniciarAutoplay();
    }

    /* ============================================================ */
    /* FILTRO DEL PORTAFOLIO (SOLO SI EXISTE)                       */
    /* ============================================================ */
    const filtrosBtns = document.querySelectorAll('.filtro-btn');
    const portafolioItems = document.querySelectorAll('.portafolio-item');

    if (filtrosBtns.length > 0 && portafolioItems.length > 0) {
        filtrosBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filtrosBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filtro = this.getAttribute('data-filtro');

                portafolioItems.forEach(item => {
                    const categoria = item.getAttribute('data-categoria');
                    if (filtro === 'todos' || categoria === filtro) {
                        item.classList.remove('oculto');
                    } else {
                        item.classList.add('oculto');
                    }
                });
            });
        });
    }

    /* ============================================================ */
    /* VALIDACIÓN DEL FORMULARIO DE CONTACTO                        */
    /* ============================================================ */
    const formulario = document.getElementById('formulario-contacto');

    if (formulario) {
        const inputNombre = document.getElementById('nombre');
        const inputEmail = document.getElementById('email');
        const inputMensaje = document.getElementById('mensaje');
        const errorNombre = document.getElementById('error-nombre');
        const errorEmail = document.getElementById('error-email');
        const errorMensaje = document.getElementById('error-mensaje');
        const formExito = document.getElementById('form-exito');

        formulario.addEventListener('submit', function (e) {
            e.preventDefault();
            let valido = true;

            // Validar nombre
            if (inputNombre.value.trim() === '') {
                errorNombre.textContent = 'Por favor, ingresa tu nombre.';
                inputNombre.parentElement.classList.add('error');
                valido = false;
            } else {
                errorNombre.textContent = '';
                inputNombre.parentElement.classList.remove('error');
            }

            // Validar correo
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const valorEmail = inputEmail.value.trim();

            if (valorEmail === '') {
                errorEmail.textContent = 'Por favor, ingresa tu correo.';
                inputEmail.parentElement.classList.add('error');
                valido = false;
            } else if (!regexEmail.test(valorEmail)) {
                errorEmail.textContent = 'Ingresa un correo válido.';
                inputEmail.parentElement.classList.add('error');
                valido = false;
            } else {
                errorEmail.textContent = '';
                inputEmail.parentElement.classList.remove('error');
            }

            // Validar mensaje (solo si el campo existe en la página)
            if (inputMensaje && errorMensaje) {
                if (inputMensaje.value.trim() === '') {
                    errorMensaje.textContent = 'Cuéntanos un poco sobre tu proyecto.';
                    inputMensaje.parentElement.classList.add('error');
                    valido = false;
                } else {
                    errorMensaje.textContent = '';
                    inputMensaje.parentElement.classList.remove('error');
                }
            }

            // Éxito
            if (valido) {
                formExito.textContent = '¡Solicitud enviada con éxito! Te contactaremos pronto.';
                formulario.reset();
                setTimeout(() => { formExito.textContent = ''; }, 6000);
            }
        });

        // Limpiar errores al escribir
        inputNombre.addEventListener('input', function () {
            if (this.value.trim() !== '') {
                errorNombre.textContent = '';
                this.parentElement.classList.remove('error');
            }
        });

        inputEmail.addEventListener('input', function () {
            if (this.value.trim() !== '') {
                errorEmail.textContent = '';
                this.parentElement.classList.remove('error');
            }
        });

        if (inputMensaje && errorMensaje) {
            inputMensaje.addEventListener('input', function () {
                if (this.value.trim() !== '') {
                    errorMensaje.textContent = '';
                    this.parentElement.classList.remove('error');
                }
            });
        }
    }

});