import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Layout from '../../components/layouts/index';
import Input from '../../UI/input/index';
import { login} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    
    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        }

        dispatch(login(user));
    }

    if(auth.authenticate) {
        return <Redirect to="/" />
    }
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>

                            <Input label="Email address"
                                placeholder="Enter email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />

                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

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

export default Signin
