import { Component } from "../core/heropy";

export default class NotFound extends Component {
    render() {
        this.el.classList.add('container', 'not-found')
        this.el.innerHTML = `
            <h1> 404 ERROR!<br/>
            Page Not Found!</h1>
        `
    }
}

