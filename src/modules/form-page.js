import { LitElement, css, html } from 'lit';

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
        .container{
            position:absolute;
            width:40vw;
            height:30vh;
            right: 30vw;
            top:37.5vh;
            background-color:gray;
            border-radius:50px;
            z-index:2;
            display:flex;
            justify-content:center;
            aling-items:center;
            
          }
        .customerForm{
            width:80%;
            display:flex;
            flex-direction:column;
            justify-content:center;
            aling-items:flex-start;
        }
          
        .big-container{
            position:absolute;
            width:100vw;
            height:100vh;
            right: 0vw;
            top:0vh;
            backdrop-filter: blur(5px);
            z-index:1;
        }
    `
    connectedCallback(){ // funcion de lit, es como un  DOMContentLoaded pero para cuando se pone el component en el dom
        super.connectedCallback() //permite que conectedcallback() se ejecute bien antes de que se realice cualquier otra cosa, la docuemtacion de lit siempre lo pone xd
        const pageData=document.querySelector('page-price');
        this.price=pageData.pagePrice
        this.pageInfo=pageData.pageAtributes;
        this.features={};
    }
    render(){
        return html`
        <div class="big-container"></div>
        <div class="container">
            <form class="customerForm" style='width:max-content'>
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
        </div>
    `}

    firstUpdated(){
        const returnForm=this.shadowRoot.querySelector('.big-container')
        returnForm.addEventListener('click',()=>{
            this.parentNode.removeChild(this);
        })


        const submitButton=this.shadowRoot.querySelector('.submit')
        submitButton.addEventListener('click',async(event)=>{
            event.preventDefault();
            const mappedOption = this.pageInfo.map(option => option.txt);
            const mappedPrice = this.pageInfo.map(price => price.price);
            const customerForm=this.shadowRoot.querySelector('.customerForm');
            const data = Object.fromEntries(new FormData(customerForm).entries());
            const customerData = JSON.parse(JSON.stringify(data));
            const {Name,lastName,email,country,city}=customerData;
            for (let counter = 0; counter < mappedOption.length; counter++) {
                this.features[mappedOption[counter]]=mappedPrice[counter] 
            }
            if(this.pageInfo[0].txt==="Optimal quality"){
                this.features[mappedOption[0]]="x1"
            }
            else if(this.pageInfo[0].txt==="Good value for money"){
                this.features[mappedOption[0]]="x2"
            }
            else if(this.pageInfo[0].txt==="The quality doesn't matter"){
                this.features[mappedOption[0]]="x3"
            }

            const customerInfo ={
                Name:Name,
                LastName:lastName,
                Email:email,
                Country:country,
                City:city,
                Price:this.price,
                Features:this.features

            }
            console.log(customerInfo)
            try {
                const response = await fetch('https://664b70de35bbda10987cf5f7.mockapi.io/people', { // url mock api
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
            this.parentNode.removeChild(this);
        })
    }

}
customElements.define("page-form",pageForm)