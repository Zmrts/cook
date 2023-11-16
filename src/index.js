import React, { createContext,} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import './firebase'
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'



export const Context = createContext(null);

const auth = getAuth();
const database = getDatabase();




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Context.Provider value={{
        auth,
        database
    }}>
        <App />
    </Context.Provider>
    </BrowserRouter>
    

);

