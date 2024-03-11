import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('All')
        if (response && response.errorCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUserBtn = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }


    CreateNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errorCode !== 0) {
                alert(response.errorMessage)
            } else {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id)
            if (response && response.errorCode === 0) {
                await this.getAllUsersFromReact()
            } else {
                alert(response.errorMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEditUserBtn = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    handleEditUser = async (user) => {
        try {
            let response = await editUserService(user)
            if (response && response.errorCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })

                await this.getAllUsersFromReact()
            } else {
                alert(response.errorMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }
    /** Life cycle
     * run component:
     * 1> run constructor -> init state
     * 2> didMount (set state)
     * 3> render
     * 
     * 
     * */
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    CreateNewUser={this.CreateNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.handleEditUser}
                    />
                }
                <div className="title text-center">Manage users</div>

                <button
                    onClick={() => this.handleAddNewUserBtn()}
                    className='button'
                >
                    Add new user
                </button>
                <div className='user-table mt-3 mx-3'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleEditUserBtn(item)}
                                                className='btn-edit'
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                onClick={() => this.handleDeleteUser(item)}
                                                className='btn-delete'
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
