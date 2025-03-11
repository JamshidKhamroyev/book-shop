import { createRoot } from 'react-dom/client'
import {ToastContainer} from 'react-toastify'
import { store } from "./store/index.js"
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>,
)
