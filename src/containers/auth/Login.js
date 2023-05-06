import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {FcGoogle} from 'react-icons/fc'
import {BsFacebook} from 'react-icons/bs'
import {AiOutlineEye ,AiOutlineEyeInvisible} from 'react-icons/ai'
import  {handleLogin} from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username :'' ,
            password :'' ,
            isShowPassword : false,
            errMessage : ''
        }
    }
    handleOnchangeUserName = (e) => {
        this.setState({username : e.target.value})
    }
    handleOnchangePassword = (e) => {
        this.setState({password : e.target.value})
    }
    handleLoginUser = async() => {
        this.setState({
            errMessage:''
        })
        try {
          let data =  await handleLogin(this.state.username , this.state.password)
          if(data && data.errCode !==0){ 
              this.setState({errMessage:data.errMessage})
          }
          if(data && data.errCode === 0){
            this.props.userLoginSuccess(data.user)
          
          }
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState(
                        {errMessage: error.response.data.message})
                }
            }
           
        }
       
    }
    handleShowHidePassword = () => {
        this.setState({ isShowPassword :!this.state.isShowPassword})
    }
    handleKeyDown = (e) => {
        if (e.key === "Enter") {
           this.handleLoginUser()
        }
    }

    render() {
        // jsx
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label className=""> Username</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Username"
                            value={this.state.username}
                            onChange={(e) => this.handleOnchangeUserName(e)}
                            />

                        </div>
                        <div className="col-12 form-group login-input">
                            <label className=""> Password :</label> 
                         <div className="custom-input-password">
                         <input 
                            type={this.state.isShowPassword ? 'text' : 'password'}
                            className="form-control" 
                            placeholder="password"
                            onChange={(e) => this.handleOnchangePassword(e)}
                             onKeyDown={(e) => this.handleKeyDown(e)}       
                            
                            />
                            <span onClick={() => this.handleShowHidePassword()} >
                            {this.state.isShowPassword ?  
                             <AiOutlineEyeInvisible className="custom-eye" />
                             : <AiOutlineEye className="custom-eye"/>
                             
                            }
                            </span>
                         </div>

                        </div>
                        <div className="col-12" style={{color : 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12"> 

                        <button 
                        onClick={() =>{ this.handleLoginUser()}}
                        className="btn-login"> Login </button>
                        </div>
                        <div className="col-12">                          
                                <a href="#" className="btn-forgot">Forgot your password</a>
                        </div>
                        <div className="col-12 text-center mt-3">
                        <span className="text-center">Or Login with :</span>
                        </div>
                        <div className="col-12 icon-login">
                                <i>  <FcGoogle /> </i>
                                <i>  <BsFacebook /> </i>
                       
                        
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
      //  userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess :(userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
