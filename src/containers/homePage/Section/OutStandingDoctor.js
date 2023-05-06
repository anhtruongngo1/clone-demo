import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutStandingDoctor.scss";
import Slider from "react-slick";
import { FormattedMessage} from "react-intl" ;
import Img1 from "../../../assets/Doctor/doctor1.jpg" ;
import * as actions from "../../../store/actions" ;
import {LANGUAGES} from '../../../utils'  ;
import { withRouter } from 'react-router';


class OutStandingDoctor extends Component {
  constructor(props){
    super(props)
    this.state = {
      arrDoctors: [],
    }
  }
  componentDidUpdate(prevProps , prevState){
        if(prevProps.topDoctor !== this.props.topDoctor){
          this.setState({arrDoctors: this.props.topDoctor})
        }
  }

  componentDidMount() {
      this.props.loadTopDoctor()
  }
  handleViewDetailDoctor = (doctor) => {
   this.props.history.push(`/detail-doctor/${doctor.id}`)



  }
  render() {

     let arrDoctors = this.state.arrDoctors ;
     let {language} = this.props

    return (
        <div className="section-OutStandingDoctor">
        <div className="OutStandingDoctor-container">
          <div className="OutStandingDoctor-header">
            <span>Bác sĩ nổi bật tuần qua
              
            </span>
            <button>Tìm kiếm</button>
             </div>
          <div className="OutStandingDoctor-body">
 
        <Slider {...this.props.settings}>
      
       {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, i) =>{
          let imageBase64 = ''
         if(item.image) {
          imageBase64 =  Buffer.from(item.image , 'base64').toString('binary');        
       }
         let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`
         let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
         return (
          <div className="OutStandingDoctor-customize" key={i} 
                  onClick ={() => this.handleViewDetailDoctor(item)}
          >
          <div className="bg-image">
         <div  className = "bg-image-content">
                  <img src={imageBase64} />
         </div>
           <span>	{ language ===LANGUAGES.VI ? nameVi : nameEn}
                   </span>
          </div>
    
          </div>
         )
         
        })}
  
     </Slider>
             </div>
        </div>
      </div>
    ) 
}
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language : state.app.language ,
    topDoctor : state.admin.topDoctor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor : () => dispatch(actions.fetchTopDoctor())

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
