import { LitElement, css, html } from 'lit';



export class pagePrice extends LitElement {
    constructor(){
        super();
        this.pagePrice=''
    }
    connectedCallback() {
        super.connectedCallback();
        const pageData = document.querySelector('page-option');
        this.pagePrice=`${pageData.Totalprice} USD`
    }
    render(){
        return html`
        <section class="intro">
            <a class="startAgain">start again</a>
            <div>${this.pagePrice}</div>
        </section>`
    }

    firstUpdated(){
        const buttonAgain=this.shadowRoot.querySelector('.startAgain')
        buttonAgain.addEventListener('click',()=>{
            const firstPage='<page-intro></page-intro>';
            this.parentNode.insertAdjacentHTML('beforeend',firstPage);
            this.parentNode.removeChild(this)
        })

    
    }
}
customElements.define("page-price",pagePrice)