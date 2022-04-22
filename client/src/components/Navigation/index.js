import React from "react";
import {Container, Nav, Navbar, Col, Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {


    return (
        <>
        <Navbar>
            <Container>
                <Navbar.Brand>Workout Assistant</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Profile</Nav.Link>
                    <Nav.Link>Sign In/Sign Up</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        </>
    )
};

export default Navigation