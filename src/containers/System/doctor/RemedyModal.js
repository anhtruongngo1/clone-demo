import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import {Modal ,Button ,
    ModalModalHeader,
    ModalHeader,
ModalBody,
    ModalFooter
} from 'reactstrap';
import * as actions from "../../../store/actions"
import { CommonUtils } from "../../../utils";




class RemedyModal extends Component {
    constructor (props) {
        super(props);
      this.state = {
        email: '',
        imgBase64: '',
      
        
        

        

        }
    }
 componentDidMount = async () => {
  if (this.props.dataModal) {
    this.setState({
        email: this.props.dataModal.email
      })
    }
  }
  


    
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
          email: this.props.dataModal.email
        })
      }
  }
  handleOnChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }
  handleOnchangeImg = async(e) => {
    let data = e.target.files;
    let file = data[0];
    if(file){
        let base64 = await CommonUtils.getBase64(file) ;
         this.setState({
          imgBase64 : base64,
         })
    }
  }
  handleSendRemedy = () => {
    this.props.sendRemedyModal(this.state)
  }
 
    render() {
      let { isOpenModal, dataModal, isCloseModal, sendRemedyModal } = this.props
      let { email } = this.state
     

    return (
      <>
            <Modal toggle= {isCloseModal}  isOpen={isOpenModal} size='lg' className='booking-modal-container'>
            <ModalHeader toggle={isCloseModal}>
      Gửi hóa đơn khám bệnh thành công
    </ModalHeader>
    <ModalBody>
                    <div className='row'> 
                        <div className='col-6 form-group'>
                            <div className=''>
                                <label className='' >Email bệnh nhân</label>
                  <input className='input-email'
                    type='email'
                    value={email}
                    onChange={(e) => this.handleOnChangeEmail(e)}
                  />

                            </div>
                            
                        </div>
                        <div className='col-6 form-group'>
                            <div className=''>
                                <label className='' >Chọn file đơn thuốc</label>
                  <input type='file'
                    onChange={(e)=>this.handleOnchangeImg(e)}
                  />

                            </div>
                            
                            </div>
                        
     </div>
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={() =>this.handleSendRemedy()}
      >
              SEND
      </Button>
      {' '}
      <Button onClick={isCloseModal}>
        Cancel
      </Button>
    </ModalFooter>
        
          </Modal>
        </>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      language: state.app.language,
      genderRedux : state.admin.genders ,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchGenders: ()=> dispatch(actions.fecthGenderStart())

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
