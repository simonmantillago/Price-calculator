import data from '../pages.json';
import { LitElement, css, html } from 'lit';



export class pageOption extends LitElement{


    constructor() {
        super();
        this.page = ''; // Inicializa la propiedad name
    };
    static properties = {
        page: { type: String } // lee la propiedad page que se pone en el web component
    };
    //estilos de cada web component
    static styles = css` 
    img{
        width:100%
    }
    .cards-container{
        padding:5%;
        width:100%;
    }
    .cards-container,.card{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap:20px;
        transition: transform 0.3s ease;
    }
    .card{
        font-size: 5vw;
        text-align:center;
        padding:2.5%
    }
    .card:hover{
        background-color: rgba(48, 48, 48, 0.814);
        transform: translateY(-10px);
    }
    @media (min-width:600px) {
        .cards-container{
            flex-direction: row;
            justify-content:center;
        }
        .card{
            font-size: clamp(1em,2.5vw,1.5em);
        }
        
    }
    `

    render(){
        let pageData=data[this.page]; // se define el page data con la info de solo la pagina que se necesita 
        return html`
            <div class="cards-container" >
            ${Object.values(pageData).map(item => html`    
                <div class="card">
                    <img src="../${item.url}" alt="picture">
                    <p style="color:white;">${item.txt}</p>
                </div>
            `)}
            </div>`
    } //itera con el map para todas las opciones que hay dentro de page y realiza una card por cada una
}
customElements.define("page-option",pageOption);