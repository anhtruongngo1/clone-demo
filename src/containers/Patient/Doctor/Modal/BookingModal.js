import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from 'reactstrap';
import { IoIosCloseCircle } from 'react-icons/io';
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from "../../../../store/actions"
import Select from "react-select";
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';




class BookingModal extends Component {
    constructor (props) {
        super(props);
      this.state = {
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        reason: '',
        birthDay: '',
        genders: [],
        doctorId: '',
        selectedGender: '', 
        timeType : '',
        
        

        

        }
    }
 componentDidMount = async () => {
   this.props.fetchGenders()
   if (this.props.dataScheduleTimeModal) {
    let id = this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal) ? this.props.dataScheduleTimeModal.doctorId : '';
    this.setState({
      doctorId: id ,
      timeType : this.props.dataScheduleTimeModal.timeType
    })
  }
  }
  


    
  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.genderRedux !== prevProps.genderRedux) {
      
      this.setState({
          genders : this.buildDataGender(this.props.genderRedux)
        })
    }
    if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
      let id = this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal) ? this.props.dataScheduleTimeModal.doctorId : '';
      this.setState({
        doctorId: id ,
        timeType : this.props.dataScheduleTimeModal.timeType
      })
    }
  }
  buildDataGender = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map(item => {
        let object = {};
        object.label = item.valueVi 
        object.value = item.keyMap
        result.push(object)
      })
    }
    return result;
  }
  
  handleOnChangeInput = (e , id) => {
    let valueInput = e.target.value;
    let stateCopy = { ...this.state };

    stateCopy[id] = valueInput
    this.setState({
      ...stateCopy,
    })
    
  }
  handleOnChangeDatePicker = (date) => {
    this.setState({ 
                birthDay : date[0]
            })
  }
  handleChangeSelect =  (selectedOption) => {
    this.setState({
     selectedGender: selectedOption
  })
  }
  renderTime = (dataScheduleTimeModal) => {
    if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
      let date = moment.unix(+dataScheduleTimeModal.date / 1000).format('dddd - DD/MM/YYYY');
      return (
            ` ${dataScheduleTimeModal && dataScheduleTimeModal.timeTypeData.valueVi} - ${date}`
       )
      
    }
    return ''
   
  }
  buidDoctorName = (dataScheduleTimeModal) => {
    if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {

      let name = `${dataScheduleTimeModal.doctorData.lastName} ${dataScheduleTimeModal.doctorData.firstName}`
      return name
    }
    return ''

  }
  handleConfirmBooking =async () => {
        // vali date input

        // call api
    this.props.loadingModalSuccess()
    let date = new Date(this.state.birthDay).getTime()
    let timeString = this.renderTime(this.props.dataScheduleTimeModal)
    let doctorName = this.buidDoctorName(this.props.dataScheduleTimeModal)
    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataScheduleTimeModal.date,
      birthDay : date ,
      doctorId: this.state.doctorId,
      selectedGender: this.state.selectedGender.value,
      timeType: this.state.timeType,
      timeString: timeString,
      doctorName : doctorName
    })
    if (res && res.infor.errCode === 0) {
      toast.success("MY SUCCESS CREATE NEW BOOKING")
      this.props.closeBookingModal()
      this.props.loadingModalFail()
    } else {
      toast.error("MY SUCCESS FAIL BOOKING")
      this.props.loadingModalFail()
    }
  }
  render() {

    let { isOpenModalBooking, closeBookingModal, dataScheduleTimeModal } = this.props
    console.log('check booking' ,this.state);
    let doctorId = dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ? dataScheduleTimeModal.doctorId : '';
    return (
      <>
        <Modal toggle={closeBookingModal} isOpen={isOpenModalBooking}  size='lg' className='booking-modal-container'>
         
          <div className='booking-modal-content'>
            <div className='booking-modal-header'> 
              <span className='left'>Thông tin đặt lịch khám bệnh</span>
              <span className='right'
                onClick={closeBookingModal}
              ><IoIosCloseCircle className='right-icon' /> </span>

            </div>
            <div className='booking-modal-body'> 
              <div className='doctor-infor'> 
                <ProfileDoctor doctorId={doctorId}
                  isShowDescription={false}
                  dataScheduleTimeModal={dataScheduleTimeModal}
                  isShowPrice = {true}
                />
              </div>
            
              <div className='row'> 
                <div className='col-6 form-group'>
                  <label>Họ Tên</label>  
                  <input className='form-control'
                    value={this.state.fullName}
                    onChange={(e)=>this.handleOnChangeInput(e , 'fullName')}
                    type='text' />

                </div>
                <div className='col-6 form-group'>
                  <label>số điện thoại</label>  
                  <input className='form-control'
                     value={this.state.phoneNumber}
                     onChange={(e)=>this.handleOnChangeInput(e , 'phoneNumber')}
                    type='text' />

                </div>
                <div className='col-6 form-group'>
                  <label>địa chỉ liên hệ</label>  
                  <input className='form-control'
                     value={this.state.address}
                     onChange={(e)=>this.handleOnChangeInput(e , 'address')}
                    type='text' />

                </div>
                <div className='col-6 form-group'>
                  <label>địa chỉ email</label>  
                  <input className='form-control'
                     value={this.state.email}
                     onChange={(e)=>this.handleOnChangeInput(e , 'email')}
                    type='email' />

                </div>
                <div className='col-12 form-group'>
                  <label>Lý do khám</label>  
                  <input className='form-control'
                     value={this.state.reason}
                     onChange={(e)=>this.handleOnChangeInput(e , 'reason')}
                    type='text' />

                </div>
                <div className='col-6 form-group'>
                  <label>Ngày sinh</label>  
                  <DatePicker
                                className="form-control" onChange={this.handleOnChangeDatePicker}
                                value={this.state.birthDay[0]}
                             
                            />

                </div>
                <div className='col-6 form-group'>
                  <label>Giới tính</label>  
                  <Select
              value={this.state.selectedGender}
              onChange={this.handleChangeSelect}
              options={this.state.genders}
              placeholder={'Chọn giới tính'}
            />

               </div>
              </div>
            </div>
            <div className='booking-modal-footer'> 
              <button  onClick={()=> this.handleConfirmBooking()}  className='btn-booking-confirm'>Xác nhận</button>
              <button  onClick={closeBookingModal} className='btn-booking-cancel'>Hủy</button>

</div>

          </div>
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
    fetchGenders: () => dispatch(actions.fecthGenderStart()),
    loadingModalSuccess: () => dispatch(actions.loadingModalSuccess()),
    loadingModalFail :() => dispatch(actions.loadingModalFail()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
