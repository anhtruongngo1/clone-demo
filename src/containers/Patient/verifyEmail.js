import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifyBookAppointment } from "../../services/userService"
import HomeHeader from "../../containers/homePage/HomeHeader"



class verifyEmail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode : 0

        }
    }
    componentDidMount = async () => {
        if (this.props.location && this.props.location.search) {
            
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            console.log(token, doctorId);
            
            let res = await postVerifyBookAppointment({
                token , doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({ 
                    statusVerify: true,
                    errCode :res.errCode
                })
            } else {
                this.setState({ 
                    statusVerify: true,
                    errCode :res && res.errCode ? res.errCode : '-1'
                })
            }
        }



  }
  


    
    componentDidUpdate = async (prevProps, prevState) => {
    

  }   
  

    render() {
      let {statusVerify , errCode} = this.state;
    return (
        <>
            <HomeHeader />
            {statusVerify === false ? 
                <div>
                    Loading data...
                </div> :
                <div>
                    {errCode === 0 ? 
                        <div>success</div> : 
                       <div>false</div>
                    
                }
                </div>
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);
