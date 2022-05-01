import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const LoginForm = () => {
    
    const [login, { error }] = useMutation(LOGIN_USER);
    const [formState, setFormState] = useState({ email: '', password: ''});

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
            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e)
        }

        setFormState({
            email: '',
            password: ''
        });
    };

    return (
        <main className="flex-row justify-center mb-4">
        <div className="col-12 col-md-6">
          <div className="card">
            <h4 className="card-header">Login</h4>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button className="btn d-block w-100" type="submit">
                  Submit
                </button>
              </form>
  
              {error && <div>Login failed</div>}
            </div>
          </div>
        </div>
      </main>
    )

            {/* <Form noValidate validated={validated} onSubmit={handleFormSubmit} >
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Invalid login credentials!
                </Alert>
                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="Your email"
                    name="email"
                    onChange={handleInputChange}
                    value={userFormData.email}
                    onSubmit={handleFormSubmit}
                    required
                    />
                    <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Your password"
                    name="password"
                    onChange={handleInputChange}
                    value={userFormData.password}
                    onSubmit={handleFormSubmit}
                    required
                    />
                    <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>

                <Button
                disabled={!(userFormData.email && userFormData.password)}
                type="submit"
                variant="success">
                Submit
                </Button>
            </Form> */}
        // </>
    // );
};

export default LoginForm;