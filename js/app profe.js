/* Selectores */
const carrito = document.querySelector('#carrito');
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

	// if(articulosCarrito === null) {
	// 	articulosCarrito = []
	// }
	insertarCarritoHTML();
});

/* Funciones */
function filtrarProductos(e) {
	e.preventDefault();

	const busqueda = document.querySelector('#buscador').value;

	/* Busco en mi "BD" de productos */
	const resultado = stockProductos.filter(producto => producto.nombre.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase()));

	limpiarProductos();
	resultado.forEach((producto, index) => {

		const { nombre, imagen, precio, id, vendedor } = producto;

		const divCard = document.createElement('div');
		divCard.classList.add('four', 'columns');
		divCard.innerHTML = `
			<div class="card">
				<img src="${imagen}" class="imagen-producto u-full-width">
				<div class="info-card">
					<h4>${nombre}</h4>
					<p>${vendedor}</p>
					<img src="img/estrellas.png">
					<p class="precio">$20000 <span class="u-pull-right ">${precio}</span></p>
					<a href="#" class="u-full-width button-primary button input agregar-carrito" data-id=${id}>Agregar
						Al Carrito</a>
				</div>
			</div>
		`
		if (index % 3 === 0) {
			const row = document.createElement('div');
			row.classList.add('row');

			listaProductos.appendChild(row);
			row.appendChild(divCard);
		} else {
			const cantRows = document.querySelector('#lista-productos').children.length
			const rows = document.querySelectorAll('#lista-productos .row');
			const row = rows[cantRows - 1];
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
	if (e.target.classList.contains('borrar-producto')) {
		const productoId = e.target.getAttribute('data-id');

		/* Filtro los productos del carrito */
		articulosCarrito = articulosCarrito.filter(producto => producto.id != productoId);

		/* Renderizo el nuevo carrito */
		insertarCarritoHTML();

		/* Actualizamos el storage */
		guardarStorage();
	}
}

function agregarProducto(e) {
	/* Evitamos la accion por defecto del enlace */
	e.preventDefault();

	if (e.target.classList.contains('agregar-carrito')) {
		/* Seleccionar el card del producto */
		const productoSeleccionado = e.target.parentElement.parentElement;

		obtenerDatos(productoSeleccionado);
	}
}

function obtenerDatos(producto) {

	/* Extraer informacion del producto */
	const productoAgregado = {
		imagen: producto.querySelector('img').src,
		nombre: producto.querySelector('h4').textContent,
		precio: producto.querySelector('.precio span').textContent,
		id: producto.querySelector('a').getAttribute('data-id'),
		cantidad: 1
	}

	/* Chequeo si el producto que agrego ya existe en el carrito */
	const existe = articulosCarrito.some(producto => producto.id == productoAgregado.id);

	if (existe) {
		/* Producto ya existente */
		const productos = articulosCarrito.map(producto => {
			if (producto.id === productoAgregado.id) {
				producto.cantidad++;
				return producto;
			} else {
				return producto;
			}
		});
		articulosCarrito = [...productos];
	} else {
		/* Agrego el producto al carrito */
		articulosCarrito.push(productoAgregado);
	}

	insertarCarritoHTML();
	guardarStorage();
}

function guardarStorage() {
	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function insertarCarritoHTML() {

	/* Borrar contenido carrito */
	limpiarCarrito();

	/* Inserto los productos del carrito en el HTML */
	articulosCarrito.forEach(producto => {

		/* Destructuring sobre el producto */
		const { imagen, nombre, precio, cantidad, id } = producto;

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
			<td>
				<a href="#" class="borrar-producto" data-id="${id}"> X </a>
			</td>
		`

		contenedorCarrito.appendChild(row);
	});
}

function limpiarCarrito() {
	// contenedorCarrito.innerHTML = '';

	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}

function limpiarProductos() {
	while (listaProductos.firstChild) {
		listaProductos.removeChild(listaProductos.firstChild);
	}
}