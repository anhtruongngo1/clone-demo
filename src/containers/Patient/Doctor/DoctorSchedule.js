import React, { Component } from "react";
import { connect } from "react-redux";
import "../Doctor/doctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService"
import { FcCalendar } from "react-icons/fc";
import { FaRegHandPointUp } from "react-icons/fa";
import BookingModal from './Modal/BookingModal'


class DoctorSchedule extends Component {
    constructor (props) {
        super(props);
        this.state = {
          allDays: [],
          allAvalibleTime: [],
          isOpenModalBooking: false,
          dataScheduleTimeModal :{}

        }
    }
  componentDidMount = async () => {
    
   
     let { language } = this.props    
   let allDays = this.getArrDays(language)
     this.setState({
       allDays: allDays ,
     })
    if (this.props.currentDoctorId) {
      
      let res = await getScheduleDoctorByDate(this.props.currentDoctorId, allDays[0].value) 
     this.setState({
       allAvalibleTime : res.infor.data ? res.infor.data : []
     })
    }
  }
  
  capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    getArrDays =  (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
          if (language === LANGUAGES.VI) {
            if (i === 0) {
              let DDMM = moment(new Date()).format('DD/MM');
              let today = `hôm nay-${DDMM}` 
              object.label =today;
            } else {
              
              let labelVi =  object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi)
              }
          } else {
            if (i === 0) {
              let DDMM = moment(new Date()).format('DD/MM');
              let today = `Today-${DDMM}` 
              object.label =today;
            } else {
              object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
              
             }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()


            allDays.push(object)
        }
       return allDays
    
      }
componentDidUpdate = async(prevProps, prevState) => {
    if (prevProps.language !== this.props.language) {
      this.getArrDays(this.props.language)
      let allDays = this.getArrDays(this.props.language)
      this.setState({
        allDays : allDays
    })
  }
  if (this.props.currentDoctorId !== prevProps.currentDoctorId) {
    let allDays = this.getArrDays(this.props.language)
    let res = await getScheduleDoctorByDate(this.props.currentDoctorId, allDays[0].value) 
    this.setState({
      allAvalibleTime : res.infor.data ? res.infor.data : []
    })
  }
  }   
  
  handleOnchangeSelect = async (e) => {
    if (this.props.currentDoctorId && this.props.currentDoctorId !== -1) {
      let doctorId = this.props.currentDoctorId;
      let date = e.target.value
      let res = await getScheduleDoctorByDate(doctorId, date) 
      console.log('checkkk' , res.infor.data);

      if(res&&res.infor.errCode ===0) {
        this.setState({
         allAvalibleTime :  res.infor.data ? res.infor.data : []
       })
      }
    }
   
  }
  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time
    })
    console.log('check3' , time);

  }
  closeBookingModal = () => {
    this.setState({ isOpenModalBooking: false })
  }
  render() {
    let { allDays, allAvalibleTime,isOpenModalBooking ,dataScheduleTimeModal } = this.state
    let { language } = this.props
    console.log('check1' , this.props.currentDoctorId);
    return (
      <>
            <div className="doctor-schedule-container">
                <div className="all-schedule"> 
            <select onChange={(e) => this.handleOnchangeSelect(e)}>
              
                        {allDays && allDays.length > 0 && allDays.map((item, i) => {
                            return (
                                <option value={item.value} key={i}>{item.label}</option>
                        )
                        })}
              
                    </select>
                </div>
          <div className="all-available-time">
            <div className="text-calendar">

                <FcCalendar className="icon-schedule"/>
              <span>
                Lịch khám
              </span>
                     
            </div>
            <div className="time-content"> 
              
              {allAvalibleTime && allAvalibleTime.length > 0 ?
                <> <div className="time-content-btns">
                  {allAvalibleTime.map((item, i) => {

                    let timeDisplay = language === LANGUAGES.VI ?
                      item.timeTypeData.valueVi : item.timeTypeData.valueEn
                    return (
                      <button key={i}
                      
                      onClick={() => this.handleClickScheduleTime(item)}
                      >
                        {timeDisplay}  </button>
                    )


                  })}

                </div>
                  <div className="book-free"> 
                     <span> chọn <FaRegHandPointUp /> và đặt miễn phí </span>
                  </div>
                </>
                : <div className="no-schedule"> không có lịch hẹn trong thời gian này , vui lòng chọn thời gian khác</div>
              }

            </div>
                </div>
        </div>
        <BookingModal
          isOpenModalBooking={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataScheduleTimeModal = {dataScheduleTimeModal}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
