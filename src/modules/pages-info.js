import data from '../pages.json';
import { LitElement, css, html } from 'lit';

export class pageOption extends LitElement {


    constructor() {
        super();
        this.page = 'page-1'; // Inicializa la propiedad name
        this.pageData={};
        this.pageAtributes=[];
        this.Totalprice=0;
        };
        //estilos de cada web component
        static styles = css` 
    img{
        width:70%   
    }
    .cards-container{
        padding-top:30px;
        width:70vw;
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
        aling-item:center;
        gap:5px;
    }
    .card{
        display:flex;
        width:155px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap:20px;
        font-size: 5vw;
        text-align:center;
        padding:2.5%;
        transition: transform 0.3s ease;
    }
    .card:hover{
        background-color: rgba(48, 48, 48, 0.814);
        transform: translateY(-10px);
    }

    .pageTitle{
        padding-top: 40px;
        font-size: 2.1em;
    }
    .top-line{ 
    display: flex;
    padding-top: 30px;
    font-weight: bold;
    align-items: center;
    justify-content: space-between;
    padding-inline:30px ;
    }
    .return-page{
    font-weight: 400
    }
    .pagina{
    display: flex;
    flex-direction: column;
    }
    .options{
    width: 100vw;
    display: flex;
    justify-content: center;
    }
    .num1{
    font-weight: bold;
    }

    @media (min-width:600px) {
        .cards-container{
            flex-direction: row;
            justify-content:center;
        }
        .card{
            font-size: clamp(1em,2.5vw,1.2em);
        }
        .pageTitle{
            padding-top: 150px;
            font-size: 2em;
        }
        
    }`

    render() { 
        this.pageData = data[this.page]; // se define el page data con la info de solo la pagina que se necesita
        return html`
            <section class="${this.page} pagina">
                <div class="top-line">
                    <span class="return-page">← Go back</span>
                    <span class="pageNum">${this.pageData['num']}/10</span>
                    <span class="price-counter">${this.Totalprice} USD</span>
                </div>
                <h2 class="pageTitle">${this.pageData['title']}</h2>
                <div class="options">
                    <div class="cards-container" >
                    ${Object.entries(this.pageData['options']).map(([key, item]) => html`    
                        <a class="card" id="${key}">
                            <img src="../${item.url}" alt="picture">
                            <p style="color:white;">${item.txt}</p>
                        </a>
                    `)}
                    </div>
                </div>
            </section>`
    } //itera con el map para todas las opciones que hay dentro de page y realiza una card por cada una

    firstUpdated() { //la funcion firstUpdated carga primero el web componen para luego poder escuchar eventos

        const cardsContainer = this.shadowRoot.querySelector('.cards-container'); // se define el contenedor de las cartas
        cardsContainer.addEventListener('click', (e) => {; // se escucha si dentro de ese contenedor se realizo click
            const card = e.target.closest('.card');// escucha el click de ese elemento .target y lee la carta mas cercana por eso el .closest
            if (card.id === "2.5") { // Comprueba si el ID de la carta es "2.5"
                this.nextbuttonexception(); // Si es "2.5", llama a nextbuttonexception
            } else {
                this.nextbutton(card); // Si no es "2.5", llama a nextbutton
                
            }
            this.pageAtributes.push(this.pageData['options'][card.id])
            this.calcprice()
            });
        
        const back = this.shadowRoot.querySelector('.return-page'); 
        // igual que la anterior pero con el boton return, solo que en este caso solo hay un boton y no es necesario iterar
        back.addEventListener('click',(e)=>{
            this.backButton();
            if(this.pageAtributes.length>(this.pageData['num']-1)&&this.pageData['num']===3){ //entra solamente cuando hay mas datos en el array de los normales y estamos en la pagina 3
            this.pageAtributes.pop() //elimina el ultimo de la lista 2 veces
            this.pageAtributes.pop()}
            else{
                this.pageAtributes.pop() // solo elimina uno de la lista

            }
            this.calcprice() // llama la funcion para calcular el precio

        })    
    };
    calcprice(){
        if(this.page!=='page-1'){// si la pagina es mayor que 1 o sea que ya se selecciono el multiplicador
        const price=this.pageAtributes.reduce((sum,item)=> sum+item['price'],0);// la funcion reduce recibe los parametros sum que se inicializa en 0 y item que es el elemento que se esta leyendo, esto lo hace con cada elemento de el array
                this.Totalprice=price*this.pageAtributes[0]['multiplier'] // cambia el total price y lo multiplica por el multiplier que se eligio
        }else {
            this.price=0 // si no estamos en la pagina #1 no se tendra elegido multiplier ni precio, entonces el precio seria 0
        }
    }
    nextbuttonexception(){
        this.page="page-2.1";// al ser un caso particular, esta funcion llama solo a la pagina 2.1
        this.requestUpdate(); // refresca el webcomponent con el nuevo this.page
    }
    nextbutton(card){
        // empieza en la ultima pagina por que despues de esta no hay mas
        if(this.page===`page-10`){
            this.pageAtributes.push(this.pageData['options'][card.id])
            this.calcprice()
            const pageprice=`<page-price></page-price>`; // le mando el precio como una propiedad
            this.parentNode.insertAdjacentHTML('beforeend',pageprice);
            this.parentNode.removeChild(this);
        }
        else{// lee el numero de pagina en la que se esta y le agrega uno 
            this.page=`page-${Math.floor(this.pageData['num']+1)}` //se hace uso del math.floor por que en el caso de ser la pagina 2.1 al sumarle 1 necesitamos que quede en 3
        }
        this.requestUpdate(); // refresca el webcomponent con el nuevo this.page
    
    }
    backButton(){
        if(this.page===`page-1`){ // si la pagina es la primera debe regresar al intro de la pagina web
            const introPage = `<page-intro></page-intro>`; //crea el texto que debe ponerse en el html
            this.parentNode.insertAdjacentHTML('beforeend', introPage); 
            // dice que en el padre de este web component agregue un html antes de que se termine el padre con el texto de la constante antes definida
            this.parentNode.removeChild(this); // dice que se debe eliminar este web component del padre 
        }
        else if(this.page===`page-2.1`){
            this.page=`page-2`
        }
        else {// resta uno al this.page para devolver la pagina
            this.page=`page-${this.pageData['num']-1}`
        }
        this.requestUpdate();
        console.log(this.pageAtributes)
    }

    
    }

customElements.define("page-option", pageOption);