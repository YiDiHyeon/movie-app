import { Component } from "../core/heropy";
import profileImg from '../common/new-easy.png'

export default class TheHeader extends Component {
    constructor() {
        super({
            tagName: 'header',
            state: {
                menus: [
                    { name:'Search', href:'#/'},
                    { name:'Movie', href:'#/movie?id=tt0109830'},
                    { name:'About', href:'#/about'}
                ]
            }
        });

        // 페이지가 바뀔때마다 재 렌더
        window.addEventListener('popstate', ()=>{
            this.render()
        })
    }
    render() {
        this.el.innerHTML = `
            <a href="#/" class="logo"><span>OMDbAPI</span>.com</a>
            <nav>
                <ul>
                    ${ this.state.menus.map( menu => {
                        const href = menu.href.split('?')[0]
                        const hash = location.hash.split('?')[0]
                        const isActive = href === hash
                        return `<li><a href="${menu.href}" class="${isActive ? 'active' : ''}"> ${menu.name }</a></li>`
                    }).join('')}
                </ul>
            </nav>
            <a href="#/about" class="user"><img src="${profileImg}" alt="Profile image"></a>
        `
    }
}




