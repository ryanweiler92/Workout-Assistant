import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { queryExercises } from '../utils/API';
import Auth from '../utils/auth';
import { useSpring, animated } from '@react-spring/web'

const Home = () => {
    const [searchedExercise, setSearchedExercises] = useState([]);

    const [searchInput, setSearchInput] = useState('All types');

    const [currentExercise, setCurrentExercise] = useState('');

    const [showExModal, setShowExModal] = useState(false);

    const handleChooseExercise = (exercise) => {
        setCurrentExercise(exercise);
        setShowExModal(true);
    }

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

    const styles = useSpring({
        from: {
          opacity: 0
        },
        to: {
          opacity: 1
        },
        config: {
            duration: 2000
        }
      });

      const boxShadowChange = useSpring({
        from: {
          boxShadow: '0px 0px 10px 5px rgb(52,183,254)'
        },
        to: {
          boxShadow: '0px 0px 10px 5px rgb(255,255,255)'
          
        },
        config: {
            duration: 2000
        },
        loop: {reverse: true}
    })

    return (
        <>
            <animated.div style={styles} className="container home-container mt-3">
                <Row className="d-flex align-items-center justify-content-center mt-1 pt-4">
                    <Col lg="8" className="d-flex align-items-center justify-content-center">
                        <h1>Welcome to your Workout Assistant!</h1>
                    </Col>
                </Row>
                <Row className="d-flex align-items-center justify-content-center mt-1">
                    <Col lg="8" className="d-flex align-items-center justify-content-center">
                        <h4>Select a muscle group from the dropdown to get started!</h4>
                    </Col>
                </Row>
                <Row className="d-flex align-items-center justify-content-center mt-1">
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
                            <Button variant='primary' onClick={handleFormSubmit} name='searchSubmit'>
                                Submit
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
                </Row>
                <Row  className="d-flex align-items-center justify-content-center m-3">
                {searchedExercise.map((exercise) => {
                    return (
                        
                            <Col xs={12} md={8} lg={5} className="m-2">
                                <animated.div style={boxShadowChange} className="card d-flex align-items-center justify-content-center">
                                    <Card.Header className="w-100 text-center">{exercise.name}</Card.Header>
                                    <Card.Body key={exercise.id} border='dark' onClick={() => handleChooseExercise(exercise)}>
                                        <Card.Text>Body Part: {exercise.bodyPart}</Card.Text>
                                        <Card.Img variant="bottom" src={exercise.gifUrl} className="search-gif"/>
                                    </Card.Body>
                                    <Button onClick={() => handleChooseExercise(exercise)}>View Exercise</Button>
                                </animated.div>
                            </Col>
                        
                    );
                })}
                </Row>
                <Modal
                    size="lg"
                    show={showExModal}
                    onHide={() => setShowExModal(false)}
                    aria-labelledby='exercise-modal'
                >
                    <Modal.Header closeButton>
                        <Modal.Title id='exercise-modal'>
                            <p>{currentExercise.name}</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Body part: {currentExercise.bodyPart}</p>
                        <p>Equipment: {currentExercise.equipment}</p>
                        <p>Target muscle: {currentExercise.target}</p>
                        <img src={currentExercise.gifUrl} alt='animated demonstration' />
                        {Auth.loggedIn() ? ( 
                            <Button variant='success' size='lg'>Save this exercise</Button> ) : (<Button disabled variant='secondary' size='lg'>Login to save this exercise</Button>
                        )}
                    </Modal.Body>
                </Modal>
            </animated.div>
        </>  
    ) 
}

export default Home