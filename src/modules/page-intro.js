import { LitElement, css, html } from 'lit';



export class pageIntro extends LitElement {
    static styles =css`
        * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        }
        .intro{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap:20px;
            padding-top:  70px;
            text-align: center;
        
        }
        .title strong{
            color: #14e6d3;
        }
        .intro-image{
            width: 90vw;
        }
        .start-button{
            margin: .5em 0;
            padding: 0.8em 3em;
            border: 0;
            border-radius: 5px;
            background-image: linear-gradient(to left, #14e6d3, #8660f5);
            box-shadow: 0 1px 5px 0 rgba(0,0,0,.2);
            color: #fff;
            text-align: center; 
            font-weight: bold;
            font-size: 20px;
            vertical-align: middle;
            transition: 0.8s ease-in-out;
        }
        
        .start-button:hover{
            scale: 1.08;
        }
        
        @media (min-width: 600px) {
            .intro-image{
            width: 30vw;
            }
            .title{
            font-size: 3em;
            }
            .subtitle{
            font-size: 1.2em;
            }
            .start-button{
            font-size: 1.8em;
            }
            
            
        }

    `
    render(){
        return html`
        <section class="intro">
            <img class="intro-image" src="../src/imgs/intro.png" alt="">
            <h1 class="title">How much does it cost to develop my <strong>app</strong>?</h1>
            <p class="subtitle">Calculate the cost to create your app by answering these simple questions.</p>
            <button class="start-button">Start</button>
        </section>`
    }
    firstUpdated() {
        const startButton = this.shadowRoot.querySelector('.start-button');
        startButton.addEventListener('click',(e)=>{
            this.nextpage()
        })
    }
    nextpage(){
        const firstPage = `<page-option></page-option>`;
        this.parentNode.insertAdjacentHTML('beforeend', firstPage);
        this.parentNode.removeChild(this);
        }


}
customElements.define("page-intro", pageIntro);