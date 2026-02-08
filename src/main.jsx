import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import { store} from "./apps/Store"
import { AuthProvider } from './contexts/AuthContext'
import { ReviewsProvider } from './contexts/ReviewsContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ReviewsProvider>
      <Provider store={store}>
        <BrowserRouter>
           <App />
        </BrowserRouter>
      </Provider>
    </ReviewsProvider>
  </AuthProvider>
)
