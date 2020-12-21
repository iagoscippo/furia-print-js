function RemeraNueva (colorIng, nombreIng) {
    this.nombre = nombreIng
    this.color = colorIng;
}

const nombre = prompt("ingresá el nombre de tu diseño");
const color = prompt("en qué color? blanco/negro");
let remeraNueva = new RemeraNueva(color, nombre);
const items = [{
    id: 1,
    nombre: "remera1",
    color: "blanco",
    pecio: "$700",
}, {
    id: 2,
    name: "remera2",
    precio: "$800",
    color: "gris"
}, {
    id: 3,
    name: "remera3",
    price: "$900",
    color: "negro"
}]


// desafio objetos
if (remeraNueva.color == "blanco") {
    alert("remera publicada a $700")
} else if (remeraNueva.color == "negro") {
    alert("remera publicada a $800") 
} else {
    alert("hubo un problema, probablemente no elegiste ni blanco ni negro")
};

//desafío arrays
function consultarPrecio () {
    let consulta = prompt("ingrese el id para consultar el precio")
    let item = items[consulta - 1];
    return item.precio;
}

let itemConsultado = consultarPrecio();
alert(itemConsultado);