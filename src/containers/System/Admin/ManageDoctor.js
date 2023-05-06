import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import Select from "react-select";

import { getDetailInfoDoctor } from '../../../services/userService'
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor (props) {
    super(props);
    this.state = {

      // save to mardown
      contentMarkdown: '',
      contentHTML: '',
      selectedDoctor: '',
      description: '',
      listDoctors: [],
      hasOldData: false,


      // save fore doctor info table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],
      selectedPrice: '',
      selectedPayment: '',
      selectedProvince: '',
      selectClinic: '',
      selectSpecialty : '',
      nameClinic: '',
      addressClinic: '',
      note: '',
      clinicId: '',
      specialtyId: '' ,

    };
  }

  state = {};
  componentDidMount = () => {
    this.props.fetchAllDoctorRedux()
    this.props.getRequiredDoctorInfo()
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor ,'USERS')
      this.setState({
        listDoctors: dataSelect
      })
    }
    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {

      let { resPrice, resPayment, resPovince , resSpecialty , resClinic } = this.props.allRequiredDoctorInfor
      let dataSelectPrice = this.buildDataInputSelect(resPrice ,'PRICE')
      let dataSelectPayment = this.buildDataInputSelect(resPayment ,'PAYMENT')
      let dataSelectProvince = this.buildDataInputSelect(resPovince, 'PROVINCE')
      let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
      let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC')
      
      console.log('check data', dataSelectPrice , dataSelectPayment, dataSelectProvince);
      this.setState({ 
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty ,
        listClinic: dataSelectClinic
      })
    }
  };
  buildDataInputSelect = (inputData , type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      if (type === 'USERS') {
        inputData.map((item, i) => {

          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`
          let labelEn = `${item.firstName} ${item.lastName} `
          object.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object)
        })
      }
      if (type === 'PRICE') {
        inputData.map((item, i) => {

          let object = {};
          let labelVi = `${item.valueVi}`
          let labelEn = `${item.valueEn} USD `
          object.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object)
        })
      }
      if (type === 'PAYMENT' || type === 'PROVINCE') {
        inputData.map((item, i) => {

          let object = {};
          let labelVi = `${item.valueVi}`
          let labelEn = `${item.valueEn} `
          object.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object)
        })
      }
      if (type === 'SPECIALTY') {
        inputData.map((item, i) => {

          let object = {};
          object.label = item.name
          object.value = item.id;
          result.push(object)
        })
      }
      if (type === 'CLINIC') {
        inputData.map((item, i) => {

          let object = {};
          object.label = item.name
          object.value = item.id;
          result.push(object)
        })
      }

    }
    
    return result
  }
  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: text,
      contentMarkdown: html,
    })
  }
  handleSaveContentMardown = () => {
    let { hasOldData } = this.state
    this.props.saveDetailDoctors({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      selectedPrice: this.state.selectedPrice.value ,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      specialtyId: this.state.selectSpecialty && this.state.selectSpecialty.value ?
        this.state.selectSpecialty.value : '',
        clinicId: this.state.selectClinic && this.state.selectClinic.value ?
        this.state.selectSpecialty.value : ''
      
      ,

      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
    })
    this.setState({
      contentHTML: '',
      contentMarkdown: '',
      description: '',
      hasOldData: false
    })
    console.log('check state', this.state)
  };
  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
    let  {listPrice , listPayment , listProvince , listSpecialty ,listClinic} = this.state;
    let res = await getDetailInfoDoctor(selectedDoctor.value)
    console.log('check res' , res);
    if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.doctor_infor) {
      let Markdown = res.data.Markdown;
      let doctor_infor = res.data.doctor_infor
      let  priceId = doctor_infor.priceId
      let paymentId = doctor_infor.paymentId 
      let provinceId = doctor_infor.provinceId
      let specialtyId = doctor_infor.specialtyData.name
      let clinicId = doctor_infor.clinicId
      console.log('check@@', clinicId);
      
      let selectedPrice = listPrice.find(item => {
        return item && item.value === priceId
      })
      let selectedPayment = listPayment.find(item => {
        return item && item.value === paymentId
      })
      let selectedProvince = listProvince.find(item => {
        return item && item.value ===provinceId
      })
      let selectSpecialty = listSpecialty.find(item => {
        return item && item.label ===specialtyId
      })
      let selectClinicId = listClinic.find(item => {
        return item && item.value ===clinicId
      })
      this.setState({
        contentHTML: Markdown.contentHTML,
        contentMarkdown: Markdown.contentMarkdown,
        description: Markdown.description,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        nameClinic: doctor_infor.nameClinic,
        addressClinic: doctor_infor.addressClinic,
        note : doctor_infor.note ,
        hasOldData: true,
        selectSpecialty: selectSpecialty,
        selectClinic :selectClinicId
      })
    } else {
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        selectedPrice: '' ,
        selectedPayment: '',
        selectedProvince: '',
        nameClinic: '',
        addressClinic: '',
        note : '' ,
        hasOldData: false,
        selectSpecialty : ''
      })
    }
    console.log('checkkk dôct', res)
  }

  handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedDoctor;

    this.setState({
      ...stateCopy
    })

    console.log('check new onc' , selectedDoctor , name);

  }
  handleOnChangeText = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
        ...stateCopy
    })
  }

  render() {
    let { hasOldData , listSpecialty } = this.state
    console.log('echcc' , this.state)
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin doctor</div>
        <div className="more-infor">
          <div className="content-left form-group">

            <label>chọn bác sĩ </label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={'Chọn bác sĩ'}
            />
          </div>
          <div className="content-right form-group">
            <label>Thông tin giới thiệu:</label>
            <textarea className="form-control"
              onChange={(e) => this.handleOnChangeText(e ,'description')}
              value={this.state.description}
            >

            </textarea>
          </div>




        </div>

        <div className="mor-infor-extra row">
          <div className="col-4 form-group">

            <label >Chọn giá</label>
             <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={'Chọn Gía'}
              name ="selectedPrice"
              className=""
            />

          </div>
          <div className="col-4 form-group mb-4">

            <label >Chọn phương thức thanh toán</label>
             <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={'Chọn phương thức thanh toán'}
              name="selectedPayment"
          
              className=""
            />

          </div>
          <div className="col-4 form-group mb-4">

            <label >Chọn tỉnh thành</label>
             <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={'Chọn tỉnh thành'}
              name="selectedProvince"
              className=""
            />

          </div>
          <div className="col-4 form-group mb-4">

            <label >Tên phòng khám</label>
            <input className="form-control"
              value={this.state.nameClinic}
              onChange= {(e) =>this.handleOnChangeText(e ,'nameClinic' )}
            />

          </div>
          <div className="col-4 form-group mb-4">

            <label >địa chỉ phòng khám</label>
            <input className="form-control"
                   value={this.state.addressClinic}
                   onChange= {(e) =>this.handleOnChangeText(e ,'addressClinic' )}
            />

          </div>
          <div className="col-4 form-group mb-4">

            <label >Note</label>
            <input className="form-control"
              value={this.state.note}
              onChange= {(e) =>this.handleOnChangeText(e ,'note' )}/>

          </div>



        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label className="" >Chọn chuyên khoa</label>
            <Select
                  value={this.state.selectSpecialty}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={this.state.listSpecialty}
                  placeholder={'Chọn chuyên khoa'}
                  name="selectSpecialty"
            />
            
          </div>
          <div className="col-4 form-group">
            <label className="" >Chọn phòng khám</label>
            <Select
                  value={this.state.selectClinic}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={this.state.listClinic}
                  placeholder={'Chọn co so kham'}
                  name="selectClinic"
            />
            
          </div>
        </div>

        <div className="manage-doctor-edit">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentHTML}
          />
        </div>

        <button
          className={hasOldData === false ? "save-content-doctor" : "create-content-doctor"}
          onClick={() => this.handleSaveContentMardown()}
        >
          {hasOldData === true ?
            <span> lưu thông tin</span> :
            <span> thêm thông tin</span>
          }
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctor: state.admin.allDoctor,
    language: state.app.language,
    allRequiredDoctorInfor : state.admin.allRequiredDoctorInfor ,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctors(data)),
    getRequiredDoctorInfo : () => dispatch(actions.getRequiredDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
