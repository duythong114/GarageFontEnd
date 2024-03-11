import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errorMessage: '',
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    handleOnChangePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleLogin = async () => {
        this.setState({
            errorMessage: '',
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errorCode !== 0) {
                this.setState({
                    errorMessage: data.message,
                })
            }
            if (data && data.errorCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                                type='text'
                                className='form-control'
                                placeholder='Enter your username'
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }}
                                >
                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </div>
                        <div className='col-12'>
                            <button className='login-btn' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span>Or Login with:</span>
                        </div>
                        <div className='col-12 login-social'>
                            <i className="fab fa-google google"></i>
                            <i className='fab fa-facebook-f facebook'></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
