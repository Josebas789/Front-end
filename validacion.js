

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formularioRegistro');
  const telefonoRegex = /^(?:\+?569)\d{8}$/;
  const urlRegex = /^(?:(?:https?:\/\/)?)[\w-]+(?:\.[\w-]+)+\/?$/;

  function mostrarError(idCampo, mensaje) {
    const errorDiv = document.getElementById(`error-${idCampo}`);
    if (errorDiv) errorDiv.textContent = mensaje;
  }

  function limpiarErrores() {
    ['nombreUsuario', 'contrasena', 'confirmarContrasena', 'direccionPostal', 'telefono', 'paginaWeb', 'entradaAficion']
      .forEach(campo => mostrarError(campo, ''));
  }

  formulario.addEventListener('submit', e => {
    limpiarErrores();
    let valido = true;

    const nombre = document.getElementById('nombreUsuario').value.trim();
    if (!nombre) {
      mostrarError('nombreUsuario', 'Este campo es obligatorio');
      valido = false;
    }

    const pwd = document.getElementById('contrasena').value.trim();
    if (!pwd) {
      mostrarError('contrasena', 'Este campo es obligatorio');
      valido = false;
    }

    const pwdConf = document.getElementById('confirmarContrasena').value.trim();
    if (pwd && pwdConf && pwd !== pwdConf) {
      mostrarError('confirmarContrasena', 'Las contraseñas no coinciden');
      valido = false;
    }

    const dir = document.getElementById('direccionPostal').value.trim();
    if (!dir) {
      mostrarError('direccionPostal', 'Este campo es obligatorio');
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
      mostrarError('paginaWeb', 'URL inválida. Debe ser dominio (ej: midominio.com) o con http:// o https://');
      valido = false;
    }

    const lista = document.getElementById('listaAficiones');
    const afs = Array.from(lista.children)
      .map(li => li.querySelector('span').textContent);
    document.getElementById('aficionesOcultas').value = afs.join(',');

    if (!valido) {
      e.preventDefault();
    }
  });
});
