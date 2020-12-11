const items = [{
        id: 1,
        name: "remera1",
        price: "$700",
    }, {
        id: 2,
        name: "remera2",
        price: "$800",
    }, {
        id: 3,
        name: "remera3",
        price: "$900",
    }];

const mostrarProducto = () => {
        let seleccion = prompt("qué diseño te gustaría ver?");
        console.log('elegiste el producto ' + seleccion);
    };


mostrarProducto();