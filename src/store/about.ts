import { Store } from "../core/heropy";
import profileImg from '../common/new-easy.png'

interface State {
    photo : string
    name : string
    email : string
    github: string
    notion: string

}
export default new Store<State>({
    photo: profileImg,
    name: 'YiDiHyeon / 이지현',
    email : 'leedmswl123@gmail.com',
    notion: 'https://imeasyhyeon.notion.site/Study-507dbceeed944a4696c2228f29c636eb?pvs=4',
    github: 'https://github.com/YiDiHyeon',
})













