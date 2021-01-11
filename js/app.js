// ADAPTAR A QUE EL CARRITO NO ES UN MENU
 
 /* Selectores */
const carrito = document.getElementById("carrito");
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaProductos = document.querySelector('#lista-productos');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const formulario = document.querySelector('#formulario');

let articulosCarrito = [];


/* Listeners */
listaProductos.addEventListener('click', agregarProducto);
carrito.addEventListener('click', quitarProducto);
btnVaciarCarrito.addEventListener('click', vaciarCarrito);
formulario.addEventListener('submit', filtrarProductos);

document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    insertarCarritoHTML();
})


/* Functions */
function filtrarProductos(e) {
    e.preventDefault();
    const busqueda = document.querySelector('#buscador').value;

    const resultado = stockProductos.filter(producto => producto.nombre.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase()));

    limpiarProductos();

    resultado.forEach( (producto, index) => {
        const { nombre, imagen, precio, id, vendedor } = producto;
        const divCard = document.createElement('div');
        divCard.classList.add('four', 'columns');
        divCard.innerHTML = `
        insertar html
        `
        if(index % 3 === 0) {
            const row = document.createElement('div');
            row.classList.add('row');

            listaProductos.appendChild(listaProductos);
            row.appendChild(divCard);
        } else {
            const cantRows = document.querySelectorAll('#lista-productos').children.length;
            const rows = document.querySelectorAll('#lista-productos .row');
            const row = rows[cantRows -1];
            row.appendChild(divCard);
        }
    })
}


function vaciarCarrito() {
    limpiarCarrito();
    articulosCarrito = [];
    guardarStorage();
}

function quitarProducto(e) {
    if(e.target.classList.contains('borrar-producto')) {
        const productoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(producto => producto.id != productoId );
        
        insertarCarritoHTML();
        guardarStorage();
    }
}

function agregarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        }
}

function obtenerDatos(producto) {
    const productoAgregado = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(producto => producto.id == productoAgregado.id);
    if (existe) {
        const productos = articulosCarrito.map ( producto => {
            if(producto.id === productoAgregado.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        articulosCarrito = [...productos];
    } else {
        articulosCarrito.push(productoAgregado);
    }

    insertarCarritoHTML();
    guardarStorate();
}

function guardarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function insertarCarritoHTML() {
    
    limpiarCarrito();
    articulosCarrito.forEach( producto => {
        
        const {imagen, nombre, precio, cantidad, id} = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width=100>
            </td>
            <td>
                ${nombre} 
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td> 
        `
    })
}
    function limpiarCarrito() {
        while(contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
    }

    function limpiarProductos(e) {

    }

    