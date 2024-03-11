import React, { Component } from 'react';
import { emitter } from '../../utils/emitter';
import './ModalUser.scss';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Col
} from 'reactstrap';
import { connect } from 'react-redux';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
        }

        this.listenToEmitter()
    }

    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: '',
                roleId: '',
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'roleId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            // call api create modal
            this.props.CreateNewUser(this.state)
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-user-container'
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row className='mt-3'>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="InputEmail">Email</Label>
                                    <Input
                                        onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                        value={this.state.email}
                                        type="email"
                                        name="email"
                                        placeholder="example@gmail.com" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="InputPassword">Password</Label>
                                    <Input
                                        onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                        value={this.state.password}
                                        type="password"
                                        name="password"
                                        placeholder="Password" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="InputFirstName">First name</Label>
                                    <Input
                                        onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                        value={this.state.firstName}
                                        type="text"
                                        name="firstName"
                                        placeholder="First name" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="InputLastName">Last name</Label>
                                    <Input
                                        onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                        value={this.state.lastName}
                                        type="text"
                                        name="lastName"
                                        placeholder="Last name" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="InputAddress">Address</Label>
                                    <Input
                                        onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                        value={this.state.address}
                                        type="text"
                                        name="address"
                                        placeholder="1234 Main St" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="InputPhoneNumber">Phone number</Label>
                                    <Input
                                        onChange={(event) => { this.handleOnChangeInput(event, 'phoneNumber') }}
                                        value={this.state.phoneNumber}
                                        type="text"
                                        name="phoneNumber" />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="InputGender">Gender</Label>
                                    <Input
                                        onChange={(event) => { this.handleOnChangeInput(event, 'gender') }}
                                        value={this.state.gender}
                                        type='select'
                                        name="gender"
                                        className='form-select'>
                                        <option hidden></option>
                                        <option value="1">Male</option>
                                        <option value="0">Female</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="InputRole">Role</Label>
                                    <Input
                                        onChange={(event) => { this.handleOnChangeInput(event, 'roleId') }}
                                        value={this.state.roleId}
                                        type='select'
                                        name="roleId"
                                        className='form-select'>
                                        <option hidden></option>
                                        <option value="1">Admin</option>
                                        <option value="2">Doctor</option>
                                        <option value="3">Patient</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className='px-3'
                        color="primary"
                        onClick={() => { this.handleAddNewUser() }}>
                        Add New
                    </Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




