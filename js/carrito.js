import dataService from "./dataService.js";
const myDataService = new dataService('/commision');

class Carrito {
    constructor (container) {
        this.container = container;
        this.elementos = [];
    }

    add (elemento) {
        let myobj = JSON.parse(elemento);
        this.elementos = JSON.parse(localStorage.getItem("carrito")) || [];
        this.elementos.push(myobj);
        localStorage.setItem("carrito", JSON.stringify(this.elementos));
    }

    list () {
        this.elementos = JSON.parse(localStorage.getItem("carrito")) || [];
        return this.elementos;
    }


    vaciar (){
        this.elementos=[];
        localStorage.removeItem('carrito');
    }

    process() {
        this.elementos = JSON.parse(localStorage.getItem("carrito")) || [];
        this.elementos.forEach((element) => {
            let result = myDataService.saveObject(JSON.stringify(element));
            console.log(result);
        });
        this.elementos = [];
        localStorage.removeItem('carrito');
    }

    render(){
        let cantidadTotal = 0;
        let precioTotal = 0;
        this.container.innerHTML ="";
        this.elementos = JSON.parse(localStorage.getItem("carrito")) || [];
        this.elementos.forEach((element)=> {
            const {Commission_type,Color_type,Bg_type,Price,Cantidad} = element
            const row = document.createElement("tr");
            row.innerHTML = `
                    <td>${Commission_type}</td>
                    <td>${Color_type}</td>
                    <td>${Bg_type}</td>
                    <td>${Price}</td>
                    <td>${Cantidad}</td>
                    `;
                cantidadTotal += parseInt(Cantidad,10);
                precioTotal   += parseInt(Cantidad,10) * parseInt(Price,10);
    
                this.container.appendChild(row);

        });
   
        if (cantidadTotal>0){
            const row = document.createElement("tr");
            /*template*/
             row.innerHTML = `
              <td colspan="3">Total</td>
              <td>${precioTotal}€</td>
              <td>${cantidadTotal}</td>
              <td></td>
              `;
            this.container.appendChild(row);
        }
    }

}
export default Carrito;