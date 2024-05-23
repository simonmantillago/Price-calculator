import { LitElement, css, html } from 'lit';
import data from '../pages.json';

export class pageForm extends LitElement {
    static styles =css`
        * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        }
        body {
            background-color: #3d3935 !important;
            font-family: 'Poppins' !important;
            color: #fff !important ;   
            overflow-x: hidden;
        }
        

    `
    connectedCallback(){ // funcion de lit, es como un  DOMContentLoaded pero para cuando se pone el component en el dom
        super.connectedCallback() //permite que conectedcallback() se ejecute bien antes de que se realice cualquier otra cosa, la docuemtacion de lit siempre lo pone xd
        const pageData=document.querySelector('page-price');
        this.price=pageData.pagePrice
        this.pageInfo=pageData.pageAtributes;
    }
    render(){
        return html`
            <form class="customerForm">
                <div class="customerName">
                    <label for="Name" class="name"><b>Name</b></label>
                    <input type="text" id="Name" name="Name">
                </div>
                <div class="customerLastName">
                    <label for="lastName" class="lastName"><b>lastName</b></label>
                    <input type="text" id="lastName" name="lastName">
                </div>
                <div class="customerEmail">
                    <label for="email" class="email"><b>Email</b></label>
                    <input type="email" id="email" name="email">
                </div>
                <div class="customerCountry">
                    <label for="country" class="country"><b>Country</b></label>
                    <input type="text" id="country" name="country">
                </div>
                <div class="customerCity">
                    <label for="city" class="city"><b>City</b></label>
                    <input type="text" id="city" name="city">
                </div>
                <button class="submit">Submit</button>
            </form>
    
    `}

    firstUpdated(){
        const submitButton=this.shadowRoot.querySelector('.submit')
        submitButton.addEventListener('click',async(event)=>{
            event.preventDefault();
            const mappedOption = this.pageInfo.map(option => option.txt);
            const customerForm=this.shadowRoot.querySelector('.customerForm');
            const data = Object.fromEntries(new FormData(customerForm).entries());
            const customerData = JSON.parse(JSON.stringify(data));
            const {Name,lastName,email,country,city}=customerData;
            const customerInfo ={
                Name:Name,
                Lastname:lastName,
                Email:email,
                Country:country,
                City:city,
                Price:this.price,
                Features:mappedOption
            }
            console.log(customerInfo)
            try {
                const response = await fetch('PONER URL DE SIMON', { // url mock api
                    method: 'POST',
                  headers: { // se pone siempre
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(customerInfo)
                });
        
                if (!response.ok) {
                    throw new Error('Error al enviar POST al MockAPI');
                }
        
                const responseData = await response.json();
                console.log('Respuesta de la API:', responseData);
                // Aquí puedes manejar la respuesta de la API, por ejemplo, mostrar un mensaje al usuario
                } catch (error) {
                console.error('Error al enviar POST a la API:', error);
                // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error al usuario
                }
        })
    }

}
customElements.define("page-form",pageForm)