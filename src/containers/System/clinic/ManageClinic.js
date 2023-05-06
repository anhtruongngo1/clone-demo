import React, { Component } from "react";
import { connect } from "react-redux";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "./ManageClinic.scss";
import { CommonUtils } from "../../../utils";
import upload1 from "../../../assets/upload.png";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { createNewSpecialty , createNewClinic } from "../../../services/userService";
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
      previewImgURL: '',
      avatar: '' ,


    }
  }
  componentDidMount = async () => {

  }




  componentDidUpdate = async (prevProps, prevState) => {

  }
  handleOnChangeInput = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({...stateCopy});

  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    })
  }
  handleOnchangeImg = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64
      })
    }
  }
  openPreviewImg = () => {
    if(!this.state.previewImgURL) return;
    this.setState({
        isOpen: true,
    })
  }
  handleSaveNewClinic = async() => {
    console.log('check state', this.state);
    let res = await createNewClinic(this.state)

     if (res && res.errCode === 0) {
       this.setState({
         name: '',
        address: '',
         imageBase64: '',
         descriptionHTML: '',
        descriptionMarkdown: '',
        previewImgURL: '',
         avatar: '' ,
       })
       toast.success("save clinic sucess ")
    } else {
       toast.error("save schedule fail ")
     }
  }

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">quản lí Phòng khám </div>

        <div className="add-new-specialy row">
          <div className="col-6 form-group">
            <label>Tên Phòng khám</label>
            <input className="form-control"
              value={this.state.name}
              onChange={(e) => this.handleOnChangeInput(e, 'name')}
              type="text" />
          </div>
          <div className="col-6 form-group">
            <label>ảnh phòng khám</label>
            <input id="previewImg" hidden className="form-control-file" type="file"
              onChange={(e) => this.handleOnchangeImg(e)}
            />
            <label
              htmlFor="previewImg" className="label-upload">
              Tải ảnh
              <img height="30px" src={upload1} />

            </label>
            <div className="preview-image" onClick={() => this.openPreviewImg()}>
              <img height="100%;" src={this.state.previewImgURL} />
            </div>
          </div>
          <div className="form-group col-6"> 
          <label>Địa chỉ phòng khám</label>
            <input className="form-control"
              value={this.state.address}
              onChange={(e) => this.handleOnChangeInput(e, 'address')}
              type="text" />
          </div>

          <div className="col-12">

            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button className="btn-save-specialty" onClick={()=>this.handleSaveNewClinic()}
            > Save</button>

          </div>
        </div>
        {this.state.isOpen === true &&
                
                <Lightbox
                      mainSrc={this.state.previewImgURL}
                     onCloseRequest={() => this.setState({ isOpen: false })}
          
          />
                }

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
