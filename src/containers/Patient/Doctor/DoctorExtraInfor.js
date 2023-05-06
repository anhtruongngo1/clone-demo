import React, { Component } from "react";
import { connect } from "react-redux";
import "../Doctor/DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import { getExtraInforDoctorById } from "../../../services/userService";
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
    constructor (props) {
        super(props);
        this.state = {
          isShowDetaiInfor: false,
          extraInfor : []

        }
    }
  componentDidMount = async () => {
    if (this.props.currentDoctorId) {    
      let res = await getExtraInforDoctorById(this.props.currentDoctorId)
        if (res && res.infor.errCode === 0) {
          
          this.setState({
            extraInfor : res.infor.data
          })
        }
    }
  
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.currentDoctorId !== prevProps.currentDoctorId) {
      let res = await getExtraInforDoctorById(this.props.currentDoctorId)
      if (res && res.infor.errCode === 0) {
        
        this.setState({
          extraInfor : res.infor.data
        })
      }
     
  }
  }

  showHideDetailInfor = () => {
    this.setState({
      isShowDetaiInfor : !this.state.isShowDetaiInfor
    })
  }
 
    render() {
      let { isShowDetaiInfor , extraInfor } = this.state;
    

    return (
        <div className="doctor-extra-infor-container">
            <div className="content-up"> 
                <div className="text-address"> ĐỊA CHỈ KHÁM </div>
          <div className="name-clinic">{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic :null}</div>
                <div className="detail-clinic">{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic :null}</div>

            </div>
        <div className="content-down"> 
          {isShowDetaiInfor === false ?
        <div > 
              <span className="content-down-priceText"> GIÁ KHÁM : </span>
              <span className="content-down-price">

                {extraInfor && extraInfor.priceData ?
                  <NumberFormat value={extraInfor.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={'vnd'} />

                  : null}
              
              </span>
              <span className="content-detail-price" onClick={() => this.showHideDetailInfor()}>Xem chi tiết</span>
            </div> :
            <>
              <div className="content-down-priceText">GÍA KHÁM :   
               {extraInfor && extraInfor.priceData ?
                    <NumberFormat value={extraInfor.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={'vnd'} />

                  : null}
            </div>
            <div>được ưu tiên đặt khám quá booking care , giá khám cho người mới 250k </div>
            <div>người bệnh có thể thanh toán qua tiền mặt quẹt thẻ  </div>
              <div className="content-detail-price" onClick={() => this.showHideDetailInfor()}>Ẩn bảng giá  </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
