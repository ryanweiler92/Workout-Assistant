import React, { useState, useEffect } from 'react';
import {Container, Col, Form, Button} from 'react-bootstrap'
import { exercisesByBodyPart } from '../utils/API'

const Home = () => {
    const [searchedExercise, setSearchedExercises] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await exercisesByBodyPart(searchInput)
            console.log(searchInput)

            const  items  = await response.json();

            console.log(items)

            const exerciseData = items.map((exercise) => ({
                bodyPart: exercise.bodyPart
            }))
            setSearchedExercises(exerciseData)
            setSearchInput('');
        } catch (err){
            console.error(err)
        }
    }

    return (
        <>
        <Container>
            <h1>Search for Exercises!</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Row>
                    <Col xs={12} md={8}>
                        <Form.Control
                         name='searchInput'
                         value={searchInput}
                         onChange={(e) => setSearchInput(e.target.value)}
                         type='text'
                         size='lg'
                         placeholder='Search for an exercise'
                        />
                    </Col>
                </Form.Row>
            </Form>
        </Container>
        </>
    )

}

export default Home