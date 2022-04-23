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
            <div className="container mt-2">
            <div className="jumbotron">
                <h1 className="display-4">Say Hello to your Workout Assistant!</h1>
                <p className="lead">Find all of the exercises you need for your next workout.</p>
                <hr className="my-4" />
                <p>New to Workout Assistant?</p>
                <p className="lead">
                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse" aria-expanded="false" aria-controls="collapse">
                    Learn More
                </button>
                </p>
                <div class="collapse" id="collapse">
                    <div class="card card-body">
                        To use Workout Assistant, first sign up for a new account with your email address. Once logged in you can search for exercises by muscle group and save these to your profile. 
                        Navigate to your profile to view your saved exercises.
                    </div>
                </div>

            </div>
            </div>
            <animated.div style={styles} className="container home-container mt-3">
                <Row className="d-flex align-items-center justify-content-center mt-1">
                    <Col lg="8" className="d-flex align-items-center justify-content-center mt-3">
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
                                <animated.div style={boxShadowChange} className="card d-flex align-items-center justify-content-center pb-3">
                                    <Card.Header className="w-100 text-center text-capitalize font-weight-bold">{exercise.name}</Card.Header>
                                    <Card.Body key={exercise.id} border='dark' onClick={() => handleChooseExercise(exercise)}>
                                        <Row className="d-flex align-items-center justify-content-center">
                                        <Card.Text>Body Part: <span className="text-capitalize">{exercise.bodyPart}</span></Card.Text>
                                        </Row>
                                        <Row className="d-flex align-items-center justify-content-center pt-2">
                                        <Card.Img variant="bottom" src={exercise.gifUrl} className="search-gif"/>
                                        </Row>
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
                    <Modal.Header className="d-flex align-items-center justify-content-center" closeButton>
                        <Modal.Title className="d-flex align-items-center justify-content-center" id='exercise-modal'>
                            <p className="text-capitalize">{currentExercise.name}</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="card">
                        <Row className="d-flex align-items-center justify-content-center">
                            <p>Body part: <span className="font-weight-bold text-capitalize">{currentExercise.bodyPart}</span></p>
                        </Row>
                        <Row className="d-flex align-items-center justify-content-center">
                            <p>Equipment: <span className="font-weight-bold text-capitalize">{currentExercise.equipment}</span></p>
                        </Row>
                        <Row className="d-flex align-items-center justify-content-center">
                            <p>Target Muscle: <span className="font-weight-bold text-capitalize">{currentExercise.target}</span></p>
                        </Row>
                        <Row className="d-flex align-items-center justify-content-center">
                            <img src={currentExercise.gifUrl} alt='animated demonstration' />
                        </Row>
                    </Modal.Body>
                    {Auth.loggedIn() ? ( 
                            <Button variant='success' size='lg'>Save this exercise</Button> ) : (<Button disabled variant='secondary' size='lg'>Login to save this exercise</Button>
                        )}
                </Modal>
            </animated.div>
        </>  
    ) 
}

export default Home