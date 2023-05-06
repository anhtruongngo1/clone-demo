import React, { Component } from "react";
import { connect } from "react-redux";



class DefautClass extends Component {
    constructor (props) {
        super(props);
        this.state = {
        

        }
    }
 componentDidMount = async () => {

  }
  


    
componentDidUpdate = async(prevProps, prevState) => {

  }   
  
  handleOnchangeSelect = async (e) => {
   
   
  }
  render() {
    return (
        <>
        </>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefautClass);
