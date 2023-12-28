import React, { createContext,} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import './firebase'
import { getDatabase } from 'firebase/database'
import { AuthProvider } from './hoc/AuthProvider';
import {getStorage} from "firebase/storage";



export const Context = createContext(null);

const database = getDatabase();
const storage = getStorage();




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <AuthProvider>
    <Context.Provider value={{
        database,
        storage
    }}>
        <App />
    </Context.Provider>
    </AuthProvider>
    </BrowserRouter>
    

);

