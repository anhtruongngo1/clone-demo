import React, { Component } from "react";
import { connect } from "react-redux";
import "./Handbook.scss";
import Slider from "react-slick";
import { FormattedMessage} from "react-intl" ;
import Img1 from "../../../assets/Handbook/handbook1.jpg"

class Handbook extends Component {
  render() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1 ,centerMode: true,
  
      };

    return (
        <div className="section-Handbook">
        <div className="Handbook-container">
          <div className="Handbook-header">
            <span>Cẩm nang
              
            </span>
            <button>Tất cả bài viết</button>
             </div>
          <div className="Handbook-body">
 
        <Slider {...settings}>
       <div className="Handbook-customize">
       <div className="bg-image">
      <div  className = "bg-image-content">
               <img src={Img1} />
      </div>
        <span>	
                cẩm nang 1</span>
       </div>
 
       </div>
       <div className="Handbook-customize">
       <div className="bg-image">
      <div className = "bg-image-content">
               <img src={Img1} />
      </div>
        <span>	
                cẩm nang 2</span>
       </div>
       </div>
       <div className="Handbook-customize">
       <div className="bg-image">
      <div className = "bg-image-content">
               <img src={Img1} />
      </div>
        <span>	
                cẩm nang 3</span>
       </div>
       </div>
       <div className="Handbook-customize">
       <div className="bg-image">
      <div className = "bg-image-content">
               <img src={Img1} />
      </div>
        <span>	
                cẩm nang 4</span>
       </div>
       </div>
       <div className="Handbook-customize">
       <div className="bg-image">
      <div className = "bg-image-content">
               <img src={Img1} />
      </div>
        <span>	
                cẩm nang 5 </span>
       </div>
       </div>
       <div className="Handbook-customize">
       <div className="bg-image">
      <div className = "bg-image-content">
               <img src={Img1} />
      </div>
        <span>	
                cẩm nang 6</span>
       </div>
       </div>
  
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
