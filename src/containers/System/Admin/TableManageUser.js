import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import { AiFillEdit } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import * as actions from "../../../store/actions"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}
class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux : []
        }
    }

    state = {

    }
    componentDidMount = () => {
        this.props.fetchUserRedux()
    }
    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.ListUsers !== this.props.ListUsers){
            this.setState({
                userRedux : this.props.ListUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id)
    }
    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }

    render() {
        console.log('check all user' , this.props.ListUsers)
        let userRedux = this.state.userRedux
        return (
            <React.Fragment >

          
            <table id="TableManageUser">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>first name</th>
                        <th>last name</th>
                        <th>address</th>
                        <th>action</th>
                    </tr>


                    {userRedux && userRedux.length > 0 && 
                    userRedux.map((item, i) => (
                        <tr key={i}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                        <button
                    onClick={()=>this.handleEditUser(item)}
                     className="btn-edit"><AiFillEdit/></button>
                    <button
                    onClick={()=>this.handleDeleteUser(item) } className="btn-delete"><BsFillTrashFill /></button>

                        </td>
                    </tr>
                    ))
                    }
                 
                </tbody>
            </table>
    
            </React.Fragment>
        );
    }

}


const mapStateToProps = state => {
    return {
        ListUsers : state.admin.Users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux : () => dispatch(actions.fecthAllUserStart()),
        deleteAUserRedux : (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
