function Disenio (colorIng, nombreIng) {
    this.nombre = nombreIng
    this.color = colorIng;

    this.setPrecio = () => {
        return precio;}
    this.getId = () => {return id;}
}

const nombre = prompt("ingresá el nombre de tu diseño");
const color = prompt("en qué color? blanco/negro");

let remeraNueva = new Disenio(color, nombre);

if (remeraNueva.color == "blanco") {
    alert("remera publicada a $700")
} else if (remeraNueva.color == "negro") {
    alert("remera publicada a $800") 
} else {
    alert("hubo un problema, probablemente no elegiste ni blanco ni negro")
};