import { LitElement, css, html } from 'lit';

export class pageForm extends LitElement {
    static styles = css`
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
        .container {
            position: absolute;
            width: 40vw;
            height: 60vh;
            right: 30vw;
            top: 20vh;
            background-color: #101010;
            border-radius: 50px;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .customerForm {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 10px;
        }
        .big-container {
            position: absolute;
            width: 100vw;
            height: 100vh;
            right: 0vw;
            top: 0vh;
            backdrop-filter: blur(5px);
            z-index: 1;
        }
        .button2 {
            display: inline-block;
            transition: all 0.2s ease-in;
            position: relative;
            overflow: hidden;
            z-index: 1;
            color: #090909;
            padding: 0.7em 3.4em;
            cursor: pointer;
            font-size: 18px;
            border-radius: 0.5em;
            background: #e8e8e8;
            border: 1px solid #e8e8e8;
        }
        .button2:active {
            color: #666;
            box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
        }
        .button2:before {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%) scaleY(1) scaleX(1.25);
            top: 100%;
            width: 140%;
            height: 180%;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 50%;
            display: block;
            transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
            z-index: -1;
        }
        .button2:after {
            content: "";
            position: absolute;
            left: 55%;
            transform: translateX(-50%) scaleY(1) scaleX(1.45);
            top: 180%;
            width: 160%;
            height: 190%;
            background-color: #009087;
            border-radius: 50%;
            display: block;
            transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
            z-index: -1;
        }
        .button2:hover {
            color: #ffffff;
            border: 1px solid #009087;
        }
        .button2:hover:before {
            top: -35%;
            background-color: #009087;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
        }
        .button2:hover:after {
            top: -45%;
            background-color: #009087;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
        }
        .form__group {
            position: relative;
            padding: 20px 0 0;
            width: 100%;
            max-width: 180px;
        }
        .form__field {
            font-family: inherit;
            width: 100%;
            border: none;
            border-bottom: 2px solid #9b9b9b;
            outline: 0;
            font-size: 17px;
            color: #fff;
            padding: 7px 0;
            background: transparent;
            transition: border-color 0.2s;
        }
        .form__field::placeholder {
            color: transparent;
        }
        .form__field:placeholder-shown ~ .form__label {
            font-size: 17px;
            cursor: text;
            top: 20px;
        }
        .form__label {
            position: absolute;
            top: 0;
            display: block;
            transition: 0.2s;
            font-size: 17px;
            color: #9b9b9b;
            pointer-events: none;
        }
        .form__field:focus {
            padding-bottom: 6px;
            font-weight: 700;
            border-width: 3px;
            border-image: linear-gradient(to right, #116399, #38caef);
            border-image-slice: 1;
        }
        .form__field:focus ~ .form__label {
            position: absolute;
            top: 0;
            display: block;
            transition: 0.2s;
            font-size: 17px;
            color: #38caef;
            font-weight: 700;
        }
        .form__field:required, .form__field:invalid {
            box-shadow: none;
        }
        .error {
            border-bottom: 1px solid red;
        }
    `;

    connectedCallback() {
        super.connectedCallback();
        const pageData = document.querySelector('page-price');
        this.price = pageData.pagePrice;
        this.pageInfo = pageData.pageAtributes;
        this.features = {};
    }

    render() {
        return html`
            <div class="big-container"></div>
            <div class="container">
                <form class="customerForm" style="width:max-content">
                    <div class="form__group field customerName">
                        <input type="input" class="form__field" placeholder="Name" required="" id="Name" name="Name">
                        <label for="Name" class="form__label">Name</label>
                    </div>
                    <div class="form__group field customerLastName">
                        <input type="input" class="form__field" placeholder="LastName" required="" id="LastName" name="LastName">
                        <label for="LastName" class="form__label">LastName</label>
                    </div>
                    <div class="form__group field customerEmail">
                        <input type="input" class="form__field" placeholder="Email" required="" id="Email" name="Email">
                        <label for="Email" class="form__label">Email</label>
                    </div>
                    <div class="form__group field customerCountry">
                        <input type="input" class="form__field" placeholder="Country" required="" id="Country" name="Country">
                        <label for="Country" class="form__label">Country</label>
                    </div>
                    <div class="form__group field customerCity">
                        <input type="input" class="form__field" placeholder="City" required="" id="City" name="City">
                        <label for="City" class="form__label">City</label>
                    </div>
                    <button type="submit" class="submit button2">Submit</button>
                </form>
            </div>
        `;
    }

    firstUpdated() {
        const returnForm = this.shadowRoot.querySelector('.big-container');
        returnForm.addEventListener('click', () => {
            this.parentNode.removeChild(this);
        });

        const submitButton = this.shadowRoot.querySelector('.submit');
        submitButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const customerForm = this.shadowRoot.querySelector('.customerForm');
            const inputs = customerForm.querySelectorAll('.form__field');

            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (!isValid) {
                alert('Por favor, llene todos los campos.');
                return;
            }

            const mappedOption = this.pageInfo.map(option => option.txt);
            const mappedPrice = this.pageInfo.map(price => price.price);
            const data = Object.fromEntries(new FormData(customerForm).entries());
            const customerData = JSON.parse(JSON.stringify(data));
            const { Name, LastName, Email, Country, City } = customerData;

            for (let counter = 0; counter < mappedOption.length; counter++) {
                this.features[mappedOption[counter]] = mappedPrice[counter];
            }

            if (this.pageInfo[0].txt === "Optimal quality") {
                this.features[mappedOption[0]] = "x1";
            } else if (this.pageInfo[0].txt === "Good value for money") {
                this.features[mappedOption[0]] = "x2";
            } else if (this.pageInfo[0].txt === "The quality doesn't matter") {
                this.features[mappedOption[0]] = "x3";
            }

            const customerInfo = {
                Name: Name,
                LastName: LastName,
                Email: Email,
                Country: Country,
                City: City,
                Price: this.price,
                Features: this.features
            };

            console.log(customerInfo);
            try {
                const response = await fetch('https://664b70de35bbda10987cf5f7.mockapi.io/people', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(customerInfo)
                });

                if (!response.ok) {
                    throw new Error('Error al enviar POST al MockAPI');
                }

                const responseData = await response.json();
                console.log('Respuesta de la API:', responseData);
            } catch (error) {
                console.error('Error al enviar POST a la API:', error);
            }
            this.parentNode.removeChild(this);
        });
    }
}

customElements.define("page-form", pageForm);
