const cursos = [];
let cursoIdCounter = 1;

// si no existe lista global de estudiantes, usar ejemplo
const estudiantesGlobal = window.estudiantes || [
  "Ana Torres",
  "Bruno Díaz",
  "Carla Jiménez",
  "Diego Morales",
  "Elisa Rojas",
];

function mostrarModalCrearCurso() {
  document.getElementById("modalCrearCurso").style.display = "flex";
}

function cerrarModalCrearCurso() {
  document.getElementById("modalCrearCurso").style.display = "none";
  // limpiar campos
  [
    "curso_nombre",
    "curso_codigo",
    "curso_categoria",
    "curso_inicio",
    "curso_termino",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

function crearCurso() {
  const nombre = document.getElementById("curso_nombre").value.trim();
  const codigo = document.getElementById("curso_codigo").value.trim();
  const categoria = document.getElementById("curso_categoria").value.trim();
  const inicio = document.getElementById("curso_inicio").value;
  const termino = document.getElementById("curso_termino").value;

  if (!nombre || !codigo) {
    alert("Nombre y código son obligatorios.");
    return;
  }

  const curso = {
    id: cursoIdCounter++,
    nombre,
    codigo,
    categoria,
    inicio,
    termino,
    estudiantes: [], // lista de nombres asignados
  };

  cursos.push(curso);
  cerrarModalCrearCurso();
  renderCursos();
}

function renderCursos() {
  const cont = document.getElementById("cursosList");
  cont.innerHTML = "";
  cursos.forEach((c) => {
    const card = document.createElement("div");
    card.style.border = "1px solid #ccc";
    card.style.padding = "10px";
    card.style.borderRadius = "6px";
    card.style.display = "flex";
    card.style.justifyContent = "space-between";
    card.style.alignItems = "center";
    card.innerHTML = `
            <div>
                <strong>${c.nombre}</strong> <small>(${c.codigo})</small><br>
                <small>${c.categoria || ""} • ${c.inicio || "--"} → ${
      c.termino || "--"
    }</small><br>
                <small>Estudiantes: ${c.estudiantes.length}</small>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;">
                <button onclick="mostrarModalAsignar(${
                  c.id
                })">Asignar estudiantes</button>
                <button onclick="verEstudiantes(${
                  c.id
                })">Ver estudiantes</button>
            </div>
        `;
    cont.appendChild(card);
  });
}

// ver estudiantes asignados en alerta

// Asegurar estructura global de cursos si no existe (controller.js puede declarar cursos)
window.cursos = window.cursos || [];
window.cursoIdCounter = window.cursoIdCounter || 1;

let _cursoAsignarId = null;
let _tempEstudiantes = [];

// abre el modal para un curso concreto
function mostrarModalAsignar(cursoId) {
    _cursoAsignarId = cursoId;
    const modal = document.getElementById('modalAsignar');
    const listaTemp = document.getElementById('listaTempEstudiantes');
    const listaAsignados = document.getElementById('listaAsignados');

    const curso = window.cursos.find(c => c.id === cursoId);
    // si el curso no existe, iniciar temp vacío
    _tempEstudiantes = curso && Array.isArray(curso.estudiantes)
        ? curso.estudiantes.map(e => (typeof e === 'string' ? { nombre: e, rut: '', correo: '' } : e))
        : [];

    renderListaTemp();
    renderListaAsignados();

    // asignar acción de confirmar (closure)
    const btn = document.getElementById('btnAsignarConfirm');
    btn.onclick = function () { asignarEstudiantes(_cursoAsignarId); };

    modal.style.display = 'flex';
}

// agregar estudiante a la lista temporal (inputs)
function agregarEstudianteTemporal() {
    const nombre = (document.getElementById('inputEstNombre').value || '').trim();
    const rut = (document.getElementById('inputEstRut').value || '').trim();
    const correo = (document.getElementById('inputEstCorreo').value || '').trim();

    if (!nombre || !rut || !correo) {
        alert('Complete nombre, RUT y correo.');
        return;
    }

    // validar correo sencillo
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        alert('Ingrese un correo válido.');
        return;
    }

    // evitar duplicados por RUT
    if (_tempEstudiantes.some(e => e.rut === rut)) {
        alert('Ya existe un estudiante con ese RUT en la lista temporal.');
        return;
    }

    _tempEstudiantes.push({ nombre, rut, correo });

    // limpiar inputs
    document.getElementById('inputEstNombre').value = '';
    document.getElementById('inputEstRut').value = '';
    document.getElementById('inputEstCorreo').value = '';

    renderListaTemp();
}

// renderizar lista temporal con botón quitar
function renderListaTemp() {
    const lista = document.getElementById('listaTempEstudiantes');
    lista.innerHTML = '';
    _tempEstudiantes.forEach((est, idx) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.gap = '8px';
        li.innerHTML = `<span>${est.nombre} — ${est.rut} — ${est.correo}</span>`;
        const btn = document.createElement('button');
        btn.textContent = 'Quitar';
        btn.style.marginLeft = '8px';
        btn.onclick = () => {
            _tempEstudiantes.splice(idx, 1);
            renderListaTemp();
        };
        li.appendChild(btn);
        lista.appendChild(li);
    });
}

// renderizar estudiantes ya asignados al curso (si hay)
function renderListaAsignados() {
    const listaAsignados = document.getElementById('listaAsignados');
    listaAsignados.innerHTML = '';
    const curso = window.cursos.find(c => c.id === _cursoAsignarId);
    if (!curso) return;
    (curso.estudiantes || []).forEach(est => {
        const e = (typeof est === 'string') ? { nombre: est, rut: '', correo: '' } : est;
        const li = document.createElement('li');
        li.textContent = `${e.nombre} — ${e.rut} — ${e.correo}`;
        listaAsignados.appendChild(li);
    });
}

// asignar (guardar) tempEstudiantes al curso
function asignarEstudiantes(cursoId) {
    const curso = window.cursos.find(c => c.id === cursoId);
    if (!curso) return;

    // reemplaza lista de estudiantes por los objetos creados
    curso.estudiantes = _tempEstudiantes.slice();

    // refrescar vista de cursos si existe renderCursos()
    if (typeof window.renderCursos === 'function') {
        window.renderCursos();
    } else {
        // si no existe, actualizar contador visual si tiene un contenedor
        const cont = document.getElementById('cursosList');
        if (cont) {
            // forzar re-render básico
            cont.querySelectorAll('[data-curso-id]').forEach(el => {
                if (parseInt(el.dataset.cursoId, 10) === cursoId) {
                    const info = el.querySelector('.curso_info');
                    if (info) info.textContent = `Estudiantes: ${curso.estudiantes.length}`;
                }
            });
        }
    }

    cerrarModalAsignar();
}

// cerrar modal y limpiar estados temporales
function cerrarModalAsignar() {
    const modal = document.getElementById('modalAsignar');
    modal.style.display = 'none';
    _cursoAsignarId = null;
    _tempEstudiantes = [];
    document.getElementById('listaTempEstudiantes').innerHTML = '';
    document.getElementById('listaAsignados').innerHTML = '';
}
