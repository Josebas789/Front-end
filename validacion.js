document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formularioRegistro');
  const usuarioRegex = /^(?=.{5,10}$)[A-Za-z][A-Za-z]*\d*$/;
  const contrasenaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,6}$/;
  const telefonoRegex = /^(?:\+?569)\d{8}$/;
  const urlRegex = /^(?:(?:https?:\/\/)?)[\w-]+(?:\.[\w-]+)+\/?$/;

  function mostrarError(idCampo, mensaje) {
    const errorDiv = document.getElementById(`error-${idCampo}`);
    if (errorDiv) errorDiv.textContent = mensaje;
  }

  function limpiarErrores() {
    [
      'nombreUsuario', 'contrasena', 'confirmarContrasena',
      'direccionPostal', 'comuna', 'telefono', 'paginaWeb', 'entradaAficion'
    ].forEach(campo => mostrarError(campo, ''));
  }

  formulario.addEventListener('submit', e => {
    limpiarErrores();
    let valido = true;

    const nombre = document.getElementById('nombreUsuario').value.trim();
    if (!nombre) {
      mostrarError('nombreUsuario', 'Este campo es obligatorio');
      valido = false;
    } else if (!usuarioRegex.test(nombre)) {
      mostrarError('nombreUsuario', 'Nombre inválido. Debe comenzar con letra, 5-10 caracteres, dígitos solo al final');
      valido = false;
    }

    const pwd = document.getElementById('contrasena').value.trim();
    if (!pwd) {
      mostrarError('contrasena', 'Este campo es obligatorio');
      valido = false;
    } else if (!contrasenaRegex.test(pwd)) {
      mostrarError('contrasena', 'La contraseña debe tener 3-6 caracteres y contener al menos una letra y un dígito');
      valido = false;
    } else if (nombre && pwd.toLowerCase().includes(nombre.toLowerCase())) {
      mostrarError('contrasena', 'La contraseña no puede contener el nombre de usuario');
      valido = false;
    }

    const pwdConf = document.getElementById('confirmarContrasena').value.trim();
    if (pwd && !pwdConf) {
      mostrarError('confirmarContrasena', 'Confirma la contraseña');
      valido = false;
    } else if (pwd && pwdConf && pwd !== pwdConf) {
      mostrarError('confirmarContrasena', 'Las contraseñas no coinciden');
      valido = false;
    }

    const dir = document.getElementById('direccionPostal').value.trim();
    if (!dir) {
      mostrarError('direccionPostal', 'Este campo es obligatorio');
      valido = false;
    }

    const comuna = document.getElementById('comuna').value;
    if (!comuna) {
      mostrarError('comuna', 'Debes seleccionar una comuna');
      valido = false;
    }

    const tel = document.getElementById('telefono').value.trim();
    if (!tel) {
      mostrarError('telefono', 'Este campo es obligatorio');
      valido = false;
    } else if (!telefonoRegex.test(tel)) {
      mostrarError('telefono', 'Formato inválido (debe ser 569XXXXXXXX)');
      valido = false;
    }

    const web = document.getElementById('paginaWeb').value.trim();
    if (web && !urlRegex.test(web)) {
      mostrarError('paginaWeb', 'URL inválida. Debe ser dominio (ej: best.aliexpress.com) o con http:// o https://');
      valido = false;
    }

    const lista = document.getElementById('listaAficiones');
    const afs = Array.from(lista.children).map(li => li.querySelector('span').textContent);
    if (afs.length < 2) {
      mostrarError('entradaAficion', 'Debes ingresar al menos dos aficiones');
      valido = false;
    }
    document.getElementById('aficionesOcultas').value = afs.join(',');

    if (!valido) e.preventDefault();
  });
});
