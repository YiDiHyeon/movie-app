import {  Component } from "../core/heropy";
import movieStore, { searchMovies } from '../store/movie'
import store from "../store/movie";
export default class Search extends Component {

    render() {
        this.el.classList.add('search-container')
        this.el.innerHTML = `
            <div class="search-area">
                <input 
                    placeholder="Enter the movie title to search!" 
                    value="${movieStore.state.searchText}">
                <div>
                    <select name="year" id="year"></select>
                    <button class="btn btn-primary">Search!</button>
                </div>
            </div>
            <div class="search-text-list">
               <h3>Recent searches</h3>
               <ul id="recentSearchList"></ul>
            </div>
        `

        const selectEl = this.el.querySelector('select')
        const inputEl = this.el.querySelector('input')
        const btnEl = this.el.querySelector('button')

        // movieStore.state.year = ''

        selectEl?.addEventListener('change',()=>{
            movieStore.state.year = selectEl.value
        })

        const filter = {
            selectYearStart : new Date().getFullYear(),
            selectYearEnd : 1985,
            selectYearOption:'',
            name: 'year'
        }

        if(filter.name === 'year'){
            filter.selectYearOption +=`<option> All Years </option>`
        }

        for(let year = filter.selectYearStart; year >= filter.selectYearEnd; year--){
            filter.selectYearOption +=`<option> ${year} </option>`
        }

        selectEl!.innerHTML = filter.selectYearOption

        inputEl?.addEventListener('input',()=>{
            movieStore.state.searchText = inputEl.value
        })

        inputEl?.addEventListener('keydown', event =>{
            if(event.key === 'Enter' && movieStore.state.searchText.trim()){
                getSearch()
                searchMovies(1, movieStore.state.year)
            }
        })

        btnEl?.addEventListener('click', ()=>{
            getSearch()
            if(movieStore.state.searchText.trim()){
                searchMovies(1, movieStore.state.year)
            }
        })

        function setCookie(name: string, value: string, days: number) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        function getCookie(name: string) {
            const cookieText = name + "=";
            const cookieList = document.cookie.split(';');

            for (let i = 0; i < cookieList.length; i++) {
                let cookie = cookieList[i];
                while (cookie.charAt(0) === ' '){
                    cookie = cookie.substring(1, cookie.length)
                }
                if (cookie.indexOf(cookieText) === 0) {
                    return cookie.substring(cookieText.length, cookie.length)
                }
            }
            return null;
        }

        function getSearch() {
            const searchText = movieStore.state.searchText
            if (searchText !== "") {
                let existingSearches = getCookie('searches') ? JSON.parse(getCookie('searches')) : [];

                if (!existingSearches.includes(searchText)) {
                    existingSearches = [searchText, ...existingSearches.slice(0, 9)];
                    setCookie('searches', JSON.stringify(existingSearches), 7);
                }
                RecentSearchesView();
            }
        }

        function RecentSearchesView() {
            const recentSearchList = document.getElementById('recentSearchList') as HTMLUListElement;
            recentSearchList.innerHTML = "";

            const existingSearches = getCookie('searches') ? JSON.parse(getCookie('searches')) : [];

            console.log('existingSearches', existingSearches)
            console.log('store.state.recentSearch', store.state.recentSearch)

            if(existingSearches.length === 0) {
                recentSearchList.innerHTML = "There are no recent searches.";
            } else  {
                recentSearchList.innerHTML = "";
            }

            store.state.recentSearch = existingSearches

            for (const search of  store.state.recentSearch) {
                const listEl = document.createElement('li');
                const spanEl = document.createElement('span')
                spanEl.textContent = search

                spanEl.addEventListener('click', function () {
                    inputEl!.value = search
                    store.state.searchText = search
                    if(store.state.searchText.trim()){
                        searchMovies(1, movieStore.state.year)
                    }
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '삭제';
                deleteBtn.addEventListener('click', function () {
                    deleteSearch(search);
                });

                listEl.appendChild(spanEl);
                listEl.appendChild(deleteBtn);
                recentSearchList.appendChild(listEl);
            }
        }

        function deleteSearch(search: string) {
            const existingSearches = getCookie('searches') ? JSON.parse(getCookie('searches')) : [];
            const updatedSearches = existingSearches.filter((s: string) => s !== search);
            setCookie('searches', JSON.stringify(updatedSearches), 7);
            RecentSearchesView();
        }



        window.onload = function () {
            RecentSearchesView();
        };
    }
}