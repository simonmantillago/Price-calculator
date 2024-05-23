import { LitElement, css, html } from 'lit';



export class pagePrice extends LitElement {
    // constructor(){ // funciona similar al conectedcallback pero deje el otro por que permite que pageinfo se vaya actualizando cada vez que se agregue el elemento al dom
    //     super();
    //     const pageData = document.querySelector('page-option'); // busca el elemento page-option 
    //     this.pagePrice=`${pageData.Totalprice} USD`// busca dentro de page-option la variable totalprice
    //     this.pageAtributes=pageData.pageAtributes
    // }
    connectedCallback(){
        super.connectedCallback();
        const pageData = document.querySelector('page-option'); // busca el elemento page-option 
        this.pagePrice=`${pageData.Totalprice} USD`// busca dentro de page-option la variable totalprice
        this.pageAtributes=pageData.pageAtributes 
    }
    
    render(){
        return html`
        <section class="intro">
            <a class="startAgain">start again</a>
            <div>${this.pagePrice}</div>
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