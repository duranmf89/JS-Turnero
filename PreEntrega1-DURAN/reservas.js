const DESC20 = 0.2;
const DESC30 = 0.3;
const DESC50 = 0.5;

function seleccionarCancha() {
    let cancha = prompt("Ingrese la cancha:\nA = Polvo de ladrillo ($12.000)\nB = Pasto ($18.000)\nC = Carpeta ($10.000)\nD = Cemento ($8.000)").trim().toUpperCase();
    //console.log("Seleccion de cancha:", cancha)
    return cancha;
}


function obtenerPrecioCancha(cancha) {
    let precio = 0;
    //console.log("Precio a obtener de cancha", cancha)
    switch (cancha) {
        case 'A':
            precio = 12000;
            confirm("Seleccionaste Cancha de Polvo de ladrillo. Valor: $12.000\nPresione aceptar para continuar con la reserva");
            break;
        case 'B':
            precio = 18000;
            confirm("Seleccionaste Cancha de Pasto. Valor: $18.000\nPresione aceptar para continuar con la reserva");
            break;
        case 'C':
            precio = 10000;
            confirm("Seleccionaste Cancha de Carpeta. Valor: $10.000\nPresione aceptar para continuar con la reserva");
            break;
        case 'D':
            precio = 8000;
            confirm("Seleccionaste Cancha de Cemento. Valor: $8.000\nPresione aceptar para continuar con la reserva");
            break;
        case "":
            alert("Debe ingresar un valor para seleccionar su cancha.");
            break;
        default:
            alert("Opción de cancha inválida. Por favor, ingrese A, B, C o D.");
            break;
    }
    return precio;
}



function calcularDescuento(precio) {
   
    let descuento = 0;
    do {
        let codigoDescuento = prompt("Ingrese su código de descuento si posee o deje en blanco si no tiene descuento:").trim().toUpperCase();
        if (codigoDescuento === 'DESC20') {
            descuento = DESC20;
            confirm("Felicidades! Se te aplicará un 20% de descuento");
        } else if (codigoDescuento === 'DESC30') {
            descuento = DESC30;
            confirm("Felicidades! Se te aplicará un 30% de descuento");
        } else if (codigoDescuento === 'DESC50') {
            descuento = DESC50;
            confirm("Felicidades! Se te aplicará un 50% de descuento");
        } else if (codigoDescuento === '') {
            descuento = 0;
            confirm("No se aplicó ningún descuento");
        } else {
            alert("Código de descuento inválido. Intente nuevamente.");
            descuento = null
        }
    } while (descuento === null);

    let precioFinal = precio * (1 - descuento);
    confirm(`RESERVA COMPLETADA\nPrecio de lista: $${precio}\nDescuento aplicado: -$${precio * descuento}.\nPrecio final: $${precioFinal}.`);
    return precioFinal;
}


// Ejecución 
let precioCanchaSeleccionada;
let canchaSeleccionada;

do {
    canchaSeleccionada = seleccionarCancha();
    precioCanchaSeleccionada = obtenerPrecioCancha(canchaSeleccionada);
} while (precioCanchaSeleccionada === 0);

calcularDescuento(precioCanchaSeleccionada);