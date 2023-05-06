import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '' ,
            firstName : '',
            lastName : '' ,
            address : ''
        }
    }

    componentDidMount() {
        
    }
    toggle = () => {
        this.props.toggleUserModal()
    }
    handleOnchangeInut = (e , id) => {

        let copyState = {...this.state}
        copyState[id] = e.target.value
        this.setState({
            ...copyState,
        });
    }
    checkValideInput = () => {
        let isValue = true ;
        let arrInput = ['email', 'password', 'firstName' , 'lastName' ,'address']
       
        for(let i = 0; i < arrInput.length; i++) {
            console.log('check inside', this.state[arrInput[i]] , arrInput[i])
            if(!this.state[arrInput[i]]) {
                isValue = false ;
                alert('missing parameter'+arrInput[i]);
                break ;
            }
        }
        return isValue ;
    }
    
    handleAddNewUser =() => {
        let isValue = this.checkValideInput();
        if(isValue === true) {
            // call api
            this.props.createNewUser( this.state)
            this.setState ({
                email : '',
                password : '' ,
                firstName : '',
                lastName : '' ,
                address : ''
            })
            
        }
    }   


    render() {
   
        return (
            <Modal 
            isOpen={this.props.isOpen} 
            toggle={()=>{ this.toggle()}} 
            className={'modal-user-container'}
            size ="lg"
            >
            <ModalHeader toggle={()=>{ this.toggle()}}>Create a new user</ModalHeader>
            <ModalBody>
               <div className="modal-user-body">

                    <div className="input-container" >
                        <label>Email</label>
                        <input 
                        type="email" 
                        onChange={(e)=>{ this.handleOnchangeInut(e ,"email")}}
                        value={this.state.email}
                        />

                    </div>
                    <div className="input-container" >
                        <label>password</label>
                        <input
                        value={this.state.password}
                         type="password" onChange={(e)=>{ this.handleOnchangeInut(e ,"password")}}/>

                    </div>
                    <div className="input-container" >
                        <label>first name</label>
                        <input
                        value={this.state.firstName}
                         type="text" onChange={(e)=>{ this.handleOnchangeInut(e ,"firstName")}}  />

                    </div>
                    <div className="input-container" >
                        <label>last name</label>
                        <input
                            value={this.state.lastName}
                         type="text" onChange={(e)=>{ this.handleOnchangeInut(e , "lastName")}}  />

                    </div>
                    <div className="input-container max-wdth-input" >
                        <label>address</label>
                        <input value={this.state.address}
                         type="text" onChange={(e)=>{ this.handleOnchangeInut(e , "address")}} />

                    </div>
               </div>
               
             
           
            </ModalBody>
            <ModalFooter>
              <Button color="primary"
               className="px-3"
               onClick={() =>{this.handleAddNewUser()}}
               > Add new </Button>{' '}
              <Button
               color="secondary"
               className="px-3"
                onClick={()=>{this.toggle()}}>close</Button>
            </ModalFooter>
          </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



