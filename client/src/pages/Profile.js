import React, { useState } from 'react';
import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_EXERCISE } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { useSpring, animated } from '@react-spring/web'

const Profile = () => {
    const [currentExercise, setCurrentExercise] = useState('');

    const [searchInput, setSearchInput] = useState('All types');

    const [showExModal, setShowExModal] = useState(false);

    const { data: userDataMe } = useQuery(QUERY_USER);
    console.log(userDataMe)

    const user = userDataMe?.user.savedExercises || {};
    console.log(user)

    const [removeExercise, { error }] = useMutation(REMOVE_EXERCISE);

    const [userData, setUserData] = useState();

    const userDataLength = Object.keys(user).length;

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const token = Auth.loggedIn() ? Auth.getToken() : null;

//         if (!token) {
//           return false;
//         }
        
//         const test = await userDataLength;
        
//         if (!test) {
//           throw new Error('something went wrong!');
//         }
        
//         setUserData(user);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getUserData();
//   }, [user, userDataLength]);

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

    const handleRemoveExercise = async (exerciseId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
        return false;
        }

        try {
        const removed = await removeExercise({
            variables: { exerciseId }
        });
        } catch (err) {
        console.error(err);
        }
    };

    // if data isn't here yet, say so
    if (!userDataLength) {
        return <h2>Save some exercises!</h2>;
    }

    return (
        <>
            <Container>
                <h1>TEST</h1>
                <h2>
                    {user.length
                    ? `Viewing ${user.length} saved ${user.length === 1 ? 'exercise' : 'exercises'}:`
                    : 'You have no saved exercises!'}
                </h2>
                <Row  className="d-flex align-items-center justify-content-center m-3">
                    {user.map((exercise) => {
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
                </Modal>
            </Container>
        </>
    );
};

export default Profile;