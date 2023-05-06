import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { TiThMenu } from "react-icons/ti";
import { FaRegQuestionCircle , FaSearch } from "react-icons/fa";
import { FormattedMessage} from "react-intl" ;
import { LANGUAGES } from "../../utils";
import {changeLanguageApp} from "../../store/actions"

import Logo1 from "../../assets/logo1.jpg";
import Icon1 from "../../assets/images/hospital.svg" ;
import Icon2 from "../../assets/images/phone.svg" ;
import Icon3 from "../../assets/images/nhakhoa.svg" ;
import Icon4 from "../../assets/images/phauthuat.svg" ;
import Icon5 from "../../assets/images/tongquat.svg" ;
import Icon6 from "../../assets/images/yte.svg" ;
import Icon7 from "../../assets/images/xetnghiem.svg";
import Icon8 from "../../assets/images/tinhthan.svg" 
import { withRouter } from 'react-router';

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    // fire redux event : actions

  }
  ReturnToHome = () => {
    this.props.history.push(`/home`)
  }
  render() {
    let language = this.props.language
    return (
    <>
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <TiThMenu className="header-icon" />

              <img className="header-logo" src={Logo1} alt="" onClick={() => this.ReturnToHome()}/>
          </div>
          <div className="center-content">
            <div className="child-content">
              <div>
                {" "}
                <b><FormattedMessage id="homeheader.Specialist"/></b>{" "}
              </div>
              <div className="subs-title"><FormattedMessage id="homeheader.specialty"/></div>
            </div>
            <div className="child-content">
              <div>
                {" "}
                <b><FormattedMessage id="homeheader.Health"/></b>{" "}
              </div>
              <div className="subs-title"><FormattedMessage id="homeheader.hospital"/></div>
            </div>
            <div className="child-content">
              <div>
                {" "}
                <b><FormattedMessage id="homeheader.doctor"/></b>{" "}
              </div>
              <div className="subs-title"><FormattedMessage id="homeheader.Choosedoctor"/></div>
            </div>
            <div className="child-content">
              <div>
                {" "}
                <b><FormattedMessage id="homeheader.package"/></b>{" "}
              </div>
              <div className="subs-title"><FormattedMessage id="homeheader.Generalcheck"/></div>
            </div>
          </div>
          <div className="right-content">
            <div className="suport">
              <FaRegQuestionCircle />
             
            </div>
            <FormattedMessage id="homeheader.Support"/>
            <div className="flats">
              <span className={ language ===LANGUAGES.VI ?'language-vi active' : 'language-vi'}><span onClick={() =>this.changeLanguage(LANGUAGES.VI)}>VN</span></span>
              <span className={ language ===LANGUAGES.EN ?'language-en active' : 'language-en'}><span onClick={() =>this.changeLanguage(LANGUAGES.EN)}>EN</span></span>
            </div>
          </div>
        </div>
      </div>
      {this.props.isShowBanner === true &&
      <div className="home-header-banner">
          <div className="title-1">
          <FormattedMessage id="homeheader.MEDICALBACKGROUND"/>
          </div>
          <div className="title-2">
          <FormattedMessage id="homeheader.COMPREHENSIVEHEALTHCARE"/>
          </div>
          <div className="search">
              <FaSearch />
              <input type="text" className="" placeholder="Tìm kiếm chuyên khoa"/>
          </div>
          <div className="options">
              <div className="option-child">
                  <div className="icon-child">
                  <img className="header-logo" src={Icon1} alt="" />
                  </div>
                  <div className="text-child">
                  <FormattedMessage id="homeheader.ExaminationSpecialist"/>
                  </div>
              </div>
              <div className="option-child">
                  <div className="icon-child">
                  <img className="header-logo" src={Icon2} alt="" />
                  </div>
                  <div className="text-child">
                  <FormattedMessage id="homeheader.remoteexamination"/>
                  </div>
              </div>
              <div className="option-child">
                  <div className="icon-child">
                  <img className="header-logo" src={Icon5} alt="" />
                  </div>
                  <div className="text-child">
                  <FormattedMessage id="homeheader.generalexamination"/>
                  </div>
              </div>
              <div className="option-child">
                  <div className="icon-child">
                  <img className="header-logo" src={Icon7} alt="" />
                  </div>
                  <div className="text-child">
                  <FormattedMessage id="homeheader.medicaltest"/>
                  </div>
              </div>
              <div className="option-child">
                  <div className="icon-child">
                  <img className="header-logo" src={Icon8} alt="" />
                  </div>
                  <div className="text-child">
                  <FormattedMessage id="homeheader.mentalhealth"/>
                  </div>
              </div>
              <div className="option-child">
                  <div className="icon-child">
                  <img className="header-logo" src={Icon3} alt="" />
                  </div>
                  <div className="text-child">
                  <FormattedMessage id="homeheader.dentalexamination"/>
                  </div>
              </div>
              <div className="option-child">
                  <div className="icon-child">
                  <img className="header-logo" src={Icon4} alt="" />
                  </div>
                  <div className="text-child">
                  <FormattedMessage id="homeheader.surgerypackage"/>
                  </div>
              </div>
              <div className="option-child">
                  <div className="icon-child">
                  <img className="header-logo" src={Icon6} alt="" />
                  </div>
                  <div className="text-child">
                  <FormattedMessage id="homeheader.medicalproducts"/>
                  </div>
              </div>
          </div>
      </div>
      }
    </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language : state.app.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux : (language) => dispatch(changeLanguageApp(language))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
