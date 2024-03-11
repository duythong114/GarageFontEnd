import React, { Component } from 'react';
import './ModalEditUser.scss';
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
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
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
        let arrInput = ['email', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            // call api edit user modal
            this.props.editUser(this.state)
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
                <ModalHeader toggle={() => { this.toggle() }}>Edit user</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row className='mt-3'>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="InputEmail">Email</Label>
                                    <Input
                                        onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                        value={this.state.email}
                                        type="email"
                                        name="email"
                                        placeholder="example@gmail.com"
                                        disabled
                                    />
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
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className='px-3'
                        color="primary"
                        onClick={() => { this.handleSaveUser() }}>
                        Save Changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




