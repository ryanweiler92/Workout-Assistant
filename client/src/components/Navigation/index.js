import React, { useState } from 'react';
import {Container, Nav, Navbar, Col, Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginForm from '../LoginForm/index'

const Navigation = () => {

    const [ showModal, setShowModal ] = useState(false);


    return (
        <>
        <Navbar expand='lg'>
            <Container fluid>
                <Navbar.Brand >
                    Workout Assistant
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar' />
                <Navbar.Collapse id='navbar'>
                <Nav className="ml-auto">
                    <Nav.Link>Profile</Nav.Link>
                    <Nav.Link>Login/Sign Up</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Container fluid className="hero">
        </Container>
        </>
    )
};

export default Navigation