import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import HomeHeader from "../../homePage/HomeHeader";
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailclinicById , getAllCodeSevice } from "../../../services/userService"
import _ from 'lodash';



class DetailClinic extends Component {
    constructor (props) {
        super(props);
        this.state = {
          arrDoctorId: [],
          dataDetailClinic: {},
          

        }
    }
 componentDidMount = async () => {
   if (this.props.match && this.props.match.params && this.props.match.params.id) {
     let id = this.props.match.params.id;
      
     let res = await getAllDetailclinicById(
       {
         id: id}
     )
     if (res && res.errCode === 0) {
       let data = res.data;
       let arrDoctorId = []
       if (data && !_.isEmpty(data)) {
         let arr = data.doctorClinic
         if (arr && arr.length > 0) {
           arr.map((item) => {
            arrDoctorId.push(item.doctorId);
           })
         }
       }
           
       this.setState({
        dataDetailClinic: res.data,
         arrDoctorId: arrDoctorId,

        
       })
      }

   }
  }
  getDataDetailSpecialty = () => {
    
  }
  


    
componentDidUpdate = async(prevProps, prevState) => {

  }   

  render() {
    let { arrDoctorId, dataDetailClinic  } = this.state
    console.log('check stae' , this.state);
    return (
      <div className="detail-specialty-container">
        <HomeHeader />

        <div className="description-specialty">
          {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
            <>
            <div>{ dataDetailClinic.name}</div>
          <div dangerouslySetInnerHTML={{
            __html: dataDetailClinic.descriptionHTML
          }}>
          

        </div> 
    </>
  }

        </div>

        <div className="detail-specialty-body"> 

    
        {arrDoctorId && arrDoctorId.length > 0 &&
          arrDoctorId.map((item, i) => {
            return (
              <div className="each-doctor"  key={i}> 
                <div className="dt-content-left"> 
                  <div className="profile-doctor"> 
                  <ProfileDoctor doctorId={item}
                      isShowDescription={true}
                      isShowLinkDetail={true}
                      isShowPrice = {false}
                  // dataScheduleTimeModal = {dataScheduleTimeModal}
                />
                </div>
    
              </div>
                <div className="dt-content-right">
                  <div className="doctor-schedule">
                  <DoctorSchedule currentDoctorId={item} />
                  
                  </div>
                  <div className="doctor-extraInfor">
                  
                  <DoctorExtraInfo  currentDoctorId={item}/>
                  </div>
    
                </div>
              
    
            </div>

            )
          })
        }
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
