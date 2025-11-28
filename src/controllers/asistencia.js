// Lista de ejemplo de estudiantes (puedes reemplazar por datos reales o cargarlos desde servidor)
const estudiantes = [
  "Ana Torres",
  "Bruno Díaz",
  "Carla Jiménez",
  "Diego Morales",
  "Elisa Rojas",
];

function mostrarModalAsistencia() {
  const modal = document.getElementById("modalAsistencia");
  const select = document.getElementById("selectEstudiante");

  // llenar el select (evitar duplicados)
  select.innerHTML = "";
  estudiantes.forEach((nombre) => {
    const opt = document.createElement("option");
    opt.value = nombre;
    opt.textContent = nombre;
    select.appendChild(opt);
  });

  modal.style.display = "flex";
}

function cerrarModalAsistencia() {
  const modal = document.getElementById("modalAsistencia");
  modal.style.display = "none";
}

function asignarAsistencia() {
  const selectEst = document.getElementById("selectEstudiante");
  const selectEstado = document.getElementById("selectEstado");
  const lista = document.getElementById("asistenciaLista");

  const estudiante = selectEst.value;
  const estado = selectEstado.value;
  const ahora = new Date();
  const tiempo = ahora.toLocaleString();

  if (!estudiante) return;

  const li = document.createElement("li");
  li.textContent = `${tiempo} — ${estudiante}: ${estado}`;
  lista.prepend(li);

  // Opcional: cerrar modal tras asignar
  cerrarModalAsistencia();
}

function mostrarModalCalificacion() {
  const modal = document.getElementById("modalCalificacion");
  const select = document.getElementById("selectEstCal");

  select.innerHTML = "";
  estudiantes.forEach((nombre) => {
    const opt = document.createElement("option");
    opt.value = nombre;
    opt.textContent = nombre;
    select.appendChild(opt);
  });

  document.getElementById("inputCalificacion").value = "";
  modal.style.display = "flex";
}

function cerrarModalCalificacion() {
  document.getElementById("modalCalificacion").style.display = "none";
}

function asignarCalificacion() {
  const select = document.getElementById("selectEstCal");
  const input = document.getElementById("inputCalificacion");
  const lista = document.getElementById("calificacionesLista");
  const display = document.getElementById("gradeDisplay");

  const estudiante = select.value;
  const calRaw = input.value;

  if (!estudiante || calRaw === "") {
    alert("Seleccione estudiante e ingrese una calificación.");
    return;
  }

  const cal = parseFloat(calRaw);
  if (Number.isNaN(cal) || cal < 1.0 || cal > 7.0) {
    alert("Ingrese una calificación válida entre 1.0 y 7.0.");
    return;
  }

  const calFmt = cal.toFixed(1); // formatea a un decimal: 7.0, 6.5, etc.
  const ahora = new Date().toLocaleString();
  const li = document.createElement("li");
  li.textContent = `${ahora} — ${estudiante}: ${calFmt}`;
  lista.prepend(li);

  display.textContent = `Calificación: ${calFmt}`;

  cerrarModalCalificacion();
}