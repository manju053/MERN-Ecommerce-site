import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/layouts/index';
import Input from '../../UI/input';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions';

const Signup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const userRegister = (e) => {
        e.preventDefault();

        const user= {firstName, lastName, email, password} 
        dispatch(signup(user))
    }
    if(auth.authenticate) {
        return <Redirect to="/" />
    }

    if(user.loading) {
        return <p>Loading...!</p>
    }
    return (
        <Layout>
            <Container>
                {user.message && <h3>{user.message}</h3>}
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userRegister}>
                            <Row>
                                <Col md={6}>
                                    <Input label="First Name"
                                        placeholder="First Name"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)} />
                                </Col>

                                <Col md={6}>
                                    <Input label="Last Name"
                                        placeholder="Last Name"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)} />
                                </Col>

                            </Row>

                            <Form.Group controlId="formBasicEmail">
                                <Input label="Email address"
                                    type="email"
                                    value={email}
                                    placeholder="Enter email"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />


                                {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text> */}
                            </Form.Group>

                            <Input label="Password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }} />

                            <Button variant="primary" type="submit">
                                Submit
                    </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )
}

export default Signup
