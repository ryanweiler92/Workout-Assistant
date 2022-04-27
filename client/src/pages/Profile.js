import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Card, Button, Collapse, Accordion } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_EXERCISE, SAVE_ROUTINE, SAVE_ROUTINE2, SAVE_ROUTINE3, SAVE_ROUTINE4, SAVE_ROUTINE5, UPDATE_ROUTINE, UPDATE_ROUTINE2, UPDATE_ROUTINE3, UPDATE_ROUTINE4, UPDATE_ROUTINE5 } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { useSpring, animated } from '@react-spring/web'
import { Drawer, } from 'react-bootstrap-drawer';

const Profile = () => {

    //Routine Stuff
    const [routineInput, setRoutineInput] = useState('Routine 1');

    const [saveRoutine] = useMutation(SAVE_ROUTINE);

    const [updateRoutine] = useMutation(UPDATE_ROUTINE);

    const handleSaveRoutine = async (currentExercise) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveRoutine({
                variables: {
                    bodyPart: currentExercise.bodyPart,
                    equipment: currentExercise.equipment,
                    gifUrl: currentExercise.gifUrl,
                    id: currentExercise.id, 
                    name: currentExercise.name,
                    target: currentExercise.target
                },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
        console.error(err);
        }
    };

    //Routine Stuff
    const [saveRoutine2] = useMutation(SAVE_ROUTINE2);

    const [updateRoutine2] = useMutation(UPDATE_ROUTINE2);

    const handleSaveRoutine2 = async (currentExercise) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveRoutine2({
                variables: {
                    bodyPart: currentExercise.bodyPart,
                    equipment: currentExercise.equipment,
                    gifUrl: currentExercise.gifUrl,
                    id: currentExercise.id, 
                    name: currentExercise.name,
                    target: currentExercise.target
                },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
        console.error(err);
        }
    };

    //Routine Stuff
    const [saveRoutine3] = useMutation(SAVE_ROUTINE3);

    const [updateRoutine3] = useMutation(UPDATE_ROUTINE3);

    const handleSaveRoutine3 = async (currentExercise) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveRoutine3({
                variables: {
                    bodyPart: currentExercise.bodyPart,
                    equipment: currentExercise.equipment,
                    gifUrl: currentExercise.gifUrl,
                    id: currentExercise.id, 
                    name: currentExercise.name,
                    target: currentExercise.target
                },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
        console.error(err);
        }
    };

    //Routine Stuff
    const [saveRoutine4] = useMutation(SAVE_ROUTINE4);

    const [updateRoutine4] = useMutation(UPDATE_ROUTINE4);

    const handleSaveRoutine4 = async (currentExercise) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveRoutine4({
                variables: {
                    bodyPart: currentExercise.bodyPart,
                    equipment: currentExercise.equipment,
                    gifUrl: currentExercise.gifUrl,
                    id: currentExercise.id, 
                    name: currentExercise.name,
                    target: currentExercise.target
                },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
        console.error(err);
        }
    };

    //Routine Stuff
    const [saveRoutine5] = useMutation(SAVE_ROUTINE5);

    const [updateRoutine5] = useMutation(UPDATE_ROUTINE5);

    const handleSaveRoutine5 = async (currentExercise) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveRoutine5({
                variables: {
                    bodyPart: currentExercise.bodyPart,
                    equipment: currentExercise.equipment,
                    gifUrl: currentExercise.gifUrl,
                    id: currentExercise.id, 
                    name: currentExercise.name,
                    target: currentExercise.target
                },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
        console.error(err);
        }
    };


    //end routine stuff

    const [currentExercise, setCurrentExercise] = useState('');

    const [searchInput, setSearchInput] = useState('All types');

    const [showExModal, setShowExModal] = useState(false);

    const { data: userDataMe } = useQuery(QUERY_USER);

    const user = userDataMe?.user.savedExercises || {};

    console.log(user);

    const filter = handleFilterExercises(user);

    console.log(filter);

    const userRoutine = userDataMe?.user || {};
    console.log(userRoutine)
    
    const [removeExercise, { error }] = useMutation(REMOVE_EXERCISE);

    const userDataLength = Object.keys(user).length;

        const [openSidebar, setSidebarOpen] = useState(true);

   

//    const [currentRoutine, setCurrentRoutine] = useState([]);

    function checkButton(currentExercise, currentRoutine, routineIds) {
        if (currentRoutine === 'Routine 1') {
            for (let i = 0; i < routineIds.routine.length; i++) {
                if (currentExercise.id === routineIds.routine[i].id) {
                    return false; 
                }
            }
            return true;
        } else if (currentRoutine === 'Routine 2') {
            for (let i = 0; i < routineIds.routine2.length; i++) {
                if (currentExercise.id === routineIds.routine2[i].id) {
                    return false; 
                }
            }
            return true;
        } else if (currentRoutine === 'Routine 3') {
            for (let i = 0; i < routineIds.routine3.length; i++) {
                if (currentExercise.id === routineIds.routine3[i].id) {
                    return false; 
                }
            }
            return true;
        } else if (currentRoutine === 'Routine 4') {
            for (let i = 0; i < routineIds.routine4.length; i++) {
                if (currentExercise.id === routineIds.routine4[i].id) {
                    return false; 
                }
            }
            return true;
        } else {
            for (let i = 0; i < routineIds.routine5.length; i++) {
                if (currentExercise.id === routineIds.routine5[i].id) {
                    return false; 
                }
            }
            return true;
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

    const handleChooseExercise = (exercise) => {
        setCurrentExercise(exercise);
        setShowExModal(true);
    };

    // useEffect(() => {
        
    //     if (Auth.loggedIn()) {
    //         function switchRoutine(userData) {
    //             setCurrentRoutine(userData)
    //         }
    //     if (routineInput === 'Routine 1') {
    //         switchRoutine(userRoutine.routine)
    //     } else if (routineInput === 'Routine 2') {
    //         switchRoutine(userRoutine.routine2)
    //     } else if (routineInput === 'Routine 3') {
    //         switchRoutine(userRoutine.routine3)
    //     } else if (routineInput === 'Routine 4') {
    //         switchRoutine(userRoutine.routine4)
    //     } else {
    //         switchRoutine(userRoutine.routine5)
    //     }
    
    //     }
    //   }, [userRoutine, routineInput, currentRoutine]); 

    const handleUpdateRoutine = async (exerciseId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const removed = await updateRoutine({
                variables: { id: exerciseId },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
        console.error(err);
        }
    };

    const handleUpdateRoutine2 = async (exerciseId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const removed = await updateRoutine2({
                variables: { id: exerciseId },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
        console.error(err);
        }
    };

    const handleUpdateRoutine3 = async (exerciseId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const removed = await updateRoutine3({
                variables: { id: exerciseId },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
        console.error(err);
        }
    };

    const handleUpdateRoutine4 = async (exerciseId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const removed = await updateRoutine4({
                variables: { id: exerciseId },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
        console.error(err);
        }
    };

    const handleUpdateRoutine5 = async (exerciseId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const removed = await updateRoutine5({
                variables: { id: exerciseId },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
        console.error(err);
        }
    };

    const handleRemoveExercise = async (exerciseId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const removed = await removeExercise({
                variables: { id: exerciseId },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            
            setShowExModal(false);
        } catch (err) {
        console.error(err);
        }
    };

    function handleFilterExercises(savedExercises) {
        if (searchInput === 'All types') {
            return savedExercises;
        } else if (searchInput === 'Body weight') {
            const exercises = savedExercises.filter(exercise => exercise.equipment === 'body weight');
            return exercises;
        } else {
            const exercises = savedExercises.filter(exercise => exercise.bodyPart === searchInput.toLowerCase());
            return exercises;
        }
    }

    // if data isn't here yet, say so
    if (!userDataLength) {
        return <h2>Save some exercises!</h2>;
    }

    return (
        <>
            <animated.div style={styles} className="container-fluid">
            <Row className="flex-xl-nowrap">
				<Col xs={ 12 } md={ 4 } lg={ 2 }> 
                    <Drawer className="sidebar">
			            <Collapse in={ openSidebar }>
				            <Drawer.Overflow>
					            <Drawer.ToC>
                                    { routineInput === 'Routine 1' ? ( <h1 className="text-center routineTitle">Routine 1: </h1>
                                    ) : routineInput === 'Routine 2' ? ( <h1 className="text-center routineTitle">Routine 2: </h1>
                                    ) : routineInput === 'Routine 3' ? ( <h1 className="text-center routineTitle">Routine 3: </h1>
                                    ) : routineInput === 'Routine 4' ? ( <h1 className="text-center routineTitle">Routine 4: </h1>
                                    ) : ( <h1 className="text-center routineTitle">Routine 5: </h1>
                                    )}
					            </Drawer.ToC>
                                <Row className="d-flex align-items-center justify-content-center mt-1">
                                    { routineInput === 'Routine 1' ? ( userRoutine.routine.map((exercise) => {
                                        return (
                                            <Col key={exercise.id}>
                                                <div className="card d-flex align-items-center justify-content-center pb-3">
                                                    <Card.Header className="w-100 text-center text-capitalize font-weight-bold">{exercise.name}</Card.Header>
                                                    <Card.Body border='dark'>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Body Part: {exercise.bodyPart}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Equipment: {exercise.equipment}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Target: {exercise.equipment}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center">
                                                            <Card.Img variant="bottom" src={exercise.gifUrl} className="search-gif" />
                                                        </Row>
                                                    </Card.Body>
                                                    <Row>
                                                        { routineInput === 'Routine 1' ? ( <Button onClick={() => handleUpdateRoutine(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 2' ? ( <Button onClick={() => handleUpdateRoutine2(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 3' ? ( <Button onClick={() => handleUpdateRoutine3(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 4' ? ( <Button onClick={() => handleUpdateRoutine4(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : ( <Button onClick={() => handleUpdateRoutine5(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        )} 
                                                    </Row>
                                                </div>
                                            </Col>)})) : routineInput === 'Routine 2' ? ( userRoutine.routine2.map((exercise) => {
                                        return (
                                            <Col key={exercise.id}>
                                                <div className="card d-flex align-items-center justify-content-center pb-3">
                                                    <Card.Header className="w-100 text-center text-capitalize font-weight-bold">{exercise.name}</Card.Header>
                                                    <Card.Body border='dark'>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Body Part: {exercise.bodyPart}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Equipment: {exercise.equipment}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Target: {exercise.equipment}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center">
                                                            <Card.Img variant="bottom" src={exercise.gifUrl} className="search-gif" />
                                                        </Row>
                                                    </Card.Body>
                                                    <Row>
                                                        { routineInput === 'Routine 1' ? ( <Button onClick={() => handleUpdateRoutine(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 2' ? ( <Button onClick={() => handleUpdateRoutine2(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 3' ? ( <Button onClick={() => handleUpdateRoutine3(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 4' ? ( <Button onClick={() => handleUpdateRoutine4(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : ( <Button onClick={() => handleUpdateRoutine5(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        )} 
                                                    </Row>
                                                </div>
                                            </Col>)})) : routineInput === 'Routine 3' ? ( userRoutine.routine3.map((exercise) => {
                                        return (
                                            <Col key={exercise.id}>
                                                <div className="card d-flex align-items-center justify-content-center pb-3">
                                                    <Card.Header className="w-100 text-center text-capitalize font-weight-bold">{exercise.name}</Card.Header>
                                                    <Card.Body border='dark'>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Body Part: {exercise.bodyPart}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Equipment: {exercise.equipment}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Target: {exercise.equipment}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center">
                                                            <Card.Img variant="bottom" src={exercise.gifUrl} className="search-gif" />
                                                        </Row>
                                                    </Card.Body>
                                                    <Row>
                                                        { routineInput === 'Routine 1' ? ( <Button onClick={() => handleUpdateRoutine(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 2' ? ( <Button onClick={() => handleUpdateRoutine2(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 3' ? ( <Button onClick={() => handleUpdateRoutine3(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 4' ? ( <Button onClick={() => handleUpdateRoutine4(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : ( <Button onClick={() => handleUpdateRoutine5(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        )} 
                                                    </Row>
                                                </div>
                                            </Col>)})) : routineInput === 'Routine 4' ? ( userRoutine.routine4.map((exercise) => {
                                        return (
                                            <Col key={exercise.id}>
                                                <div className="card d-flex align-items-center justify-content-center pb-3">
                                                    <Card.Header className="w-100 text-center text-capitalize font-weight-bold">{exercise.name}</Card.Header>
                                                    <Card.Body border='dark'>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Body Part: {exercise.bodyPart}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Equipment: {exercise.equipment}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Target: {exercise.equipment}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center">
                                                            <Card.Img variant="bottom" src={exercise.gifUrl} className="search-gif" />
                                                        </Row>
                                                    </Card.Body>
                                                    <Row>
                                                        { routineInput === 'Routine 1' ? ( <Button onClick={() => handleUpdateRoutine(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 2' ? ( <Button onClick={() => handleUpdateRoutine2(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 3' ? ( <Button onClick={() => handleUpdateRoutine3(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 4' ? ( <Button onClick={() => handleUpdateRoutine4(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : ( <Button onClick={() => handleUpdateRoutine5(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        )} 
                                                    </Row>
                                                </div>
                                            </Col>)})) : ( userRoutine.routine5.map((exercise) => {
                                        return (
                                            <Col key={exercise.id}>
                                                <div className="card d-flex align-items-center justify-content-center pb-3">
                                                    <Card.Header className="w-100 text-center text-capitalize font-weight-bold">{exercise.name}</Card.Header>
                                                    <Card.Body border='dark'>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Body Part: {exercise.bodyPart}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Equipment: {exercise.equipment}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center text-capitalize">
                                                            <Card.Text>Target: {exercise.equipment}</Card.Text>
                                                        </Row>
                                                        <Row className="d-flex align-items-center justify-content-center">
                                                            <Card.Img variant="bottom" src={exercise.gifUrl} className="search-gif" />
                                                        </Row>
                                                    </Card.Body>
                                                    <Row>
                                                        { routineInput === 'Routine 1' ? ( <Button onClick={() => handleUpdateRoutine(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 2' ? ( <Button onClick={() => handleUpdateRoutine2(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 3' ? ( <Button onClick={() => handleUpdateRoutine3(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : routineInput === 'Routine 4' ? ( <Button onClick={() => handleUpdateRoutine4(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        ) : ( <Button onClick={() => handleUpdateRoutine5(exercise.id)} className="btn-danger">Remove Exercise</Button>
                                                        )} 
                                                    </Row>
                                                </div>
                                            </Col>)}))}
                                    
                                </Row>
				            </Drawer.Overflow>
			            </Collapse>
		            </Drawer>
                </Col>
				<Col xs={ 12 } md={ 8 } lg={ 10 } >
                <Container>
                    <div className="container mt-2">
                    <div className="jumbotron">
                    <h2 className="display-5"> Hello {userDataMe?.user.username}! 
                        {filter.length
                        ? ` Viewing ${filter.length} saved ${filter.length === 1 ? 'exercise' : 'exercises'}:`
                        : ' No saved exercises!'}
                    </h2>
                    <hr className="my-4" />
                <Row>
                    <Col>
                        <p className="lead">
                            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse" aria-expanded="false" aria-controls="collapse">
                                Instructions
                            </button>
                        </p>
                    </Col>
                    <Col>
                        <p className="lead">
                            Select routine
                        </p>
                        <select className='select' onChange={(e) => setRoutineInput(e.target.value)}>
                            <option>Routine 1</option>
                            <option>Routine 2</option>
                            <option>Routine 3</option>
                            <option>Routine 4</option>
                            <option>Routine 5</option>
                        </select>
                    </Col>
                    <Col>
                        <p className="lead">
                            View by type
                        </p>
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
                    </Col>
                </Row>
                <div className="collapse" id="collapse">
                    <div className="card card-body padding-top">
                        To build up your routine, view a saved exercise and choose the option which says "Add to routine". Use
                        the select routine menu to adjust which routine to change. Use the view by type menu to filter saved exercises.
                    </div>
                </div>
                    </div>
                    </div>
                    <Row  className="d-flex align-items-center justify-content-center mt-3">
                        {filter.map((exercise) => {
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
                                            <Row>
                                            <Button onClick={() => handleChooseExercise(exercise)}>View Exercise</Button>
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
                        aria-labelledby='saved-exercise-modal'
                    >
                        <Modal.Header className="d-flex align-items-center justify-content-center" closeButton>
                            <Modal.Title className="d-flex align-items-center justify-content-center" id='saved-exercise-modal'>
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
                        <Button variant='danger' size='lg' onClick={() => handleRemoveExercise(currentExercise.id)}>Remove this exercise</Button> 
                        {routineInput === 'Routine 1' && checkButton(currentExercise, routineInput, userRoutine) ? ( <Button onClick={() => handleSaveRoutine(currentExercise)} className="btn-success" size='lg'>Add to routine</Button>
                        ) : routineInput === 'Routine 2' && checkButton(currentExercise, routineInput, userRoutine) ? ( <Button onClick={() => handleSaveRoutine2(currentExercise)} className="btn-success" size='lg'>Add to routine</Button>
                        ) : routineInput === 'Routine 3' && checkButton(currentExercise, routineInput, userRoutine) ? ( <Button onClick={() => handleSaveRoutine3(currentExercise)} className="btn-success" size='lg'>Add to routine</Button>
                        ) : routineInput === 'Routine 4' && checkButton(currentExercise, routineInput, userRoutine) ? ( <Button onClick={() => handleSaveRoutine4(currentExercise)} className="btn-success" size='lg'>Add to routine</Button>
                        ) : routineInput === 'Routine 5' && checkButton(currentExercise, routineInput, userRoutine) ? ( <Button onClick={() => handleSaveRoutine5(currentExercise)} className="btn-success" size='lg'>Add to routine</Button> 
                        ) : <Button disabled variant='secondary' size='lg'>Added to routine</Button> }
                    </Modal>
                </Container>
                </Col>
                </Row>
            </animated.div>
        </>
    );
};

export default Profile;