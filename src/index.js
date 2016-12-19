import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,compose } from 'redux';
import { Router, Route, Link, browserHistory} from 'react-router';

import reducer from './reducers/index.js';
import App from './App';

import GettingStarted from 'raw!./readings/GettingStarted.md';
import OCCIProject from 'raw!./readings/OCCIProject.md';

import conf from '../conf.js';


let store = createStore(reducer, conf.initialState);
// let store = createStore(reducer, initialState, window.devToolsExtension && window.devToolsExtension());

//the first reading is the default
const readings = [
    {'title':'Getting started', 'path': 'gettingStarted', 'component': GettingStarted},
    {'title':'The OCCIware Project', 'path': 'OCCIProject', 'component': OCCIProject},
    {'title':'Known issues', 'path': 'knownIssues', 'component': knownissues},
    {'title':'Samples', 'path': 'postingSamples', 'component': postdatas}
  ]
;

window.backendURL = conf.backendURL;
window.rootURL = window.location.host;


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} readings={readings}>
        {readings.map(function(reading, i){
          return <Route path={reading.path} key={reading+i}/>;
        }, this)}
      </Route>
      <Route path='*' component={App} readings={readings}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
