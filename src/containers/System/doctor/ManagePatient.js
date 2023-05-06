import React, { Component } from "react";
import { connect } from "react-redux";
import "./managePatient.scss";
import DatePicker from '../../../components/Input/DatePicker';
import moment from "moment";
import { getAllPatientForDoctor, postSendRemedy } from "../../../services/userService";
import RemedyModal from "../doctor/RemedyModal";
import { toast } from 'react-toastify';
import * as actions from "../../../store/actions"


class ManagePatient extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModel: {},
      isShowLoading: false,


    }
  }
  componentDidMount = async () => {
    this.getDataPatient()


  }
  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime()
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formattedDate
    })

    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data
      })
    }
  }




  componentDidUpdate = async (prevProps, prevState) => {


  }

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0]
    }, async () => {
      await this.getDataPatient()

    })
  }
  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patienId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,

    }
    this.setState({
      isOpenRemedyModal: true,
      dataModel: data
    })
    console.log('check prop', data);
  }
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false
    })
  }
  sendRemedyModal = async (data) => {
    this.props.loadingModalSuccess()
    let { dataModel } = this.state;
    console.log('check data', data);

    let res = await postSendRemedy({
      email: data.email,
      imageBase64: data.imgBase64,
      doctorId: dataModel.doctorId,
      patientId: dataModel.patienId,
      timeType: dataModel.timeType,
      patientName: dataModel.patientName,

    });
    if (res && res.errCode === 0) {
      toast.success("SEND REMEDY SUCCESS")
      this.closeRemedyModal()
      await this.getDataPatient()
    this.props.loadingModalFail()
    } else {
      this.props.loadingModalFail()
      toast.error("SEND REMEDY FAIL")
    }
  }
  render() {

    let { dataPatient, dataModel, isOpenRemedyModal } = this.state

    return (
      <>
       
        <div className="manage-patient-container" >
          <div className="m-p-title">
            Quản lí bệnh nhân khám bệnh
          </div>
          <div className="manage-patient-body row">

            <div className="col-4 form-group">
              <label>Chọn ngày khám</label>
              <DatePicker
                className="form-control" onChange={this.handleOnChangeDatePicker}
                value={this.state.currentDate}

              />

            </div>
            <div className="col-12 table-manage-patient ">
              <table style={{ width: '100%' }}  >
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th >HỌ VÀ TÊN</th>
                  <th >GIỚI TÍNH</th>
                  <th >ĐỊA CHỈ</th>
                  <th >ACTION</th>
                </tr>
                {dataPatient && dataPatient.length > 0 ?
                  dataPatient.map((item, i) => {
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td >{item.timeTypeDataPatient.valueVi}</td>
                        <td >{item.patientData.firstName}</td>
                        <td >{item.patientData.genderData.valueVi}</td>
                        <td >{item.patientData.address}</td>
                        <td >
                          <button className="mp-btn-confirm"
                            onClick={() => this.handleBtnConfirm(item)}
                          >Xác nhận</button>

                        </td>

                      </tr>
                    )

                  })
                  :
                  <tr>
                    <td>no data</td>
                  </tr>
                }
              </table>

            </div>
          </div>

        </div>
        <RemedyModal
          isOpenModal={isOpenRemedyModal}
          isCloseModal={this.closeRemedyModal}
          dataModal={dataModel}
          sendRemedyModal={this.sendRemedyModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingModalSuccess: () => dispatch(actions.loadingModalSuccess()),
    loadingModalFail :() => dispatch(actions.loadingModalFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
