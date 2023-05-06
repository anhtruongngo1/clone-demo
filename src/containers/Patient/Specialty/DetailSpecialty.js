import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import HomeHeader from "../../homePage/HomeHeader";
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialtyById , getAllCodeSevice } from "../../../services/userService"
import _ from 'lodash';



class DetailSpecialty extends Component {
    constructor (props) {
        super(props);
        this.state = {
          arrDoctorId: [],
          dataDetailSpecialty: {},
          listProvince : []
          

        }
    }
 componentDidMount = async () => {
   if (this.props.match && this.props.match.params && this.props.match.params.id) {
     let id = this.props.match.params.id;
      
     let res = await getAllDetailSpecialtyById(
       {
         id: id,
       location : 'ALL'}
     )

     let resProvince = await getAllCodeSevice("PROVINCE")
     if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
       let data = res.data;
       let arrDoctorId = []
       if (data && !_.isEmpty(data)) {
         let arr = data.doctorSpecialty
         if (arr && arr.length > 0) {
           arr.map((item) => {
            arrDoctorId.push(item.doctorId);
           })
         }
       }
       let dataProvince = resProvince.data

       if (dataProvince && dataProvince.length > 0) {
         
         dataProvince.unshift({
          createdAt: null ,
          keyMap: "ALL" ,
          type: "PROVINCE",
          valueEn: "ALL" ,
          valueVi: "Toàn quốc"
         })
       }
        
       this.setState({
         dataDetailSpecialty: res.data,
         arrDoctorId: arrDoctorId,
         listProvince : dataProvince ? dataProvince : ''
        
       })
      }

   }
  }
  getDataDetailSpecialty = () => {
    
  }
  


    
componentDidUpdate = async(prevProps, prevState) => {

  }   

  handleOnchangeSelect = async(e) => {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let location = e.target.value
      let res = await getAllDetailSpecialtyById(
        {
          id: id,
        location : location}
      )
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = []
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorSpecialty
          if (arr && arr.length > 0) {
            arr.map((item) => {
             arrDoctorId.push(item.doctorId);
            })
          }
        }
         
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
         
        })
       }
 
    }


    }

  
  

  render() {
    let { arrDoctorId, dataDetailSpecialty , listProvince  } = this.state
    console.log('check stae' , this.state);
    return (
      <div className="detail-specialty-container">
        <HomeHeader />

        <div className="description-specialty">
          {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
          <div dangerouslySetInnerHTML={{
            __html: dataDetailSpecialty.descriptionHTML
          }}>
          

</div> 
  }


        </div>
        <div className="search-sp-doctor"> 
          <select className=""  onChange={(e)=>this.handleOnchangeSelect(e)}>
            {listProvince && listProvince.length > 0 &&
              listProvince.map((item, i) => {
                return (

                  <option  key={i} value={item.keyMap} >{ item.valueVi}</option>
                )
              })
            }
           
          </select>


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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
