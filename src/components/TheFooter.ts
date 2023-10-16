import { Component } from "../core/heropy";
import aboutStore from '../store/about'

export default class TheFooter extends Component {
    constructor() {
        super({
            tagName: 'footer'
        });
    }
    render() {
        const {name } = aboutStore.state
        this.el.innerHTML = `
            <div>
               ${ new Date().getFullYear()} ${name}
            </div>
        `
    }
}