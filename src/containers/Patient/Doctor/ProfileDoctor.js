import React, { Component } from "react";
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import {Link} from 'react-router-dom';



class ProfileDoctor extends Component {
    constructor (props) {
        super(props);
        this.state = {
                dataProfile : {}

        }
    }
  componentDidMount = async () => {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({dataProfile : data});

  }
  getInforDoctor =  async(id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.infor.errCode === 0) {
        result = res.infor.data
      }
    }
    this.setState({
      dataProfile : result
    })
    return result;

   }
  


    
  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.doctorId !== prevProps.doctorId) {
     this.getInforDoctor(this.props.doctorId)
  }

  }   
  renderTime = (dataScheduleTimeModal) => {
    if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
      let date = moment.unix(+dataScheduleTimeModal.date / 1000).format('dddd - DD/MM/YYYY');
      return (
        <>
          <div> {dataScheduleTimeModal && dataScheduleTimeModal.timeTypeData.valueVi} - {date}</div>
          <div>miễn phí đặt lịch</div>
        </>
       )
      
    }
    return <></>
   }
  render() {
    let { dataProfile } = this.state;
    let {isShowDescription , dataScheduleTimeModal , isShowLinkDetail , isShowPrice , doctorId } = this.props
    let nameVi = '' ;
    if(dataProfile && dataProfile.positionData){
        nameVi = `${dataProfile.positionData.valueVi} , ${dataProfile.lastName} ${dataProfile.firstName}`
    }
    return (
        <div className="profile-doctor-container">
            <div className="intro-doctor">
            <div className="content-left">
                {dataProfile.image && 
                 <img className="header-logo" src={dataProfile.image} />
                 }
           
            </div>
            <div className="content-right">
               <div className="up"> { nameVi}</div>
            <div className="down">
              {isShowDescription === true ?
                <>
              
                  {dataProfile.Markdown && dataProfile.Markdown.description &&
                    <span>
                      {dataProfile.Markdown.description}
                    </span>
                  }
                </> :
                <> { this.renderTime(dataScheduleTimeModal)}</>
              }








              </div> 
          </div>
         
        </div>
        {isShowLinkDetail === true &&
          <div className="view-detail-doctor" >
            <Link to={`/detail-doctor/${doctorId}`}>
            xem thêm

            </Link>
          </div>
          }



        {isShowPrice === true &&
          <div className="price"> giá khám :  {dataProfile && dataProfile.doctor_infor &&
            <NumberFormat value={dataProfile.doctor_infor.priceData.valueVi} displayType={'text'}
              thousandSeparator={true} suffix={'vnd'} />}
          </div>
        }



        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
