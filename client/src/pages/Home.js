import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { queryExercises } from '../utils/API'

const Home = () => {
    const [searchedExercise, setSearchedExercises] = useState([]);

    const [searchInput, setSearchInput] = useState('All types');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await queryExercises(searchInput);

            const items = await response.json();

            var exerciseData = items.map((exercise) => ({
                bodyPart: exercise.bodyPart,
                equipment: exercise.equipment,
                gifUrl: exercise.gifUrl,
                id: exercise.id, 
                name: exercise.name,
                target: exercise.target
            }));

            setSearchedExercises(exerciseData)
            console.log(searchedExercise);
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
                            <Button variant='success' onClick={handleFormSubmit} name='searchSubmit'>
                                Submit
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
                {/* {exerciseData &&
                    <Row>
                        <Col>
                            <div className='container'>
                                Test
                            </div>
                        </Col>
                    </Row>
                } */}
            </Container>
        </>  
    ) 
}

export default Home