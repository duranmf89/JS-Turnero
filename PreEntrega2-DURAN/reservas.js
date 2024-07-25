// Arrays de objetos - "Base de datos"
const descuentos = [
    { codigo: 'DESC10', valor: 0.1 },
    { codigo: 'DESC20', valor: 0.2 },
    { codigo: 'DESC30', valor: 0.3 },
    { codigo: 'DESC50', valor: 0.5 }
];

const canchas = [
    { superficie: "Polvo de ladrillo", precio: 12000 },
    { superficie: "Pasto", precio: 18000 },
    { superficie: "Carpeta", precio: 10000 },
    { superficie: "Cemento", precio: 8000 }
];

const productos = [
    { nombre: "Pelotas", marca: "Dunlop", precio: 9000 },
    { nombre: "Pelotas", marca: "Penn", precio: 10500 },
    { nombre: "Pelotas", marca: "Slazenger", precio: 12000 }
];

const jugadores = [
    { id: 1, Nombre: "Juan", Apellido: "Perez", edad: 38, Categoria: "Experto" },
    { id: 2, Nombre: "Franco", Apellido: "Martinez", edad: 26, Categoria: "Amateur" },
    { id: 3, Nombre: "Francisco", Apellido: "Duran", edad: 34, Categoria: "Experto" },
    { id: 4, Nombre: "Benjamin", Apellido: "Gomez", edad: 45, Categoria: "Intermedio" },
    { id: 5, Nombre: "Lucas", Apellido: "Fernandez", edad: 30, Categoria: "Amateur" },
    { id: 6, Nombre: "Carlos", Apellido: "Mendez", edad: 29, Categoria: "Intermedio" },
    { id: 7, Nombre: "Martin", Apellido: "Sanchez", edad: 40, Categoria: "Experto" },
    { id: 8, Nombre: "Ramiro", Apellido: "Lucena", edad: 22, Categoria: "Experto" },
    { id: 9, Nombre: "Sebastian", Apellido: "Canen", edad: 52, Categoria: "Intermedio" },
    { id: 10, Nombre: "Benicio", Apellido: "Samnes", edad: 19, Categoria: "Experto" },
    { id: 11, Nombre: "Jose Maria", Apellido: "Borda", edad: 33, Categoria: "Amateur" },
    { id: 12, Nombre: "Gerardo", Apellido: "Ramirez", edad: 49, Categoria: "Intermedio" },
    { id: 13, Nombre: "Jeronimo", Apellido: "Manzi", edad: 26, Categoria: "Experto" },
    { id: 14, Nombre: "Ricardo", Apellido: "Garcia", edad: 37, Categoria: "Amateur" },
    { id: 15, Nombre: "Rafael", Apellido: "Nadal", edad: 35, Categoria: "Experto" }
];


// Funciones
function seleccionarCancha() {
    let opciones = canchas.map(c => `Cancha de ${c.superficie} - $${c.precio}`).join("\n");
    let opcionCancha = prompt(`Ingrese el tipo de superficie de la cancha que desea reservar:\n${opciones}`).trim().toLowerCase();//Con trim quitamos los espacios que accidentalmente se hayan ingresado y con .toLowerCase pasamos lo que ingresa el usuario a minusculuas para luego hacer la comparacion
    return opcionCancha;//Devuelve lo que ingreso el usuario, luego se hacen las validaciones en la siguiente funcion tomando el valor que ingreso el usuario.
}

