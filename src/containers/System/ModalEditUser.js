import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "handrcodr",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }
  toggle = () => {
    this.props.toggleUserModal();
  };
  handleOnchangeInut = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValideInput = () => {
    let isValue = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];

    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValue = false;
        alert("missing parameter" + arrInput[i]);
        break;
      }
    }
    return isValue;
  };

  handleSaveUser = () => {
    let isValue = this.checkValideInput();
    if (isValue === true) {
      // call api
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <>Email</>
              <input
                type="email"
                onChange={(e) => {
                  this.handleOnchangeInut(e, "email");
                }}
                value={this.state.email}
                disabled
              />
            </div>
            <div className="input-container">
              <>password</>
              <input
                value={this.state.password}
                disabled
                type="password"
                onChange={(e) => {
                  this.handleOnchangeInut(e, "password");
                }}
              />
            </div>
            <div className="input-container">
              <>first name</>
              <input
                value={this.state.firstName}
                type="text"
                onChange={(e) => {
                  this.handleOnchangeInut(e, "firstName");
                }}
              />
            </div>
            <div className="input-container">
              <>last name</>
              <input
                value={this.state.lastName}
                type="text"
                onChange={(e) => {
                  this.handleOnchangeInut(e, "lastName");
                }}
              />
            </div>
            <div className="input-container max-wdth-input">
              <>address</>
              <input
                value={this.state.address}
                type="text"
                onChange={(e) => {
                  this.handleOnchangeInut(e, "address");
                }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            {" "}
            Save changes{" "}
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
