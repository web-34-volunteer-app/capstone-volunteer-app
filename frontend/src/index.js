import ReactDOM from 'react-dom'
import {App} from "./ui/App"
import 'bootstrap/dist/css/bootstrap.css';
import "./ui/style.css"
import {store} from "./store/store";

ReactDOM.render(App(store), document.querySelector('#root'));