import data from '../pages.json';
import { LitElement, css, html } from 'lit';



export class pageOption extends LitElement {


    constructor() {
        super();
        this.page = 'page-1'; // Inicializa la propiedad name
        this.pageData={};
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
        aling-item:center
    }
    .card{
        display:flex;
        width:160px;
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
        
    }
    `

    render() { 
        this.pageData = data[this.page]; // se define el page data con la info de solo la pagina que se necesita
        return html`
            <section class="${this.page} pagina">
                <div class="top-line">
                    <span class="return-page">← Go back</span>
                    <span class="pageNum">${this.pageData['num']}/10</span>
                    <span class="price-counter">2900000</span>
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

    firstUpdated() { //la funcion firstUpdated escucha todos los botones
        const cards = this.shadowRoot.querySelectorAll('.card'); // primero lee todas las cartas
        cards.forEach(card => { // itera dentro de todas las cartas
            card.addEventListener('click', () => { // escucha el click en la carta
            this.nextbutton(); // ejecuta la funcion nextButton
            });
        })
        const back = this.shadowRoot.querySelector('.return-page'); 
        // igual que la anterior pero con el boton return, solo que en este caso solo hay un boton y no es necesario iterar
        back.addEventListener('click',(e)=>{
            this.backButton();
        })    
    };
    nextbutton(){
        if(this.page===`page-10`){} // empieza en la ultima pagina por que despues de esta no hay mas
        else{// lee el numero de pagina en la que se esta y le agrega uno 
            this.page=`page-${this.pageData['num']+1}`//
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
        else if (this.page===`page-${this.pageData['num']}`){// resta uno al this.page para devolver la pagina
            this.page=`page-${this.pageData['num']-1}`
        }
        this.requestUpdate();
    }

    
    }

customElements.define("page-option", pageOption);