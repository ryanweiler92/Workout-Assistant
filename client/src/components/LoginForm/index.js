import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const LoginForm = (props) => {

    const [login, { error }] = useMutation(LOGIN_USER);
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.error(e);
            setShowAlert(true);
        }
    };
    return (
        <div className="container my-1">

            <Form onSubmit={handleFormSubmit}>

                <Form.Group>
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Your email address'
                        name='email'
                        onChange={handleChange}
                        value={formState.email}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Your password'
                        name='password'
                        onChange={handleChange}
                        value={formState.password}
                        required
                    />
                </Form.Group>
                {error ? (
                    <Alert dismissible onClose={() => setShowAlert(true)} show={showAlert} variant='danger'>
                        Invalid login credentials!
                    </Alert>
                ) : null}
                <div className="flex-row space-between my-3">
                    <Button
                        disabled={!(formState.email && formState.password)}
                        type="submit"
                        variant="success">
                        Submit
                    </Button>
                </div>
            </Form>

        </div>

    )
}


export default LoginForm;