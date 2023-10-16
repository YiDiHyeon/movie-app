import {Component} from "../core/heropy";

export default class MovieRecentSearches extends Component {
    constructor() {
        super();
    }
    render() {
        this.el.classList.add('movie-recent-search')
        this.el.innerHTML = `
        <div class="">최근 검색어
        </div>
    `
    }
}