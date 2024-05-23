import { LitElement, css, html } from 'lit';



export class pagePrice extends LitElement {
    // constructor(){ // funciona similar al conectedcallback pero deje el otro por que permite que pageinfo se vaya actualizando cada vez que se agregue el elemento al dom
    //     super();
    //     const pageData = document.querySelector('page-option'); // busca el elemento page-option 
    //     this.pagePrice=`${pageData.Totalprice} USD`// busca dentro de page-option la variable totalprice
    //     this.pageAtributes=pageData.pageAtributes
    // }

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
        .intro{
            display:flex;
            flex-direction: column;
            justify-content: center;
            height: 100vh;
            gap: 0
        }
        .create{
            margin: .5em 0;
            padding: 0.8em 2em;
            border: 0;
            border-radius: 5px;
            background-image: linear-gradient(to left, #14e6d3, #8660f5);
            box-shadow: 0 1px 5px 0 rgba(0,0,0,.2);
            color: #fff;
            text-align: center; 
            font-weight: bold;
            font-size: 2.5vw;
            vertical-align: middle;
            transition: 0.8s ease-in-out;
            width: fit-content;
            align-self: center;
        }
        .create:hover{
            scale: 1.08;
        }
        .price{
            color: #14e2cd;
            font-weight: 700;
            font-size: 9vw;
            text-align: center;
        }
        .page-txt{
            font-size:2vw;
        }
        
        .top-line{ 
            display: flex;
            padding-top: 30px;
            font-weight: 400;
            align-items: center;
            justify-content: space-between;
            padding-inline:30px ;
            font-size:1vw;
            }
        .dioses{
            width:30vw;
            align-self:center;
        }
        

    `
    connectedCallback(){
        super.connectedCallback();
        const pageData = document.querySelector('page-option'); // busca el elemento page-option 
        this.pagePrice=`${pageData.Totalprice} USD`// busca dentro de page-option la variable totalprice
        this.pageAtributes=pageData.pageAtributes 
    }
    
    render(){
        return html`
        <section class="intro">
            <div class="top-line">
                <a class="startAgain">← Start again</a>    
            </div>
            <span class="page-txt">The estimated cost of your app is</span>
            <img src="../src/imgs/gods.PNG" alt="" class="dioses">
            <div class="price">${this.pagePrice}</div>
            <a class="create">Create your proyect</a>
            
        </section>`
    }

    firstUpdated(){
        const buttonAgain=this.shadowRoot.querySelector('.startAgain')
        buttonAgain.addEventListener('click',()=>{
            const firstPage='<page-intro></page-intro>';
            this.parentNode.insertAdjacentHTML('beforeend',firstPage);
            this.parentNode.removeChild(this)
        })
        const buttonform=this.shadowRoot.querySelector('.create')
        buttonform.addEventListener('click',()=>{
            const formpage='<page-form></page-form>';
            this.parentNode.insertAdjacentHTML('beforeend',formpage);
            this.parentNode.removeChild(this)
        })

    
    }
}
customElements.define("page-price",pagePrice)