function obtenerPrecioCancha(seleccionCancha) {
    let cancha = canchas.find(c => c.superficie.toLowerCase() === seleccionCancha);//Busca en el array canchas si existe lo que ingreso el usuario. Transforma a minusculas lo que hay en el array de objetos ya que lo que ingresa el usuario se transforma previamente a minusculas tambien.
    if (cancha) {//Se guarda todo el objeto en la variable cancha por hacer el uso del find, de esta manera podemos ingresar a cualquier propiedad del objeto(superficie, precio,etc)
        alert(`Seleccionaste Cancha de ${cancha.superficie}. Valor: $${cancha.precio}\n\nPresione aceptar para continuar con la reserva`);
        return cancha.precio;//Devolvemos solo el precio para poder luego calcular el descuento en la siguiente funcion
    } else {//si el usuario ingreso un valor que no esta en el array canchas se manda el msj por alert
        alert("Opción de cancha inválida. Por favor, ingrese una superficie válida.");
        cancha = 0 //se pone el valor cancha en 0 para que el do while de la ejecucion vuelva a preguntar para la seleccion de cancha
        return cancha;// retornamos entonces cancha en cero para que vuelva a preguntar
    }
}

function calcularDescuento() {
    let descuento = 0;
    let codigoDescuento = prompt("Ingrese su código de descuento si posee o deje en blanco si no tiene descuento:");
    let descuentoEncontrado = descuentos.find(d => d.codigo === codigoDescuento);//Busca en el array de objetos "descuentos"

    if (descuentoEncontrado) {
        descuento = descuentoEncontrado.valor;
        alert(`Felicidades! Se te aplicará un ${descuento * 100}% de descuento`);
    } else if (codigoDescuento === '') {
        descuento = 0;
        alert("No se aplicó ningún descuento");
    } else {
        alert("Código de descuento inválido. No se aplicó ningún descuento.");
    }

    return descuento;
}

function comprarEquipamiento() {
    let precioPelotas = 0;
    const quiereComprar = confirm("¿Desea comprar tubo(x3) de pelotas para su próximo partido?\n\nPresione Cancelar para continuar con su reserva");

    if (quiereComprar) {
        let opciones = productos.map(p => `${p.nombre} ${p.marca} - $${p.precio}`).join("\n");//mapeamos las opciones de pelotas
        let productoElegido = prompt(`¿Qué pelotas desea comprar? Ingrese solo la marca.\n${opciones}`);
        
        if (productoElegido === null) {//Se hace verificacion para que no se corte la reserva si el usuario se arrepintio de comprar las pelotas y presiona cancelar
            alert("Ha cancelado la compra de pelotas. Continuando con la reserva.");
        } else {
            productoElegido = productoElegido.trim().toLowerCase();//quitamos los espacios que se hayan puesto accidentalmente con trim() y pasamos a minusculas lo que ingreso el usuario para luego hacer las demas verificaciones
            let producto = productos.find(p => p.marca.toLowerCase() === productoElegido);

            if (producto) {// si la marca que ingreso el usuario existe y la encuentra previamente con find (que trae todo el objeto), preguntamos luego la cantidad
                let cantidad = parseInt(prompt(`¿Cuántos tubos de ${producto.nombre} marca ${producto.marca} desea comprar?`));
                cantidad = validarCantidad(cantidad);//validamos la cantidad con la funcion externa validarCantidad(). Le mandamos cantidad como parametro (lo que ingreso el usuario) para validarla
                precioPelotas = cantidad * producto.precio;
            } else {
                alert("Producto no encontrado. Intente nuevamente.");
                return comprarEquipamiento();
            }
        }
    } 

    alert(`Precio de las pelotas: $${precioPelotas}`);
    return precioPelotas;
}



function validarCantidad(cantidad) {
    while (isNaN(cantidad) || cantidad <= 0) {
        cantidad = parseInt(prompt("Por favor, ingrese una cantidad válida de pelotas a comprar"));
    }
    return cantidad;
}

function mostrarResumen(precioCancha, precioPelotas, descuento) {
    let precioFinal = precioCancha * (1 - descuento);
    let descuentoAplicado = precioCancha - precioFinal;
    let total = precioFinal + precioPelotas;
    alert(`RESERVA COMPLETADA\nPrecio de la cancha sin descuento: $${precioCancha}\nDescuento aplicado: -$${descuentoAplicado}\nPrecio de la cancha con descuento: $${precioFinal}\nPrecio de las pelotas: $${precioPelotas}\n\nTotal a pagar: $${total}`);
}

