import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal, Carousel } from 'react-bootstrap';
import { queryExercises } from '../utils/API';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { SAVE_EXERCISE } from '../utils/mutations';
import Auth from '../utils/auth';
import { useSpring, animated } from '@react-spring/web';

const Home = () => {
    const [saveExercise] = useMutation(SAVE_EXERCISE);

    const [searchedExercise, setSearchedExercises] = useState([]);

    const [searchInput, setSearchInput] = useState('All types');

    const [currentExercise, setCurrentExercise] = useState('');

    const [showExModal, setShowExModal] = useState(false);

    const handleChooseExercise = (exercise) => {
        setCurrentExercise(exercise);
        setShowExModal(true);
    };

    //Equipment Modal/Carosuel Controls
    const [showEquipModal, setEquipModal] = useState(false);

    const handleEquipModalClose = () => setEquipModal(false);
    const handleEquipModalShow = () => setEquipModal(true);

    const [equipIndex, setEquipIndex] = useState(0);

    const handleEquipSelect = (selectedIndex, e) => {
      setEquipIndex(selectedIndex);
    };
    //End Equipment Modal/Carosuel Controls

    // one query for when page renders
    const { data: userDataMe } = useQuery(QUERY_USER);
    // console.log(userDataMe)
    const user = userDataMe?.user.savedExercises || {};
    // console.log(user)

    const [savedIds, setSavedIds] = useState([]);

    useEffect(() => {
        if (Auth.loggedIn()) {
            function handleSavedUpdate(userData) {
            setSavedIds(userData);
            }
                
            handleSavedUpdate(user)
        }
      }, [user]); 

    function checkButton(currentExercise) {
        for (let i = 0; i < savedIds.length; i++) {
            if (currentExercise.id === savedIds[i].id) {
                return false; 
            }
        }
        return true;
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

        // CODE FOR HIDING JUMBOTRON AFTER SEARCHING
        // const jumbo = document.querySelector(".jumbotron");
        // jumbo.classList.add("hideJumbo");
    
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

            setSearchedExercises(exerciseData);
            // setSearchInput('');
        } catch (err){
            console.error(err)
        }
    };

    const handleSaveExercise = async (id) => {
        const exerciseToSave = searchedExercise.find((exercise) => exercise.id === id);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        };

        try {
            const response = await saveExercise({
                variables: {
                    bodyPart: exerciseToSave.bodyPart,
                    equipment: exerciseToSave.equipment,
                    gifUrl: exerciseToSave.gifUrl,
                    id: exerciseToSave.id, 
                    name: exerciseToSave.name,
                    target: exerciseToSave.target
                },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });



        } catch (err) {
            console.error(err)
        }
    }

    //animation controls 
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
    //end animation controls 

    return (
        // <animated.div style={styles}>
        <>
            <div className="container mt-2">
            <div className="jumbotron">
                <h1 className="display-4">Say Hello to your Workout Assistant!</h1>
                <p className="lead">Find all of the exercises you need for your next workout.</p>
                <hr className="my-4" />
                <Row>
                    <Col>
                <p>New to Workout Assistant?</p>
                <p className="lead">
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse" aria-expanded="false" aria-controls="collapse">
                    Learn More
                </button>
                </p>
                    </Col>
                    <Col>
                        <p>Need to see some examples of the equipment mentioned in Workout Assistant?</p>
                        <p className="lead">
                        <Button variant="primary" onClick={handleEquipModalShow}>
                            See Examples
                        </Button>
                        </p>
                    </Col>
                </Row>
                <div className="collapse" id="collapse">
                    <div className="card card-body padding-top">
                        To use Workout Assistant, first sign up for a new account with your email address. Once logged in you can search for exercises by muscle group and save these to your profile. 
                        Navigate to your profile to view your saved exercises.
                    </div>
                </div>

            </div>
            </div>
            <Container className="container home-container mt-3">
                <Row className="d-flex align-items-center justify-content-center mt-1">
                    <Col lg="8" className="d-flex align-items-center justify-content-center mt-3">
                        <h4>Select a muscle group from the dropdown to get started!</h4>
                    </Col>
                </Row>
                <Row className="d-flex align-items-center justify-content-center mt-1">
                <Form>
                    <Form.Row>
                        <Col>
                            <select className='select' onChange={(e) => setSearchInput(e.target.value)}>
                                <option>All types</option>
                                <option>Body weight</option>
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
                            <Col xs={12} md={8} lg={5} className="m-2" key={exercise.id}>
                                <animated.div style={boxShadowChange} className="card d-flex align-items-center justify-content-center pb-3">
                                    <Card.Header className="w-100 text-center text-capitalize font-weight-bold">{exercise.name}</Card.Header>
                                    <Card.Body border='dark' onClick={() => handleChooseExercise(exercise)}>
                                        <Row className="d-flex align-items-center justify-content-center">
                                        <Card.Text>{exercise.bodyPart === 'cardio' ? <span>Type: </span> : <span>Body Part: </span>} <span className="text-capitalize">{exercise.bodyPart}</span></Card.Text>
                                        </Row>
                                        <Row className="d-flex align-items-center justify-content-center pt-2">
                                        <Card.Img variant="bottom" src={exercise.gifUrl} className="search-gif"/>
                                        </Row>
                                    </Card.Body>
                                    <Row className="d-flex align-items-center justify-content-center">
                                        {!checkButton(exercise) && <span className="check">✔</span>}<Button onClick={() => handleChooseExercise(exercise)}>View Exercise</Button>
                                    </Row>
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
                            <p>{currentExercise.bodyPart === 'cardio' ? <span>Type: </span> : <span>Body Part: </span>} <span className="font-weight-bold text-capitalize">{currentExercise.bodyPart}</span></p>
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

                    {!checkButton(currentExercise) && Auth.loggedIn() ? ( <Button disabled variant='secondary' size='lg'>Exercise already saved</Button> ) : Auth.loggedIn() && checkButton(currentExercise) ? (
                        <Button variant='success' size='lg' onClick={() => handleSaveExercise(currentExercise.id)}>Save this exercise</Button> ) : ( <Button disabled variant='secondary' size='lg'>Login to save this exercise</Button>
                    )}
                </Modal>

                <Modal show={showEquipModal} onHide={handleEquipModalClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Equipment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="card">
                        <Carousel activeIndex={equipIndex} onSelect={handleEquipSelect}>
                            <Carousel.Item>
                                <img 
                                className="img-fluid equip-pic"
                                src={require(`../assets/images/barbell.jpeg`)}
                                alt="barbell with weights"
                                />
                                <Carousel.Caption>
                                    <h3>Barbell</h3>
                                    <p>A barbell is a long metal bar to which weights can be attached to each end.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img 
                                className="img-fluid equip-pic"
                                src={require(`../assets/images/cable.jpeg`)}
                                alt="gym cables"
                                />
                                <Carousel.Caption>
                                    <h3>Cables</h3>
                                    <p>Gym cables allow you to select different amounts of resistance.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img 
                                className="img-fluid equip-pic"
                                src={require(`../assets/images/kettlebell.jpeg`)}
                                alt="kettlebells"
                                />
                                <Carousel.Caption>
                                    <h3>Kettlebells</h3>
                                    <p>The kettlebell is a cast iron or cast steel ball with a handle attached to the top.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img 
                                className="img-fluid equip-pic"
                                src={require(`../assets/images/dumbbell.jpeg`)}
                                alt="dumbbells"
                                />
                                <Carousel.Caption>
                                    <h3>Dumbbells</h3>
                                    <p>The dumbbell is a type of free weight.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img 
                                className="img-fluid equip-pic"
                                src={require(`../assets/images/machine.jpg`)}
                                alt="leverage machine"
                                />
                                <Carousel.Caption>
                                    <h3>Leverage Machine</h3>
                                    <p>Leverage machine are any types of machines where you can select the resistance.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img 
                                className="img-fluid equip-pic"
                                src={require(`../assets/images/medicine-ball-2.jpeg`)}
                                alt="medicine ball"
                                />
                                <Carousel.Caption>
                                    <h3>Medicine Ball</h3>
                                    <p>A medicine ball is a weighted ball.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
        // </animated.div>
        
    ) 
}

export default Home