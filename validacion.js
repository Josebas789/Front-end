// inicio
function inicializarValidacion() {
  const formulario = document.getElementById('formularioRegistro');
  const botonSubmit = formulario.querySelector('button[type="submit"]');

  // mensaje de exito
  let mensajeExito = document.getElementById('mensajeExito');
  if (!mensajeExito) {
    mensajeExito = document.createElement('div');
    mensajeExito.id = 'mensajeExito';
    mensajeExito.className = 'alert alert-success d-none mt-3';
    mensajeExito.textContent = 'Usuario registrado correctamente';
    botonSubmit.parentNode.insertBefore(mensajeExito, botonSubmit.nextSibling);
  }

  // Expresiones regulares
  const usuarioRegex    = /^(?=.{5,10}$)[A-Za-z][A-Za-z]*\d*$/;
  const contrasenaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,6}$/;
  const telefonoRegex   = /^(?:\+?569)\d{8}$/;
  const urlRegex        = /^(?:(?:https?:\/\/)?)[\w-]+(?:\.[\w-]+)+\/?$/;

  // mostrar y corregir errores
  function mostrarError(idCampo, mensaje) {
    const errorDiv = document.getElementById(`error-${idCampo}`);
    if (errorDiv) errorDiv.textContent = mensaje;
  }

  function limpiarErrores() {
    [
      'nombreUsuario', 'contrasena', 'confirmarContrasena',
      'direccionPostal', 'comuna', 'telefono', 'paginaWeb', 'entradaAficion'
    ].forEach(campo => mostrarError(campo, ''));
    mensajeExito.classList.add('d-none');
  }

  // comprobar si es o no valido
  formulario.addEventListener('submit', e => {
    e.preventDefault();
    limpiarErrores();

    let valido = true;

    // Nombre usuario
    const nombre = document.getElementById('nombreUsuario').value.trim();
    if (!nombre) {
      mostrarError('nombreUsuario', 'Este campo es obligatorio');
      valido = false;
    } else if (!usuarioRegex.test(nombre)) {
      mostrarError('nombreUsuario', 'Nombre de usuario no válido. Debe tener 5–10 caracteres, empezar con letra y dígitos solo al final.');
      valido = false;
    }

    // Contraseña
    const pwd = document.getElementById('contrasena').value.trim();
    if (!pwd) {
      mostrarError('contrasena', 'Este campo es obligatorio');
      valido = false;
    } else if (!contrasenaRegex.test(pwd)) {
      mostrarError('contrasena', 'Contraseña inválida. Debe tener 3–6 caracteres, incluir al menos una letra y un dígito.');
      valido = false;
    } else if (nombre && pwd.toLowerCase().includes(nombre.toLowerCase())) {
      mostrarError('contrasena', 'La contraseña no puede contener el nombre de usuario');
      valido = false;
    }

    // Confirmar contraseña
    const pwdConf = document.getElementById('confirmarContrasena').value.trim();
    if (pwd && !pwdConf) {
      mostrarError('confirmarContrasena', 'Confirma la contraseña');
      valido = false;
    } else if (pwd && pwdConf && pwd !== pwdConf) {
      mostrarError('confirmarContrasena', 'Las contraseñas no coinciden');
      valido = false;
    }

    // Direccion
    const dir = document.getElementById('direccionPostal').value.trim();
    if (!dir) {
      mostrarError('direccionPostal', 'Este campo es obligatorio');
      valido = false;
    }

    // Comuna
    const comuna = document.getElementById('comuna').value;
    if (!comuna) {
      mostrarError('comuna', 'Debes seleccionar una comuna');
      valido = false;
    }

    // Telefono
    const tel = document.getElementById('telefono').value.trim();
    if (!tel) {
      mostrarError('telefono', 'Este campo es obligatorio');
      valido = false;
    } else if (!telefonoRegex.test(tel)) {
      mostrarError('telefono', 'Formato inválido (ej: 569XXXXXXXX)');
      valido = false;
    }

    // Pagina web
    const web = document.getElementById('paginaWeb').value.trim();
    if (web && !urlRegex.test(web)) {
      mostrarError('paginaWeb', 'URL inválida (dominio o http://... )');
      valido = false;
    }

    // Aficiones
    const lista = document.getElementById('listaAficiones');
    const afs = Array.from(lista.children).map(li => li.querySelector('span').textContent);
    if (afs.length < 2) {
      mostrarError('entradaAficion', 'Ingresa al menos dos aficiones');
      valido = false;
    }
    document.getElementById('aficionesOcultas').value = afs.join(',');

    // Mostrar mensaje
    if (valido) {
      mensajeExito.classList.remove('d-none');
      // impresion en consola que solo sirve de apoyo para ver si realmente esta funcionando
      console.log('Esta impresion en consola solo sirve de apoyo para ver si realmente esta funcionando')
      console.log('Usuario registrado:', { nombreUsuario: nombre, contrasena: pwd, direccionPostal: dir, comuna, telefono: tel, paginaWeb: web, aficiones: afs });
    }
  });
}


