window.onload = function () {
    const boton = document.getElementById("boton");
    boton.addEventListener("click", function(event){
        const busqueda = document.getElementById("busqueda");
        if(busqueda.value != "") {
            let contenedor = document.createElement("div");
            contenedor.setAttribute("class", "col s4");
            contenedor.innerHTML = `
                <h1>${busqueda.value}</h1>
                <p>
                $700 - blanca <br>
                $900 - negra
                </p>
                <button onclick="eliminar(event)">descartar</button>
            `;
            document.getElementById("catalogo").appendChild(contenedor);
        }
    });
}

function eliminar(event) {
    event.target.parentElement.parentElement.removeChild(event.target.parentElement);
};


function RemeraNueva (colorIng, nombreIng) {
    this.nombre = nombreIng
    this.color = colorIng;
}
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