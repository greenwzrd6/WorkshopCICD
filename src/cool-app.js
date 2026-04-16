import { toAllsprak, toRobber, toNormal } from "./translators.js"

const template = document.createElement("template")
template.innerHTML = `<div>
                        <h1>The cool application!</h1>
                        <textarea rows="20" cols="50" id="text"></textarea><br>
                        <input type="button" value="To Robber" id="robber">
                        <input type="button" value="To Allsprak" id="allsprak">
                        <input type="button" value="Revert" id="revert">
                      </div>`

const sheet = new CSSStyleSheet()
sheet.replaceSync(`
    textarea {
        background-color: pink;
        border: dotted;
        color: blue;
    }
        
    h1 {
        color: red;
    }`)

class CoolApp extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true))

        this.shadowRoot.adoptedStyleSheets = [sheet];

        const robber = this.shadowRoot.getElementById("robber")
        robber.addEventListener("click", this.convertTo(toRobber))

        const allsprak = this.shadowRoot.getElementById("allsprak")
        allsprak.addEventListener("click", this.convertTo(toAllsprak))

        const reverse = this.shadowRoot.getElementById("revert")
        reverse.addEventListener("click", this.convertTo(toNormal))
    }

    convertTo(func) {
        return () => {
            const textArea = this.shadowRoot.getElementById("text")
            let newText = func(textArea.value)
            textArea.value = newText
        }
    }
}

window.customElements.define("cool-app", CoolApp)
