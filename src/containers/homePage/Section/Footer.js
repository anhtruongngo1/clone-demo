import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage} from "react-intl" ;

class Footer extends Component {
  render() {
    

    return (
        <div className="section-footer"> 
                   <p>&copy; 2022 bishop.com</p>
        </div>
    )
}
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language : state.app.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
