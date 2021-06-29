import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import reducer,{initialState} from './Components/reducer'; 
import {StateProvider} from './Components/StateProvider';
import App from './App';

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
  <BrowserRouter>
    <App />
    </BrowserRouter>
  </StateProvider>,
  document.getElementById('root')
);

// https://dev.to/davidepacilio/35-free-react-templates-and-themes-32ci
// https://www.creative-tim.com/product/material-kit-react