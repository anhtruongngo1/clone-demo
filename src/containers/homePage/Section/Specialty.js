import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { TiThMenu } from "react-icons/ti";
import { FaRegQuestionCircle , FaSearch } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from 'react-router';
import Slider from "react-slick";



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

class Specialty extends Component {
  constructor (props) {
    super(props);
    this.state = {
        dataSpecialty : []
      }
  }
  componentDidMount = async () => {
    let res = await getAllSpecialty()
    console.log('checkdata' , res);
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty : res.data ? res.data : []
      })
    }
  }
  handleViewDetailDoctor = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`)
 
 
 
   }
  render(){
    let { dataSpecialty } = this.state
    
    

    return (
     <div className="section-specialty">
       <div className="specialty-container">
         <div className="specialty-header">
           <span> Chuyên khoa phổ biến
             
           </span>
           <button>xem thêm</button>
            </div>
         <div className="specialty-body">

            <Slider {...this.props.settings}>
              {dataSpecialty && dataSpecialty.length > 0 &&
                dataSpecialty.map((item , i) => (
                  <div className="specialty-customize" key={i}   onClick ={() => this.handleViewDetailDoctor(item)}>
                  <div className="bg-image" style={{ background:`url(${item.image}) `}}></div>
                    <div>{ item.name}</div>
            
                  </div>
                ))
              }
   
      
    </Slider>
            </div>
       </div>
     </div>
    );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
