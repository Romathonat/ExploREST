import React from 'react';
import { connect } from 'react-redux';

import {callAPI} from '../utils.js';

import * as actions from '../actions/actionIndex.js';

import conf from '../../conf.js';

class NavBar extends React.Component{
  componentDidMount = () => {
    $('.ui.dropdown').dropdown();

    $('.ui.backendURL')
    .dropdown({
      allowAdditions: true
    });

    this.updateBackendURL();
  }

  updateBackendURL = () => {
    //we first reset the eventual previous message
    this.props.dispatch(actions.setOkMessage(''));

    //we define this to auto toolify hyperlinks on the code view
    var navbar = this;

    var backendURL = $('.backendURL .text').text();

    if(!backendURL.match(/^http:\/\//) && !backendURL.match(/^https:\/\//)){
      navbar.props.dispatch(actions.setErrorMessage('The URL needs to begin with http:// or https://  '));
    }
    else{
      //even if it gives us an error, we change the current backendURL
      window.backendURL = backendURL;

      $.ajax({
        url: backendURL+'/',
        type: 'GET',
        success: function(data){
              navbar.props.dispatch(actions.setOkMessage('You are now using '+backendURL));
              navbar.props.dispatch(actions.setCurrentQueryPath('/'));
              navbar.props.dispatch(actions.setCurrentJson(data));
            },
        error: function(xhr){
              navbar.props.dispatch(actions.setErrorMessage('Error connecting to '+backendURL));
            }
        }
      );
    }
  }

  render() {
    //we set the options of the backendURL
    var options = conf.serverPaths.map((path,i) => {
      return (
        <option value={path} key={i+path}>{path}</option>
      );
    })

    var serverSelection =
      <div className="ui item">
          <select className="ui fluid search dropdown backendURL" name="backendURL"onChange={() => {}}>
            {options}
          </select>
        <button className="ui button useButton" onClick={this.updateBackendURL}>Use</button>
      </div>;

    return (
      <div className="ui inverted menu navbar centered grid orange">
        <div className="ui container wrapNavbar">
          <a className="brand item largefont">ExploREST</a>
          <div className="ui item right navBarRight">
            {serverSelection}
          </div>
          <div className="ui item">
            <a href="https://github.com/Romathonat/ExploREST"><i className="big github icon"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentURLServer: state.currentURLServer,
  schemes: state.currentSchemes
})

export default NavBar = connect(mapStateToProps)(NavBar);
