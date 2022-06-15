import dataService from "./dataService.js";

class formComm {

    constructor (container) {
        this.Container=container;
        this.form=document.createElement("form");
        this.service = new dataService("/typecomm");
    }

    async render_add() {
        // this.Container.innerHTML = "";
        let tcomms = [];
        this.form.setAttribute('id','frmComm');
        tcomms =  await this.service.getObjectList();
        // this.form.innerHTML = "";

        this.form.innerHTML = "<label for='Commisioner_mail'>Gmail:</label>";
        this.form.innerHTML+= "<input type='text' minlength='5' id='Commisioner_mail' required='required' value='' />";
        this.form.innerHTML+= "<label for='Commision_type'>Type of commision:</label>";


        let mySelect = document.createElement("select");
        mySelect.id="Commission_type";
        tcomms.forEach(tcomm => {
            let myOption = document.createElement("option");
            myOption.value = tcomm.Name;
            myOption.text = tcomm.Name;
            mySelect.appendChild(myOption);
        });
        this.form.appendChild(mySelect);
    
        this.form.innerHTML+=`

            <label for="Color_type">Color type:</label>
            <select for="Color_type" id="Color_type">
                <option>Flat color</option>
                <option>Rendered color</option>
            </select>
            <label for="Bg_type">Background:</label>
            <select for="Bg_type" id="Bg_type">
                <option>Simple Bg</option>
                <option>Detailed Bg</option>
            </select>
            <label for="Price">Price (in €):</label>
            <input type="number"  id="Price" value=20 readonly>
            <input type="number" id="Cantidad" value=1 class="nodisplay" readonly>
            <button id="formCommSub">Order</button>

        `;
        this.Container.appendChild(this.form);
    }

    // render_update(picture){
    //     this.Container.innerHTML = "";
    //     this.form.innerHTML = "";
    //     this.form.setAttribute('id','frmModificacion');
    //     this.form.innerHTML = 
    //     `
    //         <label for="Id">Id:</label>
    //         <input type="text" id="_id" value="${picture._id}" readonly />
    //         <label for="Titulo">Titulo:</label>
    //         <input type="text" minlength="5" id="Title" value="${picture.Title}" />
    //         <label for="Image_Name">Url Imagen:</label>
    //         <input type="text" minlength="5" id="Image_Name" value="${picture.Image_Name}" />
    //         <label for="Comm_type">Tipo de comision:</label>
    //         <input type="text" minlength="5" id="Comm_type" value="${picture.Comm_type}" />
    //         <label for="Color_type">Tipo de color:</label>
    //         <input type="text" minlength="5" id="Color_type" value="${picture.Color_type}" />
    //         <label for="Bg_type">Tipo de background:</label>
    //         <input type="text" minlength="5" id="Bg_type" value="${picture.Bg_type}" />
    //         <button id="formModifDrawingSub">Modificar</button>
    //     `
    //     this.Container.appendChild(this.form);
    // }

    getFormData() {
        const isValidElement = element => {
            return element.id && element.value;
          };
        
        const isValidValue = element => {
            return (!['checkbox', 'radio'].includes(element.type) || element.checked);
        };
        
        const isCheckbox = element => element.type === 'checkbox';
        
        const isMultiSelect = element => element.options && element.multiple;
        
        const getSelectValues = options => [].reduce.call(options, (values, option) => {
            return option.selected ? values.concat(option.value) : values;
          }, []);
        
        
        const formToJSON = elements => [].reduce.call(elements, (data, element) => {
          if (isValidElement(element) && isValidValue(element)) {
            if (isCheckbox(element)) {
              data[element.id] = (data[element.id] || []).concat(element.value);
            } else if (isMultiSelect(element)) {
              data[element.id] = getSelectValues(element);
            } else {
              data[element.id] = element.value;
            }
          }
        
          return data;
        }, {});

        const data = formToJSON(this.form.elements);
        return JSON.stringify(data,null,'  ');
    }

}

export default formComm;