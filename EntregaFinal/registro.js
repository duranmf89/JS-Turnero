const obtenerProvincias = () => {
    return fetch('https://apis.datos.gob.ar/georef/api/provincias')
        .then(response => response.json())
        .then(data => {
            console.log(data.provincias); // mostramos en la consola el array de provincias
            return data.provincias;
        })
        .catch(error => {
            console.error('Error al obtener las provincias:', error);
            return [];
        });
}

const cargarProvincias = (provincias) => {
    const selectProvincia = document.getElementById('cont-provincias');
    let opciones = '<option value="" disabled selected>Seleccionar Provincia</option>';

    provincias.forEach((provincia) => {
        opciones += `<option value="${provincia.id}">${provincia.nombre}</option>`;
    });

    selectProvincia.innerHTML = opciones;
}

const inicializarProvincias = () => {
    obtenerProvincias().then(provincias => {
        cargarProvincias(provincias);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const dni = document.getElementById('dni');
    const correo = document.getElementById('correo');
    const selectProvincia = document.getElementById('cont-provincias');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío tradicional del formulario

        // Verifica si alguno de los campos está vacío
        if (!nombre.value.trim() || !apellido.value.trim() || !dni.value.trim() || !correo.value.trim() || !selectProvincia.value) {
            Toastify({
                text: "Por favor, complete todos los campos del formulario.",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "#FF0000",
                stopOnFocus: true,
            }).showToast();
        } else {
            // Si todos los campos están completos
            Toastify({
                text: "Usuario registrado correctamente",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "#4CAF50",
                stopOnFocus: true,
            }).showToast();

            // Opcional: Restablece el formulario después de la inscripción
            form.reset();
        }
    });
});


// Inicializamos la carga de provincias al cargar la página
document.addEventListener('DOMContentLoaded', inicializarProvincias);
