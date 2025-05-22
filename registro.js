// lista de aficiones

const botonAgregarAficion = document.getElementById('botonAgregarAficion');
const entradaAficion = document.getElementById('entradaAficion');
const listaAficiones = document.getElementById('listaAficiones');
const aficionesOcultas = document.getElementById('aficionesOcultas');
const formularioRegistro = document.getElementById('formularioRegistro');

function crearItemAficion(aficion) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';

  const span = document.createElement('span');
  span.textContent = aficion;

  const btnEliminar = document.createElement('button');
  btnEliminar.type = 'button';
  btnEliminar.className = 'btn btn-sm btn-outline-danger';
  btnEliminar.textContent = 'x';
  btnEliminar.addEventListener('click', () => li.remove());

  li.appendChild(span);
  li.appendChild(btnEliminar);
  return li;
}

botonAgregarAficion.addEventListener('click', () => {
  const aficion = entradaAficion.value.trim();
  if (aficion) {
    const item = crearItemAficion(aficion);
    listaAficiones.appendChild(item);
    entradaAficion.value = '';
  }
});

formularioRegistro.addEventListener('submit', (e) => {
  const aficiones = Array.from(listaAficiones.children)
    .map(li => li.querySelector('span').textContent);
  aficionesOcultas.value = aficiones.join(',');
  e.preventDefault();
});