function enviarChallenge() {
    const categoria = prompt("Ingrese la categoría del jugador que desea desafiar:\nAmateur\nIntermedio\nExperto").trim().toLowerCase();
    const jugadoresFiltrados = jugadores.filter(jugador => jugador.Categoria.toLowerCase() === categoria);//filtramos en un array todos los jugadores que coincidan con la categroia que ingreso el usuario. Pasamos previamente a minusculas la categoria que esta en el array nuestro como base de datos.

    if (jugadoresFiltrados.length === 0) {// comprueba que el array no este vacio, la longitud del array no sea cero. Si es cero manda el alert de que no hay jugadores con esa categoria. El usuario puede haber escrito cualquier cosa tambien
        alert("No se encontraron jugadores en la categoría seleccionada. Intente nuevamente.");
        return enviarChallenge();// Se resetea la funcion para que el usuario vuelva a buscar categoria
    }// si el array de jugadoresFiltrados es mayor a cero, continua

    const opcionesJugadores = jugadoresFiltrados.map(jugador => `ID: ${jugador.id}, Nombre: ${jugador.Nombre} ${jugador.Apellido}, Edad: ${jugador.edad}, Categoría: ${jugador.Categoria}`).join("\n");// Se mapean las opciones de jugadores que estan disponibles en esa categoria que ingreso previamente
    const idJugador = parseInt(prompt(`Seleccione el ID del jugador que quiere desafiar:\n${opcionesJugadores}`));// de la lista de jugadores le pide escribir el ID para seleccionarlo

    const jugadorSeleccionado = jugadoresFiltrados.find(jugador => jugador.id === idJugador);//el finde trae el objeto completo del jugador que se encontro a traves del ID

    if (jugadorSeleccionado) {// si encuentra el id trae el jugador, y esta condicion daria true. Daria false en caso de que no encuentre el id en la lista de la categoria filtrada
            const confirmarChallenge = confirm(`¿Desea enviar un challenge a ${jugadorSeleccionado.Nombre} ${jugadorSeleccionado.Apellido}?`);
                if (confirmarChallenge) {
                alert("Challenge enviado!");
                } else {
                alert("Challenge cancelado.");
                }
        } else {
        alert("Jugador no encontrado. Intente nuevamente.");// Este alert se envia en caso de que de false el IF
        return enviarChallenge();
    }
}

// Ejecución 
let precioCanchaSeleccionada;
let canchaSeleccionada;
let precioEquipamiento;
let descuento;

do {
    canchaSeleccionada = seleccionarCancha();//Guarda cualquier valor que se haya ingresado cuando seleccionamos la cancha
    precioCanchaSeleccionada = obtenerPrecioCancha(canchaSeleccionada);//el valor guardado en canchaSeleccionada se envia como parametro a la funcion obtenerPrecioCancha y hace las validaciones correspondientes. La funcion lo recibe como seleccionCancha
} while (precioCanchaSeleccionada === 0);//Se hace el do while para comparar que el valor de la cancha buscada exista y el usuario pueda volver a intentar escribir bien la supeorficie en la que quiere jugar.

descuento = calcularDescuento();
precioEquipamiento = comprarEquipamiento();

mostrarResumen(precioCanchaSeleccionada, precioEquipamiento, descuento);//se envian los valores de las variables que obtienen finalmente las funciones para usarlas en la funcion mostrarResumen y enviar el msj de la reserva haciendo las cuentas matematicas correspondientes.
const deseaChallenge = confirm("¿Desea enviar un challenge a algún jugador del club?\n\nPresione Cancelar si ya tiene su rival.");
if (deseaChallenge) {//primero se pregunta si el usuario quiere enviar un challenge. Si acepta se ejecuta la funcion
    enviarChallenge();//la funcion enviarChallenge se encarga de enviar los msjs correspondientes
}