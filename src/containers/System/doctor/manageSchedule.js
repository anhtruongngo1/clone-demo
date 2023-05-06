import React, { Component } from 'react';
import { connect } from "react-redux";
import './manageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS , dateFormat} from "../../../utils";
import DatePicker from '../../../components/Input/DatePicker';
import moment from "moment";
import { toast } from 'react-toastify';
import _ from 'lodash';
import {saveBulkScheduleDoctor} from '../../../services/userService'

class manageSchedule extends Component {
    constructor (props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: '',
            currentDate: '',
            rangeTime: [],
        }
    }
    componentDidMount = () => {
        this.props.fetchAllDoctorRedux() 
        this.props.fetchAllScheduleTime()
    }
    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.allDoctor !== this.props.allDoctor){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
              listDoctors : dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item=>({...item , isSelected:false}))
            }

            this.setState({
                rangeTime : data
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0){
         inputData.map((item , i) => {
  
           let object = {};
           let labelVi = `${item.lastName} ${item.firstName}`
           let labelEn = `${item.firstName} ${item.lastName} `
           object.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn ;
           object.value = item.id ;
           result.push(object)
         })
  
        }
        return result
    }
    handleChangeSelect = async(selectedDoctor) => {
        this.setState({ selectedDoctor :selectedDoctor }, () =>
          console.log(`Option selected:`, this.state.selectedDoctor)
        );

    }
    handleOnChangeDatePicker = (date) => {
        this.setState({ 
                    currentDate : date[0]
                })
    }
    handleClickBtnTime = (time) => {
        
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
           rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
           })
            
           this.setState({
             rangeTime : rangeTime
             })
        }
    }
    haddleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = []
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor")
            return
        }
        if (!currentDate ) {
            toast.error("Invalid date")
            return
        }
        // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
       // let formattedDate = moment(currentDate).format('L');
       let formattedDate = new Date(currentDate).getTime()
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(time => {
                    let object = {}
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.timeType = time.keyMap 
                    result.push(object)

                })
            } else {
                toast.error("Invalid selected time")
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date :formattedDate
        })
        if (res && res.infor.errCode === 0) {
            toast.success("save schedule sucess ")
        } else {
            toast.error("save schedule fail ")
        }
        console.log('check res ',res)

    }
    render() {
        let {language} = this.props;
        let { rangeTime } = this.state 
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        
        return (
            <div className="manage-schedule-container">
                <div className="manage-schedule-title"> 
                    <FormattedMessage id="manage-schedule.title"/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label className=""> chọn bác sĩ</label>
                            <Select
                          value={this.state.selectedDoctor}
                             onChange={this.handleChangeSelect}
                               options={this.state.listDoctors}
               className="" />
            
                        </div>
                        <div className="col-6 form-group">
                        <label className=""> chọn ngày</label>
                            <DatePicker
                                className="form-control" onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate[0]}
                                minDate={yesterday}
                            />
                        </div>
                        <div  className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, i) => (
                                    <button key={i}
                                        className= {item.isSelected === true ? "btn btn-schedule active"  : "btn btn-schedule "}
                                        onClick={()=>this.handleClickBtnTime(item)}
                                    >
                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn} 
                                    
                                    </button>
                                ))
                            }
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary"
                                onClick={() => this.haddleSaveSchedule()}
                            
                            >Lưu thông tin</button>        
                        </div>
                    </div>

                </div>
         </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctor: state.admin.allDoctor ,
        language: state.app.language,
        allScheduleTime :state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime :() => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(manageSchedule);
