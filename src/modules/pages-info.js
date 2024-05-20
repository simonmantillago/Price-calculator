import data from '../pages.json';
import { LitElement, css, html } from 'lit'



export class pageOption extends LitElement{
    render(){
        return html`
            <div class="cards-container" >
                <img src="../${data['page-1']['1.1'].url}" alt="picture">
                <p style="color:white;">${data['page-1']['1.1'].txt}</p>
            </div>`
    }
}
customElements.define("page-option",pageOption)