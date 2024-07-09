
function Turno(paciente, fecha, hora) {
    this.paciente = paciente;
    this.fecha = fecha;
    this.hora = hora;
}


var turnos = [];


function agendarTurno() {
    var paciente = document.getElementById('input-paciente').value;
    var fecha = document.getElementById('input-fecha').value;
    var hora = document.getElementById('input-hora').value;

    
    if (!paciente || !fecha || !hora) {
        mostrarMensaje("Por favor complete todos los campos.");
        return;
    }

    var partesFecha = fecha.split("/");
    var fechaTurno = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0], 0, 0, 0);

    var nuevoTurno = new Turno(paciente, fechaTurno, hora);
    turnos.push(nuevoTurno);

    localStorage.setItem('turnos', JSON.stringify(turnos));

    mostrarMensaje("Turno agregado correctamente.");
    limpiarFormulario();
}


function mostrarTurnos() {
    var container = document.getElementById('turnos-container');
    container.innerHTML = '';

    var turnosGuardados = JSON.parse(localStorage.getItem('turnos')) || [];

    if (turnosGuardados.length === 0) {
        mostrarMensaje("No hay turnos agendados.");
        return;
    }

    turnosGuardados.forEach(function(turno, indice) {
        var turnoHtml = document.createElement('div');
        turnoHtml.classList.add('card', 'bg-light', 'mb-3');
        turnoHtml.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Turno ${indice + 1}</h5>
                <p class="card-text">Paciente: ${turno.paciente}</p>
                <p class="card-text">Fecha: ${new Date(turno.fecha).toLocaleDateString()}</p>
                <p class="card-text">Hora: ${turno.hora}</p>
            </div>
        `;
        container.appendChild(turnoHtml);
    });
}


function mostrarMensaje(mensaje) {
    var mensajeHtml = document.getElementById('mensaje');
    mensajeHtml.textContent = mensaje;
}


function limpiarFormulario() {
    document.getElementById('input-paciente').value = '';
    document.getElementById('input-fecha').value = '';
    document.getElementById('input-hora').value = '';
}

document.getElementById('agregar-turno-btn').addEventListener('click', function() {
    agendarTurno();
});

document.getElementById('mostrar-turnos-btn').addEventListener('click', function() {
    mostrarTurnos();
});


fetch('data.json')
    .then(response => response.json())
    .then(data => {
        turnos = data.turnos || [];
        mostrarMensaje("Datos cargados desde JSON local.");
    })
    .catch(error => console.error('Error al cargar datos:', error));
