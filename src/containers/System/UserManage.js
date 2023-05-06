import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss' 
import {getAllUsers ,createNewUserService ,DeleteUserService ,EditUserService} from "../../services/userService"
import {AiFillEdit} from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'
import ModalUser from '../System/ModalUser';
import ModalEditUser from '../System/ModalEditUser';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUser : [] ,
            isOpenModalUser : false ,
            isOpenModalEditUser :false ,
            userEdit : {}
        }
    }

    state = {

    }

   async componentDidMount() {
      await this.getAllUsersFromReact() ;
    }
    getAllUsersFromReact = async ()=> {
        let response = await getAllUsers('All')
        if(response &&response.errCode ===0){
            this.setState({
                arrUser : response.users
            })
        }
    }
 handleAddNewUser =() => {
     this.setState({
         isOpenModalUser : true
     })
 }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser : !this.state.isOpenModalUser
        })
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser : !this.state.isOpenModalEditUser
        })
    }
    createNewUser =async (data) => {
       try {
       let response = await createNewUserService(data)
       if(response && response.errCode !== 0){
           alert(response.errMessage)
       }else{
        await this.getAllUsersFromReact()
        this.setState({
            isOpenModalUser : false,
           
        })
       }
  
       } catch (error) {
           console.log(error)
       }
    }
    handleDeleteUser =async (user) =>{
        try {
         let res =   await DeleteUserService(user.id)
         if(res && res.errCode === 0){
            await this.getAllUsersFromReact()
         }else{
             alert(res.errMessage)
         }
        } catch (error) {
            console.log(error)
        }
    }
    handleEditUser =(user) => {
        this.setState({
            isOpenModalEditUser : true ,
            userEdit : user
        })
    }
    doEditUser = async (user) => {
        try {  
            let res =  await EditUserService(user)
            if(res && res.errCode !== 0){
                alert(res.errMessage)
            }else{
                await this.getAllUsersFromReact()
                this.setState({
                 isOpenModalEditUser : false ,
         
             })
            }
       } catch (error) {
           console.log(error)
       }
    

    }

    render() {
        let arrUser = this.state.arrUser
        return (
            <div className="user-container">
                <ModalUser 
                isOpen ={this.state.isOpenModalUser}
                toggleUserModal = {this.toggleUserModal}
                createNewUser ={this.createNewUser}
                
                />
                { this.state.isOpenModalEditUser &&
                <ModalEditUser 
                     isOpen ={this.state.isOpenModalEditUser}
                     toggleUserModal = {this.toggleUserEditModal}
                     currentUser = {this.state.userEdit}
                     editUser ={this.doEditUser}
                    //  createNewUser ={this.createNewUser}
                />
                }
                <div className="title text-center">
                                        day la reactjs
                </div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3"
                    onClick ={()=>this.handleAddNewUser()}
                    >Add New User</button>
                </div>
                <div className="users-table mt-3 mx-2">
                <table id="customers">
                <tbody>
  <tr>
    <th>Email</th>
    <th>first name</th>
    <th>last name</th>
    <th>address</th>
    <th>action</th>
  </tr>
  
      {arrUser && arrUser.map((item , index)=>{
          return (
              <tr>
                <td>{item.email}</td>
                 <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td>
                    <button
                    onClick={()=>this.handleEditUser(item)}
                     className="btn-edit"><AiFillEdit/></button>
                    <button
                    onClick={()=>this.handleDeleteUser(item) } className="btn-delete"><BsFillTrashFill /></button>
                </td>
              </tr>
          )

      })}
  

  
  </tbody>
</table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
