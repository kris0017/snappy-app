import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Index from  './pages/index';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Index />, document.getElementById('root'));

serviceWorker.register();