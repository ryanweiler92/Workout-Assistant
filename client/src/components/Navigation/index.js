import React from "react";
import {Container, Nav, Navbar, Col, Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {


    return (
        <>
        <Navbar expand='lg'>
            <Container fluid>
                <Navbar.Brand >
                    Workout Assistant
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Profile</Nav.Link>
                    <Nav.Link>Login</Nav.Link>
                    <Nav.Link>Sign Up</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <Container fluid className="hero">
        </Container>
        </>
    )
};

export default Navigation