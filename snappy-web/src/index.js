import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tabs from  './pages/tabs';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Tabs />, document.getElementById('root'));

serviceWorker.register();