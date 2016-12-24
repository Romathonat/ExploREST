import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actionIndex.js';
import {toolify} from '../utils.js';

class CodeView extends React.Component{
  createMarkup = (json) => {
    return {__html: json}
  }

  fullscreen = () => {
    $('#dataContainerModal').modal({
      selector: {
        close: '.close, .actions .button.close.icon, .closeIcon'
      },
      //to prevent semantic ui from moving the element to the end of the page
      detachable: false
    });
    $('#dataContainerModal').modal('show');
  }

  //double data binding with the model
  updateCurrentJson = (e) => {
    this.props.dispatch(actions.setCurrentJson(e.target.value));
  }

  undo = (e) => {
    this.props.dispatch(actions.undo());
  }

  redo = (e) => {
    this.props.dispatch(actions.redo());
  }

  render() {
    if(this.props.codeRights === 'write'){
      var value;
      if (typeof this.props.currentJson === 'string' || this.props.currentJson instanceof String){
        value = this.props.currentJson;
      }
      else{
        value = JSON.stringify(this.props.currentJson,null,2);
      }
      var view = <textarea className="segmentpadding mydata textareamydata" onChange={this.updateCurrentJson} value={value}></textarea>;
    }
    else{
      if(typeof this.props.currentJson !== 'undefined'){
        var json = toolify(this.props.currentJson, this.props.tools);
      }
      else{
        var json = '';
      }
      var view = <pre className="segmentpadding mydata">{json}</pre>;
    }

    let classesLeftArrow = 'large arrow left icon';
    let classesRightArrow = 'large arrow right icon';

    if(this.props.previousGlobalState.length == 0){
        classesLeftArrow += ' disabled';
    }
    if(this.props.nextGlobalState.length == 0){
        classesRightArrow += ' disabled';
    }

    return(
      <div className="row ui segment mydatacontainer">
        <div className="myCentering">
            <i className={classesLeftArrow} onClick={this.undo}></i>
            <i className={classesRightArrow} onClick={this.redo}></i>
        </div>

        <div className="ui right floated myExpand" onClick={this.fullscreen}>
          <i className="expand disabled link icon"></i>
        </div>
        {view}

        <div className="ui fullscreen modal" id="dataContainerModal">
          <div className="ui right floated myExpand closeIcon">
            <i className="close disabled link icon"></i>
          </div>
          {view}
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentJson: state.present.currentJson,
  codeRights: state.present.codeRights,
  previousGlobalState: state.past,
  nextGlobalState: state.future
})

export default CodeView = connect(mapStateToProps)(CodeView);
