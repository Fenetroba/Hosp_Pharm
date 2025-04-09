import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Store } from './store/Store'
import {Provider} from 'react-redux'
createRoot(document.getElementById('root')).render(
<BrowserRouter >

    <Provider store={Store}>
        <App />
    </Provider>
    </BrowserRouter>
)
