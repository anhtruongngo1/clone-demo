import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicialFacility.scss";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import { getAllclinic } from "../../../services/userService"
import { withRouter } from 'react-router';
 
class MedicialFacility extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataClinic: []
    }
  }
  componentDidMount = async() => {
    let res = await getAllclinic()
    console.log('checkdata' , res);
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic : res.data ? res.data : []
      })
    }
  }
  handleViewDetailClinic = (item) => {
    this.props.history.push(`/detail-clinic/${item.id}`)
 
 
 
   }
  render() {
    let { dataClinic } = this.state

    return (
        <div className="section-MedicialFacility">
        <div className="MedicialFacility-container">
          <div className="MedicialFacility-header">
            <span>Cơ Sở Y Tế
              
            </span>
            <button>Tìm kiếm</button>
             </div>
          <div className="MedicialFacility-body">
 
            <Slider {...this.props.settings}>
              
            {dataClinic && dataClinic.length > 0 &&
                dataClinic.map((item , i) => (
                  <div className="MedicialFacility-customize" key={i}   onClick ={() => this.handleViewDetailClinic(item)}>
                  <div className="bg-image" style={{ background:`url(${item.image}) `}}></div>
                    <div className="clinic-name">{ item.name}</div>
            
                  </div>
                ))
              }
  
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
    language : state.app.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicialFacility));
