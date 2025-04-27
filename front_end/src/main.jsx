import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Store } from './store/Store'
import {Provider} from 'react-redux'
import { ToastContainer } from 'react-toastify'
createRoot(document.getElementById('root')).render(
<BrowserRouter >

    <Provider store={Store}>
    <ToastContainer />
        <App />
    </Provider>
    </BrowserRouter>
)
