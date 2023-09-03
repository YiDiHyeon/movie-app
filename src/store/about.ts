import { Store } from "../core/heropy";
import profileImg from '../common/new-easy.png'

interface State {
    photo : string
    name : string
    email : string
    notion: string
    github : string
    repository : string
}

export default new Store<State>({
    photo: profileImg,
    name: 'YiDiHyeon / 이지현',
    email : 'leedmswl123@gmail.com',
    notion: 'https://graceful-danthus-d49.notion.site/507dbceeed944a4696c2228f29c636eb?pvs=4',
    github: 'https://github.com/YiDiHyeon',
    repository: 'https://github.com/YiDiHyeon'
})















