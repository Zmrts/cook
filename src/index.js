import React, { createContext,} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import './firebase'
import { getDatabase } from 'firebase/database'
import { AuthProvider } from './hoc/AuthProvider';



export const Context = createContext(null);

const database = getDatabase();






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <AuthProvider>
    <Context.Provider value={{
        database
    }}>
        <App />
    </Context.Provider>
    </AuthProvider>
    </BrowserRouter>
    

);

