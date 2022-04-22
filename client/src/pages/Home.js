import React, { useState, useEffect } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap'
import { queryExercises } from '../utils/API'

const Home = () => {
    const [searchedExercise, setSearchedExercises] = useState([]);

    const [searchInput, setSearchInput] = useState('All types');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await queryExercises(searchInput)

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
                <h1>Find exercises</h1>
                <Form>
                    <Form.Row>
                        <Col>
                            <select className='selectpicker' onChange={(e) => setSearchInput(e.target.value)}>
                                <option>All types</option>
                            <optgroup label='By body part'>
                                <option>Back</option>
                                <option>Cardio</option>
                                <option>Chest</option>
                                <option>Lower arms</option>
                                <option>Lower legs</option>
                                <option>Neck</option>
                                <option>Shoulders</option>
                                <option>Upper arms</option>
                                <option>Upper legs</option>
                                <option>Waist</option>
                            </optgroup>
                            </select>
                            <Button variant="success" onClick={handleFormSubmit} name='searchSubmit'>
                                Submit
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        </>  
    ) 
}

export default Home