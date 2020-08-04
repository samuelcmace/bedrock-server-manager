import "bootstrap/dist/css/bootstrap.css";
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import {Dashboard} from './pages/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Route path={"/"} component={Dashboard}/>
        </BrowserRouter>
    );
}

render(<App/>, document.getElementById('root'));