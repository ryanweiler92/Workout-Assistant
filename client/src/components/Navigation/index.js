import React, { useState } from 'react';
import {Container, Nav, Navbar, Modal, Tab} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginForm from '../LoginForm/index'
import SignupForm from '../SignupForm/index'
import Auth from '../../utils/auth';

const Navigation = () => {

    const [ showModal, setShowModal ] = useState(false);


    return (
        <>
                <Container fluid className="hero">

        <Navbar expand='lg'>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" >
                    Workout Assistant
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar' />
                <Navbar.Collapse id='navbar'>
                <Nav className="ml-auto">
                    {Auth.loggedIn() ? (
                    <>
                    <Nav.Link>Profile</Nav.Link>
                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                    </>
                    ) : (
                    <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                    )} 
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Modal
         size="lg"
         show={showModal}
         onHide={() => setShowModal(false)}
         aria-labelledby='signup-modal'>
         <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignupForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
        </Modal>

        </Container>
        </>
    )
};

export default Navigation