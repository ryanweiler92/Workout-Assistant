import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Popover, ListGroup, OverlayTrigger} from 'react-bootstrap';

const Footer = () => {

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3" className="text-center">Creators</Popover.Title>
            <Popover.Content>
                <ListGroup>
                    <ListGroup.Item>
                        Ryan Weiler
                        <a href="https://github.com/ryanweiler92" target="_blank">
                            <i className="fab fa-github icon small-icon"></i>
                        </a>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Katie Spitalnic
                        <a href="https://github.com/kspitalnic" target="_blank">
                            <i className="fab fa-github icon small-icon"></i>
                        </a>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Gregory Carter
                        <a href="https://github.com/gregoryjohncarter" target="_blank">
                            <i className="fab fa-github icon small-icon"></i>
                        </a>
                    </ListGroup.Item>
                </ListGroup>
            </Popover.Content>
        </Popover>
    );

    return (
    <footer className="footer container-fluid">
        <Row className="d-flex justify-content-center align-items-center">
            <Col className="col-6 align-items-center text-center">
        <p><a href="https://github.com/ryanweiler92/Workout-Assistant" target="_blank"><i className="fab fa-github icon"></i></a></p>
            </Col>
            <Col className="col-6 text-center">
                
            <p>
            <span id="meet">Meet the creators</span>
            <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                <Button type="button">
                    <i className="fa-solid fa-bars"></i>
                </Button>
        </OverlayTrigger>
            </p>
            
            </Col>
        </Row>
    </footer>
    )
};

export default Footer