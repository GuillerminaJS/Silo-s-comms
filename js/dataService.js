// Indicamos la url que nos lleva a la api(Necesitamos tener el servicio de la api activo).

class dataService {

    constructor(urlRoute){
        this.apiURL = "http://localhost:5000";
        this.URLroute = urlRoute;
        this.pluralURLroute = urlRoute + 's';
    }
    
    async getObjectList(){
        let data = '';
        try{
            const respuesta = await fetch(`${this.apiURL}${this.pluralURLroute}`);
            data = await respuesta.json();
            console.log(data);
            let ret = data?data:[]
            return ret;
        }catch(error){
            console.log(error);
        }
    }

    // Servicio para ver un dibujo en especifico por su ID.
    async getObject(id){
        let data = '';
        try{
            const respuesta = await fetch(`${this.apiURL}${this.URLroute}/${id}`);
            data = await respuesta.json();
        }catch(error){
            console.log("Error en la petición");
        }

        // Devolvemos el resultado.
        console.log(data);
        return data;
    }

    async saveObject(param_object){
        let data = '';
        try {
            const myOptions = {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                mode: 'cors',
                body:param_object
            }
            const respuesta = await fetch(`${this.apiURL}${this.URLroute}`,myOptions);
            data = await respuesta.json();
            console.log(data);
            return data;
        } catch(error){
            console.log(error);
        }
    }

    async updateObject(param_object){
        let data = '';
        try {
            const myOptions = {
                method: 'PUT',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                mode: 'cors',
                body:param_object
            }
            const respuesta = await fetch(`${this.apiURL}${this.URLroute}`,myOptions);
            data = await respuesta.json();
            console.log(data);
            return data;
        } catch(error){
            console.log(error);
        }
    }


    async deleteObject(id){
        let data = '';
        try {
            const myOptions = {
                method: 'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                mode: 'cors',
            }
            const respuesta = await fetch(`${this.apiURL}${this.URLroute}/${id}`,myOptions);
            data = await respuesta.json();
            console.log(data);
            return data;
        } catch(error){
            console.log(error);
        }
    }
}

export default dataService;