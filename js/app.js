import formComm from "./formComm.js";
import Carrito from "./carrito.js";

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#enviar-comm");
const myContainer = document.getElementById("comm-form");

const myCommFormm = new formComm (myContainer);
const myCarrito = new Carrito(contenedorCarrito);

window.onload = async function() 
{

    await myCommFormm.render_add();

    document.addEventListener('click',async event => {

        if (!event.target) {
            return;
        };

        if (event.target.id == "formCommSub") {
            event.preventDefault();
            let datos = myCommFormm.getFormData();
            myCarrito.add(datos);
            myCarrito.render();
            Swal.fire({
                position: "center-center",
                icon: "success",
                title: "Comission añadida al carrito",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        if (event.target.id == "btnBorrarCarrito") {
            myCarrito.vaciar();
            myCarrito.render();
            Swal.fire({
                position: "center-center",
                icon: "success",
                title: "Carrito vaciado",
                showConfirmButton: false,
                timer: 1500,
            })
        }
        if (event.target.id == "btnOrder") {
            myCarrito.process();
            
            Swal.fire({
                position: "center-center",
                icon: "success",
                title: "Carrito procesado",
                showConfirmButton: false,
                timer: 1500,
            });
            myCarrito.render();
        }
    })
}

