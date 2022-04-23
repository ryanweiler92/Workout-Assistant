import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { queryExercises } from '../utils/API'

const Home = () => {
    const [searchedExercise, setSearchedExercises] = useState([]);

    const [searchInput, setSearchInput] = useState('All types');

    // from stackoverflow user abdennour toumi
    function randomize(array) {
        const n=50;
        const shuffled = array.sort(function(){return .5 - Math.random()});

        const selected = shuffled.slice(0,n);
    
        return selected;
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await queryExercises(searchInput);

            const items = await response.json();

            const fiftyEntries = await randomize(items);

            console.log(items);
            console.log(fiftyEntries);

            var exerciseData = fiftyEntries.map((exercise) => ({
                bodyPart: exercise.bodyPart,
                equipment: exercise.equipment,
                gifUrl: exercise.gifUrl,
                id: exercise.id, 
                name: exercise.name,
                target: exercise.target
            }));

            setSearchedExercises(exerciseData)
            // setSearchInput('');
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
                {searchedExercise.map((exercise) => {
                    return (
                        <Row key={exercise.id}>
                            <Col xs={12} md={8}>
                                <Card body border='dark'>
                                    <p>{exercise.name} | {exercise.bodyPart}</p>
                                </Card>
                            </Col>
                        </Row>
                    );
                })}
            </Container>
        </>  
    ) 
}

export default Home