import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeSevice} from "../../../services/userService"
import { LANGUAGES , CRUD_ACTIONS , CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions"
import upload1 from "../../../assets/upload.png"
import './UserRedux.scss' 
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser'

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderAll:[],
            positionAll: [],
            roleAll : [] ,
            previewImgURL :'' ,
            open: false ,


            email:'' ,
            password:'' ,
            firstName:'' ,
            lastName:'' ,
            phoneNumber:'' ,
            address:'' ,
            gender:'' ,
            positionId:'' ,
            roleId:'' ,
            avatar: '' ,

            action: '' ,
            userEditId : '' ,

        }
    }
    state = {

    }   
    componentDidUpdate(prevProps , prevState , snapshot) {
            if(prevProps.genderRedux !== this.props.genderRedux) {
                let arrGender = this.props.genderRedux
                this.setState({
                    genderAll: arrGender ,
                    gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
                })
            }
            if(prevProps.roleRedux !== this.props.roleRedux) {
                let arrRole = this.props.roleRedux
                this.setState({
                    roleAll: this.props.roleRedux ,
                    roleId : arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
                })
            }
            if(prevProps.positionRedux !== this.props.positionRedux) {
                let arrPosition = this.props.positionRedux
                this.setState({
                    positionAll: this.props.positionRedux,
                    positionId : arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
                })
            }
            if(prevProps.ListUsers !== this.props.ListUsers){
                let arrGender = this.props.genderRedux 
                let arrRole = this.props.roleRedux 
                let arrPosition = this.props.positionRedux
                this.setState({
                    email:'' ,
                    password:'' ,
                    firstName:'' ,
                    lastName:'' ,
                    phoneNumber:'' ,
                    address:'' ,
                    gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '' ,
                    positionId: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '' ,
                    roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '' ,
                    avatar: '' ,
                    action : CRUD_ACTIONS.CREATE  ,
                    previewImgURL : ''

                })
            }
    }

         componentDidMount() {
            this.props.getGenderStart();
            this.props.getPositionStart();
            this.props.getRoleStart();
           

      
    //    this.props.dispatch(actions.fecthGenderStart())
    //  try{
    //    let res =  await getAllCodeSevice('gender');
    //    if(res && res.errCode ===0){
    //        this.setState ({
    //            genderAll: res.data
    //        })
    //    }
    //  }
    //  catch(e){
    //       console.log(e)
    //  }
    }
    handleOnchangeImg = async(e) => {
        let data = e.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file) ;
            let objectUrl = URL.createObjectURL(file);
             this.setState({
                 previewImgURL :objectUrl ,
                 avatar: base64
             })
        }
    }
    openPreviewImg = () => {
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    }
    handleSaveUser = () => {
        let isvalid = this.checkValidateInput()
         if(isvalid === false) return         
           
         let {action} = this.state
         if(action ===CRUD_ACTIONS.CREATE){
             // fire redux action create user
             this.props.createNewUser({
                email: this.state.email, 
                password: this.state.password ,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                address:this.state.address,
                phoneNumber:this.state.phoneNumber,
                gender :this.state.gender,
                roleId :this.state.roleId,
                positionId :this.state.positionId  ,
                avatar:this.state.avatar, 

            })

         }
         if(action === CRUD_ACTIONS.EDIT){

             // fire redux edit user
             this.props.editUserRedux({
                id : this.state.userEditId ,
                email: this.state.email, 
                password: this.state.password ,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                address:this.state.address,
                phoneNumber:this.state.phoneNumber,
                gender :this.state.gender,
                roleId :this.state.roleId,
                positionId :this.state.positionId ,
                avatar:this.state.avatar,
             })

         }
       console.log('checkstae' , this.state)
     }

    checkValidateInput = () => {
        let isValid = true 
        let arrCheck = ['email',
        'password',
        'firstName',
        'lastName',
        'phoneNumber',
        'address',
      ]
      for (let i = 0; i < arrCheck.length; i++) {
          if(!this.state[arrCheck[i]]){
              isValid = false ;
              alert('missing is requid  '+ arrCheck[i])
              break;
          }
      }
      return  isValid
      

    }
    onChangeInput = (e , id) => {
        let coppyState = {...this.state}
        
        coppyState[id] = e.target.value
        this.setState({
            ...coppyState
        })
        
    }
    handleEditUserFromParent = (user)=> {
        let imageBase64= '' ;
      if(user.image) {
         imageBase64 =  Buffer.from(user.image , 'base64').toString('binary');        
      }
      console.log('nnnn' , imageBase64)
        this.setState({
            email: user.email ,
            password:'hard code' ,
            firstName: user.firstName ,
            lastName: user.lastName ,
            phoneNumber:user.phoneNumber ,
            address:user.address ,
            gender: user.gender ,
            positionId: user.positionId ,
            roleId: user.roleId ,
            previewImgURL : imageBase64 ,
            action : CRUD_ACTIONS.EDIT ,
            userEditId : user.id ,
            avatar : user.image
            

            
        } , ()=>{
            console.log('checckk' , this.state)
        })
        

    }
    render() {
     
        let genders = this.state.genderAll 
        let language = this.props.language
        let isLoadingGender = this.props.isLoadingGender 
        let role = this.state.roleAll
        let position = this.state.positionAll
       
        let {email,password,firstName,lastName,phoneNumber,address,gender,positionId ,roleId , avatar}
         = this.state;
        return (
            <div className= "user-redux-container">

                <div className="title" >User Redux bi-shop</div>
                <div> {isLoadingGender === true ? "loading vui long doi thu nghiem tren gender" : ''}</div>
                <div className="user-redux-body" >
                    <div className="container">
                    <div className="row">
                        <div className="col-12 my-3">Thêm mới người dùng</div>
                        <div className="col-3">
                            <label>Email</label>
                            <input type="email" className="form-control"
                            value={email}
                            onChange={(e) => this.onChangeInput(e,'email')}
                            disabled= {this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                            />
                        </div>
                        <div className="col-3">
                            <label>password </label>
                            <input type="password" className="form-control"
                              value={password}
                              onChange={(e) => this.onChangeInput(e,'password')}
                              disabled= {this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                            />
                        </div>
                        <div className="col-3">
                            <label>First Name</label>
                            <input type="text" className="form-control"
                              value={firstName}
                              onChange={(e) => this.onChangeInput(e,'firstName')}
                            />
                        </div>
                        <div className="col-3">
                            <label>Last Name</label>
                            <input type="text" className="form-control"
                              value={lastName}
                              onChange={(e) => this.onChangeInput(e,'lastName')}
                            />
                        </div>
                        <div className="col-3">
                            <label>Phone Number</label>
                            <input type="text" className="form-control"
                              value={phoneNumber}
                              onChange={(e) => this.onChangeInput(e,'phoneNumber')}
                              />
                        </div>
                        <div className="col-9">
                            <label>Address</label>
                            <input type="text" className="form-control"
                              value={address}
                              onChange={(e) => this.onChangeInput(e,'address')}
                            />
                        </div>
                        <div className="col-3">
                            <label>Gender</label>
                            <select class="form-select" aria-label="Default select example"
                              value = {gender}
                              onChange={(e) => this.onChangeInput(e,'gender')}
                            >
                                {genders && genders.length > 0 && 
                                genders.map((item, i) =>{
                                    return (
                                        <option  key={i} value={item.keyMap}>{language ===LANGUAGES.VI ? 
                                            item.valueVi :item.valueEn
                                        }</option>
                                    )
                                })}
                               
                                  
                                  </select>
                        </div>
                        <div className="col-3">
                            <label>RoleID</label>
                            <select className="form-select" 
                            value = {roleId}
                            onChange={(e) => this.onChangeInput(e,'roleId')}
                            >
                            {role && role.length > 0 && 
                                role.map((item, i) =>{
                                    return (
                                        <option  key={i} value={item.keyMap} >{language ===LANGUAGES.VI ? 
                                            item.valueVi :item.valueEn
                                        }</option>
                                    )
                                })}
                                  </select>
                        </div>
                        <div className="col-3">
                            <label>position</label>
                            <select className="form-select" aria-label="Default select example"
                            value = {positionId}
                            onChange={(e) => this.onChangeInput(e,'positionId')}>
                            {position && position.length > 0 && 
                                position.map((item, i) =>{
                                    return (
                                        <option  key={i} value={item.keyMap}>{language ===LANGUAGES.VI ? 
                                            item.valueVi :item.valueEn
                                        }</option>
                                    )
                                })}
                                  </select>
                        </div>
                        <div className="col-3">
                            <label>Image</label>
                            <div className="preview-img-container">
                            <input 
                            id="previewImg" 
                            type="file" className="" 
                            onChange= {(e)=>{this.handleOnchangeImg(e)}}
                            hidden
                            />
                            <label 
                            htmlFor="previewImg" className="label-upload">
                                Tải ảnh
                                <img  height="30px" src={upload1} />

                             </label>
                            <div className="preview-image" onClick={() =>this.openPreviewImg()}>
                                <img height="100%;" src={this.state.previewImgURL} />
                            </div>
                            </div>
                        </div>
                        <div className="col-12 my-3"> 
                           
                        <button class={this.state.action === CRUD_ACTIONS.EDIT ?"btn btn-warning" : "btn btn-primary"}
                        onClick={() => this.handleSaveUser()}
                         type="submit">{this.state.action === CRUD_ACTIONS.EDIT ? "UPDATE" : 'SAVE'}</button>
                            </div>
                        <div class="col-12 mb-5">
                        <TableManageUser handleEditUserFromParent = {this.handleEditUserFromParent}
                        action = {this.state.action}
                        />
                        </div>
                    </div>
                    </div>
                </div>
                
                
                {this.state.isOpen === true &&
                
                <Lightbox
                      mainSrc={this.state.previewImgURL}
                     onCloseRequest={() => this.setState({ isOpen: false })}
          
          />
                }


            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language : state.app.language ,
        genderRedux : state.admin.genders ,
        isLoadingGender : state.admin.isLoadingGender ,
        roleRedux : state.admin.role ,
        positionRedux : state.admin.position ,
        ListUsers : state.admin.Users
    };
};

const mapDispatchToProps = dispatch => {
    return {
       getGenderStart : () => dispatch(actions.fecthGenderStart()),

       getPositionStart : () => dispatch(actions.fecthPositionStart()),

       getRoleStart : () => dispatch(actions.fecthRoleStart()) ,
       createNewUser:(data)=> dispatch(actions.createNewUser(data)),
       fetchUserRedux : () => dispatch(actions.fecthAllUserStart()),
       editUserRedux : (data) => dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
