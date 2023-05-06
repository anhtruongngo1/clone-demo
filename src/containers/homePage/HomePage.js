import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader"
import Specialty from './Section/Specialty' ;
import MedicialFacility from "./Section/MedicialFacility" ;
import OutStandingDoctor from "./Section/OutStandingDoctor";
import Handbook from "./Section/Handbook" ;
import About from "./Section/About" ;
import Footer from "./Section/Footer"
import './Section/HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class HomePage extends Component {

  render() {
    
      let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        
        
  
      };
    return (
        <div>
           <HomeHeader isShowBanner={true}/>
           <Specialty settings={settings} />
           <MedicialFacility settings={settings}/>
           <OutStandingDoctor  settings={settings} />
           <Handbook   />
           <About />
           <Footer />
        </div>
    )
  }
}





const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
