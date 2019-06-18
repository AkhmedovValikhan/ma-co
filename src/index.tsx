import 'rc-tooltip/assets/bootstrap.css';
import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app/App';

const appRoot = document.getElementById('root');
render(<App />, appRoot);
