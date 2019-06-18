import 'rc-tooltip/assets/bootstrap.css';
import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app/App';

initializeInjector();
const appRoot = document.getElementById('root');
render(<App />, appRoot);

// export default function () {
//     injector.bind(GiphyService).toInstance({
//         trending: () => Promise.resolve([]),
//     } as Partial<GiphyService> as GiphyService);
//     render(<App />, document.getElementById('root'));
// }

function initializeInjector() {
}



/**
 * Create hisotyr of recent researches
 * 1. store 5 most recent searches
 * 2. we will store search in memomery
 * 
 * 
 * 1. we sill store 
 */