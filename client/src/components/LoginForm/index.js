import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';


const LoginForm = () => {



    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="Your email"
                    name="email"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Your password"
                    name="password"
                    />
                </Form.Group>

                <Button
                type="submit"
                variant="success">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default LoginForm;