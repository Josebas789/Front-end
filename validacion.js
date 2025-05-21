

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formularioRegistro');

  const obligatorios = [
    'nombreUsuario',
    'contrasena',
    'direccionPostal',
    'telefono'
  ];

  function mostrarError(idCampo, mensaje) {
    const errorDiv = document.getElementById(`error-${idCampo}`);
    if (errorDiv) errorDiv.textContent = mensaje;
  }

  function limpiarErrores() {
    [...obligatorios, 'confirmarContrasena', 'entradaAficion', 'paginaWeb']
      .forEach(c => mostrarError(c, ''));
  }

  function validarURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  formulario.addEventListener('submit', e => {
    limpiarErrores();

    let valido = true;
    const data = {};


    obligatorios.forEach(campo => {
      const valor = document.getElementById(campo).value.trim();
      data[campo] = valor;
      if (!valor) {
        mostrarError(campo, 'Este campo es obligatorio');
        valido = false;
      }
    });


    const pwd = document.getElementById('contrasena').value.trim();
    const pwdConf = document.getElementById('confirmarContrasena').value.trim();
    if (pwd && pwdConf && pwd !== pwdConf) {
      mostrarError('confirmarContrasena', 'Las contraseñas no coinciden');
      valido = false;
    }


    const tel = data.telefono;
    if (tel && !/^\+?\d{8,15}$/.test(tel)) {
      mostrarError('telefono', 'Número de teléfono inválido');
      valido = false;
    }

    const web = document.getElementById('paginaWeb').value.trim();
    if (web && !validarURL(web)) {
      mostrarError('paginaWeb', 'URL inválida');
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
