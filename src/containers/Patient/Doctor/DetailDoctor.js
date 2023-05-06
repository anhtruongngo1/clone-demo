import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../homePage/HomeHeader";
import "../Doctor/DetailDoctor.scss";
import { getDetailInfoDoctor } from '../../../services/userService';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfor';
import LoadingOverlay from 'react-loading-overlay';

class DetailDoctor extends Component {
    constructor (props) {
        super(props);
        this.state = {
          detailDoctor: {},
          currentDoctorId: -1,
          isShowLoading: false,
        }
    }
 componentDidMount = async () => {
    if(this.props.match && this.props.match.params && this.props.match.params.id){
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId : id
        
       })
        let res = await getDetailInfoDoctor(id)
        if(res && res.errCode === 0){
            this.setState({
              detailDoctor: res.data,
            })

        }
    }
}
componentDidUpdate = (prevProps, prevState) => {

}
  render() {
    
    let {detailDoctor} = this.state
    console.log(detailDoctor)
    let nameVi = '' ;
    if(detailDoctor && detailDoctor.positionData){
        nameVi = `${detailDoctor.positionData.valueVi} , ${detailDoctor.lastName} ${detailDoctor.firstName}`
    }
   
    return (
      <>
          <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text='Loading'
        >
        <HomeHeader isShowBanner={false} />
          <div className="doctor-detail-container">
            
          <div className="intro-doctor">
            <div className="content-left">
                {detailDoctor.image && 
                 <img className="header-logo" src={detailDoctor.image} />
                 }
           
            </div>
            <div className="content-right">
              <div className="up"> { nameVi}</div>
              <div className="down">
              {detailDoctor.Markdown && detailDoctor.Markdown.description &&
              <span>
                  {detailDoctor.Markdown.description}
              </span>
              }
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
        
            <div className="container-left" >
              <DoctorSchedule currentDoctorId={this.state.currentDoctorId}/>
            </div>
            <div className="container-right">
              <DoctorExtraInfo  currentDoctorId={this.state.currentDoctorId}/>
            </div >

          </div>
          <div className="detail-infor-doctor">
            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentMarkdowmn &&
            <div  dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown && detailDoctor.Markdown.contentMarkdowmn }}>

            </div>
              
            }
          </div>
          <div className="comment-doctor"></div>
          </div>
          </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
